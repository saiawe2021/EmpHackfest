/*
document.getElementById("submitbutton").addEventListener("submit", function(){
    alert("Login successful")
})
    */
document.getElementById("signUpButton").addEventListener("submit", function(){
    window.href(`survey.html`)
})
username = document.getElementById('userNameField'),
password = document.getElementById('passwordField');

document.getElementById("loginButton").addEventListener("click", () => {
    var userCredentials = {
        "username": username.value,
        "password": password.value
    };
    console.log(userCredentials);
    fetch("/loginHandler", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
    })
    //window.href("/loginHandler");
}
)