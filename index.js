function addRow() {
    let new_name = document.getElementById("new_name").value;
    let new_lastname = document.getElementById("new_lastname").value;
    let new_age = document.getElementById("new_age").value;
   
   
    
    let table = document.getElementById("table_data");
    let table_len = table.length;
    let row = table.insertRow(table_len);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);

    function btn() {
        var btn_edit = document.createElement("button");
        var edit_text = document.createTextNode("Edit");
        btn_edit.appendChild(edit_text);

        var btn_del = documenet.createElement("button");
        var del_text = docuemnt.createTextNode("Del");
        btn_del.appendChild(del_text);

        


        return btn_edit.outerHTML+btn_del.outerHTML;        
        // return `<input type="button" id="edit_btn" value="Edit" onlick="editRow">`+`<input type="button" id="del_btn" value="Del onclick="delRow">`
    }


    cell1.innerHTML = new_name;
    cell2.innerHTML = new_lastname;
    cell3.innerHTML = new_age;
    cell4.innerHTML = btn();


}

function editRow(){


}

function delRow() {
    

}
