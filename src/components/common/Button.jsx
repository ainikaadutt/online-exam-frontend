import "../../styles/button.css";
function Button({
                    text,
                    onClick,
                    type = "button",
                    className = ""
                }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`primary-button ${className}`}
        >
            {text}
        </button>
    );
}

export default Button;