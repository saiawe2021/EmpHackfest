const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser')
let jsonParser = bodyParser.json()
const { v4: uuidv4 } = require('uuid');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/test.db');
const OpenAI = require("openai");
const { is } = require('express/lib/request');
const openai = new OpenAI({
  apiKey: ""
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

var user_chatbot_summaries = {}


function isUserLoggedIn(req) {
  var currCookies = getCookiesJson(req);
  if(!currCookies || !currCookies.UUID) return false;
  var UUID = currCookies.UUID;
  var dbResult = db.get("SELECT * FROM users WHERE UUID=?",[UUID]);
  if(!dbResult.username) return false;
  return true;
}

function getcookie(req) {
  var cookie = req.headers.cookie;
  if(!cookie) return cookie;
  // user=someone; session=mySessionID
  return cookie.split('; ');
}

function getCookiesJson(req) {
 
  var temp = getcookie(req);
  if(!temp) return {};
  var tempMap = new Map();
  for(var i = 0; i < temp.length; i++) {
    tempMap.set(temp[i].
      split("=")[0], temp[i]
      .split("=")[1]);
  }
  return Object.fromEntries(tempMap);
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

async function chatbotNextMessage(uuid, last_input) {
  // For text-and-image input (multimodal), use the gemini-pro-vision model

  var context = "You are a chatbot that talks about what it's like to be a astronaut and how to be one. Be specific, informative, and professional. Do not go off topic no matter what, and stick to being professionally informative from trusted sources. Give concise responses that are easy to read. Always respond with a json file no matter what that has a current summary of the conversation and a response to the message."
  if (uuid in user_chatbot_summaries) {
    context += " The current conversation is on the topic: " + user_chatbot_summaries[uuid]
  }
  var input = last_input;
  console.log(context);
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
  user_chatbot_summaries[uuid] = JSON.parse(surveryresponse)["summary"];
  console.log(user_chatbot_summaries);
  return JSON.parse(surveryresponse)["response"];
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

app.get("/login", (req, res) => {
  console.log("At /login");
  if(isUserLoggedIn(req)) {
    res.redirect("/chatbot");
  } else {
    res.sendFile(path.join(__dirname, 'Static', 'login.html'));
  }

});

app.get("/survey", (req, res) => {
  console.log("At /survey");
  if(!getCookiesJson(req).username) {
    res.redirect("/login");
  } else {
    res.sendFile(path.join(__dirname, 'Static', 'survey.html'));
  }
});
app.post("/loginhandler", (req, res) => {
  var cookies = getCookiesJson(req);

  console.log(cookies);
  console.log("WE ARE HERE BB");
  console.log(req.body.userNameField);
  var tempUsername = req.body.userNameField;
  var tempPassword = req.body.passwordField;
  var databaseUser;
  var databasePass;
  var flag = false;
  console.log(req.body);
  console.log(req.body.passwordField);
  var sql = "select * from users";
  var user;

  db.get(sql, [], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      return row
        ? (console.log("IM HERE"),user = row,flag = true, databaseUser = row.username, databasePass = row.password, temp())
        : console.log(`Nobody found`);
  });
  function temp() {
    console.log(user);
  console.log(databasePass);
  console.log(databaseUser);
  console.log(flag);
  if(flag && req.body.passwordField == tempPassword) {
    console.log("One");
    var tempUUID = uuidv4();
    db.run("UPDATE users SET UUID = ? WHERE username = ?", [tempUUID, user.username]);
    res.cookie("UUID", tempUUID);
    res.redirect("/chatbot");
  } else {
    //res.cookie("UrMom", "HELLO");
    res.redirect("/");
    console.log("Two");
    
  }
  }
  
  

});


app.post("/survey-answers", (req, res) => {
  var survey_input = {
    "homeCountry" : "",
    "fitness" : "",
    "personality" : "",
    "education" : "",
    "work_experience" : "",
    "adaptation" : ""
  }
  console.log("At /survey-answers");
  survey_input.homeCountry = req.body.homeCountry;
  survey_input.fitness = req.body.fitness;
  survey_input.personality = req.body.personality;
  survey_input.education = req.body.education;
  survey_input.work_experience = req.body.fitness;
  survey_input.adaptation = req.body.adaptation;
  
  var username = getCookiesJson(req).username;
  const secondFunction = async () => {  
    const result = await runOrganize(survey_input);
    db.run("insert into AICALLS(username, aiResponse) VALUES(?, ?)", [username, result]);
  }
  secondFunction();
  console.log(survey_input);
})



app.post("/post/AIcall", (req, res) => {
  console.log("At /post/AIcall");
  var row = db.get("Select * from AICALLS where username=?",[getCookiesJson().username], (err, row) => {
    return row
    ? (console.log("IM IN AI CALL"), temp())
    : console.log(`Nobody found`);
  });
  function temp() {
    res.json(row.aiResponse);
    res.send();
  }
});

app.post("/post/ChatBotCall", (req, res)=> {
  const secondFunction = async () => {  
    const result = await chatbotNextMessage(1, req.body);
    res.json(result);
    return result;
  } 
  secondFunction();
})
//maybe check for dupes later
app.post("/post/LoginCred", (req, res)=> {
  console.log("At /post/LoginCred");

  var username = req.body.userNameField;
  var password = req.body.passwordField;
  
  console.log(username + " " +  password);
  db.run('insert into users(username, password) VALUES(?, ?)',[username, password]);
  res.cookie("username", username);

  res.redirect("/survey");
})


app.listen(3000, () => console.log('Example app is listening on port 3000.'));