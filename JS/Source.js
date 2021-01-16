var lcs, steps, stepId, intervalId, resultPath = new Array(), redPath = new Array();
var table = document.getElementById("table");


function getValue(){
	var str1 = document.getElementById('inputA').value;
	var str2 = document.getElementById('inputB').value;
	LCS(str1, str2);
}


function selectValue(){
	let opt = document.getElementById('testList').value;
	if (!opt){
		document.getElementById('inputA').value = "";
		document.getElementById('inputB').value = "";
	}
	else if (opt == "Test #1"){
		document.getElementById('inputA').value = "ALGORITHM";
		document.getElementById('inputB').value = "AGRONOMIST";
	}
	else if (opt == "Test #2"){
		document.getElementById('inputA').value = "alahomora";
		document.getElementById('inputB').value = "abracadabra";
	}
	else if (opt == "Test #2"){
		document.getElementById('inputA').value = "ALIANS";
		document.getElementById('inputB').value = "KELVINS";
	}
	else if (opt == "Test #3"){
		document.getElementById('inputA').value = "4973528796";
		document.getElementById('inputB').value = "3280235860";
	}
	else if (opt == "Test #4"){
		document.getElementById('inputA').value = "nematode_knowledge";
		document.getElementById('inputB').value = "empty_bottle";
	}
	else if (opt == "Test #5"){
		document.getElementById('inputA').value = "переменная";
		document.getElementById('inputB').value = "персистентность";
	}
}


function removeChilds(obj){
	for (let i = 0; i < obj.childNodes.length; i++){
		if (obj.childNodes[i]){
			obj.removeChild(obj.childNodes[i]);
			i--;
		}
	}
}


function findLCS(A, B, i, j, directs){
	resultPath[i][j] = 1;
	if (i == 0 || j == 0){
        return;
    }
    if (directs[i][j] == "diag"){
    		redPath[i][0] = 1;
	redPath[0][j] = 1;
        findLCS(A, B, i - 1, j - 1, directs);
        lcs += A[i - 1];
    } else if(directs[i][j] == "up"){
        findLCS(A, B, i - 1, j, directs);
    } else{
        findLCS(A, B, i, j - 1, directs);
    }
}



function hoverLCS(A, B){
	let stringA = document.getElementById("A");
	removeChilds(stringA);

    stringA.appendChild(document.createTextNode('Subsequence A: '));
    for (let i = 0, j = 0; i < A.length; i++){
    	let symb = document.createElement('a');
    	symb.appendChild(document.createTextNode(A[i]));
    	if (A[i] == lcs[j]){
    		symb.setAttribute('style', 'color: red; font-weight: bold;');
    		j++;
    	}
    	stringA.appendChild(symb);
    }


    let stringB = document.getElementById("B");
    removeChilds(stringB);

    stringB.appendChild(document.createTextNode('Subsequence B: '));
    for (let i = 0, j = 0; i < B.length; i++){
    	let symb = document.createElement('a');
    	symb.appendChild(document.createTextNode(B[i]));
    	if (B[i] == lcs[j]){
    		symb.setAttribute('style', 'color: red; font-weight: bold;');
    		j++;
    	}
    	stringB.appendChild(symb);
    }
}


function printLCS(lcs){
	removeChilds(document.getElementById("LCS"));

    let lcsText = document.createElement('a');
    lcsText.appendChild(document.createTextNode('Longest common subsequence:'));

    let lcsObj = document.createElement('a');
    lcsObj.appendChild(document.createTextNode(lcs));
    lcsObj.setAttribute('style', 'color: red; font-weight: bold;');

    document.getElementById("LCS").appendChild(lcsText);
    document.getElementById("LCS").appendChild(lcsObj);
}


