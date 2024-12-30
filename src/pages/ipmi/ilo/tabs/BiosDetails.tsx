import React from 'react';
import '../../../../styles/ilo/IloGenericStyling.css';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client: AuthenticatedClient;
}

/* Reusable Card Component */
const BiosCard: React.FC<{ title: string; details: { date: string; family: string } }> = ({ title, details }) => (
    <div className="generic-ilo-card">
        <h2>{title}</h2>
        <p>
            Date: {details.date}<br />
            Family: {details.family}<br />
        </p>
    </div>
);

const BiosDetails: React.FC<Props> = ({ client }) => {
    const { current, backup, bootBlock } = client.bios;
    const validBootBlock = bootBlock?.version?.length > 0;

    return (
        <div className="generic-ilo-container">
            <div className="generic-ilo-grid">
                {/* Current BIOS Details */}
                <BiosCard title="Current" details={current} />

                {/* Backup BIOS Details */}
                <BiosCard title="Backup" details={backup} />

                {/* Boot Block Details (Conditional Rendering) */}
                {validBootBlock && (
                    <BiosCard title="Boot Block" details={bootBlock!} />
                )}
            </div>
        </div>
    );
};

export default BiosDetails;
