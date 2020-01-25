$(document).ready(function () {
    fixFloat()
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

$('#greetingMessage').html(greeting);

// Adds a row for the tables with changing name attribute
var rowIndex = 1;

function createRow() {
    rowIndex++;
    $('#please').append(` <tr>
    <td><input class="container-fluid" type="text" name="session_exercise_${rowIndex}"></td>
    <td><input class="container-fluid" type="type" name="session_sets_${rowIndex}"></td>
    <td><input class="container-fluid d-flex justify-content-end" type="type" name="session_weight_${rowIndex}"></td>
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

function fixFloat() {
    for (i = 0; i < numberUnit.length; i++) {
        unitNum = numberUnit[i].textContent
        numberUnit[i].innerHTML = parseInt(unitNum);
    }
}

$('#training-session-id').on('click', function () {
    console.log('working2222')
})


// add session table
var unitSelected = $('#session-unit-option option:selected').text()

function addSessionTable() {
    var typeSelected = $('#session-type-option option:selected').text()
    unitSelected = $('#session-unit-option option:selected').text()
    var powerliftingTable = `<div class="row p-0 m-0">
    <div class="col-12">
        <h3 class="my-3">Training Session</h3>
    </div>
    </div>
    <table class="session-table container-fluid mt-3" id="please">
    <tr>
        <th>Exercise:</th>
        <th>Sets / Reps:</th>
        <th>Weight:</th>
        <th class="unit-td"><i class="fas fa-balance-scale"></i></th>
    </tr>
    <tr>
        <td><input class="container-fluid" type="text" name="session_exercise_1"></td>
        <td><input class="container-fluid" type="type" name="session_sets_1"></td>
        <td><input class="container-fluid" type="type" name="session_weight_1"></td>
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
    <div class="row">
    <div class="col-6 pr-0">
    <select class="form-control mb-2 " name="session_type">
        <option value="powerlifting">Powerlifting</option>
        <option value="olympiclifting">Olympic Lifting</option>
    </select>
    </div>
    <div class="col-6">
    <button class="btn main-colour container-fluid text-dark border float-right" type="submit" name="action">Done</button>
    </div>
    </div>`
    var runningTable = `<div class="row p-0 m-0">
    <div class="col-12">
        <h3 class="my-3">Training Session</h3>
    </div>
    </div>
    <table class="session-table container-fluid mt-3" id="addSessionTable">
    <tr>
        <th>Distance:</th>
        <th>Time:</th>
    </tr>
    <tr>
        <td><input class="container-fluid" type="text" name="session_exercise_1"></td>
        <td><input class="container-fluid" type="type" name="session_sets_1"></td>
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
    <select class="form-control mb-2 " name="session_type">
        <option value="running">Running</option>
        <option value="olympiclifting">Olympic Lifting</option>
    </select>
    </div>
    <div class="col-6">
    <button class="btn main-colour container-fluid text-dark border float-right" type="submit" name="action">Done</button>
    </div>
    </div>`
    console.log(typeSelected)
    console.log(unitSelected)
    if (typeSelected == 'Powerlifting') {
        $('#addSessionTable').append(powerliftingTable)
    } else if (typeSelected == 'Running') {
        $('#addSessionTable').append(runningTable)
    }
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
    $('#chooseTable').remove()
}