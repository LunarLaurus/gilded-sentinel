import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navigation/Navbar';
import '../../styles/InformationPage.css';

const IpmiPage: React.FC = () => {
    const navigate = useNavigate();

    const tiles = [
        {
            title: 'HPE - Integrated Lights Out',
            description: 'Manage HPE server settings and monitor hardware health.',
            url: '/ipmi/ilo',
            icon: '/icons/ipmi/ilo/ilo-192x.png',
        },
        {
            title: 'Dell - Remote Access Controller',
            description: 'Access and control Dell servers remotely.',
            url: '/ipmi/drac',
            icon: '/icons/ipmi/drac/drac-192x.png',
        },
    ];

    return (
        <div className="infopage-container">
            <Navbar tabs={[]} />
            <div className="infopage-tiles">
                {tiles.map((tile, index) => (
                    <div
                        key={index}
                        className="infopage-tile"
                        onClick={() => navigate(tile.url)}
                    >
                        <img
                            src={tile.icon}
                            alt={`${tile.title} Icon`}
                            className="infopage-tile-icon"
                        />
                        <h2>{tile.title}</h2>
                        <p>{tile.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IpmiPage;
