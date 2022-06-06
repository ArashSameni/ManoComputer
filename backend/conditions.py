conditions = {
    "Computer.T(0) and (not Computer.T(1)) and (not Computer.T(2)) and Computer.IEN and (Computer.FGO or Computer.FGI)": ["Computer.R = True"],
    "Computer.D(7) and (not Computer.I) and Computer.T(3)": ["Computer.r = True"],
    "Computer.D(7) and Computer.I and Computer.T(3)": ["Computer.p = True"],
    "(not Computer.R) and Computer.T(0)": ["Computer.AR <<= Computer.PC",
                                           "Computer.last_instructions = ['AR <- PC']"],
    "(not Computer.R) and Computer.T(1)": ["Computer.IR <<= Computer.Memory[Computer.decode(Computer.AR.data)]",
                                           "Computer.PC.increment()",
                                           "Computer.last_instructions = ['IR <- M[AR]','PC <- PC + 1']"],
    "(not Computer.R) and Computer.T(2)": ["Computer.AR.data = Computer.IR[4:]",
                                           "Computer.I = bool(Computer.IR[0])",
                                           "Computer.last_instructions = ['D0,...,D7 <- Decode IR(12-14)','AR <- IR(0-11)', 'I <- IR(15)']"],
    "(not Computer.D(7)) and Computer.I and Computer.T(3)": ["Computer.AR <<= Computer.Memory[Computer.decode(Computer.AR.data)]",
                                                             "Computer.last_instructions = ['AR <- M[AR]']"],
    "Computer.R and Computer.T(0)": ["Computer.AR.reset()",
                                     "Computer.TR <<= Computer.PC",
                                     "Computer.last_instructions = ['R <- 1','AR <- 0', 'TR <- PC']"],
    "Computer.R and Computer.T(1)": ["Computer.Memory[Computer.decode(Computer.AR.data)] <<= Computer.TR",
                                     "Computer.PC.reset()",
                                     "Computer.last_instructions = ['M[AR] <- TR', 'PC <- 0']"],
    "Computer.R and Computer.T(2)": ["Computer.IEN = False",
                                     "Computer.PC.increment()",
                                     "Computer.R = False",
                                     "Computer.SC = -1",
                                     "Computer.last_instructions = ['PC <- PC + 1', 'IEN <- 0', 'R <- 0', 'SC <- 0']"],
    "Computer.D(0) and Computer.T(4)": ["Computer.DR <<= Computer.Memory[Computer.decode(Computer.AR.data)]",
                                        "Computer.last_instructions = ['DR <- M[AR]']"],
    "Computer.D(0) and Computer.T(5)": ["Computer.AC &= Computer.DR",
                                        "Computer.SC = -1",
                                        "Computer.last_instructions = ['AC <- AC ∧ DR', 'SC <- 0']"],
    "Computer.D(1) and Computer.T(4)": ["Computer.DR <<= Computer.Memory[Computer.decode(Computer.AR.data)]",
                                        "Computer.last_instructions = ['DR <- M[AR]']"],
    "Computer.D(1) and Computer.T(5)": ["Computer.AC,Computer.E = Computer.AC + Computer.DR",
                                        "Computer.SC = -1",
                                        "Computer.last_instructions = ['AC <- AC + DR', 'E <- Cout', 'SC <- 0']"],
    "Computer.D(2) and Computer.T(4)": ["Computer.DR <<= Computer.Memory[Computer.decode(Computer.AR.data)]",
                                        "Computer.last_instructions = ['DR <- M[AR]']"],
    "Computer.D(2) and Computer.T(5)": ["Computer.AC <<= Computer.DR",
                                        "Computer.SC = -1",
                                        "Computer.last_instructions = ['AC <- DR', 'SC <- 0']"],
    "Computer.D(3) and Computer.T(4)": ["Computer.Memory[Computer.decode(Computer.AR.data)] <<= Computer.AC",
                                        "Computer.SC = -1",
                                        "Computer.last_instructions = ['M[AR] <- AC', 'SC <- 0']"],
    "Computer.D(4) and Computer.T(4)": ["Computer.PC <<= Computer.AR",
                                        "Computer.SC = -1",
                                        "Computer.last_instructions = ['PC <- AR', 'SC <- 0']"],
    "Computer.D(5) and Computer.T(4)": ["Computer.Memory[Computer.decode(Computer.AR.data)] <<= Computer.PC",
                                        "Computer.AR.increment()",
                                        "Computer.last_instructions = ['M[AR] <- PC', 'AR <- AR + 1']"],
    "Computer.D(5) and Computer.T(5)": ["Computer.PC <<= Computer.AR",
                                        "Computer.SC = -1",
                                        "Computer.last_instructions = ['PC <- AR', 'SC <- 0']"],
    "Computer.D(6) and Computer.T(4)": ["Computer.DR <<= Computer.Memory[Computer.decode(Computer.AR.data)]",
                                        "Computer.last_instructions = ['DR <- M[AR]']"],
    "Computer.D(6) and Computer.T(5)": ["Computer.DR.increment()",
                                        "Computer.last_instructions = ['DR <- DR + 1']"],
    "Computer.D(6) and Computer.T(6)": ["Computer.Memory[Computer.decode(Computer.AR.data)] <<= Computer.DR",
                                        "Computer.SC = -1",
                                        "if (int(Computer.DR)==0): Computer.PC.increment()",
                                        "Computer.last_instructions = ['M[AR] <- DR', 'SC <- 0', 'if (DR = 0): PC <- PC + 1']"],
    "Computer.p or Computer.r": ["Computer.SC = -1"],
    "Computer.r and Computer.IR[4]": ["Computer.AC.reset()",
                                      "Computer.last_instructions = ['AC <- 0', 'SC <- 0']"],
    "Computer.r and Computer.IR[5]": ["Computer.E = False",
                                      "Computer.last_instructions = ['E <- 0', 'SC <- 0']"],
    "Computer.r and Computer.IR[6]": ["Computer.AC.complement()",
                                      "Computer.last_instructions = ['AC <- not AC', 'SC <- 0']"],
    "Computer.r and Computer.IR[7]": ["Computer.E = not Computer.E",
                                      "Computer.last_instructions = ['E <- not E', 'SC <- 0']"],
    "Computer.r and Computer.IR[8]": ["Computer.E = bool(Computer.AC.shift_right(int(Computer.E)))",
                                      "Computer.last_instructions = ['AC <- shr AC','AC(15) <- E','E <- AC(0)', 'SC <- 0']"],
    "Computer.r and Computer.IR[9]": ["Computer.E = bool(Computer.AC.shift_left(int(Computer.E)))",
                                      "Computer.last_instructions = ['AC <- shl AC','AC(0) <- E','E <- AC(15)', 'SC <- 0']"],
    "Computer.r and Computer.IR[10]": ["Computer.AC.increment()",
                                       "Computer.last_instructions = ['AC <- AC + 1', 'SC <- 0']"],
    "Computer.r and Computer.IR[11]": ["if (int(Computer.AC)>0): Computer.PC.increment()",
                                       "Computer.last_instructions = ['if (AC(15) = 0): PC <- PC + 1', 'SC <- 0']"],
    "Computer.r and Computer.IR[12]": ["if (int(Computer.AC)<0): Computer.PC.increment()",
                                       "Computer.last_instructions = ['if (AC(15) = 1): PC <- PC + 1', 'SC <- 0']"],
    "Computer.r and Computer.IR[13]": ["if (int(Computer.AC)==0): Computer.PC.increment()",
                                       "Computer.last_instructions = ['if (AC = 0): PC <- PC + 1', 'SC <- 0']"],
    "Computer.r and Computer.IR[14]": ["if (Computer.E==False): Computer.PC.increment()",
                                       "Computer.last_instructions = ['if (E = 0): PC <- PC + 1', 'SC <- 0']"],
    "Computer.r and Computer.IR[15]": ["Computer.S = False",
                                       "Computer.last_instructions = ['S <- 0']"],
    "Computer.p and Computer.IR[4]": ["Computer.AC.data[8:16] = Computer.INPR.data",
                                      "Computer.FGI = False",
                                      "Computer.last_instructions = ['AC(0-7) <- INPR','FGI <- 0', 'SC <- 0']"],
    "Computer.p and Computer.IR[5]": ["Computer.OUTR.data = Computer.AC.data[8:16]", "Computer.FGO = False",
                                      "Computer.last_instructions = ['OUTR <- AC(0-7)','FGO <- 0', 'SC <- 0']"],
    "Computer.p and Computer.IR[6]": ["if (Computer.FGI): Computer.PC.increment()",
                                      "Computer.last_instructions = ['if (FGI = 1): PC <- PC + 1', 'SC <- 0']"],
    "Computer.p and Computer.IR[7]": ["if (Computer.FGO): Computer.PC.increment()",
                                      "Computer.last_instructions = ['if (FGO = 1): PC <- PC + 1', 'SC <- 0']"],
    "Computer.p and Computer.IR[8]": ["Computer.IEN = True",
                                      "Computer.last_instructions = ['IEN <- 1', 'SC <- 0']"],
    "Computer.p and Computer.IR[9]": ["Computer.IEN = False",
                                      "Computer.last_instructions = ['IEN <- 0', 'SC <- 0']"],
}
