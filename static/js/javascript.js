$(document).ready(function () {
    fixFloat()
    $('#date').attr('value', min_date)
})

// Welcome message
var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow > 20) {
    greeting = 'Good Evening'
} else if (hourNow > 12) {
    greeting = 'Good Afternoon'
} else {
    greeting = 'Good Morning'
};

var min_date = today.toISOString().slice(0, 10)
console.log(min_date)

$('#greetingMessage').html(greeting);

// Adds a row for the tables with changing name attribute
var rowIndex = 1;

function createRow() {
    rowIndex++;
    $('#session_table').append(` <tr>
    <td><input class="container-fluid" type="text" name="session_exercise_${rowIndex}" required></td>
    <td><input class="container-fluid" type="type" name="session_sets_${rowIndex}" required></td>
    <td><input class="container-fluid d-flex justify-content-end" type="type" name="session_weight_${rowIndex}" required></td>
    <td class="unit-td">${unitSelected}</td>
</tr>`)
    console.log('working')
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
};

// Styles the session table
var sessionTable = document.getElementsByClassName('session-table');
var mainColour = 'rgb(136, 227, 255)';
var firstColour = 'rgb(220,220,220)';
var secondaryColour = 'rgb(240,240,240)';

function tableColour(num) {
    var newYearTableRow = sessionTable[num].getElementsByTagName('tr');
    for (i = 0; i < newYearTableRow.length; i++) {
        if (i == 0) {
            newYearTableRow[i].classList.add('session-header');
        } else if (i % 2 == 0) {
            newYearTableRow[i].style.backgroundColor = firstColour;
        } else {
            newYearTableRow[i].style.backgroundColor = secondaryColour;
        }
    };
};
for (k = 0; k < sessionTable.length; k++) {
    tableColour(k);
}

// changing the expand text
$('.expand-button').html('Expand')
$('.expand-button').on('click', function () {
    console.log(this.text)
    if (this.text == 'Expand') {
        $(this).html('Close');
    } else {
        $(this).html('Expand');
    }
})

// save the user's unit choice to the local storage
$('#unit').on('click', function () {
    var unit = $('#unit').val();
    localStorage.setItem('unit', unit);
})

// convert a float into an interger
var numberUnit = document.getElementsByClassName('check-number-float')
var distance_convertion = document.getElementsByClassName('distance_convertion')

function fixFloat() {
    for (i = 0; i < numberUnit.length; i++) {
        unitNum = numberUnit[i].textContent
        unitNum = parseFloat(unitNum).toFixed(1)
        numberUnit[i].innerHTML = unitNum;
    }
    for (i = 0; i < distance_convertion.length; i++) {
        unitDistance = distance_convertion[i].textContent
        unitDistance = parseFloat(unitDistance).toFixed(2)
        distance_convertion[i].innerHTML = unitDistance;
    }
}

// add session table
var unitSelected;
var distanceSelected;

function addSessionTable() {
    var typeSelected = $('#session-type-option option:selected').text()
    unitSelected = $('#session-unit-option option:selected').text()
    distanceSelected = $('#session-distance-option option:selected').text()
    var powerliftingTable = `<div class="row p-0 m-0">
    <div class="col-12 d-flex align-items-end">
        <h3 class="float-left mr-3">Training Session</h3>
        <h5 class="main-colour-text">Powerlifting</h5>
    </div>
    </div>
    <table class="session-table container-fluid mt-3" id="session_table">
    <tr>
        <th>Exercise:</th>
        <th>Sets / Reps:</th>
        <th>Weight:</th>
        <th class="unit-td"><i class="fas fa-balance-scale"></i></th>
    </tr>
    <tr>
        <td><input class="container-fluid" type="text" name="session_exercise_1" required></td>
        <td><input class="container-fluid" type="type" name="session_sets_1" required></td>
        <td><input class="container-fluid" type="type" name="session_weight_1" required></td>
        <td class="unit-td">${unitSelected}</td>
    </tr>
    </table>
    <div class="row">
        <div class="col-6 d-flex align-items-end">
        <p class="m-0 p-0">Notes:</p>
        </div>
        <div class="col-6">
        <a class="btn btn-dark text-light border my-3 float-right" onclick="createRow()">Add Row +</a>
        </div>
    </div>
    
    <textarea name="notes" class="container-fluid float-left form-control mb-3"></textarea>
    <div class="row d-flex justify-content-end">

    <div class="col-6">
    <button class="btn main-colour container-fluid text-dark border float-right" type="submit" name="action">Done</button>
    </div>
    </div>`
    var runningTable = `<div class="row p-0 m-0">
    <div class="col-12 d-flex align-items-end">
    <h3 class="float-left mr-3">Training Session</h3>
    <h5 class="main-colour-text">Running</h5>
    </div>
    </div>
    <table class="session-table container-fluid mt-3" id="addSessionTable">
    <tr>
        <th>Distance (${distanceSelected}) :</th>
    </tr>
    <tr>
        <td><input class="container-fluid" type="text" name="distance"></td>
    </tr>
    </table>
    <div class="row">
        <div class="col-6 d-flex align-items-end">
        <p class="m-0 p-0">Notes:</p>
        </div>
        <div class="col-6">
        <a class="btn btn-dark text-light border my-3 float-right" onclick="createRow()">Add Row +</a>
        </div>
    </div>
    
    <textarea name="notes" class="container-fluid float-left form-control mb-3"></textarea>
    <div class="row">
    <div class="col-6 pr-0">
  
    </div>
    <div class="col-6">
    <button class="btn main-colour container-fluid text-dark border float-right" type="submit" name="action">Done</button>
    </div>
    </div>`
    console.log(typeSelected)
    console.log(unitSelected)
    if (typeSelected == 'Powerlifting') {
        $('#addSessionTable').html(powerliftingTable)
    } else if (typeSelected == 'Running') {
        $('#addSessionTable').html(runningTable)
    }
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
}

// change to unit or distance depending on the users choice of session type

$('#session-type-option').on('mouseleave', function  () {
    usersChoice = $(this).val();
    if (usersChoice == 'powerlifting') {
        $('#unitOrDistance').html(`
        <label>Unit:</label>
        <select id="session-unit-option" name="session_unit" class="form-control container-fluid" required>
            <option value="kg">KG</option>
            <option value="lb">LB</option>
        </select>
        `)
    } else if (usersChoice == 'running') {
        $('#unitOrDistance').html(`
        <label>Distance:</label>
        <select id="session-distance-option" name="session_unit" class="form-control container-fluid" required>
            <option value="miles">Miles</option>
            <option value="km">km</option>
        </select>
        `)
    }
});