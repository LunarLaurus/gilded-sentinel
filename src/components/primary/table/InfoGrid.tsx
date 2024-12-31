import React, { useState, useMemo } from 'react';
import InfoTable from './InfoTable';
import '../../../styles/InfoGrid.css';

interface FieldDecorator {
    prefix?: string;
    suffix?: string;
}

interface SectionConfig {
    title: string;
    clickable?: boolean; // Toggle visibility of grid
    defaultVisible?: boolean;
    customFieldData?: Record<string, any>;
    fieldsToDisplay: string[];
    fieldTypeMap?: Record<string, (value: any) => React.ReactNode>;
    fieldNameOverrides?: Record<string, string>;
    fieldDecorators?: Record<string, FieldDecorator>;
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

    const mergedSections = useMemo(() => {
        return data.map((item) =>
            sections.map((section) => ({
                ...section,
                mergedData: { ...item, ...section.customFieldData }, // Merge custom data into each section
            }))
        );
    }, [data, sections]);

    return (
        <div className="info-grid-container">
            <h2
                onClick={() => clickable && setShowAll(!showAll)}
                style={{ cursor: clickable ? 'pointer' : 'default' }}
            >
                {title} {clickable ? (showAll ? '▼' : '▶') : ''}
            </h2>
            {showAll && (
                <div className="info-grid">
                    {data.length > 0 ? (
                        mergedSections.map((mergedSectionData, itemIndex) => {
                            const item = data[itemIndex];
                            const itemTitle = getItemTitle(item);

                            return (
                                <div
                                    key={`${itemIndex}-${itemTitle}`}
                                    className="info-grid-card"
                                    onClick={() => onClick?.(item)}
                                    style={{ cursor: onClick ? 'pointer' : 'default' }}
                                >
                                    <h3>{itemTitle}</h3>
                                    {mergedSectionData.map((section, sectionIndex) => (
                                        <InfoTable
                                            key={`${itemIndex}-${sectionIndex}-${section.title}`}
                                            data={section.mergedData} // Use merged data
                                            title={section.title}
                                            showArrow={sections.length === 1 ? false : true}
                                            clickable={sections.length === 1 ? false : section.clickable}
                                            defaultVisible={sections.length === 1 ? true : section.defaultVisible}
                                            customFieldData={undefined} // Already merged into `mergedData`
                                            fieldsToDisplay={section.fieldsToDisplay}
                                            fieldNameOverrides={section.fieldNameOverrides}
                                            fieldDecorators={section.fieldDecorators}
                                            fieldTypeMap={section.fieldTypeMap}
                                        />
                                    ))}
                                </div>
                            );
                        })
                    ) : (
                        <h3 style={{ textAlign: 'center' }}>{noDataMessage}</h3>
                    )}
                </div>
            )}
        </div>
    );
};

export default InfoGrid;