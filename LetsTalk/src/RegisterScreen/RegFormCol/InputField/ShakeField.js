

const ShakeField = (id) => {
    let inputGroup = document.getElementById(id);
        inputGroup.classList.add('shaking');
        setTimeout(() => {
            inputGroup.classList.remove('shaking');
        }, 1000);
}

export default ShakeField;