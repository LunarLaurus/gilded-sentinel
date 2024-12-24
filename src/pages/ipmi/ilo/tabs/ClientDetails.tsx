import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client: AuthenticatedClient;
}

const ClientDetails: React.FC<Props> = ({ client }) => (
    <div className="auth-client-tile">
        <p>ILO Address: {client.iloAddress.address}</p>
        <p>ILO UUID: {client.iloUuid}</p>
        <p>Serial Number: {client.serialNumber}</p>
        <p>Server Model: {client.serverModel}</p>
        <p>Server ID: {client.serverId}</p>
        <p>Server UUID: {client.serverUuid}</p>
        <p>Product ID: {client.productId}</p>
        <p>ILO Text: {client.iloText}</p>
        <p>ILO Version: {client.iloVersion}</p>
        <p>ILO Firmware Build Date: {client.iloFwBuildDate}</p>
        <p>ILO Serial Number: {client.iloSerialNumber}</p>
        <p>Health Status: {client.healthStatus}</p>
    </div>
);

export default ClientDetails;
