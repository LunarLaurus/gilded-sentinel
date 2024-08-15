import React from 'react';

interface TabButtonsProps {
    selectedTab: string;
    onTabSelect: (tab: string) => void;
    tabs: string[];
}

const TabButtons: React.FC<TabButtonsProps> = ({ selectedTab, onTabSelect, tabs }) => {
    return (
        <div className="tabs">
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onTabSelect(tab)}
                    style={{
                        padding: '10px',
                        margin: '5px',
                        backgroundColor: selectedTab === tab ? '#ccc' : '#fff',
                        border: selectedTab === tab ? '1px solid #000' : '1px solid #ccc',
                    }}
                    aria-label={`Select ${tab} time range`}
                    role="tab"
                >
                    {tab}
                </button>
            ))}
        </div>
    );
};

export default TabButtons;
