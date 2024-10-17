import './Conversation.css';
import { useState, useEffect } from "react";
import ConversationBody from "../conversationBody/ConversationBody.js";
import ConversationsFooter from "../conversationFooter/ConversationFooter.js";
import ConversationHeader from "../conversationHeader/ConversationHeader.js";
import DeleteChat from "../deletechat/DeleteChat.js";


function Conversation({ setDisplayedContact, displayedContact, contactsList, setSelectedContact, currentUser, setContactsList, setMessages, messages, getMessages, setOriginalContactsList,
    originalContactsList, socket, setFirstTimeLogIn, handleContacts, fetchContacts }) {

    const [newMessage, setNewMessage] = useState("");
    const contact = contactsList.find(contact => contact.id === displayedContact);

    useEffect(() => {
        const contact = contactsList.find(contact => contact.id === displayedContact);
        setSelectedContact(contact);
        setMessages(messages);
    }, [displayedContact]);

    useEffect(() => {
        const test = async () => {
            await setDisplayedContact(null);
            await handleContacts();
        }
        socket.on("chatDeleted", test);
    }, [])


    useEffect(() => {
        const MessageReceivedFunc = async (msgData) => {
            if (displayedContact == msgData.id) {
                 const messages = await getMessages(displayedContact);
                // setMessages(messages);
                //const updatedList = [...messages, msgData.msg]; // Create a new array with the updated element
                setMessages(messages); // Update the state with the new array
            }
            handleContacts();
        }
        socket.on("messageArrived", MessageReceivedFunc);

        return () => {
            socket.off("messageArrived", MessageReceivedFunc)
        }
    }, [messages, displayedContact])


    if (displayedContact === null) {
        return (
            <div className="col-sm-6 col-md-9 col-lg-7 chat">
                <div className="card empty-coversation-window" id="chat">
                    <div className="empty-conversation-logo-container">
                        <img src="/images/Chat_Logo.png" id="empty-conversation-logo-img"></img>
                        <h2 id="empty-conversation-logo-text">Let'sTalk</h2>
                    </div>
                </div>
            </div>
        );
    }

    const handleOnKeyUp = (event) => {
        setNewMessage(event.target.value);
    };

    async function sendNewMessageToServer(chatId, message) {
        try {
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                },
                body: JSON.stringify(message)
            };

            const res = await fetch('http://localhost:5000/api/Chats/' + chatId + '/Messages', request);
            if (res.ok) {
                //setContactsList(contactsList);
                return await res.text();
            } else {
                throw new Error(`Error ${res.status}: ${res.statusText}`);
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleNewMessage = async () => {
        if (newMessage.trim() !== "") {
            const message = { "msg": newMessage };
            const res = await sendNewMessageToServer(contact.id, message);
            //console.log("bodyyyyy:", JSON.parse(res));
            //const messages = await getMessages(contact.id);
            console.log("handle new mwssage");
            const msg = JSON.parse(res);
            setMessages([...messages, msg]);
            //setMessages(messages);
            // setSelectedContactMessages(messages);
            handleContacts();
            const msgData = {
                id: contact.id,
                msg: msg,
            }
            await socket.emit("sendMessage", msgData);

            setNewMessage("");
        }

    };

    return (
        <>
            <div className="col-sm-6 col-md-9 col-lg-7 chat">
                <div className="card" id="chat">
                    <ConversationHeader user={{ img: contact.user.profilePic, name: contact.user.displayName, online: contact.online }} />
                    <ConversationBody currentUser={currentUser} messages={messages} setMessages={setMessages} contact={contact} contactsList={contactsList} setContactsList={setContactsList} />
                    <ConversationsFooter handleNewMessage={handleNewMessage} value={newMessage} onKeyUp={handleOnKeyUp} />
                </div>
            </div>
            <DeleteChat contactsList={contactsList} setContactsList={setContactsList} currentUser={currentUser} contact={contact} setDisplayedContact={setDisplayedContact} setOriginalContactsList={setOriginalContactsList}
                originalContactsList={originalContactsList} handleContacts={handleContacts} fetchContacts={fetchContacts} socket={socket}
            />
        </>
    );
}

export default Conversation;