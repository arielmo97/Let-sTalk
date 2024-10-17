import "./ConversationFooter.css"

function ConversationsFooter({ handleNewMessage, value, onKeyUp }) {

    const handleInput = async (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            await handleNewMessage();            
        }
    }

    return (
        <div className="card-footer">
            <div className="input-group type-line">
                {/* <span className="input-group-text attach-btn"><i className="bi bi-paperclip"></i></span> */}
                <textarea value={value} onKeyUp={handleInput} onChange={onKeyUp} name="" className="form-control type-msg" placeholder="Type here..."></textarea>
                <span onClick={handleNewMessage} className="input-group-text send-btn"><i className="bi bi-arrow-up-circle"></i></span>
            </div>
        </div>
    );
}
export default ConversationsFooter;