const ShakingField = (id) => {
    let inputGroup = document.getElementById(id);
        inputGroup.classList.add('LoginShaking');
        setTimeout(() => {
            inputGroup.classList.remove('LoginShaking');
        }, 1000);
}

export default ShakingField;