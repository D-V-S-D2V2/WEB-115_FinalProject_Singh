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
        table = document.getElementById("table");
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
let direction;
let game;
let table;
let snakePos = []
let turn;
class Snake extends Grid {
    constructor() {
        super();
        this.length = 1;
        this.apple = new Apple();

        this.start_game.addEventListener("click", () =>{
            // this.start_game.style.display = "none";
            this.Start_Position()
            game = setInterval(() => this.Movment(), 1000)
        })

        document.addEventListener("keydown", (event) => {
            console.log('1235')
            if (event.code === "ArrowUp" || event.key === "w") {
                console.log("w clicked")
                snakePos[0][2] = "up"
            } else if (event.code === "ArrowDown" || event.key === "s") {
                snakePos[0][2] = "down"
            } else if (event.code === "ArrowLeft" || event.key === "a") {
                snakePos[0][2] = "left"
            } else if (event.code === "ArrowRight" || event.key === "d") {
                snakePos[0][2] = "right"
            } else {
                console.log("should end")
                clearInterval(game)
            }
        })
        
    }

    Start_Position() {
        table = document.getElementById("table")
        let x = Math.floor(Math.random() * (this.widthInput.value));
        let y = Math.ceil(Math.random() * (this.lengthInput.value));

        table.rows[y-1].cells[x-1].className = "snake_current"
       
        snakePos.push([x,y, ''])
        console.log(snakePos)
        this.apple.SpawnApple(snakePos);
        // this.table.rows[Y].cells[X].style.backgroundColor = "darkgreen";


    }

    Movment() {
        console.log(snakePos)
        if (snakePos[0][2] == "down") {
            table.rows[snakePos[0][1] - 1].cells[snakePos[0][0] - 1].className = 'snake_current';
            // table.rows[snakePos[i][1] - 2].cells[snakePos[i][0] - 1].className = '';

            snakePos.unshift([snakePos[0][0], snakePos[0][1] + 1, "down"])
        }
        if (snakePos[0][2] == "up") {
            table.rows[snakePos[0][1] - 1].cells[snakePos[0][0] - 1].className = 'snake_current';
            // table.rows[snakePos[i][1]].cells[snakePos[i][0] - 1].className = '';

            snakePos.unshift([snakePos[0][0], snakePos[0][1] - 1, "up"])
        }
        if (snakePos[0][2] == "right") {
            table.rows[snakePos[0][1] - 1].cells[snakePos[0][0]].className = 'snake_current';
            // table.rows[snakePos[i][1] - 1].cells[snakePos[i][0] - 1].className = '';

            snakePos.unshift([snakePos[0][0] + 1, snakePos[0][1], "right"])
        }
        if (snakePos[0][2] == "left") {
            table.rows[snakePos[0][1] - 1].cells[snakePos[0][0] - 2].className = 'snake_current';
                // table.rows[snakePos[i][1] - 1].cells[snakePos[i][0] - 2].textContent= "current"

                // table.rows[snakePos[i][1] - 1].cells[snakePos[i][0] - 1].className = '';
                // table.rows[snakePos[i][1] - 1].cells[snakePos[i][0] - 1].textContent = "here";

            snakePos.unshift([snakePos[0][0] - 1, snakePos[0][1], "left"])
        }


        // HIDING 
        if (snakePos[snakePos.length-1][2] == "down") {
            table.rows[snakePos[snakePos.length-1][1] - 2].cells[snakePos[snakePos.length-1][0] - 1].className = '';
            snakePos.pop();
        }
        if (snakePos[snakePos.length-1][2] == "up") {
            table.rows[snakePos[snakePos.length-1][1]].cells[snakePos[snakePos.length-1][0] - 1].className = '';
            snakePos.pop();
        }
        if (snakePos[snakePos.length-1][2] == "right") {
            table.rows[snakePos[snakePos.length-1][1] - 1].cells[snakePos[snakePos.length-1][0] - 1].className = '';
            snakePos.pop();

        }
        if (snakePos[snakePos.length-1][2] == "left") {
            table.rows[snakePos[snakePos.length-1][1] - 1].cells[snakePos[snakePos.length-1][0] - 1].className = '';
            snakePos.pop();

        }
    }
    
} 
class Apple extends Grid {
    constructor() {
        super();
    }

    SpawnApple(restricted) {
        console.log('Apple')
        table = document.getElementById("table")
        let X = Math.floor(Math.random() * (this.widthInput.value));
        let Y = Math.ceil(Math.random() * (this.lengthInput.value));
        for (let i = 0; i < restricted.length; i++) {
            if (X == restricted[i][0] && Y == restricted[i][1]){
                console.log("x:" + X + " y:" + Y + " it was the same")
                X = -1
                Y = -1
                this.SpawnApple(restricted);
            }
        }
        try {
            table.rows[Y-1].cells[X-1].className = "apple"
        } catch {        }
        
        
    }

} 

let starter = new Grid()
let starter1 = new Snake()
let starter2 = new Apple()

