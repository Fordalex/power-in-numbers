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
    console.log(userWeeks)
    if (userWeeks >= 1) {
        $('#plan_training_days').append('<h5>Cross The Training Days</h5>')
        for (i = 0; i < userWeeks; i++) {
            $('#plan_training_days').append(`
                                        <h6 class="col-12 m-0 p-0">Week ${i + 1}</h6>
                                        <div class="col-12 m-0 p-0 d-flex justify-content-around">
                                            <div>
                                                <label class="d-block m-0">Mon</label>
                                                <div class="roundedOne my-1">
                                                    <input type="checkbox" value="None" id="mon-${i + 1}"/>
                                                    <label for="mon-${i + 1}"></label>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="d-block m-0">Tue</label>
                                                <div class="roundedOne my-1">
                                                    <input type="checkbox" value="None" id="tue-${i + 1}"/>
                                                    <label for="tue-${i + 1}"></label>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="d-block m-0">Wed</label>
                                                <div class="roundedOne my-1">
                                                    <input type="checkbox" value="None" id="wed-${i + 1}"/>
                                                    <label for="wed-${i + 1}"></label>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="d-block m-0">Thur</label>
                                                <div class="roundedOne my-1">
                                                    <input type="checkbox" value="None" id="thur-${i + 1}"/>
                                                    <label for="thur-${i + 1}"></label>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="d-block m-0">Fri</label>
                                                <div class="roundedOne my-1">
                                                    <input type="checkbox" value="None" id="fri-${i + 1}"/>
                                                    <label for="fri-${i + 1}"></label>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="d-block m-0">Sat</label>
                                                <div class="roundedOne my-1">
                                                    <input type="checkbox" value="None" id="sat-${i + 1}"/>
                                                    <label for="sat-${i + 1}"></label>
                                                </div>
                                            </div>
                                            <div>
                                                <label class="d-block m-0">Sun</label>
                                                <div class="roundedOne my-1">
                                                    <input type="checkbox" value="None" id="sun-${i + 1}"/>
                                                    <label for="sun-${i + 1}"></label>
                                                </div>
                                            </div>
                                         
                                        
                                        </div>
        `)
        }
        $('#plan_training_days').append(`
                                    <div class="col-12 m-0 p-0">
                                        <button class="btn main-colour my-3 float-right" onclick="createPlanTable()">Done</button>
                                    </div>
    `)
        $('#plan_first_container').remove()
    } else {
        $('#weeks-error-message').html('<p class="m-0 text-danger">Value has to be larger than zero.</p>')
    }
}

