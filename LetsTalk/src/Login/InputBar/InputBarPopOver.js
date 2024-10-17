import './InputBarPopOver.css'

function InputBarPopOver({errMsg}) {
    return(
        <div className="input-bar-popover" id="login-input-bar-popover">
            <div className="arrow"></div>
            <div className="popover-content" id="login-popover-content">{errMsg}</div>
        </div>
    );
}

export default InputBarPopOver;