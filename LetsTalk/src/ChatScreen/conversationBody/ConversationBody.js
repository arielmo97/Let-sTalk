import "./ConversationBody.css"
import { useEffect, useRef } from 'react';
import MessageReceived from "../messageReceived/MessageReceived.js";
import MessageSent from "../messageSent/MessageSent.js";

function ConversationBody({ currentUser, messages, setMessages, contact, contactsList, setContactsList }) {

    const convBodyRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (convBodyRef.current) {
            convBodyRef.current.scrollTop = convBodyRef.current.scrollHeight;
        }
    };

    function setDate(created) {
        const messageDate = new Date(created);
        const currentDate = new Date();

        if (
            messageDate.getFullYear() === currentDate.getFullYear() &&
            messageDate.getMonth() === currentDate.getMonth() &&
            messageDate.getDate() === currentDate.getDate()
        ) {
            // Format time if the message is from the current day
            const formattedTime = messageDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
            return formattedTime;
        } else {
            // Format date if the message is older than the current day
            const formattedDate = messageDate.toLocaleDateString();
            return formattedDate;
        }
    }

    if (messages) {
        const messagesList = messages.map((message, index) => {
            if (message.content === undefined) {
                return []
            } else {
                if (message.sender.username === currentUser.username) {
                    return <MessageSent key={index} message={{ content: message.content, time: setDate(message.created) }} currentUser={currentUser} />
                } else {
                    return <MessageReceived key={index} message={{ content: message.content, time: setDate(message.created) }} contact={contact} />
                }
            }
        })

        return (
            <div className="card-body msg-card-body" ref={convBodyRef}>
                {messagesList}
            </div>
        );

    } else {
        return (
            <div className="card-body msg-card-body" >
            </div>
        );
    }



}
export default ConversationBody;