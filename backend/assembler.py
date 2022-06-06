import re
from typing import Dict, List

def int2hex(number:int, bits:int):
    if number < 0:
        return hex((1 << bits) + number)
    return hex(number)

class Assembler:
    regex = re.compile(
        "([\\w\\d]{0,3}(?=,))?,?[^\\S\\r\\n]?(\\w{3})[^\\S\\r\\n]?([-\\w\\d]+)?[^\\S\\r\\n]?(I)?[^\\S\\r\\n]?(\\/\\w+)?")
    pseudo_instructions = ['ORG', 'END', 'DEC', 'HEX']
    memory_reference_instructions = {
        'AND': '000',
        'ADD': '001',
        'LDA': '010',
        'STA': '011',
        'BUN': '100',
        'BSA': '101',
        'ISZ': '110',
    }
    non_memory_reference_instructions = {
        'CLA': '7800',
        'CLE': '7400',
        'CMA': '7200',
        'CME': '7100',
        'CIR': '7080',
        'CIL': '7040',
        'INC': '7020',
        'SPA': '7010',
        'SNA': '7008',
        'SZA': '7004',
        'SZE': '7002',
        'HLT': '7001',
        'INP': 'F800',
        'OUT': 'F400',
        'SKI': 'F200',
        'SKO': 'F100',
        'ION': 'F080',
        'IOF': 'F040',
    }

    def __init__(self, code: List[str]) -> None:
        self.code = [line.upper() for line in code]
        self.symbol_table: Dict[str, int] = {}
        self.instruction_table = {}
        self.label_table = {}
        self.data: List[bytearray] = [bytearray(2) for _ in range(2048)]

    def assemble(self) -> None:
        self.first_pass()
        self.second_pass()

    def first_pass(self) -> None:
        line_counter = 0
        file_line = 0
        for line in self.code:
            match = self.regex.match(line)
            file_line += 1
            if match:
                if match[1]:
                    self.symbol_table[match[1]] = line_counter
                if match[2] not in ['ORG','END']:
                    self.instruction_table[line_counter] = f'{str(match[2] or "")} {str(match[3] or "")} {str(match[4] or "")}'.strip()
                elif match[2] == 'ORG':
                    line_counter = int(match[3],16)
                    continue
                elif match[2] == 'END':
                    break
                line_counter += 1
            else:
                raise SyntaxError(f'Parsing error on line {file_line}')
        self.label_table = dict((v, k) for k, v in self.symbol_table.items())

    def second_pass(self) -> None:
        line_counter = 0
        for line in self.code:
            match = self.regex.match(line)
            if match:
                if match[2] in self.pseudo_instructions:
                    if match[2] == 'ORG':
                        line_counter = int(match[3],16)
                        continue
                    elif match[2] == 'END':
                        break
                    elif match[2] == 'DEC':
                        self.data[line_counter] = bytearray.fromhex(int2hex(int(match[3]),16)[2:].zfill(4))
                    elif match[2] == 'HEX':
                        self.data[line_counter] = bytearray.fromhex(match[3].zfill(4))
                if match[2] in self.non_memory_reference_instructions:
                    instruction = self.non_memory_reference_instructions[match[2]]
                    self.data[line_counter] = bytearray.fromhex(instruction)
                if match[2] in self.memory_reference_instructions:
                    address = format(self.symbol_table[match[3]], 'b').zfill(12)
                    opcode = self.memory_reference_instructions[match[2]]
                    instruction = opcode+address
                    if match[4]:
                        instruction = '1' + instruction
                    else:
                        instruction = '0' + instruction
                    self.data[line_counter] = bytearray.fromhex(
                        int2hex(int(instruction, 2),16)[2:].zfill(4))
                line_counter += 1

    def save_binary(self) -> None:
        data = b''.join(self.data)
        with open('cart.bin', 'wb') as cart:
            cart.write(data)

