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
    let jobName = row.insertCell(2);
    $(jobName).addClass(`${localStorage.key(i)}`);
    jobName.innerHTML = loopArray[1];
    let pounds = row.insertCell(3);
    $(pounds).addClass(`${localStorage.key(i)}`);
    pounds.innerHTML = loopArray[2];
    let ounces = row.insertCell(4);
    $(ounces).addClass(`${localStorage.key(i)}`);
    ounces.innerHTML = loopArray[3];
    let refrigerant = row.insertCell(5);
    $(refrigerant).addClass(`${localStorage.key(i)}`);
    refrigerant.innerHTML = loopArray[4];
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
    let filteredJobName = row.insertCell(1);
    filteredJobName.innerHTML = filteredLogArray[1];
    let filteredPounds = row.insertCell(2);
    filteredPounds.innerHTML = filteredLogArray[2];
    let filteredOunces = row.insertCell(3);
    filteredOunces.innerHTML = filteredLogArray[3];
    let filteredRefrigerant = row.insertCell(4);
    filteredRefrigerant.innerHTML = filteredLogArray[4];
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
      pdf.save('refrigerant-log.pdf');
    });
}

populateLog();
