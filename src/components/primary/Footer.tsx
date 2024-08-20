// src/components/Footer.tsx
import React from 'react';
import '../../styles/primary/Footer.css';

const Footer: React.FC = () => {
    return (
        <footer className="global-footer">
            <div className="footer-content">
                <p>&copy; 2024 Laurus Industries. All Rights Reserved.</p>
                <nav className="footer-nav">
                    <ul>
                        <li><a href="/privacy">Privacy Policy</a></li>
                        <li><a href="/terms">Terms of Service</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
