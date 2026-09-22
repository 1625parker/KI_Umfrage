// V6.5 CSV + PNG + LocalStorage
var count = 0;
var answers = [];

function saveData(){
 localStorage.setItem("ki_umfrage_answers", JSON.stringify(answers));
 localStorage.setItem("ki_umfrage_count", String(count));
}

function loadData(){
 var a=localStorage.getItem("ki_umfrage_answers");
 var c=localStorage.getItem("ki_umfrage_count");
 if(a){answers=JSON.parse(a);} 
 if(c){count=Number(c);} 
}

function updateValues(){
 document.getElementById("selfValue").innerHTML=document.getElementById("selfSlider").value;
 document.getElementById("societyValue").innerHTML=document.getElementById("societySlider").value;
}

function exportPNG(){
 var canvas=document.getElementById("chart");
 var link=document.createElement("a");
 link.download="umfrage_visualisierung.png";
 link.href=canvas.toDataURL("image/png");
 link.click();
}

function exportCSV(){
 var rows=["ID;Ich;Gesellschaft"];
 for(var i=0;i<answers.length;i++){
  rows.push(answers[i].id+";"+answers[i].self+";"+answers[i].society);
 }
 var blob=new Blob([rows.join("
")],{type:"text/csv"});
 var url=URL.createObjectURL(blob);
 var a=document.createElement("a");
 a.href=url;
 a.download="umfrage.csv";
 a.click();
 URL.revokeObjectURL(url);
}

function deleteAnswer(id){
 var filtered=[];
 for(var i=0;i<answers.length;i++) if(answers[i].id!==id) filtered.push(answers[i]);
 answers=filtered; saveData(); redrawTable();
}

function drawChart(){
 var canvas=document.getElementById("chart");
 var ctx=canvas.getContext("2d");
 ctx.clearRect(0,0,canvas.width,canvas.height);
 var left=120,right=canvas.width-120,width=right-left;
 for(var i=0;i<answers.length;i++){
  var y=100+i*25;
  var x1=left+(answers[i].self/100)*width;
  var x2=left+(answers[i].society/100)*width;
  ctx.strokeStyle="#cccccc"; ctx.beginPath(); ctx.moveTo(x1,y); ctx.lineTo(x2,y); ctx.stroke();
  ctx.fillStyle="#d95f02"; ctx.beginPath(); ctx.arc(x1,y,6,0,Math.PI*2); ctx.fill();
  ctx.fillStyle="#e6c229"; ctx.beginPath(); ctx.arc(x2,y,6,0,Math.PI*2); ctx.fill();
 }
}

function redrawTable(){
 var table=document.getElementById("answerTable"); table.innerHTML="";
 for(var i=0;i<answers.length;i++){
  var row=document.createElement("tr");
  row.innerHTML='<td>'+answers[i].id+'</td><td>'+answers[i].self+'</td><td>'+answers[i].society+'</td><td><button onclick="deleteAnswer('+answers[i].id+')">Löschen</button></td>';
  table.appendChild(row);
 }
 document.getElementById("answerCount").innerHTML=answers.length+" Antworten";
 drawChart();
}

window.onload=function(){
 loadData();
 window.deleteAnswer=deleteAnswer;
 updateValues();
 document.getElementById("selfSlider").oninput=updateValues;
 document.getElementById("societySlider").oninput=updateValues;
 document.getElementById("addButton").onclick=function(){count++;answers.push({id:count,self:Number(document.getElementById("selfSlider").value),society:Number(document.getElementById("societySlider").value)});saveData();redrawTable();};
 document.getElementById("clearButton").onclick=function(){answers=[];count=0;saveData();redrawTable();};
 var png=document.getElementById("pngButton"); if(png){png.onclick=exportPNG;}
 var csv=document.getElementById("csvButton"); if(csv){csv.onclick=exportCSV;}
 redrawTable();
};
