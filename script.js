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
let length = 1;
let possible = ['up', 'right', 'down', 'left']
let indexs;
let currentDirection;
class Snake extends Grid {
    constructor() {
        super();
        
        this.apple = new Apple();

        this.start_game.addEventListener("click", () =>{
            this.Start_Position()
            document.body.removeChild(this.start_game)
            game = setInterval(() => this.Movment(), Math.abs((this.speed.value - 10)) * 25)
        })

        document.addEventListener("keydown", (event) => {
            if (event.code === "ArrowUp" || event.key === "w") {
                snakePos[0][2] = "up"
                indexs = 0;
            } else if (event.code === "ArrowDown" || event.key === "s") {
                snakePos[0][2] = "down"
                indexs = 2;
            } else if (event.code === "ArrowLeft" || event.key === "a") {
                snakePos[0][2] = "left"
                indexs = 3;
            } else if (event.code === "ArrowRight" || event.key === "d") {
                snakePos[0][2] = "right"
                indexs = 1;
            } else {
                console.log("should end")
                clearInterval(game)
            }
        })
        
    }

    Start_Position() {
        table = document.getElementById("table")
        let x = Math.floor(Math.random() * (this.widthInput.value)) + 1;
        let y = Math.ceil(Math.random() * (this.lengthInput.value)) + 1;
        console.log(x, y)
        try {
            table.rows[y-1].cells[x-1].className = "snake_current"
            
        } catch {
            x = -1
            y = -1
            this.Start_Position();
        }
        
       
        snakePos.push([x,y, ''])
        console.log(snakePos)
        this.apple.SpawnApple(snakePos);
        // this.table.rows[Y].cells[X].style.backgroundColor = "darkgreen";


    }

    Movment() {
        let currentX = snakePos[0][0];
        let currentY = snakePos[0][1];
        

        if (currentDirection == null) {
        } else if ( currentDirection == 'left' && snakePos[0][2] == 'right') {
            clearInterval(game)
        } else if ( currentDirection == 'right' && snakePos[0][2] == 'left') {
            clearInterval(game)
        } else if ( currentDirection == 'up' && snakePos[0][2] == 'down') {
            clearInterval(game)
        } else if ( currentDirection == 'down' && snakePos[0][2] == 'up') {
            clearInterval(game)
        } else {
            
        }
        currentDirection = snakePos[0][2];
        

        let newX = currentX;
        let newY = currentY;

        if (currentDirection === "up") newY -= 1;
        else if (currentDirection === "down") newY += 1;
        else if (currentDirection === "left") newX -= 1;
        else if (currentDirection === "right") newX += 1;

        if (currentDirection != '') {

            try {

                if (table.rows[newY - 1].cells[newX - 1].className != 'apple') {
                    let tail = snakePos.pop();
                    table.rows[tail[1] - 1].cells[tail[0] - 1].className = '';
                
                } else if(table.rows[newY - 1].cells[newX - 1].className == 'snake_current') {
                    clearInterval(game)
                } else {
                    this.apple.SpawnApple(snakePos);
                    length+=1
                }
            

                snakePos.unshift([newX, newY, currentDirection]);
            
                table.rows[newY - 1].cells[newX - 1].className = 'snake_current';
            } catch {
                clearInterval(game)
                console.log("end")
            }
            

            
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
                X = -1
                Y = -1
                this.SpawnApple(restricted);
            }
        }
        try {
            table.rows[Y-1].cells[X].className = "apple"
        } catch {

            console.log('no apple?')
        }
        
        
    }

} 

let starter = new Grid()
let starter1 = new Snake()
let starter2 = new Apple()

