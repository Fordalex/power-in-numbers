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

// shows the back to the top button on scroll

window.onscroll = function () { myFunction() };

function myFunction() {
    if (document.documentElement.scrollTop > 350) {
        $('#back-to-top').show()
    } else {
        $('#back-to-top').hide()
    }
}

// After the user presses the seach button to filter the sesions, this will scroll them to the content.

// var title = document.getElementById("session_title");
// title.scrollIntoView({ behavior: 'smooth' });

// back to the top function

function backToTop() {
    var top = document.getElementById("top");
    top.scrollIntoView({ behavior: 'smooth' });
}


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
var toFixed1 = document.getElementsByClassName('toFixed1')
var toFixed2 = document.getElementsByClassName('toFixed2')

function fixFloat() {
    for (i = 0; i < toFixed1.length; i++) {
        unitNum = toFixed1[i].textContent
        unitNum = parseFloat(unitNum).toFixed(1)
        toFixed1[i].innerHTML = unitNum;
    }
    for (i = 0; i < toFixed2.length; i++) {
        unitDistance = toFixed2[i].textContent
        console.log(unitDistance)
        unitDistance = parseFloat(unitDistance).toFixed(2)
        console.log(unitDistance)
        toFixed2[i].innerHTML = unitDistance;
        console.log('next')
    }
}

// add session table
var unitSelected;
var distanceSelected;

function addSessionTable() {
    $('#continueTableButton').remove()
    var typeSelected = $('#session-type-option option:selected').text()
    unitSelected = $('#session-unit-option option:selected').text()
    distanceSelected = $('#session-distance-option option:selected').text()
    var powerliftingTable = `<div class="row p-0 m-0 animated fadeInUp faster"  id="sessionTable">
                                <div class="col-12 d-flex align-items-end p-0">
                                    <h3 class="float-left mr-3">Training Session</h3>
                                    <h5 class="main-colour-text">Powerlifting</h5>
                                </div>
                                <div class="col-12 p-0">
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
                                </div>
                                <div class="col-6 d-flex align-items-end">
                                    <p class="m-0 p-0">Notes:</p>
                                </div>
                                <div class="col-6 p-0">
                                    <a class="btn btn-dark text-light border my-3 float-right" onclick="createRow()">Add Row +</a>
                                </div>
                                <div class="col-12 p-0">
                                    <textarea name="notes" class="container-fluid float-left form-control mb-3"></textarea>
                                </div>
                                <div class="col-12 p-0">
                                    <button class="btn main-colour container-fluid text-dark border float-right mb-3" type="submit" name="action">Done</button>
                                </div>
                            </div>`
    var runningTable = `<div class="row p-0 m-0 animated fadeInUp faster" id="sessionTable">
                        <div class="col-12 d-flex align-items-end p-0">
                            <h3 class="float-left mr-3">Training Session</h3>
                            <h5 class="main-colour-text">Running</h5>
                        </div>
                        <div class="col-12 p-0">
                            <table class="session-table container-fluid mt-3" id="addSessionTable">
                                <tr>
                                    <th>Distance (${distanceSelected}) :</th>
                                </tr>
                                <tr>
                                    <td><input class="container-fluid" type="text" name="distance"></td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-6 d-flex align-items-end">
                            <p class="m-0 p-0 mt-2">Notes:</p>
                        </div>
                        <div class="col-12 p-0">
                            <textarea name="notes" class="container-fluid float-left form-control mb-3"></textarea>
                        </div>
                        <div class="col-12 p-0">
                            <button class="btn main-colour container-fluid text-dark border float-right mb-3" type="submit" name="action">Done</button>
                        </div>
                    </div>`
    var walkingTable = `<div class="row p-0 m-0 animated fadeInUp faster" id="sessionTable">
                    <div class="col-12 d-flex align-items-end p-0">
                        <h3 class="float-left mr-3">Training Session</h3>
                        <h5 class="main-colour-text">Walking</h5>
                    </div>
                    <div class="col-12 p-0">
                        <table class="session-table container-fluid mt-3" id="addSessionTable">
                            <tr>
                                <th>Distance (${distanceSelected}) :</th>
                            </tr>
                            <tr>
                                <td><input class="container-fluid" type="text" name="distance"></td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-6 d-flex align-items-end">
                        <p class="m-0 p-0 mt-2">Notes:</p>
                    </div>
                    <div class="col-12 p-0">
                        <textarea name="notes" class="container-fluid float-left form-control mb-3"></textarea>
                    </div>
                    <div class="col-12 p-0">
                        <button class="btn main-colour container-fluid text-dark border float-right mb-3" type="submit" name="action">Done</button>
                    </div>
                </div>`
    var cyclingTable = `<div class="row p-0 m-0 animated fadeInUp faster" id="sessionTable">
                <div class="col-12 d-flex align-items-end p-0">
                    <h3 class="float-left mr-3">Training Session</h3>
                    <h5 class="main-colour-text">Cycling</h5>
                </div>
                <div class="col-12 p-0">
                    <table class="session-table container-fluid mt-3" id="addSessionTable">
                        <tr>
                            <th>Distance (${distanceSelected}) :</th>
                        </tr>
                        <tr>
                            <td><input class="container-fluid" type="text" name="distance"></td>
                        </tr>
                    </table>
                </div>
                <div class="col-6 d-flex align-items-end">
                    <p class="m-0 p-0 mt-2">Notes:</p>
                </div>
                <div class="col-12 p-0">
                    <textarea name="notes" class="container-fluid float-left form-control mb-3"></textarea>
                </div>
                <div class="col-12 p-0">
                    <button class="btn main-colour container-fluid text-dark border float-right mb-3" type="submit" name="action">Done</button>
                </div>
            </div>`
    console.log(typeSelected)
    console.log(unitSelected)
    if (typeSelected == 'Powerlifting') {
        $('#addSessionTable').html(powerliftingTable)
    } else if (typeSelected == 'Running') {
        $('#addSessionTable').html(runningTable)
    } else if (typeSelected == 'Cycling') {
        $('#addSessionTable').html(cyclingTable)
    } else if (typeSelected == 'Walking') {
        $('#addSessionTable').html(walkingTable)
    }
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
}

