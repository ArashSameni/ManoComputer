import io
class Word:
    def __init__(self) -> None:
        self.size = 16
        self.data = [0] * 16
        self.label = ""
        self.instruction = ""

    def __getitem__(self, item):
        return self.data[item]

    def __setitem__(self, item, value):
        self.data[item] = value

    def __ilshift__(self, other):
        self.set_value(int(other))
        self.instruction = ""
        return self

    def __imod__(self, value):
        value = int(value)
        self.set_value(value)
        return self

    def __imatmul__(self, value):
        value = int(value, 16)
        if value >= 2**(self.size-1):
            value -= 2**self.size
        self.set_value(value)
        return self

    def set_value(self, value):
        if -32768 <= value <= 32767:
            if value < 0:
                self.data = list(
                    map(int, list(bin(value & (2**self.size - 1))[2:])))[-self.size:]
            else:
                self.data = list(
                    map(int, list(bin(value)[2:].zfill(self.size))))[-self.size:]

    def __int__(self):
        result = 0
        for bit in self.data[1:]:
            result = (result << 1) | bit
        if self.data[0]:
            result -= 32768
        return result

    def hex(self):
        result = 0
        for bit in self.data:
            result = (result << 1) | bit
        return hex(result)


class Ram:
    def __init__(self) -> None:
        self.words = [Word() for _ in range(2048)]

    def __getitem__(self, item):
        return self.words[item]

    def __setitem__(self, item, value):
        self.words[item] = value

    def load_bin(self, file_name):
        with open(file_name, 'rb') as bin_file:
            for word in self.words:
                word @= bin_file.read(2).hex()
    
    def load_bytearray(self, bytearray):
        bin_file = io.BytesIO(bytearray)
        for word in self.words:
                word @= bin_file.read(2).hex()

    def load_label_table(self, table):
        for line,label in table.items():
            self.words[line].label = label

    def load_instruction_table(self,table):
        for line,instruction in table.items():
            self.words[line].instruction = instruction

    def json(self):
        words = []
        line_number = 0
        for word in self.words:
            words.append({
                "address": hex(line_number)[2:],
                "value": word.hex(),
                "label": word.label,
                "instruction": word.instruction})
            line_number += 1
        return words
