import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './LoginForm.css';
import ShakingField from "../InputBar/ShakingField.js";
import InputBar from '../InputBar/InputBar.js';

function LoginForm({ setCurrentUser, setToken, token }) {
    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState(false);
    const [usernameErrMsg, setUsernameErrMsg] = useState('');

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState(false);
    const [passwordErrMsg, setPasswordErrMsg] = useState('');

    const handleUserName = (event) => {
        setUsernameErr(false);
        setUsernameErrMsg("");
        setUsername(event.target.value);
    };

    const handlePassword = (event) => {
        setPasswordErr(false);
        setPasswordErrMsg('');
        setPassword(event.target.value);
    }

    const navigate = useNavigate();

    async function login(userData) {
        try {
            const reqToken = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            };

            const res = await fetch('http://localhost:5000/api/Tokens', reqToken);
            if (res.status === 200) {
                const currentToken = await res.text();
                setToken(currentToken);
                setUsernameErrMsg("");
                setPasswordErrMsg("");
                try {
                    const reqUser = {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${currentToken}`,
                        },
                    };
                    let resUser;
                    resUser = await fetch('http://localhost:5000/api/Users/' + userData.username, reqUser);
                    const userDetailsAfterGet = await resUser.text();
                    const userDataAfterGet = JSON.parse(userDetailsAfterGet);
                    const userMap = new Map(Object.entries(userDataAfterGet));
                    const currentUser = {
                        username: userMap.get("username"),
                        password: "",
                        displayName: userMap.get("displayName"),
                        profilePic: userMap.get("profilePic"),
                        contactsList: [],
                        token: currentToken,
                        online: "Online"
                    }
                    setCurrentUser(currentUser);
                    navigate('/Chat');

                } catch (error) {
                    console.error(error);
                }
            } else if (res.status === 404) {
                setUsernameErr(true);
                setPasswordErr(true);
                ShakingField('username');
                ShakingField('password');
                const err = await res.text();
                setPasswordErrMsg(err);
                setUsernameErrMsg(err);

            } else {
                console.log('Unexpected error.')
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (event) => {

        event.preventDefault();
        let allGood = true;
        if (!username) {
            allGood = false;
            setUsernameErr(true);
            setUsernameErrMsg('Please enter your username')
            ShakingField('username');
        }
        if (!password) {
            allGood = false;
            setPasswordErr(true);
            setPasswordErrMsg('Please enter your password');
            ShakingField('password');
            return;
        }
        if (allGood) {
            const userData = {
                username: username,
                password: password
            }
            login(userData);  
        }

    };
    return (
        <form id="login-form" onSubmit={handleSubmit}>
            {/* Username */}
            <InputBar
                iconId='login-username-icon'
                iconClass='bi bi-person-circle'
                infoId='username-info'
                placeholder='Username'
                inputName='username'
                type='text'
                infoContent='Your username should be the identifier you chose during registration.'
                onChange={handleUserName}
                value={username}
                wasErr={usernameErr}
                errMsg={usernameErrMsg}
            />
            {/* Password */}
            <InputBar
                iconId='login-password-icon'
                iconClass='bi bi-lock-fill'
                infoId='password-info'
                placeholder='Password'
                inputName='password'
                type='password'
                infoContent='Your password should match the username you provided during registration.'
                onChange={handlePassword}
                value={password}
                wasErr={passwordErr}
                errMsg={passwordErrMsg}
            />

            <Link to="/Chat" onClick={handleSubmit}>
                <button type="submit" className="btn btn-primary" id="login-btn">Login</button>
            </Link>
            <b></b>
            <p className="links" id="login-links">Don't have an account? <Link to="/Register">Click here</Link> to register</p>
        </form>
    );
}

export default LoginForm;