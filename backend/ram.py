class Word:
    def __init__(self) -> None:
        self.size = 16
        self.data = [0] * 16

    def __getitem__(self, item):
        return self.data[item]

    def __setitem__(self, item, value):
        self.data[item] = value

    def __ilshift__(self, other):
        for i in range(self.size):
            self.data[i] = other.data[i]

    def __imod__(self, value):
        value = int(value)
        self.set_value(value)
        return self

    def __imatmul__(self, value):
        value = int(value, 16)
        self.set_value(value)
        return self

    def set_value(self, value):
        if -32768 <= value <= 32767:
            if value < 0:
                self.data = list(
                    map(int, list(bin(-value))[2:].zfill(self.size)))[-self.size:]
                self.complement()
                self.increment()
            else:
                self.data = list(
                    map(int, list(bin(value))[2:].zfill(self.size)))[-self.size:]

    def __int__(self):
        result = 0
        for bit in self.data[1:].reverse():
            result = (result << 1) | bit
        if self.data[0]:
            result -= 32768
        return result

    def increment(self):
        self %= int(self)+1

    def complement(self):
        for i in range(self.size):
            self.data[i] = int(not self.data[i])


class Ram:
    def __init__(self) -> None:
        self.words = [Word() for _ in range(2048)]

    def __getitem__(self, item):
        return self.data[item]

    def __setitem__(self, item, value):
        self.data[item] = value

    def load_bin(self, file_name):
        with open(file_name) as bin_file:
            for word in self.words:
                word @= bin_file.read(2).encode('utf-8').hex()