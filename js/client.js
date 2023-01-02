// const socket = require('socket.io');
// this.socket = io('http://localhost:5000');
const socket = io('http://localhost:8000',{transports: ['websocket']});


    const form=document.getElementById('send-container');
    const messageInput=document.getElementById('messageInp');
    const messageContainer=document.querySelector(".container");

    
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        const message=messageInput.value;
        localStorage.setItem('message',message.length);
        append(`You: ${message}`,`right`);
        socket.emit('send',message);
        messageInput.value="";
        
    })
    var audio=new Audio('ting.mp3');
    
    const append=(message,position)=>{
        const messageElement=document.createElement('div');
        messageElement.innerText=message;
        messageElement.classList.add('message');
        messageElement.classList.add(position);
        messageContainer.append(messageElement);
        if(position=='left'){
            audio.play();
        }
        
        
    }

    
    const names = localStorage.getItem('names');
    console.log(names);
    socket.emit('new-user-joined',names);
    
    socket.on('userjoined',names=>{
        append(`${names} joined the chat`,'right')
    })
    
    
    
    
    
    socket.on('receive',data=>{
        append(`${data.name} : ${data.message}`,'left')
    })
    socket.on('left',name=>{
        append(`${name} left the chat `,'left')
    })