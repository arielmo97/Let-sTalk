import './InputBar.css';
import { useState } from "react";
import InputBarPopOver from "./InputBarPopOver.js";


function InputBar({iconId, iconClass,infoId, placeholder, inputName, type, onChange, infoContent, wasErr, errMsg}) {
    const [showPopover, setShowPopover] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePopOver = () => {
        setShowPopover(!showPopover);
    };
    const onEyeClick = () => {
        setShowPassword(!showPassword);
      }
    return (
        <>
            <div className='input-group login-input-group' id={inputName}>
                <span className="input-group-text login-input-group-text" id={iconId}>
                    <i className={iconClass}></i>
                </span>
                <input
                    type={type}
                    className="form-control"
                    name={inputName}
                    placeholder={placeholder}
                    aria-describedby={iconId}
                    autoComplete="off"
                    onChange={onChange}
                ></input>
                <span
                    className="input-group-text info-icon"
                    onMouseEnter={togglePopOver}
                    onMouseLeave={togglePopOver}
                >
                    <i className="bi bi-info-circle" id={infoId}></i>
                </span>
                {showPopover && (
                <div className="popover info-popover" id="login-popover" style={{ left: "calc(100% + 10px)" }}>
                    {/* <div className="popover-header">{inputName}</div> */}
                    <div className="popover-body" id="login-popover-body">{infoContent}</div>
                </div>
                 )}
                {/* {type === "password" && (
                    <div style={{ position: "absolute", right: 30, top: "50%", bottom: "35%", transform: "translateY(-50%)" }}>
                        <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"} style={{ paddingRight: "0px", color: "black" }} onClick={onEyeClick} />
                    </div>
                )} */}
            </div>
            {wasErr && (<InputBarPopOver errMsg={errMsg} />)}
            
        </>
    );
  }
  
  export default InputBar;