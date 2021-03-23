const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
const https =require("https");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.sendFile(__dirname+"/signup.html");
});

app.post('/', function(req, res){
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const eMail = req.body.email;
  const data ={
    members: [
      {
        email_address: eMail,
        status: "subscribed",
        merge_fields: {
          FNAME : firstName,
          LNAME : lastName
        }
      }
    ]
  };

  const jsonData =JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/327157f45c";
  const options ={
    method: "POST",
    auth: "Sanhita31:683a10c5cef94e89d6aec19466aca421-us7"
  };
  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});

app.post('/failure.html', function(req, res){
  res.redirect('/');
});

// 683a10c5cef94e89d6aec19466aca421-us7 : API Key
// 327157f45c : Audience Id


app.listen(3000, function(){
  console.log("Server running on port 3000");
})
