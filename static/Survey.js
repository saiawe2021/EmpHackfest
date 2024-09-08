const country = document.getElementById("countryField"),
    fitness = document.getElementById("physicalField"),
    personality = document.getElementById("personalityField"),
    education = document.getElementById("educationField"),
    work_experience = document.getElementById("workField"),
    adaptation = document.getElementById("challengeField"),
    Surveysubmitbtn = document.getElementById("submit-btn");
Surveysubmitbtn.addEventListener("click", () => {
        var userInformation = {
        "homeCountry": country.value,
        "fitness": fitness.value,
        "personality": personality.value,
        "education": education.value,
        "work_experience": work_experience.value,
        "adaptation": adaptation.value
    };
    fetch("/survey-answers", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInformation)
    })
})
