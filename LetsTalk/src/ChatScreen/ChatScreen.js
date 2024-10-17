import './ChatScreen.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContactsBar from './contactsBar/ContactsBar.js';
import Conversation from './conversation/Conversation.js';
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5000")

function ChatScreen({ currentUser, setCurrentUser }) {
    const [firstTimeLogIn, setFirstTimeLogIn] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);
    const [contactsList, setContactsList] = useState([]);
    const [originalContactsList, setOriginalContactsList] = useState([]);
    const [displayedContact, setDisplayedContact] = useState(null);
    const [selectedContactMessages, setSelectedContactMessages] = useState(null);
    const [messages, setMessages] = useState([]);

    function handleLogOut() {
        setCurrentUser(null);
    }

    async function getMessages(chatId) {
        try {
            const res = await fetch('http://localhost:5000/api/Chats/' + chatId + "/Messages", {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                },
            });
            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
            const chatDetails = await res.json();
            //return chatDetails.messages;
            return chatDetails;
        } catch (error) {
            console.log(error);
        }

    }

    async function loadContacts() {
        try {
            const fetchedContacts = await fetchContacts(currentUser);
            fetchedContacts.sort((a, b) => new Date(b?.lastMessage?.created) - new Date(a?.lastMessage?.created));
            if (firstTimeLogIn) {
                for (const chat of fetchedContacts) {
                    await socket.emit("joinRoom", chat.id);
                    setFirstTimeLogIn(false);
                }
            }
            setContactsList(fetchedContacts);
            setOriginalContactsList(fetchedContacts);
        } catch (error) {
            console.error("Error fetching contacts:", error);
        }
    }

    async function fetchContacts(currentUser) {
        try {
            const res = await fetch('http://localhost:5000/api/Chats', {
                'method': 'GET',
                'headers': {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                },
            });
            if (!res.ok) {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
            const userContacts = await res.json();
            return userContacts;
        } catch (error) {
            console.log(error);
        }

    }

    async function handleContacts() {
        await loadContacts();
    }

    async function handleMessages(id) {
        const messagess = await getMessages(id);
        setMessages(messagess);
    }

    return (
        <div id='chat-body'>
            <div className="container-fluid h-100">
                <Link to="/">
                    <button className="float-right logout-btn btn" onClick={handleLogOut}> Log out</button>
                </Link>
                <div className="row justify-content-center h-100">
                    <ContactsBar
                        currentUser={currentUser}
                        contactsList={contactsList}
                        setContactsList={setContactsList}
                        setDisplayedContact={setDisplayedContact}
                        displayedContact={displayedContact}
                        setOriginalContactsList={setOriginalContactsList}
                        originalContactsList={originalContactsList}
                        userName={currentUser}
                        handleMessages={handleMessages}
                        handleContacts={handleContacts}
                        fetchContacts={fetchContacts}
                        socket={socket}
                        setFirstTimeLogIn={firstTimeLogIn}
                    />
                    <Conversation
                        currentUser={currentUser}
                        displayedContact={displayedContact}
                        contactsList={contactsList}
                        setContactsList={setContactsList}
                        setOriginalContactsList={setOriginalContactsList}
                        originalContactsList={originalContactsList}
                        setSelectedContact={setSelectedContact}
                        setSelectedContactMessages={setSelectedContactMessages}
                        setDisplayedContact={setDisplayedContact}
                        handleContacts={handleContacts}
                        setMessages={setMessages}
                        messages={messages}
                        getMessages={getMessages}
                        socket={socket}
                        setFirstTimeLogIn={firstTimeLogIn}
                    />
                </div>
            </div>
        </div>
    );
}
export default ChatScreen;