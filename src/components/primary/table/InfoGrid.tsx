import React, { useState } from 'react';
import InfoTable from './InfoTable';

interface SectionConfig {
    title: string;
    clickable?: boolean; // Toggle visibility of grid
    defaultVisible?: boolean;
    fieldsToDisplay: string[];
    fieldNameOverrides?: Record<string, string>;
    fieldDecorators?: Record<string, { prefix?: string; suffix?: string }>;
}

interface InfoGridProps {
    data: Record<string, any>[]; // Array of objects
    title: string; // Grid title
    clickable?: boolean; // Toggle visibility of grid
    defaultVisible?: boolean;
    onClick?: (item: Record<string, any>) => void; // Custom onClick for individual items
    sections: SectionConfig[]; // Array of sections for InfoTables
    getItemTitle: (item: Record<string, any>) => string; // Title function for each item
    noDataMessage?: string; // Message when no data is available
}

const InfoGrid: React.FC<InfoGridProps> = ({
    data,
    title,
    sections,
    getItemTitle,
    clickable = true,
    defaultVisible = true,
    onClick,
    noDataMessage = 'No items available',
}) => {
    const [showAll, setShowAll] = useState(clickable ? defaultVisible : true);

    return (
        <div className="generic-info-grid">
            <h2 onClick={() => clickable && setShowAll(!showAll)} style={{ cursor: clickable ? 'pointer' : 'default' }}>
                {title} {clickable ? (showAll ? '▼' : '▶') : ''}
            </h2>
            {showAll && (
                <div className="generic-ilo-grid">
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <div
                                key={`${index}-${getItemTitle(item)}`}
                                className="generic-ilo-card"
                                onClick={() => onClick?.(item)} // Trigger onClick if provided
                                style={{ cursor: onClick ? 'pointer' : 'default' }} // Change cursor if onClick exists
                            >
                                <h2>{getItemTitle(item)}</h2>
                                {sections.map((section, sectionIndex) => (
                                    <InfoTable
                                        key={`${index}-${sectionIndex}-${section.title}`}
                                        data={item}
                                        title={section.title}
                                        showArrow={sections.length === 1 ? false : true}
                                        clickable={sections.length === 1 ? false : section.clickable}
                                        defaultVisible={sections.length === 1 ? true : section.defaultVisible}
                                        fieldsToDisplay={section.fieldsToDisplay}
                                        fieldNameOverrides={section.fieldNameOverrides}
                                        fieldDecorators={section.fieldDecorators}
                                    />
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>{noDataMessage}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default InfoGrid;
