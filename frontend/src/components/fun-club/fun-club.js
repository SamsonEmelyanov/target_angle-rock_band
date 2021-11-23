import React, {Component, useState, useEffect, useRef} from 'react';
import InputEmoji from "react-input-emoji";
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import SockJsClient from 'react-stomp';
import { DateTime } from 'luxon';
import './fun-club.sass';
import fun_club_photo1 from './6487710a69fd22ca0a9f4a05503ac229 2.png';
import fun_club_photo2 from './Vector.svg'

const FunClub = ({currentUser, authenticated, data, message, counter, setData, setText, setCounter}) => {

    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = Stomp.over(socket);

    const dt = DateTime.local();
    dt.setZone('Europe/Samara');

    function sendMessage(msg) {
        if(message && stompClient) {
            const chatMessage = {
                sender: currentUser ? (currentUser.name) : 'Гость',
                senderImg: currentUser ? (currentUser.imageUrl) : 'https://storage.cloud.google.com/target-angle-rock-band.appspot.com/target-angle-stuff/cabinet.png',
                content: msg,
                date: dt,
                type: 'CHAT'
            };

            stompClient.send("http://localhost:8080/app/chat.sendMessage", {}, JSON.stringify(chatMessage));

        }
    }
   function onSubmit(e) {
       e.preventDefault();
       sendMessage(message);
       setText('');
    }

    const PostList = () => {

        useEffect(() => {
            const massageArea =  document.querySelector('.chat-window');
            massageArea.scrollTop = massageArea.scrollHeight;
        }
     )

        const elements = data.map((item) => {
            const {id, ...itemProps} = item;
            return (
                <li key={id} className='list-group-item'>
                    <PostListItem
                        currentUser={currentUser}
                        {...itemProps}
                    />
                </li>
            )
        });

        return (
            <ul className="app-list list-group">
                {elements}
            </ul>
        )
    }

    const PostListItem = ({label,sender,senderImg, date}) => {
            if(label) {
                return (
                    <div className="chat-list-item">
                        <div className="chat-avatar">
                            {
                                senderImg ? (
                                    <>
                                        <img width={96} height={96}
                                             src={senderImg}
                                             alt={sender}/>
                                        <div className="sender-name">{sender}</div>
                                    </>
                                ) : (
                                    <div className="chat-avatar-text">
                                        <span>{sender || "Гость"}</span>
                                    </div>
                                )
                            }
                        </div>
                        <div
                            className="app-list-item-label">
                            {label}
                        </div>
                        <div className="app-list-item-label date">{date.substring(0,10)}//{date.substring(11,16)}</div>
                    </div>
                )
            }
            else return (
                <></>
            )
    }

    return(
        <div className="fun-club-content">
            <div className="chat">
                <span className="fun-club-headers chat-header">Чат</span>
                <div className="chat-window">
                    <PostList/>
                    <SockJsClient
                        url={'http://localhost:8080/ws'}
                        topics={['http://localhost:8080/topic/public']}
                        onConnect={() => {
                            console.log("Connected to chat");
                        }}
                        onDisconnect={() => {
                            console.log("Disconnected from chat");
                        }}
                        onMessage={(msg) => {
                            if (msg){
                                console.log(msg);
                                setCounter(counter + 1);
                            const newItem = {
                                sender: msg.sender,
                                label: msg.content,
                                senderImg: msg.senderImg,
                                date: DateTime.fromISO(msg.date).toString(),
                                id: counter
                            }
                            setData([...data, newItem]);
                            console.log(data);
                        }else return}}
                    />
                </div>
                <form action="" onSubmit={onSubmit}>
                    <div> {
                        authenticated ? (
                            <span></span>
                        ) : (
                            <span className="guest-warning">Внимание, Ваше сообщение будет отправлено от имени гостя</span>
                        )
                    }

                    </div>
                    <InputEmoji
                        borderRadius={2}
                        value={message}
                        onChange={setText}
                        cleanOnEnter
                        onEnter={sendMessage}
                        placeholder="Введите Ваше сообщение"
                    />
                    <div className="fun-club-button-container">
                        <button type="submit" className="button fun-club-button">ОТПРАВИТЬ</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FunClub;