// add session form next buttons

function addSessionFirstNext() {
    usersChoice = $('#session-type-option').val();
    if (usersChoice == 'powerlifting') {
        $('#unitOrDistance').html(`
        <div id="unitContainer" class="animated fadeIn faster">
            <label>Unit:</label>
            <select onclick="unitContinueButton()" id="session-unit-option" name="session_unit" class="form-control container-fluid" required>
                <option value="kg">KG</option>
                <option value="lb">LB</option>
            </select>
            <div id="secondNextContainer">
                <div class="btn btn-dark container-fluid my-3" onclick="addSessionTable()" id="continueTableButton">Continue</div>
            </div>
        </div>
        `)
    } else if (usersChoice == 'running' || usersChoice == 'cycling' || usersChoice == 'walking') {
        $('#unitOrDistance').html(`
        <div id="unitContainer" class="animated fadeIn faster">
            <label>Distance:</label>
            <select onclick="unitContinueButton()" id="session-distance-option" name="session_unit" class="form-control container-fluid" required>
                <option value="mile">Mile</option>
                <option value="km">km</option>
            </select>
            <div id="secondNextContainer">
                <div class="btn btn-dark container-fluid my-3" onclick="addSessionTable()" id="continueTableButton">Continue</div>
            </div>
        </div>
        `)
    }
    $('#firstNextButton').remove()
}

function unitContinueButton() {
    $('#secondNextContainer').html(`<div class="btn btn-dark container-fluid my-3" onclick="addSessionTable()" id="continueTableButton">Next</div>`)

}

