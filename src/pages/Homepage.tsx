import React from 'react';
import '../styles/styles.css';
import '../styles/Homepage.css';
import { useNavigate } from 'react-router-dom';

const Homepage: React.FC = () => {

    React.useEffect(() => {
        document.title = "Gilded Sentinel";
    });

    const navigate = useNavigate();

    const handleTileClick = (url: string) => {
        navigate(url);
    };

    return (
        <div className="homepage-container">
            <div
                className={'homepage-card'}
                onClick={() => handleTileClick('/clients')}
            ><h2>Clients</h2></div>
            <div
                className={'homepage-card'}
                onClick={() => handleTileClick('/ipmi')}
            ><h2>IPMI Management</h2></div>
        </div>
    );
};

export default Homepage;
