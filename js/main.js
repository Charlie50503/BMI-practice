// import {isCheckInputValue,isStatus,isStatusColor,deleteItem} from 'function.js';

var bodyHeightInput = document.querySelector('#BODY-HEIGHT-INPUT');
var bodyWeightInput = document.querySelector('#BODY-WEIGHT-INPUT');

var result = document.querySelector('.result');
var list = document.querySelector('.list');
const todoInput = document.querySelector('.todo-input');
const sendBtn = document.querySelector('.send');
const dataList = JSON.parse(localStorage.getItem('dataList')) || [];

/********************************************init*********************************************************/
showDataList()
/*****************************************************************************************************/


/********************************************function*********************************************************/

function showResult(){
	var resultStatusBox = document.querySelector('.result-status-box');
	resultStatusBox.classList.remove('display-none');
	var resultBMIBox = document.querySelector('#RESULT_BMI_BOX');
	resultBMIBox.classList.remove('display-none');
	var resultLabelDefault = document.querySelector('.result-label-default');
	resultLabelDefault.classList.add('display-none');
	var result = document.querySelector('#RESULT');
	result.classList.add('active');
	resultBMIBox.classList.remove('default');
}

function clearInput(){
	bodyHeightInput.value = '';
	bodyWeightInput.value = '';
}

function searchExistColor(classList){
	var colorName = '';
	switch(true) {
		case classList.indexOf('blue') > -1 :
			colorName = 'blue';
			break;
		case classList.indexOf('green') > -1 :
			colorName = 'green';
			break;
		case classList.indexOf('orange1') > -1 :
			colorName = 'orange1';
			break;
		case classList.indexOf('orange2') > -1 :
			colorName = 'orange2';
			break;
		case classList.indexOf('red') > -1 :
			colorName = 'red';
			break;
	}
	return colorName
}

function isColorName(BMI){
	var colorName = '';
	switch(true) {
		case BMI < 18.5:
			colorName = 'blue';
			break;
		case (18.5 <= BMI && BMI < 24):
			colorName = 'green';
			break;
		case (24 <= BMI && BMI < 27):
			colorName = 'orange1';
			break;
		case (27 <= BMI && BMI < 30):
			colorName = 'orange2';
			break;
		case (30 <= BMI && BMI < 35):
			colorName = 'orange2';
			break;
		case (35 <= BMI):
			colorName = 'red';
			break;
	}
	return colorName
}

function isCheckInputValue(){
	if(Number.isNaN(parseInt(bodyHeightInput.value)) || Number.isNaN(parseInt(bodyWeightInput.value))){
		alert('請輸入數字');
		bodyHeightInput.value = '';
		bodyWeightInput.value = '';
		return false
	}
	if(bodyHeightInput.value.length===0) {
		alert('請輸入身高');
		return false
	}
	if(bodyWeightInput.value.length===0) {
		alert('請輸入體重');
		return false
	}
	return true;
}

function isStatus(BMI){
	var status = '';
	switch(true) {
		case BMI < 18.5:
			status = '體重過輕';
			break;
		case (18.5 <= BMI && BMI < 24):
			status = '理想';
			break;
		case (24 <= BMI && BMI < 27):
			status = '過重';
			break;
		case (27 <= BMI && BMI < 30):
			status = '輕度肥胖';
			break;
		case (30 <= BMI && BMI < 35):
			status = '中度肥胖';
			break;
		case (35 <= BMI):
			status = '重度肥胖';
			break;
	}
	return status
}

function isStatusColor(BMI){
	var statusColor = '';
	switch(true) {
		case BMI < 18.5:
			statusColor = '#31BAF9';
			break;
		case (18.5 <= BMI && BMI < 24):
			statusColor = '#86D73F';
			break;
		case (24 <= BMI && BMI < 27):
			statusColor = '#FF982D';
			break;
		case (27 <= BMI && BMI < 30):
			statusColor = '#FF6C02';
			break;
		case (30 <= BMI && BMI < 35):
			statusColor = '#FF6C02';
			break;
		case (35 <= BMI):
			statusColor = '#FF1200';
			break;
	}
	return statusColor
}

