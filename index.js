// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function addRow() {
  let new_name = document.getElementById("new_name").value;
  let new_lastname = document.getElementById("new_lastname").value;
  let new_age = document.getElementById("new_age").value;

  var table = document.getElementById("table_data");
  var table_len = table.length;
  var row = table.insertRow(table_len);
  var rowCount = table.rows.length;
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  var cell5 = row.insertCell(4);

  cell1.innerHTML = rowCount - 1;
  cell2.innerHTML = new_name;
  cell3.innerHTML = new_lastname;
  cell4.innerHTML = new_age;
  cell5.innerHTML = `<input type="button"  value="Edit" id="btn_edit" onclick="editRow(this)"><input type="button"  value="Del"  onclick="delRow(this)">`;
  resetForm();
}

function editRow(td) {
  modal.style.display = "block";
  let selectedRow = td.parentElement.parentElement;
  document.getElementById("new_name").value = selectedRow.cells[1].innerHTML;
  document.getElementById("new_lastname").value =
    selectedRow.cells[2].innerHTML;
  document.getElementById("new_age").value = selectedRow.cells[3].innerHTML;
}
function saveRow(td) {
  var table = document.getElementById("table_data");
  let selectedRow = td.parentElement.parentElement;
  table.selectedRow.cells[1].innerHTML = document.getElementById(
    "new_name"
  ).value;
  table.selectedRow.cells[1].innerHTML = document.getElementById(
    "new_lastname"
  ).value;
  table.selectedRow.cells[1].innerHTML = document.getElementById(
    "new_age"
  ).value;

  // selectedRow.cells[1].innerHTML = document.getElementById("new_name").value;

  // selectedRow.cells[2].innerHTML = document.getElementById(
  //   "new_lastname"
  // ).value;
  // selectedRow.cells[3].innerHTML = document.getElementById("new_age").value;

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
}
