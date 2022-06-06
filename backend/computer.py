from .register import Register
from .ram import Ram
from .conditions import conditions


class Computer:
    def __init__(self) -> None:
        self.Memory = Ram()
        self.DR = Register(16)
        self.AR = Register(12)
        self.AC = Register(16)
        self.IR = Register(16)
        self.PC = Register(12)
        self.TR = Register(16)
        self.INPR = Register(8)
        self.OUTR = Register(8)
        self.SC = 0
        self.I = False
        self.S = False
        self.E = False
        self.R = False
        self.IEN = False
        self.FGI = False
        self.FGO = True
        self.r = False
        self.p = False
        self.conditions = conditions
        self.last_instructions = []

    def T(self, step):
        return self.SC == step

    def D(self, number):
        return self.decode(self.IR[1:4]) == number

    def decode(self, bit_list):
        result = 0
        for bit in bit_list:
            result = (result << 1) | bit
        return result

    def output_data(self):
        if not self.FGO:
            self.FGO = True
            return chr(int(self.OUTR))
        return False

    def input_data(self,data):
        if not self.FGI:
            self.FGI = True
            self.INPR %= ord(data)
            return True
        return False

    def clock(self):
        self.last_instructions = []
        if(self.S):
            for condition, actions in self.conditions.items():
                if eval(condition, {"Computer": self}):
                    for action in actions:
                        exec(action, {"Computer": self})
            self.SC += 1
            self.r = False
            self.p = False

    def start(self,location="100"):
        self.PC @= location
        self.S = True
    
    def json(self):
        return {
            'ram': self.Memory.json(),
            'DR': self.DR.hex(),
            'AR': self.AR.hex(),
            'AC': self.AC.hex(),
            'IR': self.IR.hex(),
            'PC': self.PC.hex(),
            'TR': self.TR.hex(),
            'INPR': self.INPR.hex(),
            'OUTR': self.OUTR.hex(),
            'SC': self.SC,
            'I': int(self.I),
            'S': int(self.S),
            'E': int(self.E),
            'R': int(self.R),
            'IEN': int(self.IEN),
            'FGI': int(self.FGI),
            'FGO': int(self.FGO),
            'last_instructions': self.last_instructions
        }