function deleteItem(e){
	
	if(e.target.nodeName === 'path' || e.target.nodeName === 'svg'){
		if(e.target.nodeName === 'path') {
			dataList.splice(e.target.parentElement.dataset.num,1)
			localStorage.setItem('dataList',JSON.stringify(dataList))
		}else if(e.target.nodeName === 'svg') {
			dataList.splice(e.target.dataset.num,1)
			localStorage.setItem('dataList',JSON.stringify(dataList))
			
		}
		console.log(dataList)
	}
	showDataList()
	// createList()
}

function showDataList(){
	var innerHTML = ''
	dataList.forEach(function(data,index){
		innerHTML+=`<li>
			<div class="lightBar" style="background: ${data.statusColor};">
			</div>
			<div class="main">
				<div class="status">${data.status}</div>
				<div class="box">
					<div class="bmiName">BMI</div>
					<div class="value">${data.BMI}</div>
				</div>
				<div class="box">
					<div class="bmiName">weight</div>
					<div class="value">${data.wieght}</div>
				</div>
				<div class="box">
					<div class="bmiName">height</div>
					<div class="value">${data.height}</div>
				</div>
				<div class="date">${data.day}</div>
				<div class="del">
					<svg data-num="${index}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
				</div>
			</div>
		</li>`;
		
	})
	list.innerHTML = innerHTML;
	flexlightBarHeight()
}

function showResultStatus(BMI){
	var resultStatus = document.querySelector('.result-status');
	resultStatus.textContent = isStatus(BMI)
	resultStatus.style.color = isStatusColor(BMI)
}

function showResultLabelActive(roundBMI,BMI){
	var resultLabelActive = document.querySelector('.result-label-active');
	resultLabelActive.textContent = roundBMI
	resultLabelActive.style.color = isStatusColor(BMI)
}

function showResultLabel(roundBMI,BMI){
	var resultLabel = document.querySelector('.result-label');
	resultLabel.style.color = isStatusColor(BMI)
}

function changeResultActiveBorderColor(BMI){
	var resultActive = document.querySelector('.result.active');
	var color = isStatusColor(BMI)
	var str = `border: 6px solid ${color};`
	resultActive.style = str 
}

function changeResultActiveAfterBorderColor(BMI){
	var resultActive = document.querySelector('.result.active');
	var colorName = isColorName(BMI)
	removeOldColor()
	resultActive.classList.add(colorName);
}

function removeOldColor(){
	var resultActive = document.querySelector('.result.active');
	var oldColor = searchExistColor(resultActive.classList.value);
	if(oldColor==='') return
	resultActive.classList.remove(oldColor);
}

function flexlightBarHeight(){
	console.log("flexlightBarHeight")
	debugger
	var mainList = document.querySelectorAll('.list li .main');
	var lightBarList = document.querySelectorAll('.list li .lightBar');
	mainList.forEach((main,idx)=>{
		const lightBar = lightBarList[idx]
		lightBar.style.height=main.clientHeight+'px';
	})
}

/*****************************************************************************************************/

/**********************************************event*******************************************************/
result.addEventListener('click',function(e){
	var checkInputValue = isCheckInputValue()
	if(!checkInputValue) return
	var BMI = bodyWeightInput.value/Math.pow(bodyHeightInput.value*0.01, 2);
	var roundBMI = Math.round(BMI*100)/100;
	var today = new Date();
	var todayStr = today.getFullYear() + '-' + (today.getMonth()+1) + '-' + today.getDate()
	var item = {
		status:isStatus(BMI),
		statusColor:isStatusColor(BMI),
		wieght:bodyWeightInput.value+'kg',
		height:bodyHeightInput.value+'cm',
		BMI:roundBMI,
		day:todayStr,
	}
	dataList.push(item)
	localStorage.setItem('dataList',JSON.stringify(dataList))
	console.log(dataList)
	showResult()
	showResultLabelActive(roundBMI,BMI)
	showResultLabel(roundBMI,BMI)
	showResultStatus(BMI)
	changeResultActiveBorderColor(BMI)
	changeResultActiveAfterBorderColor(BMI)
	showDataList()
	clearInput()
},false);

list.addEventListener('click',function(e){
	deleteItem(e);
})


/*****************************************************************************************************/