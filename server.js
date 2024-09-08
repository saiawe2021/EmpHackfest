const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: ""
});

var survey_input = {
  "homeCountry" : "",
  "fitness" : "",
  "personality" : "",
  "education" : "",
  "work_experience" : "",
  "adaptation" : ""
}

async function runOrganize(survey_input) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model

  var input = "Create an action plan with 10 steps in the form of a json file that guides a person through the process of becoming an astronaut, stopping once they have begun their first mission. Each action in the json must contain a four words or less summary, an integer time frame in months, and a paragraph long specific description. The description's text must include necessary resources and specific requirements like academic degrees, fitness benchmarks, or flight experience and also incorporate personalized feedback to survey answers. Each task is specific, realistic, and personalized. The action plan must contain every uncompleted necessary step to become an astronaut in their home country of " + survey_input["homeCountry"] + ". Make the action plan suited to a specific person. This person has answered the following questions on the survey with a response: Question: Describe your current physical statistics and any relevant achievements or certifications. How do you maintain your physical condition? Answer: " + survey_input["fitness"] + " Question: Describe your personality. What were some of your experiences with managing stress, working in groups, and being in a leadership position? Answer: " + survey_input["personality"] + " Question: Describe your education and academic achievements. How has your coursework prepared you for technical and scientific challenges? Answer: " + survey_input["education"] + " Describe your work experience. How has your experience and expertise guided you in professional environments? Answer: " + survey_input["work_experience"] + " Question: Describe a time where you faced and overcame or adapted to a challenge. How has that experience affected you? Answer: " + survey_input["adaptation"];
  console.log(input);
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: input,
      },
    ],
    temperature: 0,
    max_tokens: 1434,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  surveryresponse = completion.choices[0].message.content;
  console.log(surveryresponse);
  return surveryresponse;
}

async function chatbotNextMessage(conversation_summary, last_input) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model

  var context = "You are a chatbot that talks about what it's like to be a astronaut and how to be one. Be specific, informative, and professional. Do not go off topic no matter what, and stick to being professionally informative from trusted sources. Give concise responses that are easy to read. The current conversation is on the topic: " + conversation_summary
  var input = "Create an action plan with 10 steps in the form of a json file that guides a person through the process of becoming an astronaut, stopping once they have begun their first mission. Each action in the json must contain a four words or less summary, an integer time frame in months, and a paragraph long specific description. The description's text must include necessary resources and specific requirements like academic degrees, fitness benchmarks, or flight experience and also incorporate personalized feedback to survey answers. Each task is specific, realistic, and personalized. The action plan must contain every uncompleted necessary step to become an astronaut in their home country of " + survey_input["homeCountry"] + ". Make the action plan suited to a specific person. This person has answered the following questions on the survey with a response: Question: Describe your current physical statistics and any relevant achievements or certifications. How do you maintain your physical condition? Answer: " + survey_input["fitness"] + " Question: Describe your personality. What were some of your experiences with managing stress, working in groups, and being in a leadership position? Answer: " + survey_input["personality"] + " Question: Describe your education and academic achievements. How has your coursework prepared you for technical and scientific challenges? Answer: " + survey_input["education"] + " Describe your work experience. How has your experience and expertise guided you in professional environments? Answer: " + survey_input["work_experience"] + " Question: Describe a time where you faced and overcame or adapted to a challenge. How has that experience affected you? Answer: " + survey_input["adaptation"];
  console.log(input);
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: context,
      },
      {
        role: "user",
        content: input
      }
    ],
    temperature: 0,
    max_tokens: 1434,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });
  surveryresponse = completion.choices[0].message.content;
  console.log(surveryresponse);
  return surveryresponse;
}


app.use(express.static(path.join(__dirname, 'Static')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'Homepage.html'));
});

app.get("/signUp", (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'signUp.html'));
});

app.get("/chatBot", (req, res) => {
  res.sendFile(path.join(__dirname, 'Static', 'chatbot.html'));
});

app.use(express.json());
app.post("/survey-answers", (req, res) => {
  survey_input.homeCountry = req.body.homeCountry;
  survey_input.fitness = req.body.fitness;
  survey_input.personality = req.body.personality;
  survey_input.education = req.body.education;
  survey_input.work_experience = req.body.fitness;
  survey_input.adaptation = req.body.adaptation;
  console.log(survey_input);
})



app.post("/post/AIcall", (req, res) => {
  const secondFunction = async () => {  
    const result = await runOrganize(survey_input);
    res.json(result);
    res.send();
    console.log(result);
    return result;
  } 
  secondFunction();
});

var username;
var password;
app.use(express.json());
app.post("/post/LoginCred", (req, res)=> {
  username = req.body.username;
  password = req.body.password;
  console.log(username + " " +  password);
})


app.listen(3000, () => console.log('Example app is listening on port 3000.'));