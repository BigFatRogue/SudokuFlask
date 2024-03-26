from flask import Flask, render_template, request, jsonify
from SaveGetTxt import get_sudoku_from_file
from sitting import *

app = Flask(__name__)
app.config.from_object(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/get_sudoku/<quality>')
def get_sudoku(quality):
    return jsonify({'pole': get_sudoku_from_file(int(quality))})


if __name__ == '__main__':
    app.run()