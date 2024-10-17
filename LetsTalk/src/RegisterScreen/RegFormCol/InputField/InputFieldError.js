import './InputFieldError.css'

function InputFieldError({errMsg}) {
    return(
        <div className="input-field-popover" id="register-input-field-popover">
            <div className="arrow" id="register-arrow"></div>
            <div className="popover-content" id="register-popover-content">{errMsg}</div>
        </div>
    );
}

export default InputFieldError;