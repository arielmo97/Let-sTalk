import "./MessageReceived.css"
function MessageReceived({ message, contact }) {
    return (
        <div className="d-flex justify-content-start mb-4">
            <div className="img-cont-msg">
                <img src={contact.user.profilePic} className="rounded-circle user-img-msg"></img>
            </div>
            <div className="msg-cotainer">
                {message.content}
                <span className="msg-time">{message.time}</span>
            </div>
        </div>
    );
}
export default MessageReceived;