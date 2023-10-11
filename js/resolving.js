let table = document.getElementById('table');
document.getElementById('solveButton').addEventListener("click", solveFromArray);//myFunction);
let arr = [[1, 0, 7, 0, 0, 0, 5, 2, 0], [0, 0, 0, 0, 4, 5, 0, 0, 0], [0, 0, 8, 3, 0, 0, 1, 0, 6], [8, 0, 0, 9, 0, 0, 0, 0, 0], [0, 0, 0, 6, 0, 7, 0, 0, 0], [6, 0, 0, 0, 0, 0, 9, 8, 0], [0, 3, 0, 0, 0, 0, 0, 0, 0], [0, 5, 0, 0, 0, 0, 4, 9, 0], [0, 0, 1, 2, 0, 4, 0, 0, 0]]
//let arr = [[0, 1, 0, 2, 0, 0, 3, 0, 0], [2, 0, 0, 5, 3, 0, 0, 0, 9], [0, 5, 0, 4, 0, 0, 0, 0, 0], [0, 6, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 7, 0, 0, 0, 6], [3, 4, 0, 0, 0, 5, 0, 0, 0], [0, 7, 1, 0, 0, 6, 0, 2, 0], [6, 0, 0, 0, 0, 1, 0, 0, 7], [0, 0, 0, 0, 0, 4, 8, 0, 0]]
//let arr = [[0, 0, 0, 0, 0, 5, 6, 0, 2], [8, 0, 0, 2, 0, 6, 7, 9, 0], [0, 2, 0, 9, 0, 0, 1, 0, 0], [0, 0, 6, 0, 2, 0, 0, 1, 0], [0, 5, 0, 0, 7, 0, 0, 8, 0], [0, 3, 0, 0, 5, 0, 2, 0, 0], [0, 0, 8, 0, 0, 2, 0, 6, 0], [0, 1, 2, 5, 0, 8, 0, 0, 7], [9, 0, 3, 1, 0, 0, 0, 0, 0]]
//let arr = [[0, 0, 3, 0, 0, 0, 9, 0, 1], [0, 0, 0, 0, 0, 7, 0, 0, 3], [0, 0, 0, 2, 0, 8, 0, 0, 5], [0, 4, 0, 5, 0, 0, 0, 0, 0], [0, 7, 0, 0, 0, 0, 6, 0, 8], [0, 0, 0, 7, 0, 0, 0, 9, 0], [0, 0, 0, 0, 0, 0, 7, 8, 4], [2, 1, 0, 0, 0, 0, 0, 0, 0], [0, 8, 0, 0, 9, 0, 0, 0, 0]]
//let arr = [[0, 0, 0, 0, 8, 0, 1, 0, 0], [0, 0, 4, 7, 0, 0, 8, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0, 0], [7, 0, 6, 4, 0, 0, 0, 0, 0], [5, 1, 0, 0, 0, 0, 0, 0, 0], [8, 0, 0, 0, 0, 9, 7, 0, 2], [0, 5, 0, 6, 0, 0, 0, 3, 0], [0, 6, 0, 0, 3, 0, 4, 0, 5], [0, 9, 0, 1, 4, 0, 0, 0, 0]]
let Cube;
let projection = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
let PreviousZeroes;
let xCollision=0, yCollision=0;
let CollisionsVariant=[];
let Maine=[];
let Iter = 0;


// for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//         table.rows[0+i].cells[3+j].setAttribute('bgColor', '#cccccc');
//         child=table.rows[0+i].cells[3+j].querySelector('input');
//         console.log(child);
//         child.setAttribute('bgColor', '#cccccc');
//         table.rows[3+i].cells[j].setAttribute('bgColor', '#cccccc');
//         table.rows[3+i].cells[6+j].setAttribute('bgColor', '#cccccc');
//         table.rows[6+i].cells[3+j].setAttribute('bgColor', '#cccccc');
//     }
// }


function PrintProjection(){
    console.log("Projecton:");
    for (let x=0; x<9; x++)
        console.log(String(projection.slice(x,x+1)));
}

