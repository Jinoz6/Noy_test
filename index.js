$(document).ready(function(){

var modal = $("#myModal");

var btn = $("#myBtn");

var cancel = $("#cancel_btn");

var arrayList = [];


var rowCount = 0;


var next = $("#next");
var pre = $("#pre");









btn.click( function () {

    modal.show();
    $("#save_btn").hide();
    $("#no").hide();

});

cancel.click ( function () {

    modal.hide();
    $("#add_btn").show()
    resetForm();

});




function init(){
    
    const page = new URLSearchParams(window.location.search).get('page');

    let arrayList1 = JSON.parse(localStorage['data']);

    if( page >= Math.ceil(arrayList1.length/8) ){

        $("#next").disabled = true;

    } 
    else if(page <= 1){

        $("#pre").disabled = true;
    }

    $("tbody").empty();

    let urlObject = new URLSearchParams(window.location.search);
    urlObject.set("page",page);
    history.replaceState(null, null, "?"+urlObject.toString());

    displayItem(8,page);

    setPagination(Math.ceil(arrayList1.length/8));
}

$("#add_btn").click(function () {
  
    let new_status = $("#new_status");

    new_status.is(":checked") ? new_status = "Active" : new_status="Inactive";
  
    
    let tableRow = $('tr').length;
     

    let pages = Math.ceil(arrayList.length/8);

    let rowObject = {};

    rowObject.no = rowCount+1;
    rowObject.firstname = $("#new_name").val();
    rowObject.lastname = $("#new_lastname").val();
    rowObject.age = $("#new_age").val();
    rowObject.mobile = $("#new_mobile").val();
    rowObject.address = $("#new_address").val();
    rowObject.status = new_status;
    arrayList.push(rowObject);
    rowCount = arrayList.length;
    
    setPagination(pages);
    

    if( tableRow > 8 ){ 
        
        $("tbody").empty();
        
        $("#pre").disabled = false;
        $("#next").disabled = false;
        const p = new URLSearchParams(window.location.search).get('page');
        let urlObject = new URLSearchParams(window.location.search);
    
        urlObject.set("page",parseInt(p)+1);
        history.replaceState(null, null, "?"+urlObject.toString());

    }
    else{

        var html = `<tr><td>${rowObject.no}</td>`+
        `<td>${rowObject.firstname}</td>`+
        `<td>${rowObject.lastname}</td>`+
        `<td>${rowObject.age}</td>`+
        `<td>${rowObject.mobile}</td>`+
        `<td>${rowObject.address}</td>`+
        `<td>${rowObject.status}</td>`+
        `<td><input type="image" src="edit.png" width="20" height="20"
        value="Edit" id="btn_edit">`+
        `<input type="image" src="bin.png" width="20" height="20"  value="Del" id="del_btn">`+
        `</td></tr>`;

        $('#table_tbody').append(html); 
        resetForm();
    }

    localStorage.setItem("data", JSON.stringify(arrayList));
    $("#new_status").prop("checked" , false);
   
 
})

function setPagination(page){

    let wrapper =  $("#pagination-wrapper");

    wrapper.empty();

    for(let i= 1; i<=page;i++){
        
        let btn = pageButtons(i);
        wrapper.append(btn);
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




 next.click(function(){

    const p = new URLSearchParams(window.location.search).get('page');
    let arrayList = JSON.parse(localStorage['data']);

     if(p >= Math.ceil(arrayList.length/8) ){

         $("#next").disabled = true;

     }else{

        $("tbody").empty();

        let urlObject = new URLSearchParams(window.location.search);

        urlObject.set("page",parseInt(p)+1);

        history.replaceState(null, null, "?"+urlObject.toString());

        displayItem(8,parseInt(p)+1);

        $("#pre").disabled = false;
        
    }
})
     

pre.click(function(){

    const p = new URLSearchParams(window.location.search).get('page');

    if(p <= 1 ){

        $("#pre").disabled = true;

    }else{
    
        $("tbody").empty();

        let urlObject = new URLSearchParams(window.location.search);
        urlObject.set("page",p-1);
        history.replaceState(null, null, "?"+urlObject.toString());

        displayItem(8,p-1);

        $("#next").disabled = false;

    }
})



function displayItem(row,p){

    $("#table_tbody").empty();
    

    let page =p;
    let start = row*(page-1);
    let end = start +row;
    let arrayList = JSON.parse(localStorage['data']);
    let pagination = arrayList.slice(start,end);

    
  
  

    for (let i= 0;i<pagination.length;i++){

        var html = `<tr><td>${pagination[i].no}</td>`+
        `<td>${pagination[i].firstname}</td>`+
        `<td>${pagination[i].lastname}</td>`+
        `<td>${pagination[i].age}</td>`+
        `<td>${pagination[i].mobile}</td>`+
        `<td>${pagination[i].address}</td>`+
        `<td>${pagination[i].status}</td>`+
        `<td><input type="image" src="edit.png" width="20" height="20"
        value="Edit" id="btn_edit">`+
        `<input type="image" src="bin.png" width="20" height="20"  value="Del" id="del_btn">`+
        `</td></tr>`;
    
        $('#table_tbody').append(html); 

        
    }

}

$("body").on("click","#btn_edit",function() {

    modal.show();
    $("#no").hide();
    $("#add_btn").hide();
    $("#save_btn").show();

    let currentRow=$(this).closest("tr"); 
         
    let col1=currentRow.find("td:eq(0)").text(); // get current row 1st TD value
    let col2=currentRow.find("td:eq(1)").text(); // get current row 2nd TD
    let col3=currentRow.find("td:eq(2)").text(); // get current row 3rd TD
    let col4=currentRow.find("td:eq(3)").text();
    let col5=currentRow.find("td:eq(4)").text();
    let col6=currentRow.find("td:eq(5)").text();
    let col7=currentRow.find("td:eq(6)").text();
    

    
    $("#no").val(col1);
    $("#new_name").val(col2);
    $("#new_lastname").val(col3);
    $("#new_age").val(col4);
    $("#new_mobile").val(col5);
    $("#new_address").val(col6);

    const y = col7;
    

    if (y === "Active"){    

        $("#new_status").prop("checked", true);

    }
    else{

        $("#new_status").prop("checked" , false);
    }
    
})

$("body").on("click","#save_btn",function(){

    $("#no").hide();

    const p = new URLSearchParams(window.location.search).get('page');

    let arrayList = JSON.parse(localStorage['data']);

    let rowObject = {};

    let no = $("#no").val();
    
    
    rowObject.no = $("#no").val();
    rowObject.firstname = $("#new_name").val();
    rowObject.lastname = $("#new_lastname").val();
    rowObject.age = $("#new_age").val();
    rowObject.mobile = $("#new_mobile").val();
    rowObject.address = $("#new_address").val();
    rowObject.status = $("#new_status").is(":checked") ? new_status = "Active" : new_status="Inactive";

    arrayList[parseInt(no)-1] = rowObject;
    
    localStorage.setItem("data", JSON.stringify(arrayList));


    displayItem(8,parseInt(p));
    resetForm();
    modal.hide();
    $("#add_btn").show();

    

    resetForm();
})

function setIndex(){

    

   let rowCount = arrayList.length;

    for(let i=0; i<rowCount; i++)
    {
        arrayList[i].no = i+1;
        localStorage.setItem("data", JSON.stringify(arrayList));

    }

}

$("body").on("click","#del_btn",function() {

    
    const p = new URLSearchParams(window.location.search).get('page');
    let arrayList = JSON.parse(localStorage['data']);
    let currentRow=$(this).closest("tr");

    let col1=currentRow.find("td:eq(0)").text();
    let number = arrayList.findIndex(({no}) => no==col1);

         
 
   
    if (confirm("Are you sure to delete this record ?")) {
        
        arrayList.splice(number,1);
    }
    

    localStorage.setItem("data", JSON.stringify(arrayList));
    setIndex();
  
    displayItem(8,parseInt(p));
    


    
})

function resetForm() {

    $("#new_name").val("");
    $("#new_lastname").val("");
    $("#new_age").val("");
    $("#new_mobile").val("");
    $("#new_address").val("");
    $("#new_status").checked = false;
  
}

window.addEventListener("change",init());

})
