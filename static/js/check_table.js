function check_row() {
    let digit = []
    let elements = document.querySelector(".focus-row").children
    for (let i = 0; i < elements.length; i++) {
        let value = elements[i].textContent
        if (value) {
            if (!digit.includes(value)) digit.push(value)
            else return false
        }
    }
    return true
}

function check_col() {
    let digit = []
    let elements = document.querySelectorAll('.focus-col')
    for (let i = 0; i < elements.length; i++) {
        let value = elements[i].textContent
        if (value) {
            if (!digit.includes(value)) digit.push(value)
            else return false
        }
    }
    return true
}

function check_sector() {

}

function check() {
    return check_col() && check_row()
}

let table = document.getElementById('table-sudoku')
let flag_change_cell = false;
let change_cell;

let rows = 9;
let cols = 9
