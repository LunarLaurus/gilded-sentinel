import React, { useState, useMemo } from 'react';
import '../../../styles/InfoTable.css';

interface FieldDecorator {
    prefix?: string;
    suffix?: string;
}

interface InfoTableProps {
    data: Record<string, any>;
    fieldsToDisplay: string[];
    title?: string | ((client: any) => string);
    clickable?: boolean;
    defaultVisible?: boolean;
    showArrow?: boolean;
    customFieldData?: Record<string, any>; // Additional data to inject
    fieldTypeMap?: Record<string, (value: any) => React.ReactNode>;
    fieldNameOverrides?: Record<string, string>; // Map for overriding field names
    fieldDecorators?: Record<string, FieldDecorator>; // Map for prefix and suffix
}

const InfoTable: React.FC<InfoTableProps> = React.memo(({
    data,
    fieldsToDisplay,
    title,
    clickable = true,
    defaultVisible = true,
    showArrow = true,
    customFieldData = {},
    fieldTypeMap = {},
    fieldNameOverrides = {},
    fieldDecorators = {},
}) => {
    const [showInfo, setShowInfo] = useState(clickable ? defaultVisible : true);

    const combinedData = useMemo(() => ({ ...data, ...customFieldData }), [data, customFieldData]);
    const getRealTitle = (title: string | ((data: any) => string), data: any): string =>
        typeof title === 'function' ? title(data) : title;


    const defaultTypeHandler = (value: any): React.ReactNode => {
        if (typeof value === 'boolean') return value ? 'Yes' : 'No';
        if (value instanceof Date) return new Date(value).toLocaleString();
        if (value && typeof value === 'object' && 'address' in value) return value.address;
        if (Array.isArray(value)) {
            if (value.every(item => typeof item === 'string')) {
                return value.join(', ');
            }
            return `${value.length}`;
        }
        if (value && typeof value === 'object') return '[Object]';
        return value?.toString() || 'N/A';
    };

    if (!data || fieldsToDisplay.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div className="info-table-card">
            {title && (
                <h3
                    onClick={() => clickable && setShowInfo(!showInfo)}
                    style={{ cursor: clickable ? 'pointer' : 'default' }}
                >
                    {getRealTitle(title, data)} {clickable && showArrow && (showInfo ? '▼' : '▶')}
                </h3>
            )}
            {showInfo && (
                <table className="info-table">
                    <tbody>
                        {fieldsToDisplay.map((key) => (
                            <tr key={key}>
                                <th>
                                    <strong>
                                        {fieldNameOverrides[key] ||
                                            key
                                                .replace(/([A-Z])/g, ' $1')
                                                .replace(/^./, (str) =>
                                                    str.toUpperCase()
                                                )}
                                    </strong>
                                </th>
                                <td>
                                    {fieldDecorators[key]?.prefix || ''}
                                    {fieldTypeMap[key]
                                        ? fieldTypeMap[key](combinedData[key])
                                        : defaultTypeHandler(combinedData[key])}
                                    {fieldDecorators[key]?.suffix || ''}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
});

export default InfoTable;