function Analyse() {
    var i, j, xn, yn;
    for (x = 0; x < 9; x++) {
        for (y = 0; y < 9; y++) {
            lev = parseInt(arr[x][y]);
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
}

function InitCube(arr) {
    var r, x, y, z;
    for (r = [], x = 0; x < 9; x++) {
        for (r[x] = [], y = 0; y < 9; y++) {
            for (r[x][y] = [], z = 1; z < 10; z++) {
                if (arr[x][y] != 0) {
                    r[x][y][z] = 0;
                    if (arr[x][y] == z)
                        r[x][y][z] = 1;
                }
                else r[x][y][z] = 1;
            }
        }
    }
    return r;
}

function NewValueFinding(arr) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if ((projection[i][j] == 1) & (arr[i][j] == 0)) {
                let k = 0;
                while (Cube[i][j][k] != 1) {
                    k++;
                }
                arr[i][j] = k;
                //table.rows[i].cells[j].textContent = k;
            }
        }
    }
}

function HorisontalProjection(arr) {
    let last = 0;
    let HorProjection = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    for (let x = 0; x < 9; x++) {
        for (let z = 1; z < 10; z++) {
            for (let y = 0; y < 9; y++) {
                if (Cube[x][y][z] == 1) {
                    last = y;
                    HorProjection[x][z - 1]++;
                }
            }
            if ((HorProjection[x][z - 1] == 1) & (arr[x][last] != z)) {
                arr[x][last] = z;
                //table.rows[x].cells[last].textContent = String(z);
            }
        }
    }
}

function VerticalProjection(arr) {
    let last = 0;
    let VerProjection = [[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    for (let y = 0; y < 9; y++) {
        for (let z = 1; z < 10; z++) {
            for (let x = 0; x < 9; x++) {
                if (Cube[x][y][z] == 1) {
                    last = x;
                    VerProjection[y][z - 1]++;
                }
            }
            if ((VerProjection[y][z - 1] == 1) & (arr[last][y] != z)) {
                arr[last][y] = z;
                //table.rows[last].cells[y].textContent = String(z);
            }
        }
    }
}

function ThreeByThreeProjection(arr) {
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
                    arr[lastX][lastY] = z;
                    //table.rows[lastX].cells[lastY].textContent = String(z);
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

function HowManyZeroes(arr){
    let Zeroes=0;
    for (let x=0; x<9; x++){
        for (let y=0; y<9; y++){
            if (arr[x][y]==0)
                Zeroes++;
        }
    }
    return Zeroes;
}

function ByHorizontalExeption(arr) {
    for (let i = 0; i < 9; i++) {
        let ZeroesInRow = [];
        let PossibleValues = [];
        for (let j = 0; j < 9; j++) {
            if (arr[i][j] == 0)
                ZeroesInRow.push(j);
        }
        if ((ZeroesInRow.length == 2)||(ZeroesInRow.length == 3)) {
            if (Math.floor(ZeroesInRow[0]/3) == Math.floor(ZeroesInRow[ZeroesInRow.length-1]/3)) {
                PossibleValues.length=0;
                for (let k = 1; k < 10; k++) {
                    if (Cube[i][(ZeroesInRow[0])][k] == 1)
                        PossibleValues.push(k);
                }
            }
            let yn = 3 * Math.floor(ZeroesInRow[0]/3);
            let xn = 3 * Math.floor(i/3);
            for (let i1 = xn; i1 < (xn + 3); i1++) {
                if (i1!=i) {
                    for (let j1 = yn; j1 < (yn + 3); j1++) {
                        PossibleValues.forEach(element => {
                            Cube[i1][j1][element]=0;
                        });
                    }
                }
            }
        }
    }
}

function ByVerticalExeption(arr) {
    for (let i = 0; i < 9; i++) {
        let ZeroesInRow = [];
        let PossibleValues = [];
        for (let j = 0; j < 9; j++) {
            if (arr[j][i] == 0)
                ZeroesInRow.push(j);
        }
        if ((ZeroesInRow.length == 2)||(ZeroesInRow.length == 3)) {
            if (Math.floor(ZeroesInRow[0]/3) == Math.floor(ZeroesInRow[ZeroesInRow.length-1]/3)) {
                PossibleValues.length=0;
                for (let k = 1; k < 10; k++) {
                    if (Cube[(ZeroesInRow[0])][i][k] == 1)
                        PossibleValues.push(k);
                }
            }
            let yn = 3 * Math.floor(ZeroesInRow[0]/3);
            let xn = 3 * Math.floor(i/3);
            for (let i1 = xn; i1 < (xn + 3); i1++) {
                if (i1!=i) {
                    for (let j1 = yn; j1 < (yn + 3); j1++) {
                        PossibleValues.forEach(element => {
                            Cube[j1][i1][element]=0;
                        });
                    }
                }
            }
        }
    }
}

function FindFirstCollision(array){
    let CollisionsNumber=9;
    for (let x=xCollision; x<9; x++){
        for (let y=yCollision; y<9; y++){
            if ((projection[x][y]>1)&&(projection[x][y]<CollisionsNumber)){
                CollisionsNumber=projection[x][y];
                xCollision=x;
                yCollision=y;
            }    
        }
    }
    let i=0;
    for (let x=1; x<10; x++){     
        if (Cube[xCollision][yCollision][x]==1){
            CollisionsVariant[i]=x;
            i++;
        }
    }
    console.log("x - ", xCollision, "y - ", yCollision,"N - ", CollisionsNumber,);
    console.log(Cube[xCollision][yCollision]);
}

function Work(arr){
    do {
        PreviousZeroes = HowManyZeroes(arr);//CurrentZeroes;
        Cube = InitCube(arr);
        Analyse();
        ByHorizontalExeption(arr);
        ByVerticalExeption(arr);
        CalculateProjection();
        HorisontalProjection(arr);
        VerticalProjection(arr);
        ThreeByThreeProjection(arr);
        NewValueFinding(arr);
        CurrentZeroes = HowManyZeroes(arr);
        Iter++;
        //PrintProjection();
    }
    while (PreviousZeroes != CurrentZeroes);
}

function MyCopy (arr){
    let arrCopy=[[0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0]];;
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            arrCopy[x][y] = arr[x][y];
        }
    }
    return arrCopy
}

function Show(){
    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (arr[x][y]!=0)
            table.rows[x].cells[y].textContent = arr[x][y];
        }
    }
}

