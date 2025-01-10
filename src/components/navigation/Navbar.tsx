import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../styles/Navbar.css';

interface NavBarTabProps {
    label: string;
    path: string;
    fakeBackButton?: boolean;
}

interface NavbarProps {
    showBackButton?: boolean;
    tabs: NavBarTabProps[];
}

const Navbar: React.FC<NavbarProps> = ({ showBackButton = true, tabs = [] }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleBackClick = () => {
        const currentPath = location.pathname;
        const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
        navigate(parentPath || '/');
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
                    {tabs.map((tab) => {
                        const isActive = location.pathname === tab.path && !tab.fakeBackButton;
                        const className = tab.fakeBackButton
                            ? 'fake-back-button'
                            : `tab-button ${isActive ? 'active-tab' : ''}`;
                        return (
                            <button
                                key={tab.label}
                                className={className}
                                onClick={() => navigate(tab.path)}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Navbar;
