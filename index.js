// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

var cancel = document.getElementById("cancel_btn");

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
  // document.getElementById("add_btn").style.display = "block";
  document.getElementById("save_btn").style.display = "none";
};

cancel.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
var rowCount = 0;

function addRow() {
  let new_name = document.getElementById("new_name").value;
  let new_lastname = document.getElementById("new_lastname").value;
  let new_age = document.getElementById("new_age").value;
  let new_mobile = document.getElementById("new_mobile").value;
  let new_address = document.getElementById("new_address").value;


  var table = document.getElementById("table_data");
  var table_len = table.length;
  var row = table.insertRow(table_len);
  rowCount = table.rows.length;
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);
  var cell6 = row.insertCell(5);
  var cell7 = row.insertCell(6);
  var cell8 = row.insertCell(7);

  cell1.innerHTML = rowCount - 2;
  cell2.innerHTML = new_name;
  cell3.innerHTML = new_lastname;
  cell4.innerHTML = new_age;
  cell5.innerHTML = new_mobile;
  cell6.innerHTML = new_address;
  cell7.innerHTML = new_address;
  cell8.innerHTML = `<input type="image" src="edit.png" width="20" height="20"  value="Edit" id="btn_edit" onclick="editRow(this)">&emsp;<input type="image" src="bin.png" width="20" height="20"  value="Del"  onclick="delRow(this)">`;
  modal.style.display = "none";
  resetForm();
}

function editRow(td) {
  modal.style.display = "block";
  document.getElementById("add_btn").style.display = "none";
  document.getElementById("save_btn").style.display = "inline";

  var index = td.parentElement.parentElement.rowIndex;
  let selectedRow = td.parentElement.parentElement;
  var x = (document.getElementById("save_btn").onclick = () => saveRow(index));
  document.getElementById("new_name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("new_lastname").value =
    selectedRow.cells[2].innerHTML;
  document.getElementById("new_age").value = selectedRow.cells[3].innerHTML;
  document.getElementById("new_mobile").value = selectedRow.cells[4].innerHTML;
  document.getElementById("new_address").value = selectedRow.cells[5].innerHTML;
}
function saveRow(index) {
  var table = document.getElementById("table_data").rows[index];

  table.cells[1].innerHTML = document.getElementById("new_name").value;
  table.cells[2].innerHTML = document.getElementById("new_lastname").value;
  table.cells[3].innerHTML = document.getElementById("new_age").value;
  table.cells[4].innerHTML = document.getElementById("new_mobile").value;
  table.cells[5].innerHTML = document.getElementById("new_address").value;
  document.getElementById("add_btn").style.display = "inline";
  modal.style.display = "none";
  resetForm();
}

function delRow(td) {
  if (confirm("Are you sure to delete this record ?")) {
    index = td.parentElement.parentElement.rowIndex;
    document.getElementById("table_data").deleteRow(index);
  }
}
function resetForm() {
  document.getElementById("new_name").value = "";
  document.getElementById("new_lastname").value = "";
  document.getElementById("new_age").value = "";
  document.getElementById("new_mobile").value = "";
  document.getElementById("new_address").value="";
}