function ReadFromTable(){
   for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // delete inputs from table
            parent = table.rows[i].cells[j];
            child = parent.querySelector('input');
            if (child.value!=""){
                arr[i][j]=parseInt(child.value);
                
                table.rows[i].cells[j].textContent = arr[i][j];
                table.rows[i].cells[j].style.color = "blue";
            } 
            child.remove();
        }
    } 
}

function solveFromArray() { 
    //ReadFromTable();
    Work(arr);
    Show();
    FindFirstCollision(arr);
    // console.log("Iterations - ", Iter);
    // console.log("To be found - ", CurrentZeroes);
    // console.log("Conflicts - ", HowManyZeroes(projection));
    // console.log(CollisionsVariant);

    for (let e = 0; e < 4; e++) {
        FindFirstCollision(arr);
        console.log("Iterations - ", Iter);
        console.log("To be found - ", CurrentZeroes);
        console.log("Conflicts - ", HowManyZeroes(projection));
        console.log(CollisionsVariant);
        let ConflictsMap = [];
        let arr1 = MyCopy(arr); //Reserve copy
        for (let i = 0; i < CollisionsVariant.length; i++) {
            arr = MyCopy(arr1);
            arr[xCollision][yCollision] = CollisionsVariant[i];
            Work(arr);
            ConflictsMap[i] = HowManyZeroes(projection);
            console.log(i, " Conflicts - ", HowManyZeroes(projection));
        }
        console.log("ConflictsMap- ", ConflictsMap);
        arr = MyCopy(arr1);
        if (ConflictsMap.filter(item => item === 0).length==1) {
            arr[xCollision][yCollision] = CollisionsVariant[ConflictsMap.indexOf(0)];
        }
        Work(arr);
        Show();
        console.log(arr);
        if (yCollision<8) 
            yCollision++;
        else{
            yCollision=0;
            xCollision++;
        }
        if (xCollision>8) {
            yCollision=0;
            xCollision=0;
        }
    }
}


