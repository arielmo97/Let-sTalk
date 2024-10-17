import './ConversationHeader.css';
import $ from 'jquery';


function ConversationHeader({ user }) {

    let online = "Offline";
    if(user.online === true){
        online = "Online";

    }

    function handlePopUp(){
        $('#delete-chat').show();
    }

    return (
        <div className="card-header msg-head">
            <div className="d-flex bd-highlight">
                <div className="img-cont-active">
                    <img src={user.img} className="rounded-circle user-active-img"></img>
                    <span className="online-icon"></span>
                </div>
                <div className="user-info-active">
                    <span>{user.name}</span>
                    {/* <p>{online}</p> */}
                </div>
                {/* <div className="video-cam">
                    <span><i className="bi bi-camera-video"></i></span>
                    <span><i className="bi bi-telephone"></i></span>
                </div> */}
            </div>
            {/* <span className="delete-btn"><i className="bi bi-trash"></i></span> */}
            <button type= "button" className="delete-btn" id="delete-contact-btn" data-bs-toggle="modal" data-bs-target="#delete-chat" onClick={handlePopUp}><i
                    className="bi bi-trash"></i></button>
        </div>
    );
}
export default ConversationHeader;