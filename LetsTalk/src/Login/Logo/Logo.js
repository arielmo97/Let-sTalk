import "./Logo.css";

function Logo(){
    return (
        <div className="col" id="login-logo-col">
          <div className="image-container" id="login-image-container">
            <img src="./images/Chat_Logo.png" id="login-logo-img" alt="Let'sTalk logo" />
            <h2 id="login-logo-txt">Let'sTalk</h2>
          </div>
      </div>
    );
}

export default Logo;