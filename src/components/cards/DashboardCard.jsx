import "../../styles/cards.css";

function DashboardCard({ icon, title, value }) {

    return (

        <div className="dashboard-card">

            <div className="dashboard-card-icon">
                {icon}
            </div>

            <h3>
                {title}
            </h3>

            <h1>
                {value}
            </h1>

        </div>

    );
}

export default DashboardCard;