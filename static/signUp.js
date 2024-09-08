SignUpSubmitbtn = document.getElementById("signUpButton"),
username = document.getElementById('userNameField'),
password = document.getElementById('passwordField');

SignUpSubmitbtn.addEventListener("click", () => {
    var userCredentials = {
        "username": username.value,
        "password": password.value
    };
    console.log(userCredentials);
    fetch("/post/LoginCred", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userCredentials)
    })
}
)