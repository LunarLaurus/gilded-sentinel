import React from 'react';
import { Client } from '../../../types/ClientInterfaces';
import IloIpmiTabContent from './ipmi/IloIpmiTabContent';
import DracIpmiTabContent from './ipmi/DracIpmiTabContent';

interface IpmiTabProps {
    client: Client;
}

const IpmiTab: React.FC<IpmiTabProps> = ({ client }) => {
    const renderIpmiContent = () => {
        switch (client.ipmiSystem?.type.toLowerCase()) {
            case 'ilo':
                return <IloIpmiTabContent client={client} />;
            case 'drac':
                return <DracIpmiTabContent client={client} />;
            default:
                return <p>Unsupported IPMI type</p>;
        }
    };

    return (
        <div className="details-card">
            {renderIpmiContent()}
        </div>
    );
};

export default IpmiTab;
