import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Navbar.css';

interface NavbarProps {
    showBackButton?: boolean;
    tabs?: { label: string; path: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ showBackButton = true, tabs = [] }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackClick = () => {
        const currentPath = location.pathname; // Get the current URL path
        const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/')); // Remove the last segment
        navigate(parentPath || '/'); // Navigate to the parent path, or root if none
    };

    return (
        <div className="navbar">
            {showBackButton && (
                <button className="back-button" onClick={handleBackClick}>
                    Back
                </button>
            )}
            {tabs.length > 0 && (
                <div className="tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.path}
                            className="tab-button"
                            onClick={() => navigate(tab.path)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Navbar;
