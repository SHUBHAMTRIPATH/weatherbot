var v1;
var baseUrl = "https://api.api.ai/v1/";
var URL = baseUrl + "query?v=20150910";
var message = [];
var botmessage = "";
var user = "";
var lastmessage = "" ;
var botname = "Chatbot";

function placeHolder(){
document.getElementById("chatbox").value = "hello//...";
//myfunction1();
}
function placeHolder(){
document.getElementById("chatbox").value = "";
//myfunction1();
}
function myfunction1() {
//user = document.getElementById("chatbot").value;
 if (document.getElementById("chatbox").value != "" )
 {
 myfunction2();
 }
else {
document.getElementById("chatlog1").innerHTML = "You Did'nt entered correct command";
	 }
}

function myfunction2()
{
lastmessage = document.getElementById("chatbox").value;
document.getElementById("chatbox").value = "";
console.log(lastmessage);
message.push(lastmessage);
//console.log(message);
myfunction(lastmessage);
}

function my(messages) { 
console.log(messages); 
if (messages != "undefined" || messages != "" )
{
botmessage = messages;
//console.log(botmessage);
 var length1 = message.length;

message.push("<b>" + botname + ":</b> " + botmessage);
 console.log(message);
 if(message[length1 - 1] == "<b>Chatbot:</b> undefined" )
 {
	 console.log(message);
	 message.pop();
	  message.pop();
	  console.log(message);
	  message.push("<b>" + botname + ":</b> " + botmessage);
 }
console.log(message);

 for (var i = 1; i < 8; i++) {
      if (message[message.length - i])
        document.getElementById("chatlog" + i).innerHTML = message[message.length - i];
		}
}
}  

function myfunction(messages) {
	
    var xhttp = new XMLHttpRequest();  			
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
            var v2 = JSON.parse(xhttp.responseText);
			console.log(v2);
            if (v2.result.parameters.weathercon) 
			{
               var v8 = v2.result.parameters.weathercon.weathera;
			   var v9 = v2.result.parameters.weathercon.weatherb;
            }
                
            if (v8 || v9) 
			{
                var q = myfun1(v2.result.parameters.city.city, v2.result.fulfillment.speech);
				my(q);
            } 
			else 
			{
                var p = myfun(v2.result.parameters.city, v2.result.fulfillment.speech);
				console.log(p);	
				
			    my(p);
			}
            //document.getElementById("uname1").value = v2.result.fulfillment.speech;
        }
    };

    var x = messages;
    var accessToken = "449fc845b1294b1897f9fd0fa22903d5";
    xhttp.open("POST", URL, true);
    xhttp.setRequestHeader("Authorization", "Bearer " + accessToken);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(
        JSON.stringify({ query: x, lang: "en", sessionId: "somerandomthing" })
    );
}

function myfun(city, messages) {
    if (city) {
        var w = new XMLHttpRequest();
        w.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(w.responseText);
               var v3 = JSON.parse(w.responseText);
			   console.log(v3);
               var v5 = messages + " " +v3.query.results.channel.item.condition.temp + " " + v3.query.results.channel.units.temperature;
               console.log(v5);
			   my(v5);
			}
        };
        var x = city;
        var a =
            "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" +
            x +
            "')";
        var b = "https://query.yahooapis.com/v1/public/yql?q=" + a + "&format=json";
        w.open("GET", b, true);
        w.send();
    } else {
        var v10 = messages;
		return v10;
    }
}

function myfun1(city, messages) {
    if (city !== "undefined") {
        var w1 = new XMLHttpRequest();
        w1.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(w1.responseText);
                var v4 = JSON.parse(w1.responseText);
                var v6 = messages + " " + v4.query.results.channel.item.condition.text;
				my(v6);
            }
        };
        var x1 = city;
        var a1 =
            "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='" +
            x1 +
            "')";
        var b1 =
            "https://query.yahooapis.com/v1/public/yql?q=" + a1 + "&format=json";
        w1.open("GET", b1, true);
        w1.send();
    } else {
        var v9 = messages;
		return v9;
    }
}

document.onkeypress = keyPress;

function keyPress(e) {
  var x = e || window.event;
  var key = (x.keyCode || x.which);
  if (key == 13 || key == 3) {
    //runs this function when "enter" is pressed
    myfunction1();
  }
}