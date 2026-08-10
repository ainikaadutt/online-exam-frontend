import "../../styles/page-header.css";

function PageHeader({ greeting, title, description }) {

    return (
        <div className="page-header">

            <div>

                <p className="page-greeting">
                    {greeting}
                </p>

                <h1>
                    {title}
                </h1>

                <p className="page-description">
                    {description}
                </p>

            </div>

        </div>
    );
}

export default PageHeader;