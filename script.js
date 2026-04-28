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
let direction;
let snakePos = []
class Snake extends Grid {
    constructor() {
        super();
        this.length = 1;
        this.apple = new Apple();

        this.start_game.addEventListener("click", () =>{
            // this.start_game.style.display = "none";
            this.Start_Position()
            this.game = setInterval(this.Movment, 1000)
        })
        
    }

    Start_Position() {
        this.table = document.getElementById("table")
        let x = Math.floor(Math.random() * (this.widthInput.value));
        let y = Math.ceil(Math.random() * (this.lengthInput.value));

        this.table.rows[y-1].cells[x-1].className = "snake_current"
       
        snakePos.push([x,y])
        this.apple.SpawnApple(snakePos);
        // this.table.rows[Y].cells[X].style.backgroundColor = "darkgreen";


    }

    Movment() {
        document.addEventListener("keydown", (event) => {
            console.log('1235')
            if (event.code === "ArrowUp" || event.key === "w") {
                console.log("w clicked")
                direction = "up"
                console.log(direction)
            } else if (event.code === "ArrowDown" || event.key === "s") {
                direction = "down"
            } else if (event.code === "ArrowLeft" || event.key === "a") {
                direction = "left"
            } else if (event.code === "ArrowRight" || event.key === "d") {
                direction = "right"
            } else {
                console.log("should end")
                clearInterval(this.game)
            }
        })
        console.log('123')
        console.log(direction)
        if (direction == "up") {
            console.log("inside if")
            for (let i = 0; i < snakePos.length; i++) {
                console.log('inn')
                this.table.rows[snakePos[i][1]-1 + 1].cells[snakePos[i][0]-1].className = 'snake_current';
                
                this.table.rows[snakePos[i][1]-1 -1].cells[snakePos[i][0]-1].className = '';
                snakePos[i] = [snakePos[i][0]-1, snakePos[i][1]-1] 
            }
        }
    }
} 
class Apple extends Grid {
    constructor() {
        super();
    }

    SpawnApple(restricted) {
        console.log('in')
        this.table = document.getElementById("table")
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
        console.log(X, Y)
        try {
            this.table.rows[Y-1].cells[X-1].className = "apple"
        } catch {        }
        
        
    }

} 

let starter = new Grid()
let starter1 = new Snake()
let starter2 = new Apple()

