import './ContactsBar.css';
import { useRef } from 'react';
import ContactsHeader from "../contactsHeader/ContactsHeader.js";
import ContactsBody from "../contactsBody/ContactsBody.js";
import Popup from "../popup/Popup.js";



function ContactsBar({ contactsList, setContactsList, setDisplayedContact, displayedContact, setOriginalContactsList, originalContactsList, currentUser, handleMessages, handleContacts, fetchContacts, socket, setFirstTimeLogIn }) {

    const searchBox = useRef(null);

    const doSearch = function (q) {
        if (q) {
            //handleContacts();
            const filtered = originalContactsList.filter(contact => contact.user.displayName.toLowerCase().includes(q.toLowerCase()));
            setContactsList(filtered);

            if ((filtered).some(contact => contact.id === displayedContact)) {

            } else {
                setDisplayedContact(null);
            }

        } else {
            //handleContacts();
            setContactsList(originalContactsList);
        }

    }

    function handleClearSearch() {
        searchBox.current.value = "";
        doSearch(searchBox.current.value);
    }

    function handleSetContacts(newContacts) {
        setContactsList([...newContacts]);
        setOriginalContactsList([...newContacts]);
    }

    return (
        <>
            <div className="col-sm-4 col-md-3 col-lg-4 users">
                <div className="card mb-sm-3 msb-md-0 contacts-card" id="conts">
                    <ContactsHeader
                        currentUser={currentUser}
                        doSearch={doSearch}
                        searchBox={searchBox}
                    />

                    <ContactsBody
                        handleMessages={handleMessages}
                        currentUser={currentUser}
                        contactsList={contactsList}
                        setDisplayedContact={setDisplayedContact}
                        handleClearSearch={handleClearSearch}
                        socket={socket}
                    />

                    <div className="card-footer"></div>
                </div>
            </div>
            <Popup contactsList={contactsList} setContactsList={handleSetContacts}
                setOriginalContactsList={setOriginalContactsList} currentUser={currentUser}
                handleContacts={handleContacts} fetchContacts={fetchContacts} socket={socket
                }
            />
        </>
    );
}

export default ContactsBar;