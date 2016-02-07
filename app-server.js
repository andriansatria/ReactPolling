var express = require('express');
var _ = require('underscore')
var app = express();

var connection = [];
var title = 'Untitled Presentation';
var audience = [];
var speaker = {};
var questions = require('./src/app-questions.js');
var currentQuestion = false;
var results = {
  a : 0,
  b : 0,
  c : 0,
  d : 0
};

app.use(express.static('./public'));
app.use(express.static('./node_modules/bootstrap/dist'));

var server = app.listen(3001);
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket) {

  socket.once('disconnect', function(){
    var member = _.findWhere(audience, {id:this.id});

    if(member) {
      audience.splice(audience.indexOf(member), 1);
        io.sockets.emit('audience', audience);
        console.log(member.name + " Left, " + audience.length + " audience remaining");
    } else if(this.id == speaker.id) {
      console.log(speaker.name + " has left. " +title+" is over");
      speaker = {};
      title = "Untitled Presentation";
      io.sockets.emit('end', {title : title, speaker : ''});
    }

    connection.splice(connection.indexOf(socket), 1);
    socket.disconnect();
    console.log("Disconnected : "+connection.length+" Sockets remaining")
  });

  //emmit when join clicked
  socket.on('join', function(payLoad) {
    var newMember = {
      id: this.id,
      name : payLoad.name,
      type : 'audience'
    };
    audience.push(newMember);

    //send event to the user(not all socket member)
    this.emit('joined', newMember);

    //broacast to all audience member
    io.sockets.emit('audience', audience);
  });

  //speaker start a presentation event
  socket.on('start', function(payLoad){
    speaker.name = payLoad.name;
    speaker.id = this.id;
    speaker.type = 'speaker';
    title = payLoad.title;
    //join speaker to app
    this.emit('joined', speaker);
    console.log("Presentation Started: `" + title + "` by "+speaker.name);
    io.sockets.emit('started',{title:title, speaker:speaker.name});

  });

  socket.on('ask', function(question){
    currentQuestion = question;
    results={a:0,b:0,c:0,d:0};
    io.sockets.emit('ask', currentQuestion);
    console.log("Question asked "+question.q );
  });

  socket.on('answer', function(payLoad) {
    results[payLoad.choice]++;
    io.sockets.emit('results', results);
    console.log("Answer : "+ payLoad.choice+" - "+JSON.stringify(results));
  })

  socket.emit('welcome', {
    title : title,
    audience : audience,
    speaker : speaker.name,
    questions : questions,
    currentQuestion : currentQuestion,
    results : results
  });

  connection.push(socket);
  console.log("Connected : " + connection.length +" sockets")
});
console.log("Polling server is running at 'http://localhost:3000'");
