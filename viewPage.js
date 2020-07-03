const tbody = document.getElementById('tbody');
let log = {};
let filteredLogs = {};
let checkedBoxes = '';
let deleteCheckedBoxes = '';

function populateLog() {
  for (i = 0; i < localStorage.length; i++) {
    let loopArray = JSON.parse(localStorage.getItem(localStorage.key(i)));
    log[`${localStorage.key(i)}`] = loopArray;
    let row = tbody.insertRow();
    let check = row.insertCell(0)
    $(check).addClass(`localStorage.key(i)`);
    check.innerHTML = `<input class = "checkbox ${localStorage.key(i)}"
    type = "checkbox"
    id = "${localStorage.key(i)}Checkbox"
    value = "${localStorage.key(i)}"
    name = "logCheckboxes">`
    let date = row.insertCell(1);
    $(date).addClass(`${localStorage.key(i)}`);
    date.innerHTML = loopArray[0]
    let customerName = row.insertCell(2);
    $(customerName).addClass(`${localStorage.key(i)}`);
    customerName.innerHTML = loopArray[1];
    let commissionType = row.insertCell(3);
    $(commissionType).addClass(`${localStorage.key(i)}`);
    commissionType.innerHTML = loopArray[2];
    let salePrice = row.insertCell(4);
    $(salePrice).addClass(`${localStorage.key(i)}`);
    salePrice.innerHTML = loopArray[3];
    let expectedCommission = row.insertCell(5);
    $(expectedCommission).addClass(`${localStorage.key(i)}`);
    expectedCommission.innerHTML = loopArray[4];
  };
};

function selectedLogs() {
  let counter = 0;
  let checkedBoxes = document.querySelectorAll('input[name = "logCheckboxes"]:checked');
  checkedBoxes.forEach(element => {
    filteredLogs[`${counter}`] = log[`${element.value}`];
    counter++
  })
}
  
function populateFilteredLogTable() {
  for (i = 0; i < Object.values(filteredLogs).length; i++) {
    let filteredLogArray = filteredLogs[i];
    let row = filteredTbody.insertRow();
    let filteredDate = row.insertCell(0);
    filteredDate.innerHTML = filteredLogArray[0]
    let filteredCustomerName = row.insertCell(1);
    filteredCustomerName.innerHTML = filteredLogArray[1];
    let filteredType = row.insertCell(2);
    filteredType.innerHTML = filteredLogArray[2];
    let filteredSalePrice = row.insertCell(3);
    filteredSalePrice.innerHTML = filteredLogArray[3];
    let filteredExpectedCommission = row.insertCell(4);
    filteredExpectedCommission.innerHTML = filteredLogArray[4];
  }
}

function deleteSelectedLogs() {
  deleteCheckedBoxes = document.querySelectorAll('input[name = "logCheckboxes"]:checked');
  deleteCheckedBoxes.forEach(element => {
    localStorage.removeItem(`${element.value}`);
    reloadOnClose();
  });
};

function showModal() {
  selectedLogs();
  populateFilteredLogTable();
  $('#filteredTableModal').modal('toggle');
}

function reloadOnClose() {
  window.location.reload();
}

function downloadNow() {
  domtoimage.toPng(document.getElementById('filteredLogTable'))
    .then((blob) => {
      let pdf = new jsPDF('1', 'pt', [$('#filteredLogTable').width(), $('#filteredLogTable').height()]);
      pdf.addImage(blob, "PNG", 0, 0, $('#filteredLogTable').width(), $('#filteredLogTable').height());
      pdf.save('commission-log.pdf');
    });
}

populateLog();
