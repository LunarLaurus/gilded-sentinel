// src/components/Header.tsx
import React from 'react';
import '../../styles/primary/Header.css'

const Header: React.FC = () => {
    return (
        <header className="global-header">
            <div className="header-content">
                <h1>Gilded Sentinel</h1>
                <h2>Client Monitoring Platform by Laurus Industries</h2>
                <nav className="header-nav">
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="https://github.com/LunarLaurus/gilded-sentinel">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
