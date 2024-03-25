function mousePageXY(e)
	{
	  var x = 0, y = 0;

	  if (!e) e = window.event;

	  if (e.pageX || e.pageY)
	  {
	    x = e.pageX;
	    y = e.pageY;
	  }
	  else if (e.clientX || e.clientY)
	  {
	    x = e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft) - document.documentElement.clientLeft;
	    y = e.clientY + (document.documentElement.scrollTop || document.body.scrollTop) - document.documentElement.clientTop;
	  }

	  return {"x":x, "y":y};
	}


function create_table(row, col) {
    for (let r = 0; r < row; r++) {
        let tr = document.createElement('tr')
        for (let c = 0; c < col; c++) {
            let td = document.createElement('td')
            if (c === 2 || c === 5) td.className = 'td-bold'
            else td.className = 'td-normal'
            td.textContent = "0"

            td.onmousemove = (event) => {
                if (!change_cell) {
                    td.classList.add('focus-cell')
                    tr.classList.add('focus-row')
                    for (let y = 0; y < row; y++) table.rows[y].cells[c].classList.add('focus-col')
                }

            }
            td.onmouseleave = (event) => {
                if (!change_cell) {
                    td.classList.remove('focus-cell')
                    tr.classList.remove('focus-row')
                    for (let y = 0; y < row; y++) table.rows[y].cells[c].classList.remove('focus-col')
                }
            }
            td.onclick = (event) =>{
                let popup = document.getElementById('popup')
                popup.style.visibility = 'visible'

                console.log(td.getBoundingClientRect())

                let x = td.getBoundingClientRect().x + 50
                let y = td.getBoundingClientRect().top + 50
                popup.style.left = x + 'px'
                popup.style.top = y + 'px'

                // change_cell = true
                // change_cell_address['x'] = c
                // change_cell_address['y'] = r
                // td.classList.add('change')
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
                cell.style.fontWeight = 'bold'
            }
            else {
                cell.textContent = ''
                cell.classList.add('edit')
            }
        }
    }
}

let table = document.getElementById('table-sudoku')
let change_cell = false;
let change_cell_address = {x: undefined, y: undefined};
create_table(9, 9)


fetch('get_sudoku/' + 21)
    .then(response => response.json())
    .then(data => {
        let pole = data['pole'][0]
        let pole_solve = data['pole'][1]
        fill_table(pole.length, pole.length, pole)
    })