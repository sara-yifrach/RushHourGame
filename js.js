const mat = [
    [true, false, false, true, true, true],
    [true, false, false, true, false, true],
    [true, true, false, true, true, true],
    [true, true, true, false, true, true],
    [false, false, true, false, true, true],
    [true, true, true, true, true, false]
];

class Car {
    constructor(id, boardTop, boardLeft, along, across, sumSquars, color) {
        this.id = id;
        this.boardTop = boardTop;
        this.boardLeft = boardLeft;
        this.along = along;
        this.across = across;
        this.sumSquars = sumSquars;
        this.color = color;
    }

}

class redCar extends Car {

}

class board {
    constructor(arrayCar, sizeBox, sumBox, endPoint) {
        this.arrayCar = arrayCar
        this.sizeBox = sizeBox
        this.sumBox = sumBox
        this.endPoint = endPoint

    }
    PrintBoardStatus = () => {


    }

    getCarById = (selectedId) => {
        let selectedCar = carArray.find(i => i.id == selectedId);
        return selectedCar;
    }


    placeIsAvalaible = (i, j) => {
        if (i >= 0 && i < 6 && j >= 0 && j < 6) {
            if (!mat[i][j])
                return true;
        }
        return false;
    }

}

const checkUsers = () => {
    let flag = false;
    const password = document.getElementById("password").value
    const name = document.getElementById("name").value

    fetch("users.json")
        .then(res => {
            return res.json();
        })
        .then(resJson => {
            users = resJson.users;

            console.log(users);

            users.forEach(u => {
                if (name == u.name && u.password == password) {
                    flag = true;
                }
            });
            if (!flag)
                alert("TRY AGAIN!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

            else
                window.location.href = "board.html";

        })
}
let carArray
let newBoard
let newBoardObj;

startGame = async () => {
    let res = await fetch("car.json");
    let data = await res.json()
    if (data) {
        carArray = data.board.arrayCar;
        newArrayCar = [];
        carArray.forEach(car => {
            if (car.id != "x") {
                let newRedCar = new Car(car.id, car.boardTop, car.boardLeft, car.along, car.across, car.sumSquars, car.color)
                newArrayCar.push(newRedCar)
            }
            else {
                let newCar = new redCar(car.id, car.boardTop, car.boardLeft, car.along, car.across, car.sumSquars, car.color)
                newArrayCar.push(newCar)
            }
        })
        newBoardObj = new board(
            newArrayCar,
            data.board.sumSquarsOfBoard,
            data.board.sizeOfSqr,
            data.board.exitPoint
        )
        printCar(newArrayCar);

    }
    else alert("error")
}

printCar = (newArrayCar) => {
    newBoard = document.getElementById("board")
    newArrayCar.forEach(i => {
        let car = document.createElement("button");
        car.style.backgroundColor = i.color;
        car.style.position = "absolute";
        car.classList.add("car")
        car.setAttribute("id", i.id)
        car.classList.add("class")
        car.addEventListener("click", () => { setSelected(car) })
        if (i.along == true) {
            car.style.height = `${i.sumSquars * 100}px`
            car.style.width = `${100}px`;
        }
        else {
            car.style.height = `${100}px`
            car.style.width = `${i.sumSquars * 100}px`
        }
        car.style.marginTop = `${i.boardTop}px`;
        car.style.marginLeft = `${i.boardLeft}px`;
        car.id = i.id;
        newBoard.appendChild(car);

    })
}

setSelected = (car) => {
    let cars = document.getElementsByClassName("class")
    for (let i = 0; i < cars.length; i++) {
        cars[i].classList.remove("carSelected")
    }
    car.classList.add("carSelected")
    car.addEventListener("keydown", function (event) {

        if (event.code === "ArrowDown") {
            moveDown();
        } else if (event.code === "ArrowUp") {
            moveUp();
        } else if (event.code === "ArrowLeft") {
            moveLeft();
        } else if (event.code === "ArrowRight") {
            moveRight();
        }
    }, true)

}

const moveUp = () => {
    let selectedCar = document.querySelector(".carSelected");
    var carJS = newBoardObj.getCarById(selectedCar.id);
    var top = parseInt(selectedCar.style.marginTop, 10) / 100;
    var left = parseInt(selectedCar.style.marginLeft, 10) / 100;
    var placeIsAvalaible = newBoardObj.placeIsAvalaible(top - 1, left);
    if (placeIsAvalaible && carJS.along) {
        selectedCar.style.marginTop = parseInt(selectedCar.style.marginTop, 10) - 100 + 'px';
        mat[top + carJS.sumSquars - 1][left] = false;
        mat[top - 1][left] = true;
        carJS.marginTop = top * 100 - 100 + 'px';
    }
}
moveDown = () => {

    let selectedCar = document.querySelector(".carSelected");
    let carJS = newBoardObj.getCarById(selectedCar.id);
    let down = parseInt(selectedCar.style.marginTop, 10) / 100;
    let left = parseInt(selectedCar.style.marginLeft, 10) / 100;
    let placeIsAvalaible = newBoardObj.placeIsAvalaible(down + carJS.sumSquars, left);
    if (placeIsAvalaible && carJS.along) {
        selectedCar.style.marginTop = parseInt(selectedCar.style.marginTop, 10) + 100 + 'px';
        mat[down][left] = false;
        mat[down + carJS.sumSquars][left] = true;
        carJS.marginTop = down * 100 + 100 + 'px';


    }
}
moveLeft = () => {
    let selectedCar = document.querySelector(".carSelected");
    let carJS = newBoardObj.getCarById(selectedCar.id);
    let top = parseInt(selectedCar.style.marginTop, 10) / 100;
    let left = parseInt(selectedCar.style.marginLeft, 10) / 100;
    let placeIsAvalaible = newBoardObj.placeIsAvalaible(top, left - 1);
    if (placeIsAvalaible && carJS.across) {
        selectedCar.style.marginLeft = parseInt(selectedCar.style.marginLeft, 10) - 100 + 'px';
        mat[top][left + carJS.sumSquars - 1] = false;
        mat[top][left - 1] = true;
        carJS.marginLeft = left * 100 - 100 + 'px';


    }

}
moveRight = () => {
    let selectedCar = document.querySelector(".carSelected");
    let carJS = newBoardObj.getCarById(selectedCar.id);
    let top = parseInt(selectedCar.style.marginTop, 10) / 100;
    let right = parseInt(selectedCar.style.marginLeft, 10) / 100;
    let placeIsAvalaible = newBoardObj.placeIsAvalaible(top, right + carJS.sumSquars);
    if (placeIsAvalaible && carJS.across) {
        selectedCar.style.marginLeft = parseInt(selectedCar.style.marginLeft, 10) + 100 + 'px';
        mat[top][right] = false;
        mat[top][right + carJS.sumSquars] = true;
        carJS.marginLeft = right * 100 + 100 + 'px';

    }
    if (selectedCar.id == "x")
        checkWin(parseInt(right * 100 + 100));
}

const checkWin = (a) => {
    if (a == 500)
        window.location.href = "win.html";
}
