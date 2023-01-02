const socket = io('http://localhost:8000',{transports: ['websocket']});
//const socket = io('http://localhost:8000',{transports: ['websocket']});
   

const names = document.getElementById("myText").value;
console.log(names);
socket.emit('new-user-joined',names);

socket.on('userjoined',names=>{
    append(`${names} joined the chat`,'right')
})