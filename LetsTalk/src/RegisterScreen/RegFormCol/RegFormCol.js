import './RegFormCol.css'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { useState } from 'react';
import InputField from './InputField/InputField.js';
import UploadPhoto from './UploadPhoto/UploadPhoto.js';
import ShakeField from './InputField/ShakeField.js';
import { error } from 'jquery';

function RegFormCol() {


    const [username, setUsername] = useState('');
    const [usernameErr, setUsernameErr] = useState(false);
    const [usernameErrMsg, setUsernameErrMsg] = useState('');
    const usernameFormat = /^(?=.*[a-zA-Z])[a-zA-Z\d]*$/;

    const [displayName, setDisplayName] = useState('');
    const [displayNameErr, setDisplayNameErr] = useState(false);
    const [displayNameErrMsg, setDisplayNameErrMsg] = useState('');
    //const displayNameErrMsg = 'Please enter a display name'

    const [password, setPassword] = useState('');
    const [passwordErr, setPasswordErr] = useState(false);
    const [passwordErrMsg, setPasswordErrMsg] = useState('');

    const passwordFormat = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;

    const [confPassword, setConfPassword] = useState('');
    const [confPasswordErr, setConfPasswordErr] = useState(false);
    const [confPasswordErrMsg, setConfPasswordErrMsg] = useState('');

    const [profilePic, setProfilePic] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
    const [uploadedErrMsg, setUploadedErrMsg] = useState('');

    const handleUserName = (event) => {
        setUsernameErr(false);
        setUsername(event.target.value);
        return;
    };

    const handleDisplayName = (event) => {
        setDisplayNameErr(false);
        setDisplayNameErrMsg('');
        setDisplayName(event.target.value);
    }

    const handlePassword = (event) => {
        setPasswordErr(false);
        setPasswordErrMsg('');
        setPassword(event.target.value);
    }

    const handleConfirmPassword = (event) => {
        setConfPasswordErr(false);
        setConfPasswordErrMsg('');
        setConfPassword(event.target.value);
    }

    const handleImgUpload = (image) => {
        setProfilePic(image);
    }

    const navigate = useNavigate();

    async function register(userData) {
        try {
            const req = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            };

            const res = await fetch('http://localhost:5000/api/Users', req);
            if (res.status === 200) {
                setUsernameErrMsg("");
                setPasswordErrMsg("");
                setConfPasswordErrMsg("");
                setUploadedErrMsg("");
                navigate('/');

            } else if (res.status === 400) {
                const responseBody = await res.json();
                const errors = responseBody;
                const errorMessages = [];

                if (errors.u !== undefined) {
                    setUsernameErr(true);
                    setUsernameErrMsg(errors.u);
                    ShakeField('username');
                }

                if (errors.p !== undefined) {
                    setPasswordErr(true);
                    setPasswordErrMsg(errors.p);
                    ShakeField('password');
                }


                if (errors.d !== undefined) {
                    setDisplayNameErr(true);
                    setDisplayNameErrMsg(errors.d);
                    ShakeField('display-name');
                }


            } else if (res.status === 409) {
                setUsernameErr(true);
                setUsernameErrMsg('This username is already taken.');
                ShakeField('username');
            } else {
                console.log('Unexpected error.')
            }
        }
        catch (error) {
            console.log(error);
        }

    }

    const handleSubmit = (event) => {
        event.preventDefault();
        let allGood = true;
        if (!username) {
            allGood = false;
            setUsernameErr(true);
            setDisplayNameErrMsg('Please enter a username');
            setUsernameErrMsg('Username does not match required format.');
            ShakeField('username');
        }
        if (!displayName) {
            allGood = false;
            setDisplayNameErr(true);
            setDisplayNameErrMsg('Please enter a display name');
            ShakeField('display-name');
        }
        if (!password) {
            allGood = false;
            setPasswordErr(true);
            setPasswordErrMsg("Please enter a password")
            ShakeField('password');
        }
        if (!confPassword) {
            allGood = false;
            setConfPasswordErr(true);
            setConfPasswordErrMsg('Please confirm your password');
            ShakeField('conf-password');
        } else {
            if (password !== confPassword) {
                allGood = false;
                setConfPasswordErr(true);
                setConfPasswordErrMsg('The password confirmation does not match your password');
                ShakeField('conf-password');
            }
        }
        if (!isUploaded) {
            allGood = false;
            ShakeField('profile-pic');
        }

        if (allGood) {
            const userData = {
                username: username,
                displayName: displayName,
                password: password,
                profilePic: profilePic
            };
            register(userData);
        }
    };


    return (
        <div className="col register-col" id="register-col">
            <h1 id="register-welcome-header">Welcome To Let'sTalk</h1>

            <form onSubmit={handleSubmit} id="register-form">

                {/* Username */}
                <InputField
                    iconId='register-username-icon'
                    iconClass='bi bi-person-circle'
                    infoId='username-info'
                    placeholder='Username'
                    inpName='username'
                    type='text'
                    infoContent='The username has to contain at least one letter.'
                    onChange={handleUserName}
                    value={username}
                    wasErr={usernameErr}
                    errMsg={usernameErrMsg}
                />

                {/* Display Name */}
                <InputField
                    iconId='display-name-icon'
                    iconClass='bi bi-person-bounding-box'
                    infoId='display-name-info'
                    placeholder='Display name'
                    inpName='display-name'
                    type='text'
                    infoContent='This name will be dispalyed to your contacts and must be less than 20 characters.'
                    onChange={handleDisplayName}
                    value={displayName}
                    wasErr={displayNameErr}
                    errMsg={displayNameErrMsg}
                />

                {/* Password */}
                <InputField
                    iconId='register-password-icon'
                    iconClass='bi bi-lock-fill'
                    infoId='password-info'
                    placeholder='Password'
                    inpName='password'
                    type='password'
                    infoContent='Your password must contain at least 1 letter, 1 digit and be at least 5 characters long.'
                    onChange={handlePassword}
                    value={password}
                    wasErr={passwordErr}
                    errMsg={passwordErrMsg}
                />

                {/* Confirm password */}
                <InputField
                    iconId='conf-password-icon'
                    iconClass='bi bi-key-fill'
                    infoId='conf-password-info'
                    placeholder='Confirm Password'
                    inpName='conf-password'
                    type='password'
                    infoContent='Re-type the password you picked for yourself.'
                    onChange={handleConfirmPassword}
                    value={confPassword}
                    wasErr={confPasswordErr}
                    errMsg={confPasswordErrMsg}
                />

                <UploadPhoto
                    onImgUpload={handleImgUpload}
                    isUpload={setIsUploaded}
                    errMsg={setUploadedErrMsg}
                />


                <Link to="/" onClick={handleSubmit}>
                    <button type="submit" className="btn btn-primary" id="sign-up-btn">Sign Up</button>
                </Link>
            </form>
        </div>
    );
}

export default RegFormCol;