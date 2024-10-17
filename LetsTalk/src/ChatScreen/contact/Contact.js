import "./Contact.css";

function Contact({ chat, setDisplayedContact, handleClearSearch, currentUser, handleMessages }) {

    const handleClick = async () => {
        //await fetchChat(currentUser, chat.id);
        setDisplayedContact(chat.id);
        await handleMessages(chat.id);
        handleClearSearch();
    }

    return (
        <li className="contact" onClick={handleClick}>
            <div className="d-flex bd-highlight">
                <div className="img-icon">
                    <div className="img-cont col-md-3">
                        <img src={chat.img} className="rounded-circle user-img"></img>
                        {/* <span className={contact.online}></span> */}
                    </div>
                </div>
                <div className="user-info col-md-5">
                    <span>{chat.name}</span>
                    <small>{chat.message}</small>
                </div>
                <div className="user-time col-md-4">
                    <span className="user-msg-time">{chat.time}</span>
                </div>
            </div>
        </li>
    );
}

export default Contact;