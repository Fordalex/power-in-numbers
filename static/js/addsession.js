// add session table
var unitSelected;
var distanceSelected;

function addSessionTable() {
    $('#continueTableButton').remove()
    var typeSelected = $('#session-type-option option:selected').text()
    unitSelected = $('#session-unit-option option:selected').text()
    distanceSelected = $('#session-distance-option option:selected').text()
    var weightliftingTable = `<div class="row p-0 m-0 animated fadeInUp faster"  id="sessionTable">
                                <div class="col-12 d-flex align-items-end p-0">
                                    <h3 class="float-left mr-3">Training Session</h3>
                                    <h5 class="main-colour-text">Weightlifting</h5>
                                </div>
                                <div class="col-12 p-0">
                                    <table class="session-table container-fluid mt-3" id="session_table">
                                        <tr>
                                            <th>Exercise:</th>
                                            <th style="width: 95px;">Sets X Reps:</th>
                                            <th style="width: 70px;">Weight:</th>
                                            <th class="unit-td" style="width: 35px;"><i class="fas fa-balance-scale"></i></th>
                                        </tr>
                                        <tr>
                                            <td><input class="container-fluid" type="text" name="session_exercise_1" required></td>
                                            <td class="d-flex justify-content-center"><input class="container-fluid float-left" min="0" type="number" step="1" name="session_sets_1" required>X
                                            <input class="container-fluid" type="number" min="0" step="1" name="session_reps_1" required></td>
                                            <td><input class="container-fluid" type="number" step="0.25" min="0" name="session_weight_1" required></td>
                                            <td class="unit-td">${unitSelected}</td>
                                        </tr>
                                    </table>
                                </div>
                                <div class="col-6 d-flex align-items-end p-0">
                                    <a class="btn btn-danger text-light border my-3 float-right" onclick="removeRow()">Remove Row -</a>
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
                                    <td><input class="container-fluid" type="number" step="0.01" name="distance" required></td>
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
                                <td><input class="container-fluid" type="number" step="0.01" name="distance" required></td>
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
                            <td><input class="container-fluid" type="number" step="0.01" name="distance" required></td>
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
    if (typeSelected == 'Weightlifting') {
        $('#addSessionTable').html(weightliftingTable)
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
    if (usersChoice == 'weightlifting') {
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
