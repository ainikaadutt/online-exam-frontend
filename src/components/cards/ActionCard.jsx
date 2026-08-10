import { FaArrowRight } from "react-icons/fa";
import "../../styles/action-card.css";

function ActionCard({ icon, title, description, onClick }) {

    return (
        <button
            className="action-card"
            onClick={onClick}
        >

            <div className="action-icon">
                {icon}
            </div>

            <div className="action-content">

                <h3>{title}</h3>

                <p>{description}</p>

            </div>

            <FaArrowRight className="action-arrow" />

        </button>
    );
}

export default ActionCard;