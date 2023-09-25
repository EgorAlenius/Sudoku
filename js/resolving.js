let table = document.getElementById('table');
document.getElementById('solveButton').addEventListener("click", solveFromArray);//myFunction);
let arr = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]]
//let arr1 = [[0, 0, 0, 0, 0, 5, 6, 0, 2], [8, 0, 0, 2, 0, 6, 7, 9, 0], [0, 2, 0, 9, 0, 0, 1, 0, 0], [0, 0, 6, 0, 2, 0, 0, 1, 0], [0, 5, 0, 0, 7, 0, 0, 8, 0], [0, 3, 0, 0, 5, 0, 2, 0, 0], [0, 0, 8, 0, 0, 2, 0, 6, 0], [0, 1, 2, 5, 0, 8, 0, 0, 7], [9, 0, 3, 1, 0, 0, 0, 0, 0]]
let arr1 = [[0, 0, 3, 0, 0, 0, 9, 0, 1], [0, 0, 0, 0, 0, 7, 0, 0, 3], [0, 0, 0, 2, 0, 8, 0, 0, 5], [0, 4, 0, 5, 0, 0, 0, 0, 0], [0, 7, 0, 0, 0, 0, 6, 0, 8], [0, 0, 0, 7, 0, 0, 0, 9, 0], [0, 0, 0, 0, 0, 0, 7, 8, 4], [2, 1, 0, 0, 0, 0, 0, 0, 0], [0, 8, 0, 0, 9, 0, 0, 0, 0]]
let Cube;// = InitCube(9, 9, 10, 1);
let projection = arr;
let PreviousZeroes;

function Analyse() {
    var i, j, xn, yn;
    for (x = 0; x < 9; x++) {
        for (y = 0; y < 9; y++) {
            lev = parseInt(arr1[x][y]);
            if (lev > 0) { // vertical and horizontal lines to 0
                for (z = 0; z < 9; z++) {
                    Cube[z][y][lev] = 0;
                    Cube[x][z][lev] = 0;
                }
                // 3x3 cleaning
                xn = 3 * Math.floor(x / 3);
                yn = 3 * Math.floor(y / 3);
                for (i = xn; i < (xn + 3); i++) {
                    for (j = yn; j < (yn + 3); j++) {
                        Cube[i][j][lev] = 0;
                    }
                }
                Cube[x][y][lev] = 1;
            }
        }
    }
    //console.log(Cube);
}

function CalculateProjection() {
    for (x = 0; x < 9; x++)
        for (y = 0; y < 9; y++) {
            projection[x][y] = 0; // Intialization of projection array
            for (z = 1; z < 10; z++) {
                if (Cube[x][y][z] == 1) {
                    projection[x][y]++;
                }
            }
        }
    // console.log('Projection');
    // console.log(projection);
}


function InitCube(xmax, ymax, zmax, def) {
    var r, x, y, z;
    for (r = [], x = 0; x < xmax; x++) {
        for (r[x] = [], y = 0; y < ymax; y++) {
            for (r[x][y] = [], z = 1; z < zmax; z++) {
                if (arr1[x][y] != 0) {
                    r[x][y][z] = 0;
                    if (arr1[x][y] == z)
                        r[x][y][z] = 1;
                }
                else r[x][y][z] = def;
            }
        }
    }
    return r;
}


// function myFunction() {
//     console.log("Solve is pressed");
//     for (let i = 0; i < 9; i++) {
//         for (let j = 0; j < 9; j++) {

//             parent = table.rows[i].cells[j];
//             child = parent.querySelector('input');

//             let znach=child.value;
//             arr[i][j]=znach;
//             //console.log(znach);
//             child.remove();
//             table.rows[i].cells[j].textContent=arr[i][j];
//         }
//     }    
//     console.log( Object.values(table.rows[0].cells[0]));
// }