function backToFormStart() {
    $('#firstNextButtonContainer').html(`
    <button id="firstNextButton" class="btn btn-dark unit-button my-3 container-fluid px-0"
    name="unit" onclick="addSessionFirstNext()" >Next</button>
    `)
    $('#unitContainer').remove()
    $('#sessionTable').remove()
}

// add record table


var unitSelectedRecord;
var distanceSelectedRecord;

function addSessionTableRecord() {
    $('#continueTableButton').remove()
    var typeSelected = $('#session-type-option option:selected').text()
    unitSelectedRecord = $('#session-unit-option option:selected').text()
    distanceSelectedRecord = $('#session-distance-option option:selected').text()
    var powerliftingTable = `<div class="row p-0 m-0 animated fadeInUp faster"  id="sessionTable">
                                <div class="col-12 d-flex align-items-end p-0">
                                    <h3 class="float-left mr-3">Training Session</h3>
                                    <h5 class="main-colour-text">Powerlifting</h5>
                                </div>
                                <div class="col-12 p-0">
                                    <table class="session-table container-fluid mt-3" id="session_table">
                                        <tr>
                                            <th>Exercise:</th>
                                            <th>Sets / Reps:</th>
                                            <th>Weight:</th>
                                            <th class="unit-td"><i class="fas fa-balance-scale"></i></th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <select name="session_exercise_1" required> 
                                                    <option>Squat</option>
                                                    <option>Bench Press</option>
                                                    <option>Deadlift</option>
                                                    <option>Overhead Press</option>
                                                    <option>Row</option>
                                                </select>
                                            </td>
                                            <td><input class="container-fluid" type="type" name="session_sets_1" required></td>
                                            <td><input class="container-fluid" type="type" name="session_weight_1" required></td>
                                            <td class="unit-td">${unitSelectedRecord}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="col-6 d-flex align-items-end">
                                    <p class="m-0 p-0">Notes:</p>
                                </div>
                                <div class="col-12 p-0">
                                    <textarea name="notes" class="container-fluid float-left form-control mb-3"></textarea>
                                </div>
                                <div class="col-12 p-0">
                                    <button class="btn main-colour container-fluid text-dark border float-right mb-3" type="submit" name="action">Done</button>
                                </div>
                            </div>`
    var runningTable = `<div class="row p-0 m-0 animated fadeInUp faster" id="sessionTable">
                        <div class="col-12 d-flex align-items-end p-0">
                            <h3 class="float-left mr-3">Training Session</h3>
                            <h5 class="main-colour-text">Running</h5>
                        </div>
                        <div class="col-12 p-0">
                            <table class="session-table container-fluid mt-3" id="addSessionTable">
                                <tr>
                                    <th>Distance (${distanceSelectedRecord}) :</th>
                                </tr>
                                <tr>
                                    <td><input class="container-fluid" type="text" name="distance"></td>
                                </tr>
                            </table>
                        </div>
                        <div class="col-6 d-flex align-items-end">
                            <p class="m-0 p-0 mt-2">Notes:</p>
                        </div>
                        <div class="col-12 p-0">
                            <textarea name="notes" class="container-fluid float-left form-control mb-3"></textarea>
                        </div>
                        <div class="col-12 p-0">
                            <button class="btn main-colour container-fluid text-dark border float-right mb-3" type="submit" name="action">Done</button>
                        </div>
                    </div>`
    var walkingTable = `<div class="row p-0 m-0 animated fadeInUp faster" id="sessionTable">
                    <div class="col-12 d-flex align-items-end p-0">
                        <h3 class="float-left mr-3">Training Session</h3>
                        <h5 class="main-colour-text">Walking</h5>
                    </div>
                    <div class="col-12 p-0">
                        <table class="session-table container-fluid mt-3" id="addSessionTable">
                            <tr>
                                <th>Distance (${distanceSelectedRecord}) :</th>
                            </tr>
                            <tr>
                                <td><input class="container-fluid" type="text" name="distance"></td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-6 d-flex align-items-end">
                        <p class="m-0 p-0 mt-2">Notes:</p>
                    </div>
                    <div class="col-12 p-0">
                        <textarea name="notes" class="container-fluid float-left form-control mb-3"></textarea>
                    </div>
                    <div class="col-12 p-0">
                        <button class="btn main-colour container-fluid text-dark border float-right mb-3" type="submit" name="action">Done</button>
                    </div>
                </div>`
    var cyclingTable = `<div class="row p-0 m-0 animated fadeInUp faster" id="sessionTable">
                <div class="col-12 d-flex align-items-end p-0">
                    <h3 class="float-left mr-3">Training Session</h3>
                    <h5 class="main-colour-text">Cycling</h5>
                </div>
                <div class="col-12 p-0">
                    <table class="session-table container-fluid mt-3" id="addSessionTable">
                        <tr>
                            <th>Distance (${distanceSelectedRecord}) :</th>
                        </tr>
                        <tr>
                            <td><input class="container-fluid" type="text" name="distance"></td>
                        </tr>
                    </table>
                </div>
                <div class="col-6 d-flex align-items-end">
                    <p class="m-0 p-0 mt-2">Notes:</p>
                </div>
                <div class="col-12 p-0">
                    <textarea name="notes" class="container-fluid float-left form-control mb-3"></textarea>
                </div>
                <div class="col-12 p-0">
                    <button class="btn main-colour container-fluid text-dark border float-right mb-3" type="submit" name="action">Done</button>
                </div>
            </div>`
    console.log(typeSelected)
    console.log(unitSelected)
    if (typeSelected == 'Powerlifting') {
        $('#addSessionTable').html(powerliftingTable)
    } else if (typeSelected == 'Running') {
        $('#addSessionTable').html(runningTable)
    } else if (typeSelected == 'Cycling') {
        $('#addSessionTable').html(cyclingTable)
    } else if (typeSelected == 'Walking') {
        $('#addSessionTable').html(walkingTable)
    }
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
}

