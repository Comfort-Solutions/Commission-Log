// DOM Objects

const form = document.querySelector('form');
const inputDate = document.getElementById('inputDate');
const inputJobName = document.getElementById('inputJobName');
const inputLb = document.getElementById('inputLb');
const inputOz = document.getElementById('inputOz');
const addButton = document.getElementById('addButton');
const clearButton = document.getElementById('clearButton');
const closeButton = document.getElementById('closeButton');

//Submitted Data Variables

let date = '';
let jobName = '';
let lb = 0;
let oz = 0;
let ref = '';

//Functions

function addToLog() {

  date = inputDate.value;
  jobName = inputJobName.value;
  lb = inputLb.value;
  oz = inputOz.value;
  refType = document.querySelector('input[name = "refRadios"]:checked').value;
}

function setToStorage() {
  let currentLogArray = [];
  currentLogArray.push(date);
  currentLogArray.push(jobName);
  currentLogArray.push(lb);
  currentLogArray.push(oz);
  currentLogArray.push(refType);
  localStorage.setItem(`log ${localStorage.length + 1}`, JSON.stringify(currentLogArray));
  currentLogArray = [];
  localStorage.removeItem('currentLogArray');
  
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
  console.log('clear button pressed')
});
