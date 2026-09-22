var count = 0;
var answers = [];

function updateValues() {
    document.getElementById("selfValue").innerHTML = document.getElementById("selfSlider").value;
    document.getElementById("societyValue").innerHTML = document.getElementById("societySlider").value;
}

function redrawTable() {
    var table = document.getElementById("answerTable");
    table.innerHTML = "";

    for (var i = 0; i < answers.length; i++) {
        var row = document.createElement("tr");

        row.innerHTML =
            "<td>" + answers[i].id + "</td>" +
            "<td>" + answers[i].self + "</td>" +
            "<td>" + answers[i].society + "</td>" +
            "<td>-</td>";

        table.appendChild(row);
    }
}

window.onload = function () {

    updateValues();

    document.getElementById("selfSlider").oninput = updateValues;
    document.getElementById("societySlider").oninput = updateValues;

    document.getElementById("addButton").onclick = function () {

        count = count + 1;

        answers.push({
            id: count,
            self: Number(document.getElementById("selfSlider").value),
            society: Number(document.getElementById("societySlider").value)
        });

        document.getElementById("answerCount").innerHTML = count + " Antworten";

        redrawTable();
    };

    document.getElementById("clearButton").onclick = function () {
        count = 0;
        answers = [];
        document.getElementById("answerCount").innerHTML = "0 Antworten";
        redrawTable();
    };
};
