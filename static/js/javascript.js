$(document).ready(function () {
    fixFloat();
    $('#date').attr('value', min_date);
});

// Welcome message
var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow > 20) {
    greeting = 'Good Evening';
} else if (hourNow > 12) {
    greeting = 'Good Afternoon';
} else {
    greeting = 'Good Morning';
}

var min_date = today.toISOString().slice(0, 10);

$('#greetingMessage').html(greeting);

// shows the back to the top button on scroll

window.onscroll = function () { myFunction() }

function myFunction() {
    if (document.documentElement.scrollTop > 350) {
        $('#back-to-top').show();
    } else {
        $('#back-to-top').hide();
    }
}


// back to the top function

function backToTop() {
    var top = document.getElementById("top");
    top.scrollIntoView({ behavior: 'smooth' });
}


// Adds a row for the tables with changing name attribute
var rowIndex = 1;

function createRow() {
    rowIndex++;
    $('#session_table').append(` <tr id="table_row_${rowIndex}">
    <td><input class="container-fluid" type="text" name="session_exercise_${rowIndex}" required></td>
    <td class="d-flex justify-content-center">
    <input class="container-fluid float-left" type="number" step="1" name="session_sets_${rowIndex}" required>X
    <input class="container-fluid" type="number" step="1" name="session_reps_${rowIndex}" required></td>                              
    <td><input class="container-fluid d-flex justify-content-end" type="number" step="0.25" name="session_weight_${rowIndex}" required></td>
    <td class="unit-td">${unitSelected}</td>
</tr>`);
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
}

// Removes the table row for the tables with changing name attribute

function removeRow() {
    var targetRow = `#table_row_${rowIndex}`;
    $(targetRow).remove();
    rowIndex--;
}

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
    }
}
for (k = 0; k < sessionTable.length; k++) {
    tableColour(k);
}

// changing the expand text
$('.expand-button').html('Expand');
$('.expand-button').on('click', function () {
    if (this.text == 'Expand') {
        $(this).html('Close');
    } else {
        $(this).html('Expand');
    }
});

// save the user's unit choice to the local storage
$('#unit').on('click', function () {
    var unit = $('#unit').val();
    localStorage.setItem('unit', unit);
});

// convert a float into an interger
var toFixed0 = document.getElementsByClassName('toFixed0');
var toFixed1 = document.getElementsByClassName('toFixed1');
var toFixed2 = document.getElementsByClassName('toFixed2');

function fixFloat() {
    for (i = 0; i < toFixed0.length; i++) {
        unitNum = toFixed0[i].textContent;
        unitNum = parseFloat(unitNum).toFixed(0);
        toFixed0[i].innerHTML = unitNum;
    }
    for (i = 0; i < toFixed1.length; i++) {
        unitNum = toFixed1[i].textContent;
        unitNum = parseFloat(unitNum).toFixed(1);
        toFixed1[i].innerHTML = unitNum;
    }
    for (i = 0; i < toFixed2.length; i++) {
        unitDistance = toFixed2[i].textContent;
        unitDistance = parseFloat(unitDistance).toFixed(2);
        toFixed2[i].innerHTML = unitDistance;
    }
}


// opening all the session cards

function openAllSessions() {
    sessionCount = $('#searchResultCount').text();
    for (i = 0; i < sessionCount + 1; i++) {
        $('#expand'.concat(i.toString())).collapse('show');
    }
    var boxContent = $('.expand-button').text('Close');
}

function closeAllSessions() {
    sessionCount = $('#searchResultCount').text();
    for (i = 0; i < sessionCount + 1; i++) {
        $('#expand'.concat(i.toString())).collapse('hide');
    }
    var boxContent = $('.expand-button').text('Expand');
}