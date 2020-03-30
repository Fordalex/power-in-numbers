// add record table


var unitSelectedRecord;
var distanceSelectedRecord;

function addSessionTableRecord() {
    $('#continueTableButton').remove();
    var typeSelected = $('#session-type-option option:selected').text();
    unitSelectedRecord = $('#session-unit-option option:selected').text();
    distanceSelectedRecord = $('#session-distance-option option:selected').text();
    var powerliftingTable = `<div class="row p-0 m-0 animated fadeInUp faster"  id="sessionTable">
                                <div class="col-12 d-flex align-items-end p-0">
                                    <h3 class="float-left mr-3">Training Session</h3>
                                    <h5 class="main-colour-text">Weightlifting</h5>
                                </div>
                                <div class="col-12 p-0">
                                    <table class="session-table container-fluid mt-3" id="session_table">
                                        <tr>
                                            <th>Exercise:</th>
                                            <th style="width: 60px;">Reps:</th>
                                            <th>Weight:</th>
                                            <th class="unit-td"><i class="fas fa-balance-scale"></i></th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <select name="session_exercise_1" class="form-control" required> 
                                                    <option>Squat</option>
                                                    <option>Bench Press</option>
                                                    <option>Deadlift</option>
                                                    <option>Overhead Press</option>
                                                    <option>Row</option>
                                                    <option>2 Inch Axle Grip Hold</option>
                                                    <option>One Arm Dumbell Overhead</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select name="session_sets_1" class="form-control" required> 
                                                    <option>1</option>
                                                    <option>2</option>
                                                    <option>3</option>
                                                    <option>4</option>
                                                    <option>5</option>
                                                    <option>6</option>
                                                    <option>7</option>
                                                    <option>8</option>
                                                    <option>9</option>
                                                    <option>10</option>
                                                </select></td>
                                            <td><input class="container-fluid" type="number" step="0.1" name="session_weight_1" required></td>
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
                                    <button class="btn main-colour container-fluid text-dark border float-right mb-3" type="submit" onclick="dontWarnUser()" name="action">Done</button>
                                </div>
                            </div>`;
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
                                    <td><input class="container-fluid" type="number" step="0.01" name="distance"></td>
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
                    </div>`;
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
                                <td><input class="container-fluid" type="number" step="0.01" name="distance"></td>
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
                </div>`;
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
                            <td><input class="container-fluid" type="number" step="0.01" name="distance"></td>
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
            </div>`;
    if (typeSelected == 'Weightlifting') {
        $('#addSessionTable').html(powerliftingTable);
    } else if (typeSelected == 'Running') {
        $('#addSessionTable').html(runningTable);
    } else if (typeSelected == 'Cycling') {
        $('#addSessionTable').html(cyclingTable);
    } else if (typeSelected == 'Walking') {
        $('#addSessionTable').html(walkingTable);
    }
    for (k = 0; k < sessionTable.length; k++) {
        tableColour(k);
    }
}

function addSessionFirstNextRecord() {
    usersChoice = $('#session-type-option').val();
    if (usersChoice == 'weightlifting') {
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
        `);
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
        `);
    }
    $('#firstNextButton').remove();
}

function unitContinueButtonRecord() {
    $('#secondNextContainer').html(`<div class="btn btn-dark container-fluid my-3" onclick="addSessionTable()" id="continueTableButton">Next</div>`);

}

function backToFormStartRecord() {
    $('#firstNextButtonContainer').html(`
    <button id="firstNextButton" class="btn btn-dark unit-button my-3 container-fluid px-0"
    name="unit" onclick="addSessionFirstNextRecord()" >Next</button>
    `);
    $('#unitContainer').remove();
    $('#sessionTable').remove();
}