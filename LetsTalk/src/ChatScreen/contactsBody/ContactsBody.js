import "./ContactsBody.css"
import Contact from "../contact/Contact.js";



function ContacstsBody({ contactsList, setDisplayedContact, handleClearSearch, currentUser, handleMessages }) {

    function setDate(created) {
        const messageDate = new Date(created);
        const currentDate = new Date();

        if (
            messageDate.getFullYear() === currentDate.getFullYear() &&
            messageDate.getMonth() === currentDate.getMonth() &&
            messageDate.getDate() === currentDate.getDate()
        ) {
            // Format time if the message is from the current day
            const formattedTime = messageDate.toLocaleDateString([], {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,

            });
            return formattedTime;
        } else {
            // Format date if the message is older than the current day
            const formattedDate = messageDate.toLocaleDateString();
            return formattedDate;
        }
    }

    const contacts = contactsList.map((contact, index) => (
        <Contact
            key={index}
            handleClearSearch={handleClearSearch}
            chat={{
                id: contact.id,
                name: contact.user.displayName,
                img: contact.user.profilePic,
                message: contact.lastMessage ? contact.lastMessage.content : "",
                time: contact.lastMessage ? setDate(contact.lastMessage.created) : ""
            }}
            setDisplayedContact={setDisplayedContact}
            //fetchChat={fetchChat}
            currentUser={currentUser}
            handleMessages={handleMessages}

        />
    ));

    return (
        <div className="card-body contacts-body">
            <ul className="contacts">
                {contacts}
            </ul>
        </div >
    );
}
export default ContacstsBody;