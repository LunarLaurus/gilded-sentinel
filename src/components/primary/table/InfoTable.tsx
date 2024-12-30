import React, { useState } from 'react';
import '../../../styles/InfoTable.css';

interface FieldDecorator {
    prefix?: string;
    suffix?: string;
}

interface InfoTableProps {
    data: Record<string, any>;
    fieldsToDisplay: string[];
    title: string;
    clickable?: boolean;
    defaultVisible?: boolean;
    showArrow?: boolean;
    fieldTypeMap?: Record<string, (value: any) => React.ReactNode>;
    fieldNameOverrides?: Record<string, string>; // Map for overriding field names
    fieldDecorators?: Record<string, FieldDecorator>; // Map for prefix and suffix
}

const InfoTable: React.FC<InfoTableProps> = ({
    data,
    fieldsToDisplay,
    title,
    clickable = true,
    defaultVisible = true,
    showArrow = true,
    fieldTypeMap = {},
    fieldNameOverrides = {},
    fieldDecorators = {}
}) => {
    const [showInfo, setShowInfo] = useState(clickable ? defaultVisible : true); // State to toggle visibility

    const defaultTypeHandler = (value: any): React.ReactNode => {
        if (typeof value === 'boolean') {
            return value ? 'Yes' : 'No';
        } else if (value instanceof Date) {
            return new Date(value).toLocaleString();
        } else if (value && typeof value === 'object' && 'address' in value) {
            return value.address; // Handle objects with `address`
        } else if (Array.isArray(value)) {
            return `${value.length}`;
        } else if (value && typeof value === 'object') {
            return '[Object]';
        }
        return value?.toString() || 'N/A';
    };

    if (!data || fieldsToDisplay.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="info-table-card">
            {/* Title is clickable and toggles visibility */}
            <h2 onClick={() => clickable ? setShowInfo(!showInfo) : {}} style={{ cursor: clickable ? 'pointer' : 'default' }}>
                {title} {clickable && showArrow ? (showInfo ? '▼' : '▶') : ''}
            </h2>
            {showInfo && ( // Conditionally render the table
                <table className="info-table">
                    <tbody>
                        {fieldsToDisplay.map(key => (
                            <tr key={key}>
                                <th>
                                    <strong>
                                        {fieldNameOverrides[key] // Use overridden name if available
                                            ? fieldNameOverrides[key]
                                            : key
                                                .replace(/([A-Z])/g, ' $1')
                                                .replace(/^./, str => str.toUpperCase())}
                                    </strong>
                                </th>
                                <td>
                                    {fieldDecorators[key]?.prefix || ''}
                                    {fieldTypeMap[key]
                                        ? fieldTypeMap[key](data[key]) // Use custom rendering logic if defined
                                        : defaultTypeHandler(data[key])} {/* Fallback to default */}
                                    {fieldDecorators[key]?.suffix || ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default InfoTable;
