import './ContactsHeader.css';
import $ from 'jquery';
import Search from '../search/Search.js';

function ContactsHeader({ currentUser, doSearch, searchBox }) {

    function handlePopUp(){
        $('#contact-popup').show();
    }

    return (
        <div className="card-header">
            <div className="upper-header input-group">
                <div className="my-pic"><img src={currentUser.profilePic} className="rounded-circle user-img-msg"></img></div>
                <div className="current-user-name">{currentUser.displayName}</div>
                <button type= "button" className="add-contact" data-bs-toggle="modal" data-bs-target="#contact-popup" onClick={handlePopUp}><i
                    className="bi bi-person-add"></i></button>
            </div>
            <Search doSearch={doSearch} searchBox={searchBox}/>
        </div>
    );
}

export default ContactsHeader;