// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

var cancel = document.getElementById("cancel_btn");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  
  document.getElementById("save_btn").style.display = "none";
  // document.getElementById("status_text").style.display = "none";
  // document.getElementById("new_status").style.display = "none";
};

cancel.onclick = function () {
  modal.style.display = "none";
  document.getElementById("add_btn").style.display = "inline";
  resetForm();
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
var arrayList = [];
var rowCount = 0;
var table = document.getElementById("table_tbody");
let current_page = 1;





function addRow() {
  // let new_name = document.getElementById("new_name").value;
  // let new_lastname = document.getElementById("new_lastname").value;
  // let new_age = document.getElementById("new_age").value;
  // let new_mobile = document.getElementById("new_mobile").value;
  // let new_address = document.getElementById("new_address").value;
  let new_status = document.getElementById("new_status");
  

  new_status.checked ? new_status = "Active" : new_status="Inactive";
  let rowObject = new Object();

   rowObject.no = rowCount+1;
   rowObject.firstname = document.getElementById("new_name").value;
   rowObject.lastname = document.getElementById("new_lastname").value;
   rowObject.age = document.getElementById("new_age").value;
   rowObject.mobile = document.getElementById("new_mobile").value;
   rowObject.address = document.getElementById("new_address").value;
   rowObject.status = new_status;
   arrayList.push(rowObject);
  
  
  



  var table = document.getElementById("table_tbody");
  var table_len = table.length;
  var row = table.insertRow(table_len);
  rowCount = arrayList.length;
  tableRow = table.rows.length;
  let pages = Math.ceil(arrayList.length/8);
  

  if( tableRow > 8 ){ 
    
    document.getElementById("table_tbody").innerHTML = " ";
  //  let wrapper =  document.getElementById("pagination-wrapper") ;
   setPagination(pages);

   


  }else{
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
  
    cell1.innerHTML = rowObject.no;
    cell2.innerHTML = rowObject.firstname;
    cell3.innerHTML = rowObject.lastname;
    cell4.innerHTML = rowObject.age;
    cell5.innerHTML = rowObject.mobile;
    cell6.innerHTML = rowObject.address;
    cell7.innerHTML = rowObject.status;
    cell8.innerHTML = `<input type="image" src="edit.png" width="20" height="20"  value="Edit" id="btn_edit" onclick="editRow(this)">&emsp;<input type="image" src="bin.png" width="20" height="20"  value="Del"  onclick="delRow(this)">`;
    // modal.style.display = "none";
    console.log(arrayList);
    resetForm();
  }
 
}
function pageButtons(p){

  let button = document.createElement("button");
  button.classList.add("pagination-link");
  button.innerHTML=p;
  button.addEventListener("click",function(){
  
   displayItem(8,p);
 });
  return button;
 
 }


function displayItem(row,p){
  document.getElementById("table_tbody").innerHTML = " ";
  let page =p;
  console.log(page);
  let start = row*(page-1);
  let end = start +row;
  let pagination = arrayList.slice(start,end);
  // console.log(start);
  // console.log(end);
  console.log(pagination);
  

  for (let i= 0;i<pagination.length;i++){
    let row = table.insertRow(i);
    


    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
  
    cell1.innerHTML = pagination[i].no;
    cell2.innerHTML = pagination[i].firstname;
    cell3.innerHTML = pagination[i].lastname;
    cell4.innerHTML = pagination[i].age;
    cell5.innerHTML = pagination[i].mobile;
    cell6.innerHTML = pagination[i].address;
    cell7.innerHTML = pagination[i].status;
    cell8.innerHTML = `<input type="image" src="edit.png" width="20" height="20"  value="Edit" id="btn_edit" onclick="editRow(this)">&emsp;<input type="image" src="bin.png" width="20" height="20"  value="Del"  onclick="delRow(this)">`;
    console.log(pagination);
}

}

function setPagination(page){
  let wrapper =  document.getElementById("pagination-wrapper") ;
  wrapper.innerHTML = " ";

 

  for(let i= 1; i<=page;i++){
    let btn = pageButtons(i);
    wrapper.appendChild(btn);

  }

}






function editRow(td) {
  modal.style.display = "block";
  document.getElementById("add_btn").style.display = "none";
  document.getElementById("save_btn").style.display = "inline";
  // document.getElementById("status_text").style.display = "inline";
  // document.getElementById("new_status").style.display = "block";
  

  var index = td.parentElement.parentElement.rowIndex;
  let selectedRow = td.parentElement.parentElement;
  var x = (document.getElementById("save_btn").onclick = () => saveRow(index));
  document.getElementById("new_name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("new_lastname").value =
    selectedRow.cells[2].innerHTML;
  document.getElementById("new_age").value = selectedRow.cells[3].innerHTML;
  document.getElementById("new_mobile").value = selectedRow.cells[4].innerHTML;
  document.getElementById("new_address").value = selectedRow.cells[5].innerHTML;

  const y = selectedRow.cells[6].innerHTML;

  if (y === "Active"){

    document.getElementById('new_status').checked = true;

  }
  else{

    document.getElementById('new_status').checked = false;
  }

  
  


  

  console.log(index);
}

function saveRow(index) {
  var table = document.getElementById("table_tbody").rows[index-1];
  new_status.checked ? new_status = "Active" : new_status="Inactive";


  table.cells[1].innerHTML = document.getElementById("new_name").value;
  table.cells[2].innerHTML = document.getElementById("new_lastname").value;
  table.cells[3].innerHTML = document.getElementById("new_age").value;
  table.cells[4].innerHTML = document.getElementById("new_mobile").value;
  table.cells[5].innerHTML = document.getElementById("new_address").value;
  table.cells[6].innerHTML = document.getElementById("new_status").checked ? new_status = "Active" : new_status="Inactive";
  
  let rowObject = new Object();

  rowObject.firstname = document.getElementById("new_name").value;
  rowObject.lastname = document.getElementById("new_lastname").value;
  rowObject.age = document.getElementById("new_age").value;
  rowObject.mobile = document.getElementById("new_mobile").value;
  rowObject.address = document.getElementById("new_address").value;
  rowObject.status = document.getElementById("new_status").checked ? new_status = "Active" : new_status="Inactive";
  arrayList[index-1] = rowObject;


  document.getElementById("add_btn").style.display = "inline";
  modal.style.display = "none";
  console.log(index);
  console.log(arrayList);
  resetForm();
}
function setIndex(){
  var table = document.getElementById("table_tbody");
  rowCount = table.rows.length;
  console.log(rowCount);

  for(var i=0; i<rowCount; i++)
  {
    table.rows[i].cells[0].innerHTML = i+1;

}

}

function delRow(td) {
 let index = td.parentElement.parentElement.rowIndex;
  if (confirm("Are you sure to delete this record ?")) {
    
    document.getElementById("table_tbody").deleteRow(index-1);
  }
  arrayList.splice(index-1,1);
  setIndex();
  
}
function resetForm() {
  document.getElementById("new_name").value = "";
  document.getElementById("new_lastname").value = "";
  document.getElementById("new_age").value = "";
  document.getElementById("new_mobile").value = "";
  document.getElementById("new_address").value="";
  document.getElementById("new_status").checked = false;
  
}