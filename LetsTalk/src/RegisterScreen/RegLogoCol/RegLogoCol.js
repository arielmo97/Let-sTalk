import './RegLogoCol.css'
import { Link } from "react-router-dom";


function RegLogoCol() {
    return (
        <div className="col register-col" id="register-logo-col">
            <div className="image-container" id="register-image-container">
                <img src="./images/Chat_Logo.png" id="register-logo-img"></img>
                <h2 id="register-logo-text">Let'sTalk</h2>
            </div>
            <div id="link-to-login">
                <p>
                Already have an account? <Link to="/">login here </Link>
                </p>
            </div>
        </div>
    );
}

export default RegLogoCol;