function check_row() {
    // let digit = []
    // let count = 0
    // document.querySelectorAll('.focus-row').forEach((item) => {
    //     let value = item.textContent
    //     console.log(count, value)
    //     if (!digit.includes(value)) digit.push(item.textContent)
    //     else return false
    //     count += 1
    // })
    // return true
}

function check_col() {
    let digit = []
    let flag = true
    document.querySelectorAll('.focus-col').forEach((item) => {
        let value = item.textContent
        if (value) {
            if (!digit.includes(value)) digit.push(item.textContent)
            else flag = false
        }
    })
    return flag
}

function check_sector(x, y) {

}

function check_table() {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let cell = table.rows[y].cells[x]
            console.log(cell.textContent)
        }
    }
}

let table = document.getElementById('table-sudoku')
let flag_change_cell = false;
let change_cell;

let rows = 9;
let cols = 9
