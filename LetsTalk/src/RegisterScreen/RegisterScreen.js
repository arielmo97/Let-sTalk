import './RegisterScreen.css'

import RegFormCol from './RegFormCol/RegFormCol.js';
import RegLogoCol from './RegLogoCol/RegLogoCol.js';
import Bubbles from './Bubbles/Bubbles.js';

function RegisterScreen() {
    return (
        <> 
            <div id="register-body">
                <div className="container-fluid" id="register-screen-container">
                    <div className="row" id="register-row">
                        <RegFormCol />
                        <RegLogoCol />
                    </div>
                </div>
                <Bubbles />
            </div>
        </>
    );
}

export default RegisterScreen;