// DOM Objects

const form = document.querySelector('form');
const inputDate = document.getElementById('inputDate');
const inputCustomerName = document.getElementById('inputCustomerName');
const inputExpectedCommission = document.getElementById('inputExpectedCommission');
const inputSalePrice  = document.getElementById('inputSalePrice');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const closeButton = document.getElementById('closeButton');

//Submitted Data Variables

let date = '';
let customerName = '';
let salePrice = 0;
let expectedCommission = 0;
let commissionType = '';

//Functions

function addToLog() {

  date = inputDate.value;
  customerName = inputCustomerName.value;
  salePrice = inputSalePrice.value;
  expectedCommission = inputExpectedCommission.value;
  commissionType = document.querySelector('input[name = "typeRadios"]:checked').value;
}

function setToStorage() {
  let currentLogArray = [];
  currentLogArray.push(date);
  currentLogArray.push(customerName);
  currentLogArray.push(commissionType);
  currentLogArray.push(salePrice);
  currentLogArray.push(expectedCommission);
  localStorage.setItem(`log ${localStorage.length + 1}`, JSON.stringify(currentLogArray));
  currentLogArray = [];
  
}

function formReset() {
  form.reload();
}

//Event Listeners

form.addEventListener('submit', function (e) {
  e.preventDefault();
  addToLog();
  setToStorage();
  $('#staticBackdrop').modal('toggle')
})

closeButton.addEventListener("focusout", function () {
  clearButton.click();
});