// create the table for the user to fill in the exercise and sets x reps.
function createPlanTable() {
    $('#plan_table').append(`
    <div class="col-12 m-0 p-0">
        <hr>
    </div>
    `)
    $('#plan_table').append(`
    <div class="col-6 m-0 p-0 pr-2">
        <label>Plan Name</label>
        <input class="form-control mr-3" type="text" name="plan_name">
    </div>
    <div class="col-6 m-0 p-0">
        <label>Plan Type</label>
        <select class="form-control" name="session_type">
            <option value="weightlifting">Weightlifting</option>
        </select>
    </div>
    `)
    for (i = 0; i < userWeeks; i++) {

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
                    <table class="session-table even-table-width" id="mon_week_${i + 1}_table">
                        <tr class="mon_week_${i + 1}_row_count">
                            <th>Exercise</th>
                            <th>Sets x Reps</th>
                            <th>Rest</th>
                        </tr>
                        <tr class="mon_week_${i + 1}_row_count">
                            <td><input type="text" class="container-fluid" name="mon_week_${i + 1}_exercise_1" required></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="mon_week_${i + 1}_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="mon_week_${i + 1}_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid" name="mon_week_${i + 1}_rest_1">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                <a class="btn btn-danger text-light container-fluid mr-2 plan_remove_row" id="mon_week_${i + 1}_remove">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="mon_week_${i + 1}">Add Row +</a>
                </div>
            `)
        } else {
            $('#plan_table').append(`
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-1 p-0">Monday</h6>
                    <p>Rest Day</p>
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
                    <table class="session-table even-table-width" id="tue_week_${i + 1}_table">
                        <tr class="tue_week_${i + 1}_row_count">
                            <th>Exercise</th>
                            <th>Sets x Reps</th>
                            <th>Rest</th>
                        </tr>
                        <tr class="tue_week_${i + 1}_row_count">
                            <td><input type="text" class="container-fluid" name="tue_week_${i + 1}_exercise_1" required></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="tue_week_${i + 1}_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1"  name="tue_week_${i + 1}_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid"  name="tue_week_${i + 1}_rest_1">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                <a class="btn btn-danger text-light container-fluid mr-2 plan_remove_row" id="tue_week_${i + 1}_remove">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="tue_week_${i + 1}">Add Row +</a>
                </div>
            `)
        } else {
            $('#plan_table').append(`
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-1 p-0">Tuesday</h6>
                    <p>Rest Day</p>
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
                    <table class="session-table even-table-width" id="wed_week_${i + 1}_table">
                        <tr class="wed_week_${i + 1}_row_count">
                            <th>Exercise</th>
                            <th>Sets x Reps</th>
                            <th>Rest</th>
                        </tr>
                        <tr class="wed_week_${i + 1}_row_count">
                            <td><input type="text" class="container-fluid" name="wed_week_${i + 1}_exercise_1" required></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="wed_week_${i + 1}_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="wed_week_${i + 1}_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid" name="wed_week_${i + 1}_rest_1">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                <a class="btn btn-danger text-light container-fluid mr-2 plan_remove_row" id="wed_week_${i + 1}_remove">Remove Row -</a>
                <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="wed_week_${i + 1}">Add Row +</a>
            </div>
            `)
        } else {
            $('#plan_table').append(`
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-1 p-0">Wednesday</h6>
                    <p>Rest Day</p>
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
                    <table class="session-table even-table-width" id="thur_week_${i + 1}_table">
                        <tr class="thur_week_${i + 1}_row_count">
                            <th>Exercise</th>
                            <th>Sets x Reps</th>
                            <th>Rest</th>
                        </tr>
                        <tr class="thur_week_${i + 1}_row_count">
                            <td><input type="text" class="container-fluid" name="thur_week_${i + 1}_exercise_1" required></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="thur_week_${i + 1}_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="thur_week_${i + 1}_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid" name="thur_week_${i + 1}_rest_1">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                <a class="btn btn-danger text-light container-fluid mr-2 plan_remove_row" id="thur_week_${i + 1}_remove">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="thur_week_${i + 1}">Add Row +</a>
                </div>
            `)
        } else {
            $('#plan_table').append(`
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-1 p-0">Thursday</h6>
                    <p>Rest Day</p>
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
                    <table class="session-table even-table-width" id="fri_week_${i + 1}_table">
                        <tr class="fri_week_${i + 1}_row_count">
                        <th>Exercise</th>
                        <th>Sets x Reps</th>
                        <th>Rest</th>
                        </tr>
                        <tr class="fri_week_${i + 1}_row_count">
                            <td><input type="text" class="container-fluid" name="fri_week_${i + 1}_exercise_1" required></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="fri_week_${i + 1}_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="fri_week_${i + 1}_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid" name="fri_week_${i + 1}_rest_1">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                <a class="btn btn-danger text-light container-fluid mr-2 plan_remove_row" id="fri_week_${i + 1}_remove">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="fri_week_${i + 1}">Add Row +</a>
                </div>
            `)
        } else {
            $('#plan_table').append(`
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-1 p-0">Friday</h6>
                    <p>Rest Day</p>
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
                    <table class="session-table even-table-width" id="sat_week_${i + 1}_table">
                        <tr class="sat_week_${i + 1}_row_count">
                        <th>Exercise</th>
                        <th>Sets x Reps</th>
                        <th>Rest</th>
                        </tr>
                        <tr class="sat_week_${i + 1}_row_count">
                            <td><input type="text" class="container-fluid" name="sat_week_${i + 1}_exercise_1" required></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="sat_week_${i + 1}_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="sat_week_${i + 1}_reps_1" required></td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid" name="sat_week_${i + 1}_rest_1">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                <a class="btn btn-danger text-light container-fluid mr-2 plan_remove_row" id="sat_week_${i + 1}_remove">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="sat_week_${i + 1}">Add Row +</a>
                </div>
            `)
        } else {
            $('#plan_table').append(`
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-1 p-0">Saturday</h6>
                    <p>Rest Day</p>
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
                    <table class="session-table even-table-width" id="sun_week_${i + 1}_table">
                        <tr class="sun_week_${i + 1}_row_count">
                            <th>Exercise</th>
                            <th>Sets x Reps</th>
                            <th>Rest</th>
                        </tr>
                        <tr class="sun_week_${i + 1}_row_count">
                            <td><input type="text" class="container-fluid" name="sun_week_${i + 1}_exercise_1" required></td>
                            <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="sat_week_${i + 1}_sets_1" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="sat_week_${i + 1}_reps_1" required>
                            </td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <input type="number" min="0" class="container-fluid" name="sat_week_${i + 1}_rest_1">
                                    <p class="m-0 p-0">Secs</p>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="col-12 p-0 m-0 mb-1 mt-3  d-flex justify-content-around">
                    <a class="btn btn-danger text-light container-fluid mr-2 plan_remove_row" id="sun_week_${i + 1}_remove">Remove Row -</a>
                    <a class="btn btn-dark text-light  container-fluid border float-right plan_add_row" id="sun_week_${i + 1}">Add Row +</a>
                </div>
            `)
        } else {
            $('#plan_table').append(`
                <div class="col-12 p-0 m-0">
                    <h6 class="m-0 mb-1 p-0">Sunday</h6>
                    <p>Rest Day</p>
                </div>
            `)
        }

    }
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
    $('#plan_table').append(`
    <div class="col-12 m-0 my-3 p-0">
        <a href=" {{ url_for('insert_training_plan') }} "><button class="btn main-gradient float-right">Done</button></a>
    </div>
    `)
    $('#plan_training_days').remove()
}

// add a new row on to the days training plan
$('body').on('click', '.plan_add_row', function () {
    var targetTable = '#'.concat(this.id, '_table')
    var targetRow = '.'.concat(this.id, '_row_count')
    var rowCount = $(targetRow)
    var count = 0
    for (i = 0; i < rowCount.length; i++) {
        count++
    }
    $(targetTable).append(`
                            <tr id="${this.id.concat('_row_', count)}" class="${this.id.concat('_row_count')}">
                                <td><input type="text" class="container-fluid" name="${this.id.concat('_exercise_', count)}"></td>
                                <td class="d-flex jusitfy-content-around"><input class="container-fluid float-left" min="0" type="number" step="1" name="${this.id.concat('_sets_', count)}" required>X
                                <input class="container-fluid" type="number" min="0" step="1" name="${this.id.concat('_reps_', count)}" required>
                                </td>
                                <td>
                                    <div class="d-flex justify-content-around">
                                        <input type="number" min="0" class="container-fluid" name="${this.id.concat('_rest_', count)}"
                                        <p class="m-0 p-0">Secs</p>
                                    </div>
                                </td>
                            </tr>
    `)
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
});

// remove the last row on the training plan day
$('body').on('click', '.plan_remove_row', function () {
    var targetTable = '#'.concat(this.id.slice(0, 10), '_table')
    var targetRow = '.'.concat(this.id.slice(0, 10), '_row_count')
    var rowCount = $(targetRow)
    var count = -1;
    for (i = 0; i < rowCount.length; i++) {
        count++
    }
    targetRow = '#' + targetRow.slice(1, 16) + count.toString()
    $(targetRow).remove()


});

