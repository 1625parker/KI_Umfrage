var count = 0;
var answers = [];

function updateValues() {
    document.getElementById("selfValue").innerHTML = document.getElementById("selfSlider").value;
    document.getElementById("societyValue").innerHTML = document.getElementById("societySlider").value;
}

function drawChart() {
    var canvas = document.getElementById("chart");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var left = 120;
    var right = canvas.width - 120;
    var width = right - left;

    ctx.font = "20px Arial";
    ctx.fillText(document.getElementById("leftLabel").value, left, 30);
    ctx.fillText(document.getElementById("rightLabel").value, right - 120, 30);

    ctx.beginPath();
    ctx.moveTo(left, 60);
    ctx.lineTo(right, 60);
    ctx.stroke();

    for (var i = 0; i < answers.length; i++) {
        var y = 100 + i * 25;
        var x1 = left + (answers[i].self / 100) * width;
        var x2 = left + (answers[i].society / 100) * width;

        ctx.strokeStyle = "#cfcfcf";
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        ctx.fillStyle = "#d95f02";
        ctx.beginPath();
        ctx.arc(x1, y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#e6c229";
        ctx.beginPath();
        ctx.arc(x2, y, 6, 0, Math.PI * 2);
        ctx.fill();
    }
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

    drawChart();
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
