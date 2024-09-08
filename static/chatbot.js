let planList = document.getElementById("planList");
let answer;
fetch("/post/AIcall")
.then(response=>response.json())
.then(result => console.log(result));