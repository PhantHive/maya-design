export const Footer = () => {
    // make only a linkedin icon and a behance icon
    return (
        <div className="footer">
            <a
                href="https://www.linkedin.com/in/mayagozel-ovezova-46655a211/"
                target="_blank"
                rel="noreferrer"
            >
                <img src="linkedin.png" alt="linkedin" />
            </a>
            <a
                href="https://www.behance.net/mayagozovezova"
                target="_blank"
                rel="noreferrer"
            >
                <img src="behance.svg" alt="behance" />
            </a>
        </div>
    );
};
