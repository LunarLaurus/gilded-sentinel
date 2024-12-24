import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client?: AuthenticatedClient;
}

const BiosDetails: React.FC<Props> = ({ client }) => (
    <div>
        <h2>Bios</h2>
        <p>Current BIOS: {JSON.stringify(client?.bios?.current || 'N/A')}</p>
        <p>Backup BIOS: {JSON.stringify(client?.bios?.backup || 'N/A')}</p>
        <p>Bootblock BIOS: {JSON.stringify(client?.bios?.bootBlock || 'N/A')}</p>
        <p>UEFI Class: {client?.bios?.uefiClass}</p>
    </div>
);

export default BiosDetails;