function LCS(A, B){
	let n = A.length;
	let m = B.length;
	steps = new Array();
	for (let k = 0; k <= n * m; k++){
		steps[k] = new Array();
		for (let i = 0; i < n + 2; i++){
			steps[k][i] = new Array();
			for (let j = 0; j < m + 2; j++){
				steps[k][i][j] = 0;
			}
		}
	}
	for (let k = 0; k <= n * m; k++){
		for (let i = 2; i < n + 2; i++){
			steps[k][i][0] = A[i - 2] + "F";
		}
		for (let j = 2; j < m + 2; j++){
			steps[k][0][j] = B[j - 2] + "F";
		}
		steps[k][0][0] = " ";
		steps[k][0][1] = " ";
		steps[k][1][0] = " ";
	}
	let ans = new Array();
	let directs = new Array();
	for (let i = 0; i < n + 1; i++){
		ans[i] = new Array();
		directs[i] = new Array();
		resultPath[i] = new Array();
		redPath[i] = new Array()
		for (let j = 0; j < m + 1; j++){
			ans[i][j] = 0;
			directs[i][j] = "up";
			resultPath[i][j] = 0;
			redPath[i][j] = 0;
			steps[0][i + 1][j + 1] = 0 + directs[i][j][0];
		}
	}
	let k = 1;
	for (let i = 1; i < n + 1; i++){
        for (let j = 1; j < m + 1; j++){
            if (A[i - 1] == B[j - 1]){
                ans[i][j] = ans[i - 1][j - 1] + 1;
                directs[i][j] = "diag";
            } else if (ans[i - 1][j] >= ans[i][j - 1]){
                    ans[i][j] = ans[i - 1][j];
                    directs[i][j] = "up";
            } else{
                ans[i][j] = ans[i][j - 1];
                directs[i][j] = "left";
            }
            for (let l = 1; l < n + 2; l++){
        		for (let d = 1; d < m + 2; d++){
        			steps[k][l][d] = ans[l - 1][d - 1] + directs[l - 1][d - 1][0];
        		}
        	}
        	k++;
        }
    }

    document.getElementById("resultBlock").setAttribute('style', 'visibility: all;');

    lcs = "";
    
    findLCS(A, B, n, m, directs);

    hoverLCS(A, B);

    printLCS(lcs);

	document.getElementById("sub_length").innerHTML = "Length of longest common subsequence: " + ans[n][m];

    removeChilds(table);
    var tbl = printMatrix(steps[0]);
	table.appendChild(tbl);

	stepId = 0;
    document.getElementById("stepId").value = 0;
}


function printMatrix(matrix){
	let tbl = document.createElement('table');
	tbl.setAttribute('border', '1');
	let tbdy = document.createElement('tbody');
    for (let i = 0; i < matrix.length; i++) {
    	let tr = document.createElement('tr');
        for (let j = 0; j < matrix[i].length; j++) {
        	let color, back = 'background: white;';
        	let td = document.createElement('td');
        	if (i == 0 && j != 0 && redPath[0][j - 1] == 1 && stepId == steps.length - 1){
        		color = "color: red; font-weight: bold;";
        	}
        	else if (i != 0 && j == 0 && redPath[i - 1][0] == 1 && stepId == steps.length - 1){
        		color = "color: red; font-weight: bold;";
        	}
        	else{
        		color = "color: #4A235A; font-weight: bold;";
        	}
        	if (stepId == steps.length - 1 && i != 0 && j != 0 && resultPath[i - 1][j - 1] == 1){
        		back = 'background-color: rgba(249, 231, 159, 0.4);';
        	}

			let imgUp = document.createElement('img');
			imgUp.src = "IMG/up.png";
			imgUp.setAttribute('style', 'width: 10px; height: 23px');

			let imgDiag = document.createElement('img');
			imgDiag.src = "IMG/diag.png";
			imgDiag.setAttribute('style', 'width: 20px; height: 23px');

			let imgLeft = document.createElement('img');
			imgLeft.src = "IMG/left.png";
			imgLeft.setAttribute('style', 'width: 23px; height: 20px');

			for (let k = 0; k < matrix[i][j].length - 1; k++){
        		let t = document.createTextNode(matrix[i][j][k]);
        		td.appendChild(t);
        	}
        	if (matrix[i][j][matrix[i][j].length - 1] == 'u'){
        		color = 'color: black;';
        		td.append(imgUp);
        	}
        	else if (matrix[i][j][matrix[i][j].length - 1] == 'd'){
        		color = 'color: #70d063;';
        		td.append(imgDiag);
        	}
        	else if (matrix[i][j][matrix[i][j].length - 1] == 'l'){
        		color = 'color: #4c63f0;';
        		td.append(imgLeft);
        	}
        	td.setAttribute('style', color + back);
        	tr.appendChild(td);
        }
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    return tbl;
}


function drawTable(){
	removeChilds(table);
	table.appendChild(printMatrix(steps[stepId]));
	document.getElementById("stepId").value = stepId;
}


function setStep(){
	stepId = Number(document.getElementById("stepId").value);
	if (stepId < 0){
		stepId = 0;
	}
	else if (stepId >= steps.length - 1){
		stepId = steps.length - 1;
	}
	drawTable();
}


function prevStep(){
	if(--stepId < 0){
		stepId = steps.length - 1;
	}
	drawTable();
}


function nextStep(){
	if(++stepId == steps.length){
		stepId = 0;
	}
	drawTable();
}


function playSteps(){
	let speed = document.getElementById("speed").value;
	intervalId = setInterval(nextStep, 1000 / speed);
}


function stopPlayingSteps(){
	clearInterval(intervalId);
}


function firstStep(){
	stepId = 0;
	drawTable();
}


function lastStep(){
	stepId = steps.length - 1;
	drawTable();
}