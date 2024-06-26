function digit_table(row, col) {
    let mini_table = document.createElement('table')
    let count = 1
    for (let r = 0; r < row; r++) {
        let tr = document.createElement('tr')
        for (let c = 0; c < col; c++) {
            let td = document.createElement('td')
            td.textContent = count
            count += 1
            tr.appendChild(td)
        }
        mini_table.appendChild(tr)
    }
    return mini_table
}
function create_table(row, col) {
    for (let r = 0; r < row; r++) {
        let tr = document.createElement('tr')
        for (let c = 0; c < col; c++) {
            // let td = document.createElement('td')
            if (c === 2 || c === 5) td.className = 'td-bold'
            else td.className = 'td-normal'
            td.textContent = "0"

            td.onmousemove = (event) => {
                td.appendChild(digit_table())
                document.body.style.overflow = 'hidden'
                if (!flag_change_cell) {
                    td.classList.add('focus-cell')
                    tr.classList.add('focus-row')
                    for (let y = 0; y < row; y++) table.rows[y].cells[c].classList.add('focus-col')
                }
            }
            td.onmouseleave = (event) => {
                document.body.style.overflow = ''
                if (!flag_change_cell) {
                    td.classList.remove('focus-cell')
                    tr.classList.remove('focus-row')
                    for (let y = 0; y < row; y++) table.rows[y].cells[c].classList.remove('focus-col')
                }
            }
            td.onwheel = (event) => {
                document.body.style.overflow = 'hidden'
                if (!td.classList.value.includes('no-edit') && (!flag_change_cell || (flag_change_cell && change_cell ===td))) {
                    if (event.deltaY > 0) {
                        if (td.textContent > 1) {
                            td.textContent = Number(td.textContent) - 1
                        }
                        else if (td.textContent == 1) {
                            td.textContent = ''
                        }
                    }
                    else if (event.deltaY < 0 && td.textContent < 9) {
                    td.textContent = Number(td.textContent) + 1
                    }
                }
                if (!check()) td.classList.add('cell-mistake')
                else td.classList.remove('cell-mistake')

                console.log(Math.floor(r / 3) *3 + Math.floor(c / 3))

            }
            td.onclick = (event) =>{
                if (!flag_change_cell) {
                    flag_change_cell = true
                    change_cell = td
                    change_cell.classList.add('change')
                }
                else {
                    change_cell.classList.remove('change')
                    flag_change_cell = false
                    clear_color()
                    change_cell = undefined
                }
            }

            tr.appendChild(td)
        }
        if (r === 2 || r === 5) tr.className = 'tr-bold'
        else tr.className = 'tr-normal'
        table.appendChild(tr)
    }
}

function fill_table(row, col, pole) {
    for (let r = 0; r < row; r++ ) {
        for (let c = 0; c < col; c++ ) {
            let cell = table.rows[r].cells[c]
            let value = pole[r][c]

            if (value !== 0) {
                cell.textContent = pole[r][c]
                cell.classList.add('no-edit')
            }
            else {
                cell.textContent = ''
                cell.classList.add('edit')
            }
        }
    }
}

function clear_color() {
    change_cell.classList.remove('change')
    document.querySelectorAll('.focus-col').forEach((item) => {
        item.classList.remove('focus-col')
    })
    document.querySelectorAll('.focus-row').forEach((item) => {
        item.classList.remove('focus-row')
    })
}

document.body.addEventListener('scroll', (event) => {
    document.body.style.overflow = (document.body.style.overflow === 'hidden') ? 'visibly' : 'hidden'
})
// window.addEventListener('scroll', e => {
//   window.scrollTo({top: 1000})
// })

window.addEventListener('keydown', e => {
    if (change_cell) {
        if (e.key === 'Escape' && change_cell) {
            flag_change_cell = false
            clear_color()
        }
        if (e.key === 'Backspace') {
            change_cell.textContent = ''
        }
        if ([1, 2, 3, 4, 5, 6, 7, 8, 9].includes(Number(e.key))) {
        change_cell.textContent = e.key
        }
    }
})

create_table(rows, cols)
document.querySelector('.content').style.marginLeft = window.innerWidth/2 - 450/2 + 'px'
fetch('get_sudoku/' + 21)
    .then(response => response.json())
    .then(data => {
        let pole = data['pole'][0]
        let pole_solve = data['pole'][1]
        fill_table(pole.length, pole.length, pole)
    })