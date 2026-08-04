import "../../styles/navbar.css";

function Navbar({ title }) {
    return (
        <div className="navbar">
            <h2>{title}</h2>

            <div className="user-info">
                <span>Welcome 👋</span>
            </div>
        </div>
    );
}

export default Navbar;