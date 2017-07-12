
/*-------------------------------------------------------------------------*/
/*---Socket server requests---*/
var handleHTTP = (req, res) => {
  if(req.method === 'GET') {
    if (req.url === '/') {
      res.writeHead(200,{ "Content-type": "text/plain" });
      ASQ( (done) => {
        setTimeout( () => {
          done( Math.random() ) 
        }, 2500)
      })
      .then( (done, num) => {
        setTimeout(()=>{
          done(num)
        }, 2000)
      })
      .val((_msg) => {
        res.end('hi!' + _msg)
      })
    }
    else {
      res.writeHead(403)
      res.end
    }
  }
  else {
    res.writeHead(403)
    res.end
  }       
}

/*-------------------------------------------------------------------------*/
// using the regexp to route

var ASQ = require('asynquence')
require('asynquence-contrib')
var  http = require('http')
var  host = 'localhost'
var  port = '8006'
var  http_server = http.createServer(handleHTTP).listen(port, host)

/*install node static*/
var handleHTTP = (req, res) => {
  if(req.method === 'GET') {
    if(/^\/\d+(?=$|[\/?#])/.test(req.url)) {
      req.addListener('end', () =>{
        req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html")
        static_files.serve(req, res)  
      })
      req.resume()
    }
    else {
      res.writeHead(403)
      res.end('End')
    }
  }
  else {
    res.writeHead(403)
    res.end('End')
  }       
}


/*-------------------------------------------------------------------------*/

var ASQ = require('asynquence')
require('asynquence-contrib')
var  http = require('http')
var  host = 'localhost'
var  port = '8006'
var  http_server = http.createServer(handleHTTP).listen(port, host)

var node_static = require('node-static')
var static_files = new node_static.Server(__dirname)


/*-------------------------------------------------------------------------*/
/*install node static*/
handleHTTP = (req, res) => {
  if(req.method === 'GET') {
    if(/^\/\d+(?=$|[\/?#])/.test(req.url)) {
      req.addListener('end', () =>{
        req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html")
        static_files.serve(req, res)  
      })
      req.resume()
    }
    else {
      res.writeHead(403)
      res.end('End')
    }
  }
  else {
    res.writeHead(403)
    res.end('End')
  }       
}

handleIO = (socket) => {
  disconnect = () => {
    console.log('Client Disconnected')
  }
  console.log('Client Connected!')
  socket.on("disconnect", disconnect)

  setInterval(() => {
    socket.emit('hello', Math.random())
  }, 1000)
}

/*-------------------------------------------------------------------------*/

var ASQ = require('asynquence')
require('asynquence-contrib')
var  http = require('http')
var  host = 'localhost'
var  port = '8006'
var  http_server = http.createServer(handleHTTP).listen(port, host)

var node_static = require('node-static')
var static_files = new node_static.Server(__dirname)

/* upgrade http to web socket */
var io = require('socket.io').listen(http_server)
io.on('connection', handleIO)

io.configure(function(){
  io.enable("browser client minification") // send minified client
  io.enable("browser client etag") // apply etag caching logic based on version number
  io.set("log level", 1) // reduce logging
  io.set("transports", [
    "websocket",
    "xhr-polling",
    "jsonp-polling"
  ])
})

/*-------------------------------------------------------------------------*/
function handleHTTP(req,res) {
  if (req.method == "GET") {
    if (/^\/\d+(?=$|[\/?#])/.test(req.url)) {
      req.addListener("end",function(){
        req.url = req.url.replace(/^\/(\d+).*$/,"/$1.html")
        static_files.serve(req,res)
      })
      req.resume()
    }
    else if (req.url == "/jquery.js") {
      req.addListener("end",function(){
        static_files.serve(req,res)
      })
      req.resume()
    }
    else {
      res.writeHead(403)
      res.end()
    }
  }
  else {
    res.writeHead(403)
    res.end()
  }
}

function connection(socket) {

  function disconnect() {
    console.log("disconnected")
  }

  function getmsg(msg) {
    io.sockets.emit("broadcast",msg)
  }

  function spy(move) {
    socket.broadcast.emit("spy",move)
  }

  socket.on("disconnect",disconnect)
  socket.on("msg",getmsg)
  socket.on("spy",spy)

  var intv = setInterval(function(){
    socket.emit("hello",Math.random())
  },1000);
}


var
  http = require("http"),
  httpserv = http.createServer(handleHTTP),

  port = 8006,
  host = "127.0.0.1",

  ASQ = require("asynquence"),
  node_static = require("node-static"),
  static_files = new node_static.Server(__dirname),

  io = require("socket.io").listen(httpserv)
;

require("asynquence-contrib")


// configure socket.io
io.configure(function(){
  io.enable("browser client minification") // send minified client
  io.enable("browser client etag");// apply etag caching logic based on version number
  io.set("log level", 1) // reduce logging
  io.set("transports", [
    "websocket",
    "xhr-polling",
    "jsonp-polling"
  ]);
});


httpserv.listen(port, host)

io.on("connection",connection)
