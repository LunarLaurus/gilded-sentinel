import React from 'react';
import '../../styles/styles.css';
import '../../styles/InformationPage.css';

const PrivacyPolicyPage: React.FC = () => {

    React.useEffect(() => {
        document.title = "Privacy Policy";
    });

    return (
        <div className="infopage-container">
            <div className="infopage-card" >
                <h2>Privacy Policy</h2>
                <p>Lorem Ipsum</p>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