function NewValueFinding() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if ((projection[i][j] == 1) & (arr1[i][j] == 0)) {
                let k = 0;
                while (Cube[i][j][k] != 1) {
                    k++;
                }
                arr1[i][j] = k;
                table.rows[i].cells[j].textContent = k;
                //table.rows[i].cells[j].style.color = "gray";
                //console.log(k);
            }
        }
    }
}

function HorisontalProjection() {
    let last = 0;
    let HorProjection = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    //console.log("Horizontal");
    for (let x = 0; x < 9; x++) {
        for (let z = 1; z < 10; z++) {
            for (let y = 0; y < 9; y++) {
                if (Cube[x][y][z] == 1) {
                    last = y;
                    HorProjection[x][z - 1]++;
                }
            }
            if ((HorProjection[x][z - 1] == 1) & (arr1[x][last] != z)) {
                arr1[x][last] = z;
                //console.log(x, last, z);
                table.rows[x].cells[last].textContent = String(z);
            }
        }
    }
    //console.log(HorProjection);
    //console.log(arr1);
}

function VerticalProjection() {
    let last = 0;
    let VerProjection = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    //console.log("Vertical");
    for (let y = 0; y < 9; y++) {
        for (let z = 1; z < 10; z++) {
            for (let x = 0; x < 9; x++) {
                if (Cube[x][y][z] == 1) {
                    last = x;
                    VerProjection[y][z - 1]++;
                }
            }
            //console.log(last, y, VerProjection[y][z - 1], arr1[last][y]);
            if ((VerProjection[y][z - 1] == 1) & (arr1[last][y] != z)) {
                arr1[last][y] = z;
                //console.log(last, y, z);
                table.rows[last].cells[y].textContent = String(z);
            }
        }
    }
    //console.log(VerProjection);
    // console.log(arr1);
}

function ThreeByThreeProjection() {
    let summ, lastX, lastY;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let z = 1; z < 10; z++) {
                summ=0;
                for (let x=0; x<3; x++){
                    for (let y=0; y<3; y++){
                        if (Cube[i*3+x][j*3+y][z]==1){
                            lastX=i*3+x;
                            lastY=j*3+y;
                        }
                        summ+=Cube[i*3+x][j*3+y][z];
                    }
                }
                if(summ==1){
                    arr1[lastX][lastY] = z;
                    table.rows[lastX].cells[lastY].textContent = String(z);
                } 
            }
        }
    }
}

function PrintCubeSlise(taso) {
    let mySlice = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            mySlice[x][y] = Cube[x][y][taso];
        }
    }
    console.log(mySlice);
}

function CubeClear(){
    for (let x=0; x<9; x++){
        for (let y=0; y<9; y++){
            for(let z=0; z<10; z++){
                Cube[x][y][x]=0;
            }
        }
    }
}

function HowManyZeroes(){
    let Zeroes=0;
    for (let x=0; x<9; x++){
        for (let y=0; y<9; y++){
            if (arr1[x][y]==0)
                Zeroes++;
        }
    }
    return Zeroes;
}

function solveFromArray() {
    console.log("Solve is pressed");
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            // delete inputs from table
            parent = table.rows[i].cells[j];
            child = parent.querySelector('input');
            if (child!=null)
                child.remove();

            // read numbers from array and write into table
            if (arr1[i][j] > 0) {
                table.rows[i].cells[j].textContent = arr1[i][j];
                table.rows[i].cells[j].style.color = "blue";
            }
        }
    }
    CurrentZeroes = HowManyZeroes();
    let Iter = 0;
    do {
        PreviousZeroes = CurrentZeroes;
        Cube = InitCube(9, 9, 10, 1);
        Analyse();
        CalculateProjection();
        HorisontalProjection();
        VerticalProjection();
        ThreeByThreeProjection();
        NewValueFinding();
        CurrentZeroes = HowManyZeroes();
        Iter++;
    }
    while (PreviousZeroes != CurrentZeroes);
    console.log(Iter);
}


