
import { useState } from "react";
import InputFieldPopOver from "./InputFieldError.js";

function InputField(props) {

    const [showPopover, setShowPopover] = useState(false);

    const togglePopOver = () => {
        setShowPopover(!showPopover);
    };

    return (
        <>
            <div className='input-group register-input-group' id={props.inpName}>
                <span className="input-group-text register-input-group-text" id={props.iconId}>
                    <i className={props.iconClass}></i>
                </span>
                <input
                    type={props.type}
                    className="form-control" id="register-form-control"
                    name={props.inpName}
                    placeholder={props.placeholder}
                    aria-describedby={props.iconId}
                    autoComplete="off"
                    onChange={props.onChange}
                ></input>
                <span
                    className="input-group-text info-icon"
                    onMouseEnter={togglePopOver}
                    onMouseLeave={togglePopOver}
                >
                    <i className="bi bi-info-circle" id={props.infoId}></i>
                </span>
                {showPopover && (
                <div className="popover info-popover" style={{ left: "calc(100% + 10px)" }}>
                    {/* <div className="popover-header">{props.placeholder}</div> */}
                    <div className="popover-body">{props.infoContent}</div>
                </div>
            )}
            </div>
            {props.wasErr && (<InputFieldPopOver errMsg={props.errMsg} />)}
            
        </>
    );
};

export default InputField