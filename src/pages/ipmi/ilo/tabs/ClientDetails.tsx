import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';
import { getIloVersion } from '../../../../utils/IloUtils';

interface Props {
    client: AuthenticatedClient;
}

const ClientDetails: React.FC<Props> = ({ client }) => (
    <div className="auth-client-tile">
        <p>
            <strong>ILO Information [{getIloVersion(client.iloText)}]</strong><br />
            Address: {client.iloAddress.address} <br />
            UUID: {client.iloUuid} <br />
            Serial Number: {client.iloSerialNumber} <br />
            Text: {client.iloText} <br />
            Version: {client.iloVersion} <br />
            <br />
            <strong>Server Information</strong><br />
            Model: {client.serverModel} <br />
            UUID: {client.serverUuid} <br />
            Serial Number: {client.serialNumber} <br />
            ID: {client.serverId} <br />
            Product ID: {client.productId} <br />
            <br />
            <strong>General Information</strong><br />
            Health Status: {client.healthStatus} <br />
        </p>

    </div>
);

export default ClientDetails;
