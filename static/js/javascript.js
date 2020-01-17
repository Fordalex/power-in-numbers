// Adds a row for the tables with changing name attribute
var rowIndex = 1;

function createRow() {
    rowIndex++;
    $('#addSessionTable').append(` <tr>
    <td><input class="container-fluid" type="text" name="session_exercise_${rowIndex}"></td>
    <td><input class="container-fluid" type="type" name="session_sets_${rowIndex}"></td>
    <td><input class="container-fluid" type="type" name="session_weight_${rowIndex}"></td>
</tr>`)
    for (k = 0; k < newYearTable.length; k++) {
        tableColour(k);
    }
};

// Styles the session table
var newYearTable = document.getElementsByClassName('session-table');
var mainColour = 'rgb(136, 227, 255)';
var firstColour = 'rgb(220,220,220)';
var secondaryColour = 'rgb(240,240,240)';

function tableColour(num) {
    var newYearTableRow = newYearTable[num].getElementsByTagName('tr');
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
for (k = 0; k < newYearTable.length; k++) {
    tableColour(k);
}

// changing the expand text
$('.expand-button').html('Expand')
$('.expand-button').on('click', function() {
    console.log(this.text)
    if (this.text == 'Expand') {
        $(this).html('Close');
    } else {
        $(this).html('Expand');
    }
})

// save the user's unit choice to the local storage
$('#unit').on('click', function() {
    var unit = $('#unit').val();
    localStorage.setItem('unit', unit);
})

