import React from 'react';
import { Client } from '../../../../types/ClientInterfaces';
import {ipv4ToString} from "../../../../utils/NetworkUtils";

interface DracIpmiTabContentProps {
    client: Client;
}

const DracIpmiTabContent: React.FC<DracIpmiTabContentProps> = ({ client }) => {
    return (
        <div>
            <h3>DRAC IPMI Information</h3>
            <p>Address: {ipv4ToString(client.ipmiSystem!.address)}</p>
            <p>Host System: {client.ipmiSystem?.parentHostName}</p>
            {/* Add more DRAC specific content here */}
        </div>
    );
};

export default DracIpmiTabContent;
