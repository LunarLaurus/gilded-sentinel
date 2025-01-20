import React from 'react';
import '../../styles/styles.css';
import '../../styles/InformationPage.css';

const TermsOfServicePage: React.FC = () => {

    React.useEffect(() => {
        document.title = "Terms of Service";
    });

    return (
        <div className="infopage-container">
            <div className="infopage-card" >
                <h2>Terms of Service</h2>
                <p>Lorem Ipsum</p>
            </div>
        </div>
    );
};

export default TermsOfServicePage;
