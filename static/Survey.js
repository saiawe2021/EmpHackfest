const country = document.getElementById("countryField"),
    fitness = document.getElementById("physicalField"),
    personality = document.getElementById("personalityField"),
    education = document.getElementById("educationField"),
    work_experience = document.getElementById("workField"),
    adaptation = document.getElementById("challengeField"),
    submitbtn = document.getElementById("submit-btn");
submitbtn.addEventListener("click", () => {
    var userInformation = {
        "homeCountry": country.value,
        "fitness": fitness.value,
        "personality": personality.value,
        "education": education.value,
        "work_experience": work_experience.value,
        "adaptation": adaptation.value
    };
    console.log(userInformation);
    fetch("/survey-answers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInformation)
    })
})