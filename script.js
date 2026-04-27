class Grid {
    constructor() {
        this.widthInput = document.getElementById("grid_width");
        this.lengthInput = document.getElementById("grid_length");
        this.speed = document.getElementById("snake_speed");
        this.generateBtn = document.getElementById("generate_btn");
        this.start_game = document.getElementById("start_game");

        this.generateBtn.addEventListener("click", () => {
            this.generateGrid();
        });

    }

    columnCount() {
        console.log("in")
        let table = document.getElementById("table")
        let columnCounts = 0;
        let firstRow = table.rows[0]
        for (let cell of firstRow.cells) {
            columnCounts++;
        }
        return columnCounts

    }

    checkVisited(x, y) {
        for (let i = 0; i < this.visited.length; i++) {
            if (this.visited[i][0] === x && this.visited[i][1] === y) {
                return true;
            }
        }
        return false;
    }

    generateGrid() {        
        this.createTable();
        this.table = document.getElementById("table");
    }

    createTable() {
        try {
            document.getElementById("table").remove();
        } catch (error) {
            console.log("No existing table to remove.");
        }

        let table = document.createElement("table");
        table.id = "table";

        for (let i = 0; i < this.lengthInput.value; i++) {
            let row = document.createElement("tr");
            
            for (let j = 0; j < this.widthInput.value; j++) {
                let cell = document.createElement("td");
                row.appendChild(cell);
            }
            table.appendChild(row);
        }

        document.body.appendChild(table);
    }



}

class Snake extends Grid {
    constructor() {
        super();
        console.log(this.lengthInput)
        console.log("smth123")
        this.start_game.addEventListener("click", () =>{
            this.Start_Position()
        })
        
    }

    Start_Position() {
        this.table = document.getElementById("table")
        let X = Math.floor(Math.random() * (this.widthInput.value));
        console.log(X)
        let Y = Math.floor(Math.random() * (this.lengthInput.value));
        console.log(Y)
        this.table.rows[Y].cells[X].className = "snake_current"
        console.log(this.table.rows[Y].cells[X])
        console.log(this.table.rows[Y].cells[X].class)
        // this.table.rows[Y].cells[X].style.backgroundColor = "darkgreen";
        console.log(this.table.rows[Y].cells[X])


    }
} 
class Apple extends Grid {
    constructor() {
        super();
        console.log("abs")
        console.log(this.lengthInput)
    }

} 

let starter = new Grid()
let starter1 = new Snake()
let starter2 = new Apple()

