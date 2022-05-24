class Register:
    def __init__(self, size) -> None:
        self.size = size
        self.data = [0 for _ in range(size)]

    def __getitem__(self, item):
        return self.data[item]

    def __setitem__(self, item, value):
        self.data[item] = value

    def __ilshift__(self, other):
        for i in range(self.size):
            self.data[i] = other.data[i]
        return self

    def __imatmul__(self, value):
        self.data = list(
            map(int, list(bin(int(value, 16))[2:].zfill(self.size))))[-self.size:]
        return self

    def __imod__(self, value):
        self.data = list(
            map(int, list(bin(int(value))[2:].zfill(self.size))))[-self.size:]
        return self

    def __int__(self):
        result = 0
        for bit in self.data:
            result = (result << 1) | bit
        return result

    def __iand__(self, other):
        for i in range(self.size):
            self.data[i] = self.data[i] & other.data[i]
        return self

    def __add__(self, other):
        def full_adder(a, b, carry_in):
            sum_out = a ^ b ^ carry_in
            carry_out = ((a ^ b) & carry_in) | (a & b)
            return sum_out, carry_out
        carry = 0
        result = Register(self.size)
        for i in range(self.size-1, -1, -1):
            result[i], carry = full_adder(self.data[i], other.data[i], carry)
        return result, carry

    def increment(self):
        self %= int(self)+1

    def reset(self):
        self %= 0

    def shift_right(self, serial_in):
        temp_data = self.data + [serial_in]
        temp_data = temp_data[-1:]+temp_data[:-1]
        self.data = temp_data[:-1]
        return temp_data[-1]

    def shift_left(self, serial_in):
        temp_data = self.data + [serial_in]
        temp_data = temp_data[1:]+temp_data[:1]
        self.data = temp_data[:-1]
        return temp_data[-1]

