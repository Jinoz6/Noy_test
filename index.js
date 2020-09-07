var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var cancel = document.getElementById("cancel_btn");

var arrayList = [];

var rowCount = 0;

var table = document.getElementById("table_tbody");

var next = document.getElementById("next");
var pre = document.getElementById("pre");

const page = new URLSearchParams(window.location.search).get('page');

let arrayList1 = JSON.parse(localStorage['data']);





btn.onclick = function () {

    modal.style.display = "block";
    document.getElementById("save_btn").style.display = "none";

};

cancel.onclick = function () {

    modal.style.display = "none";
    document.getElementById("add_btn").style.display = "inline";
    resetForm();

};

window.onclick = function (event) {

    if (event.target == modal) {
        modal.style.display = "none";
    }

};


function init(){

    if( page >= Math.ceil(arrayList1.length/8) ){

        document.getElementById("next").disabled = true;

    } 
    else if(page <= 1){

        document.getElementById("pre").disabled = true;
    }

    table.innerHTML = " ";

    let urlObject = new URLSearchParams(window.location.search);
    urlObject.set("page",page);
    history.replaceState(null, null, "?"+urlObject.toString());

    displayItem(8,page);

    setPagination(Math.ceil(arrayList1.length/8));
}

function addRow() {
  
    let new_status = document.getElementById("new_status");

    new_status.checked ? new_status = "Active" : new_status="Inactive";

    let table_len = table.length;

    let row = table.insertRow(table_len);

    let tableRow = table.rows.length;

    let pages = Math.ceil(arrayList.length/8);

    let rowObject = new Object();

    rowObject.no = rowCount+1;
    rowObject.firstname = document.getElementById("new_name").value;
    rowObject.lastname = document.getElementById("new_lastname").value;
    rowObject.age = document.getElementById("new_age").value;
    rowObject.mobile = document.getElementById("new_mobile").value;
    rowObject.address = document.getElementById("new_address").value;
    rowObject.status = new_status;
    arrayList.push(rowObject);
    rowCount = arrayList.length;
    setPagination(pages);

    if( tableRow > 8 ){ 
        
        document.getElementById("table_tbody").innerHTML = " ";
        
        document.getElementById("pre").disabled = false;
        document.getElementById("next").disabled = false;

    }
    else{

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        
        cell1.innerHTML = rowObject.no;
        cell2.innerHTML = rowObject.firstname;
        cell3.innerHTML = rowObject.lastname;
        cell4.innerHTML = rowObject.age;
        cell5.innerHTML = rowObject.mobile;
        cell6.innerHTML = rowObject.address;
        cell7.innerHTML = rowObject.status;
        cell8.innerHTML = `<input type="image" src="edit.png" width="20" height="20"  `+
        `value="Edit" id="btn_edit" onclick="editRow(this)">&emsp;<input type="image" `+
        `src="bin.png" width="20" height="20"  value="Del"  onclick="delRow(this)">`;
        localStorage.setItem("data", JSON.stringify(arrayList));

        // modal.style.display = "none";
        resetForm();
    }
 
}

function setPagination(page){

    let wrapper =  document.getElementById("pagination-wrapper");

    wrapper.innerHTML = " ";

    for(let i= 1; i<=page;i++){
        
        let btn = pageButtons(i);
        wrapper.appendChild(btn);
    }

}


function pageButtons(p){

    const params = { page: p };
    const paramString = new URLSearchParams(params);
    

    let a = document.createElement("a");
    a.href = `http://127.0.0.1:5500/index.html?${paramString}`;
    a.classList.add("pagination-link");
    a.innerHTML=p;
    return a;
 
 }




 next.addEventListener("click",function(){

    const p = new URLSearchParams(window.location.search).get('page');
    let arrayList = JSON.parse(localStorage['data']);

     if(p >= Math.ceil(arrayList.length/8) ){

         document.getElementById("next").disabled = true;

     }else{

        table.innerHTML = " ";

        let urlObject = new URLSearchParams(window.location.search);

        urlObject.set("page",parseInt(p)+1);

        history.replaceState(null, null, "?"+urlObject.toString());

        displayItem(8,parseInt(p)+1);

        document.getElementById("pre").disabled = false;
        
    }
})
     

