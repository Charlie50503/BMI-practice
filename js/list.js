var dataList = JSON.parse(localStorage.getItem('dataList')) || [];
var list = document.querySelector('.list');
showDataList()


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
}


list.addEventListener('click',function(e){
	deleteItem(e);
})



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