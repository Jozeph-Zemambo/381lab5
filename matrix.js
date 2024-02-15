function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
}

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        } 
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; 
    let table = document.createElement('table');

    for (let i = 0; i < dataArray.length; i++) {
        row = dataArray[i]
        let tr = document.createElement('tr');
        for (let j = 0; j < dataArray[i].length; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            span.innerHTML = row[j];
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    if (operation === 'add'){ 
        result = addMatrices(matrix1, matrix2);
        if (result !== -1){
            showResult2D("Summed Matrix", "matrix3", result);
        }
     }

    if (operation === 'subtract'){ 
        result = subtractMatrices(matrix1, matrix2);
        if (result !== -1){
        showResult2D("Subtracted Matrix", "matrix3", result);
        }
     }

    if (operation === 'multiply'){ 
        result = multiplyMatrices(matrix1, matrix2);
        if (result !== -1){
        showResult2D("Multiplied Matrix", "matrix3", result);
        }
    }
        

}

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


function addMatrices(matrix1, matrix2){

    if(matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length){
        console.error("Matrix are incompatible");
        return -1;
    }
    else{
    let added_matrix = [];

        for (let i = 0; i < matrix1.length; i++) {
            let rowData = [];
            let row1 = matrix1[i];
            let row2 = matrix2[i];
            for (let j = 0; j < matrix1[0].length; j++) {
                let element1 = row1[j];
                let element2 = row2[j];
                let value = element1 + element2;
                rowData.push(value);
                }
            added_matrix.push(rowData);
    }
    console.log(added_matrix);
    return added_matrix;
}
    }

const subtractMatrices = function (matrix1, matrix2) { 
    if(matrix1.length !== matrix2.length || matrix1[0].length !== matrix2[0].length){
        console.error("Matrix are incompatible");
        return -1;
    }
    else{
    let sub_matrix = [];

        for (let i = 0; i < matrix1.length; i++) {
            let rowData = [];
            let row1 = matrix1[i];
            let row2 = matrix2[i];
            for (let j = 0; j < matrix1[0].length; j++) {
                let element1 = row1[j];
                let element2 = row2[j];
                let value = element1 - element2;
                rowData.push(value);
                }
            sub_matrix.push(rowData);
    }
    console.log(sub_matrix);
    return sub_matrix;
}
};
const multiplyMatrices = (matrix1, matrix2) => { 
    if(matrix1[0].length !== matrix2.length){
        console.error("Matrix are incompatible");
        return -1;
    }
    else{
    let mul_matrix = [];
    for (let i = 0; i < matrix1.length; i++) {
        let rowData = [];
        let row = matrix1[i].slice();
        for (let j = 0; j < matrix2[i].length; j++) {
            let col = matrix2.map(row => row[j])
            let mul_arr =  row.map((element, index) => element * col[index]);
            let sum = mul_arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
            rowData.push(sum);
            }
        mul_matrix.push(rowData);
    }

    console.log(mul_matrix);
    return mul_matrix;

}
};
