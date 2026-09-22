var count = 0;
function updateValues(){
 document.getElementById("selfValue").innerHTML=document.getElementById("selfSlider").value;
 document.getElementById("societyValue").innerHTML=document.getElementById("societySlider").value;
}
window.onload=function(){
 updateValues();
 document.getElementById("selfSlider").oninput=updateValues;
 document.getElementById("societySlider").oninput=updateValues;
 document.getElementById("addButton").onclick=function(){
  count=count+1;
  document.getElementById("answerCount").innerHTML=count+" Antworten";
 };
 document.getElementById("clearButton").onclick=function(){
  count=0;
  document.getElementById("answerCount").innerHTML='0 Antworten';
 };
};
