import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../../styles/dashboard.css";

function DashboardLayout({ title, role, children }) {
    return (
        <div className="dashboard-container">

            <Sidebar role={role} />

            <div className="dashboard-content">

                <Navbar title={title} />

                <div className="page-content">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default DashboardLayout;