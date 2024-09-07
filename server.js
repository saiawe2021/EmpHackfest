const express = require('express');
const path = require('path');
const app = express();
var bodyParser = require('body-parser')
let jsonParser = bodyParser.json()

const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: "#"
});

async function runOrganize(activityNames) {
    // For text-and-image input (multimodal), use the gemini-pro-vision model
    var input = ""
    console.log(input);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
      temperature: 0,
      max_tokens: 500,
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



app.listen(3000, () => console.log('Example app is listening on port 3000.'));