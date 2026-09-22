// V6.3 LocalStorage
var count = 0;
var answers = [];

function saveData(){
 localStorage.setItem("ki_umfrage_answers", JSON.stringify(answers));
 localStorage.setItem("ki_umfrage_count", String(count));
}

function loadData(){
 var a = localStorage.getItem("ki_umfrage_answers");
 var c = localStorage.getItem("ki_umfrage_count");
 if(a){ answers = JSON.parse(a); }
 if(c){ count = Number(c); }
}

function updateValues(){
 document.getElementById("selfValue").innerHTML=document.getElementById("selfSlider").value;
 document.getElementById("societyValue").innerHTML=document.getElementById("societySlider").value;
}

function deleteAnswer(id){
 var filtered=[];
 for(var i=0;i<answers.length;i++){
  if(answers[i].id!==id){ filtered.push(answers[i]); }
 }
 answers=filtered;
 saveData();
 redrawTable();
}

function drawChart(){
 var canvas=document.getElementById("chart");
 var ctx=canvas.getContext("2d");
 ctx.clearRect(0,0,canvas.width,canvas.height);
}

function redrawTable(){
 var table=document.getElementById("answerTable");
 table.innerHTML="";
 for(var i=0;i<answers.length;i++){
  var row=document.createElement("tr");
  row.innerHTML='<td>'+answers[i].id+'</td><td>'+answers[i].self+'</td><td>'+answers[i].society+'</td><td><button onclick="deleteAnswer('+answers[i].id+')">Löschen</button></td>';
  table.appendChild(row);
 }
 document.getElementById("answerCount").innerHTML=answers.length+' Antworten';
 drawChart();
}

window.onload=function(){
 loadData();
 window.deleteAnswer=deleteAnswer;
 updateValues();
 redrawTable();
 document.getElementById("selfSlider").oninput=updateValues;
 document.getElementById("societySlider").oninput=updateValues;
 document.getElementById("addButton").onclick=function(){
  count++;
  answers.push({id:count,self:Number(document.getElementById("selfSlider").value),society:Number(document.getElementById("societySlider").value)});
  saveData();
  redrawTable();
 };
 document.getElementById("clearButton").onclick=function(){
  answers=[];
  count=0;
  saveData();
  redrawTable();
 };
};
