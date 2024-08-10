"use client";
import React, { useRef, useState } from 'react'
import "./globals.css"
import "./home.css"
import Room from '@/component/room/page'
import io from "socket.io-client";

function HomePage() {

  const socket = io.connect("http://localhost:3001");
  const [isRoom, setRoom] = useState(false)
  const userName = useRef();
  const roomID = useRef();

  function joinRoom() {
    const _username = userName.current.value
    const _roomid = roomID.current.value;
    if (!_username || !_roomid) {
      alert("Alanların dolu olması gerekiyor!")
    }
    else {
      setRoom(true);
    }
  }

  return (
    <>
      {!isRoom ? (
        <div class="container home_container">
          <div class="card home_card">
            <h3 class="card-title text-center">Odaya Katıl</h3>
              <div class="form-group">
                <label for="username">Kullanıcı Adı</label>
                <input ref={userName} type="text" class="form-control" id="username" placeholder="Kullanıcı adınızı girin" />
              </div>
              <div class="form-group">
                <label for="roomName">Oda Adı</label>
                <input ref={roomID} type="text" class="form-control" id="roomName" placeholder="Oda kodunu girin" />
              </div>
              <button onClick={joinRoom} class="btn btn-custom home_btn-custom btn-block mt-2">Odaya Katıl</button>
          </div>
        </div>
      ) : (
        <Room socket={socket} room_id={roomID.current.value} user_name={userName.current.value} />
      )}
    </>
  )
}

export default HomePage