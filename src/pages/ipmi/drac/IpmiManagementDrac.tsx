import React from 'react';
import Navbar from '../../../components/navigation/Navbar';

const IpmiManagementDrac: React.FC = () => {

    const tabs = [
        { label: 'Overview', path: '/ipmi/ilo/overview' },
        { label: 'Settings', path: '/ipmi/ilo/settings' },
        { label: 'Logs', path: '/ipmi/ilo/logs' },
    ];

    return (
        <div className="infopage-container">
        <Navbar tabs={tabs} />
            <div className="infopage-card" >
                <h2>Dell - Remote Access Controller</h2>
                <p>Lorem Ipsum</p>
            </div>
        </div>
    );
};

export default IpmiManagementDrac;
