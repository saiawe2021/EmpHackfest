let planList = document.getElementById("planList");
let answer;
fetch("/post/AIcall")
.then(response=>response.json())
.then(result => {
    planList.innerHTML = "";
    console.log(result);
    var temp = JSON.parse(result);
    temp.action_plan.forEach(task => {
        planList.innerHTML += `
            <ul>
                <li>
                    <h2>${task.summary}</h2>
                    <p>${task.description}</p>
                </li>
            </ul>`
    });
});  