function addSessionFirstNextRecord() {
    usersChoice = $('#session-type-option').val();
    if (usersChoice == 'powerlifting') {
        $('#unitOrDistance').html(`
        <div id="unitContainer" class="animated fadeIn faster">
            <label>Unit:</label>
            <select onclick="unitContinueButton()" id="session-unit-option" name="session_unit" class="form-control container-fluid" required>
                <option value="kg">KG</option>
                <option value="lb">LB</option>
            </select>
            <div id="secondNextContainer">
                <div class="btn btn-dark container-fluid my-3" onclick="addSessionTableRecord()" id="continueTableButton">Continue</div>
            </div>
        </div>
        `)
    } else if (usersChoice == 'running' || usersChoice == 'cycling' || usersChoice == 'walking') {
        $('#unitOrDistance').html(`
        <div id="unitContainer" class="animated fadeIn faster">
            <label>Distance:</label>
            <select onclick="unitContinueButton()" id="session-distance-option" name="session_unit" class="form-control container-fluid" required>
                <option value="mile">Mile</option>
                <option value="km">km</option>
            </select>
            <div id="secondNextContainer">
                <div class="btn btn-dark container-fluid my-3" onclick="addSessionTableRecord()" id="continueTableButton">Continue</div>
            </div>
        </div>
        `)
    }
    $('#firstNextButton').remove()
}

function unitContinueButtonRecord() {
    $('#secondNextContainer').html(`<div class="btn btn-dark container-fluid my-3" onclick="addSessionTable()" id="continueTableButton">Next</div>`)

}

function backToFormStartRecord() {
    $('#firstNextButtonContainer').html(`
    <button id="firstNextButton" class="btn btn-dark unit-button my-3 container-fluid px-0"
    name="unit" onclick="addSessionFirstNext()" >Next</button>
    `)
    $('#unitContainer').remove()
    $('#sessionTable').remove()
}