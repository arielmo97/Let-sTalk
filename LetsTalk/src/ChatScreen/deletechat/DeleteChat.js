import $ from 'jquery';
import "./DeleteChat.css"
import { useEffect } from 'react';
import { Socket } from 'socket.io-client';

function DeleteChat({ contactsList, setContactsList, currentUser, contact, setDisplayedContact, setOriginalContactsList,
    originalContactsList, handleContacts, fetchContacts ,socket }) {

    const handleNo = (e) => {
        e.preventDefault();
        $('#close-btn-2').trigger('click');
    }

    async function deleteCurrentContact(userData) {
        try {
            const request = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${currentUser.token}`
                }
            };

            const res = await fetch('http://localhost:5000/api/Chats/' + contact.id, request);
            if (res.ok) {
                await handleContacts();
                await setDisplayedContact(null);
            } else {
                alert('no such user exist');
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleDeleteChat = async (e) => {
        e.preventDefault();
        const wantedContact = contact.user.username;
        const userData = { "username": wantedContact }
        await deleteCurrentContact(userData);
        // emit to server
        await socket.emit("deleteChat",contact.id);
        $('#close-btn-2').trigger('click');
    };

    return (
        <div className="modal" id="delete-chat" tabIndex="-1">
            <div className="modal-dialog" id="delete-modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Delete contact</h1>
                        <button id="close-btn-2" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <form onSubmit={handleDeleteChat}>
                        <div className="modal-body" id="delete-modal-body">
                            Are you sure you want to delete this chat?
                        </div>
                        <div className="modal-footer" id="delete-modal-footer">
                            <button type="submit" className="btn btn-primary" id="delete-btn-primary">Yes</button>
                            <button type="button" className="btn btn-danger" id="delete-btn-danger" onClick={handleNo}>No</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteChat;