pre.addEventListener("click",function(){

    const p = new URLSearchParams(window.location.search).get('page');

    if(p <= 1 ){

        document.getElementById("pre").disabled = true;

    }else{
    
        table.innerHTML = " ";

        let urlObject = new URLSearchParams(window.location.search);
        urlObject.set("page",p-1);
        history.replaceState(null, null, "?"+urlObject.toString());

        displayItem(8,p-1);

        document.getElementById("next").disabled = false;

    }
})



function displayItem(row,p){

    document.getElementById("table_tbody").innerHTML = " ";
    console.log("show"+p);

    let page =p;
    let start = row*(page-1);
    let end = start +row;
    let arrayList = JSON.parse(localStorage['data']);
    let pagination = arrayList.slice(start,end);
  
  

    for (let i= 0;i<pagination.length;i++){

        let row = table.insertRow(i);
        
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
    
        cell1.innerHTML = pagination[i].no;
        cell2.innerHTML = pagination[i].firstname;
        cell3.innerHTML = pagination[i].lastname;
        cell4.innerHTML = pagination[i].age;
        cell5.innerHTML = pagination[i].mobile;
        cell6.innerHTML = pagination[i].address;
        cell7.innerHTML = pagination[i].status;
        cell8.innerHTML = `<input type="image" src="edit.png" width="20" height="20"  `+
        `value="Edit" id="btn_edit" onclick="editRow(this)">&emsp;<input type="image" `+
        `src="bin.png" width="20" height="20"  value="Del"  onclick="delRow(this)">`;
        
    }

}

function editRow(td) {

    modal.style.display = "block";
    document.getElementById("add_btn").style.display = "none";
    document.getElementById("save_btn").style.display = "inline";

    let index = td.parentElement.parentElement.rowIndex;
    let selectedRow = td.parentElement.parentElement;
    
    document.getElementById("save_btn").onclick = () => saveRow(index)
    document.getElementById("new_name").value = selectedRow.cells[1].innerHTML;
    document.getElementById("new_lastname").value = selectedRow.cells[2].innerHTML;
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

}

function saveRow(index) {

    let table = document.getElementById("table_tbody").rows[index-1];

    new_status.checked ? new_status = "Active" : new_status="Inactive";
    // table.cells[0].innerHTML = (index-1);
    table.cells[1].innerHTML = document.getElementById("new_name").value;
    table.cells[2].innerHTML = document.getElementById("new_lastname").value;
    table.cells[3].innerHTML = document.getElementById("new_age").value;
    table.cells[4].innerHTML = document.getElementById("new_mobile").value;
    table.cells[5].innerHTML = document.getElementById("new_address").value;
    table.cells[6].innerHTML = document.getElementById("new_status").checked ? new_status = "Active" : new_status="Inactive";
    
    let rowObject = {};
    
    rowObject.no = index;
    rowObject.firstname = document.getElementById("new_name").value;
    rowObject.lastname = document.getElementById("new_lastname").value;
    rowObject.age = document.getElementById("new_age").value;
    rowObject.mobile = document.getElementById("new_mobile").value;
    rowObject.address = document.getElementById("new_address").value;
    rowObject.status = document.getElementById("new_status").checked ? new_status = "Active" : new_status="Inactive";

    arrayList[index-1] = rowObject;

    document.getElementById("add_btn").style.display = "inline";
    modal.style.display = "none";
    

    resetForm();
}

function setIndex(){

    let table = document.getElementById("table_tbody");

    rowCount = table.rows.length;

    for(let i=0; i<rowCount; i++)
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


window.addEventListener("change", init());