import React from 'react';
import '../../styles/styles.css';
import '../../styles/InformationPage.css';

const ContactPage: React.FC = () => {

    React.useEffect(() => {
        document.title = "Contact";
    });

    return (
        <div className="infopage-container">
            <div className="infopage-card" >
                <h2>Contact</h2>
                <p>Lorem Ipsum</p>
            </div>
        </div>
    );
};

export default ContactPage;
