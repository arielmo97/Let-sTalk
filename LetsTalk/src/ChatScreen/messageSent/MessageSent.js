import "./MessageSent.css"

function MessageSent({ message, currentUser }) {

    //const user = usersList.find((user) => user.userName === currentUser);

    return (
        <div className="d-flex justify-content-end mb-4">
            <div className="msg-cotainer-send">
                {message.content}
                {/* <img src={currentUser.profilePic}></img> */}
                <span className="msg-time-send">{message.time}</span>
            </div>
            <div className="img-cont-msg">
                <img src={currentUser.profilePic} className="rounded-circle user-img-msg"></img>
            </div>
        </div>
    );
}
export default MessageSent;