import React from 'react';
import { Client } from '../../../../types/ClientInterfaces';
import FanSpeedControl from '../../../subcomponent/IloFanSpeedController/FanSpeedControl';
import {ipv4ToString} from "../../../../utils/NetworkUtils";

interface IloIpmiTabContentProps {
    client: Client;
}

const IloIpmiTabContent: React.FC<IloIpmiTabContentProps> = ({ client }) => {
    return (
        <div>
            <h2>ILO Information</h2>
            <p>Address: {ipv4ToString(client.ipmiSystem!.address)}</p>
            <p>Host System: {client.ipmiSystem!.parentHostName}</p>
            <p>Updating Every X Updates: {client.ipmiSystem?.updateIpmiEveryXUpdates}</p>
            <p>Update Counter: {client.ipmiSystem?.updateCounter}</p>
            <FanSpeedControl client={client} />
        </div>
    );
};

export default IloIpmiTabContent;
