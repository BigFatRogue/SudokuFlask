import random


path = '\\'.join(__file__.split('\\')[:-1])


def save_sudoku(sudoku: (tuple, list), solver: (tuple, list)) -> None:
    """
    :param sudoku: не решённая судоку
    :param solver: решённое судоку
    :return: None
    """
    difficulty = sum([1 for row in sudoku for cell in row if cell != 0])
    with open(f'{path}\\crossword\\my_sudoku_{difficulty}.txt', 'a') as file:
        string = f'{solver}@{sudoku}\n'
        file.write(string)


def get_sudoku_from_file(difficulty: int, number=None) -> (list, list):
    """
    :param difficulty: сложность судоку.
    :param number: номер судоку в файле
    :return: (не решённый вариант, решённый вариант)
    """

    with open(f'{path}\\crossword\\my_sudoku_{difficulty}.txt', 'r') as file:
        rows = file.readlines()

        if number is None:
            number = random.randrange(0, len(rows))
        row = rows[number]

        solver, sudoku = row.split('@')
        return eval(sudoku), eval(solver)



