import React, { useEffect, useRef, useState } from 'react';
import "../../app/globals.css";
import "./room.css";
import { data } from 'autoprefixer';

function Room({ socket, room_id, user_name }) {
    const [messages, setMessages] = useState([]);
    const message = useRef();

    useEffect(() => {
        // Mesajları dinle

        socket.on("responseMessage", (data) => {
            if (room_id==data.room_id) {
                setMessages((prev) => [...prev, data]);
            }
        });
        // Temizlik işlemi: komponent kaldırıldığında dinleyiciyi kaldır
        return () => {
            socket.off("responseMessage");
        };
    }, [socket]);

    function timenow() {
        const now = new Date();
        const optionsDate = { day: '2-digit', month: 'long', year: 'numeric' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: false };
        const formattedDate = now.toLocaleDateString('tr-TR', optionsDate);
        const formattedTime = now.toLocaleTimeString('tr-TR', optionsTime);
        return `${formattedDate}, ${formattedTime}`;
    }

    function sendMessage() {
        const _message = message.current.value;
        if (!_message) {
            alert("Mesaj kutusu dolu olmalıdır!");
        } else {
            const data = {
                user_name,
                time: timenow(),
                message: _message,
                room_id
            };
            socket.emit("sendMessage", data);
            message.current.value = ''; // Mesaj gönderildikten sonra inputu temizle
        }
    }

    return (
        <div className="container room_container">
            <b>Oda : {room_id}</b>
            <div className="messages room_messages">
                {messages.map((msg, index) => (
                    <div key={index} className="message room_message">
                        <div className="message-header room_message-header">
                            {msg.user_name} <small className="text-muted">{msg.time}</small>
                        </div>
                        <div className="message-body room_message-body">{msg.message}</div>
                    </div>
                ))}
            </div>
            <div className="input-group room_input-group mb-2">
                <input ref={message} type="text" className="form-control" placeholder="Mesajınızı buraya yazın..." />
                <button onClick={sendMessage} className="btn btn-custom room_btn-custom" type="button">Gönder</button>
            </div>
        </div>
    );
}

export default Room;
