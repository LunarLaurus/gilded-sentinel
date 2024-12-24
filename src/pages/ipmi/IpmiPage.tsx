import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navigation/Navbar';

const IpmiPage: React.FC = () => {
    const navigate = useNavigate();

    const handleTileClick = (url: string) => {
        navigate(url);
    };

    return (
        <div className="infopage-container">
            <Navbar />
            <div
                className="infopage-tile"
                onClick={() => handleTileClick('/ipmi/ilo')}
            >
                <h2>HPE - Integrated Lights Out</h2>
            </div>
            <div
                className="infopage-tile"
                onClick={() => handleTileClick('/ipmi/drac')}
            >
                <h2>Dell - Remote Access Controller</h2>
            </div>
        </div>
    );
};

export default IpmiPage;
