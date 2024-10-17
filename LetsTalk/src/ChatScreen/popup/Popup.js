import $ from 'jquery';
import "./Popup.css"
import { useEffect } from 'react';
import { useState } from 'react';

function Popup({ contactsList, setContactsList, setOriginalContactsList, currentUser, handleContacts, fetchContacts, socket }) {
    const [newChat, setNewChat] = useState("");

    const handleClearInput = (e) => {
        const inputElement = document.getElementById('modal-new-contact');
        inputElement.value = '';
    }


    useEffect(() => {
        handleContacts();
        socket.on("newContact", async (chatId) => {   
            await socket.emit("joinRoom", chatId);
            await handleContacts();
        });
    }, []);


    async function addNewContact(userData) {
        try {
            const fetched = await fetchContacts(currentUser);
            if (fetched.some(contact => contact.user.username === userData.username)) {
                return;
            }
            const request = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                },
                body: JSON.stringify(userData)
            };

            const res = await fetch('http://localhost:5000/api/Chats', request);
            if (res.ok) {
                //setContactsList(contactsList);
                await handleContacts();
            } else {
                alert('no such user exist');
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleAddContact = async (e) => {
        e.preventDefault();
        //setOnClickContact(true);
        const newContact = e.target[0].value;
        if (!newContact) {
            alert('No contact added');
        } else {
            const userData = { "username": newContact }
            //setNewChat(newContact);
            await addNewContact(userData);
            const fetched = await fetchContacts(currentUser);
            const chatFound = fetched.find(contact => contact.user.username === newContact);
            await socket.emit("addNewContact", chatFound.id);
            handleClearInput();
            $('#close-btn').trigger('click');
        }

    };


    return (
        <div className="modal fade" id="contact-popup" tabIndex="-1">
            <div className="modal-dialog" id="popup-modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Add new contact</h1>
                        <button id="close-btn" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClearInput}></button>
                    </div>
                    <form onSubmit={handleAddContact}>
                        <div className="modal-body" id="popup-modal-body">
                            <input type="text" placeholder="Contact's Name" id="modal-new-contact"></input>
                        </div>
                        <div className="modal-footer" id="popup-modal-footer">
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Popup;

