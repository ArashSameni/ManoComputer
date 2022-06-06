import json
from flask import Flask, jsonify, request
from .computer import Computer
from .assembler import Assembler

app = Flask(__name__)
c = Computer()

@app.route('/clock', methods=['GET'])
def clock():
    c.clock()
    return jsonify(c.json())

@app.route('/load', methods=['POST'])
def load_code():
    code = json.loads(request.data)['code']
    assembler = Assembler(code)
    try:
        assembler.assemble()
        c.Memory.load_bytearray(b''.join(assembler.data))
        c.Memory.load_label_table(assembler.label_table)
        c.Memory.load_instruction_table(assembler.instruction_table)
        return jsonify(c.json())
    except SyntaxError as error:
        return jsonify({"parse_error":str(error)})

@app.route('/reset', methods=['POST'])
def reset():
    c = Computer()
    return jsonify(c.json())

@app.route('/input', methods=['POST'])
def input():
    data = json.loads(request.data)['input'][0]
    return jsonify(c.input_data(data))

@app.route('/output', methods=['GET'])
def output():
    if output := c.output_data():
        return jsonify({"output":output})
    else:
        return jsonify(False)

@app.route('/start', methods=['POST'])
def start():
    try:
        location = json.loads(request.data)['location']
    except:
        location = "100"
    c.start(location)
    return jsonify(c.json())

app.run()