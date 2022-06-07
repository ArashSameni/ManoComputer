import json
from flask import Flask, jsonify, request
from flask_cors import CORS
from .computer import Computer
from .assembler import Assembler

app = Flask(__name__)
CORS(app)
c = Computer()


@app.route('/clock', methods=['GET'])
def clock():
    c.clock()
    return jsonify(c.json())


@app.route('/load', methods=['POST'])
def load_code():
    try:
        code = json.loads(request.data)['code']
        assembler = Assembler(code)
    except:
        return jsonify({})
    try:
        assembler.assemble()
        c.reset_memory()
        c.Memory.load_bytearray(b''.join(assembler.data))
        c.Memory.load_label_table(assembler.label_table)
        c.Memory.load_instruction_table(assembler.instruction_table)
        c.start_location = assembler.start_location
        c.start()
        return jsonify(c.json())
    except SyntaxError as error:
        return jsonify({"parse_error": str(error)})


@app.route('/reset', methods=['POST'])
def reset():
    global c
    c = Computer()
    return jsonify(c.json())


@app.route('/input', methods=['POST'])
def input():
    try:
        data = json.loads(request.data)['input'][0]
        return jsonify(c.input_data(data))
    except:
        return jsonify({})


@app.route('/output', methods=['GET'])
def output():
    if output := c.output_data():
        return jsonify({"output": output})
    else:
        return jsonify(False)


@app.route('/start', methods=['POST'])
def start():
    try:
        request_data = json.loads(request.data)
        if location := request_data.get('location', None):
            c.start_location = location
    except:
        pass
    c.start()
    return jsonify(c.json())


app.run()
