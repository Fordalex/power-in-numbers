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

// create the week
var userWeeks
function addWeeks() {
    userWeeks = $('#plan_many_weeks').val()
    $('#plan_training_days').append('<h5>Tick The Training Days</h5>')
    for (i = 0; i < userWeeks; i++) {
        $('#plan_training_days').append(`
                                        <h6 class="col-12 m-0 p-0">Week ${i + 1}</h6>
                                        <div class="col-12 m-0 p-0 d-flex justify-content-around">
                                            <div>
                                                <label class="d-block">Mon</label>
                                                <input type="checkbox" id="mon-${i + 1}">
                                            </div>
                                            <div>
                                                <label class="d-block">Tues</label>
                                                <input type="checkbox" id="tue-${i + 1}">
                                            </div>
                                            <div>
                                                <label class="d-block">Wed</label>
                                                <input type="checkbox" id="wed-${i + 1}">
                                            </div>
                                            <div>
                                                <label class="d-block">Thur</label>
                                                <input type="checkbox" id="thur-${i + 1}">
                                            </div>
                                            <div>
                                                <label class="d-block">Fri</label>
                                                <input type="checkbox" id="fri-${i + 1}">
                                            </div>
                                            <div>
                                                <label class="d-block">Sat</label>
                                                <input type="checkbox" id="sat-${i + 1}">
                                            </div>
                                            <div>
                                                <label class="d-block">Sun</label>
                                                <input type="checkbox" id="sun-${i + 1}">
                                            </div>
                                        </div>
        `)
    }
    $('#plan_training_days').append(`
                                    <div class="col-12 m-0 p-0">
                                        <button class="btn main-colour my-3 float-right" onclick="createPlanTable()">Done</button>
                                    </div>
    `)
}

// create the table for the user to fill in the exercise and sets x reps.
function createPlanTable() {
    for (i = 0; i < userWeeks; i++) {
        $('#plan_table').append(`
                        <div class="col-12 m-0 p-0">
                            <hr>
                        </div>
        `)
        $('#plan_table').append(`
                            <div class="col-12 m-0 p-0">
                                <h4>Week ${i + 1}</h4>
                            </div>
        `)
        var mon = `#mon-${i + 1}`
        if ($(mon).is(":checked")) {
            $('#plan_table').append(
                `
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-3 p-0">Monday</h6>
                </div>
                <div class="col-12 p-0 m-0">
                    <table class="session-table even-table-width" id="mon_row_${i + 1}_table">
                        <tr>
                            <th>Exercise</th>
                            <th>Sets x Reps</th>
                            <th>Rest</th>
                        </tr>
                        <tr>
                            <td><input type="text"></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="session_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="session_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                    <a class="btn btn-danger text-light container-fluid mr-2">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="mon_row_${i + 1}">Add Row +</a>
                </div>
            `)
        }
        var tue = `#tue-${i + 1}`
        if ($(tue).is(":checked")) {
            $('#plan_table').append(
                `
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-3 p-0">Tuesday</h6>
                </div>
                <div class="col-12 p-0 m-0">
                    <table class="session-table even-table-width" id="tue_row_${i + 1}_table">
                        <tr>
                            <th>Exercise</th>
                            <th>Sets x Reps</th>
                            <th>Rest</th>
                        </tr>
                        <tr>
                            <td><input type="text"></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="session_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="session_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                    <a class="btn btn-danger text-light container-fluid mr-2">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="tue_row_${i + 1}">Add Row +</a>
                </div>
            `)
        }
        var wed = `#wed-${i + 1}`
        if ($(wed).is(":checked")) {
            $('#plan_table').append(
                `
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-3 p-0">Wednesday</h6>
                </div>
                <div class="col-12 p-0 m-0">
                    <table class="session-table even-table-width" id="wed_row_${i + 1}_table">
                        <tr>
                            <th>Exercise</th>
                            <th>Sets x Reps</th>
                            <th>Rest</th>
                        </tr>
                        <tr>
                            <td><input type="text"></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="session_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="session_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                <a class="btn btn-danger text-light container-fluid mr-2">Remove Row -</a>
                <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="wed_row_${i + 1}">Add Row +</a>
            </div>
            `)
        }
        var thur = `#thur-${i + 1}`
        if ($(thur).is(":checked")) {
            $('#plan_table').append(
                `
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-3 p-0">Thursday</h6>
                </div>
                <div class="col-12 p-0 m-0">
                    <table class="session-table even-table-width" id="thur_row_${i + 1}_table">
                        <tr>
                            <th>Exercise</th>
                            <th>Sets x Reps</th>
                            <th>Rest</th>
                        </tr>
                        <tr>
                            <td><input type="text"></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="session_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="session_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                    <a class="btn btn-danger text-light container-fluid mr-2">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="thur_row_${i + 1}">Add Row +</a>
                </div>
            `)
        }
        var fri = `#fri-${i + 1}`
        if ($(fri).is(":checked")) {
            $('#plan_table').append(
                `
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-3 p-0">Friday</h6>
                </div>
                <div class="col-12 p-0 m-0">
                    <table class="session-table even-table-width" id="fri_row_${i + 1}_table">
                        <tr>
                        <th>Exercise</th>
                        <th>Sets x Reps</th>
                        <th>Rest</th>
                        </tr>
                        <tr>
                            <td><input type="text"></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="session_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="session_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                    <a class="btn btn-danger text-light container-fluid mr-2">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="fri_row_${i + 1}">Add Row +</a>
                </div>
            `)
        }
        var sat = `#sat-${i + 1}`
        if ($(sat).is(":checked")) {
            $('#plan_table').append(
                `
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-3 p-0">Saturday</h6>
                </div>
                <div class="col-12 p-0 m-0">
                    <table class="session-table even-table-width" id="sat_row_${i + 1}_table">
                        <tr>
                        <th>Exercise</th>
                        <th>Sets x Reps</th>
                        <th>Rest</th>
                        </tr>
                        <tr>
                            <td><input type="text"></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="session_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="session_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                    <a class="btn btn-danger text-light container-fluid mr-2">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="sat_row_${i + 1}">Add Row +</a>
                </div>
            `)
        }
        var sun = `#sun-${i + 1}`
        if ($(sun).is(":checked")) {
            $('#plan_table').append(
                `
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-3 p-0">Sunday</h6>
                </div>
                <div class="col-12 p-0 m-0">
                    <table class="session-table even-table-width" id="sun_row_${i + 1}_table">
                        <tr>
                            <th>Exercise</th>
                            <th>Sets x Reps</th>
                            <th>Rest</th>
                        </tr>
                        <tr>
                            <td><input type="text" class="container-fluid"></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="session_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="session_reps_1" required>
                            </td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                    <a class="btn btn-danger text-light container-fluid mr-2">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="sun_row_${i + 1}">Add Row +</a>
                </div>
            `)
        }
        $('#plan_table').append(`
                        <div class="col-12 m-0 my-3 p-0">
                            <button class="btn main-gradient float-right">Done</button>
                        </div>
        `)
    }
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
}

$('body').on('click', '.plan_add_row', function () {
    var targetTable = '#'.concat(this.id, '_table')
    console.log(targetTable)
    $(targetTable).append(`
                            <tr>
                                <td><input type="text"></td>
                                <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="session_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="session_reps_1" required>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-around">
                                        <input type="number" min="0" class="container-fluid">
                                        <p class="m-0 p-0">Secs</p>
                                    </div>
                                </td>
                            </tr>
    `)
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
});
    

