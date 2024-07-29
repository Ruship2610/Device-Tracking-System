const express = require("express");
const app = express();
const PORT = 8000;
const path = require("path")
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);

const io = socketio(server);

app.set("view engine" , "ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection" , function(socket){
  socket.on("send-location" , function(data){
    io.emit("receive-location" , {id : socket.id, ...data});
  });

  socket.on("disconnect" , () => {
    io.emit("user-disconnected" , socket.id);
  });
   
 
    
})

app.get("/" , (req,res) => {
    try{
        res.render("index");
      }catch(error){
        console.log("Something went wrong" , error );
      }
})

server.listen(PORT , () => console.log("Server started at port" , PORT));