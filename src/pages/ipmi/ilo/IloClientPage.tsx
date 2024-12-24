import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import callEndpointNoArguments from '../../../hooks/useEndpointNoArguments';
import { AuthenticatedClient } from '../../../types/IloInterfaces';
import Navbar from '../../../components/navigation/Navbar';
import ClientDetails from './tabs/ClientDetails';
import BiosDetails from './tabs/BiosDetails';
import FanDetails from './tabs/FanDetails';
import LicenseDetails from './tabs/LicenseDetails';
import MemoryDetails from './tabs/MemoryDetails';
import NicDetails from './tabs/NicDetails';
import PowerDetails from './tabs/PowerDetails';
import ProcessorDetails from './tabs/ProcessorDetails';

const ClientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const tabs = [
        { label: 'Back', path: '/ipmi/ilo/' },
        { label: 'Client Details', path: `/ipmi/ilo/client/${id}/` },
        { label: 'Bios', path: `/ipmi/ilo/client/${id}/bios` },
        { label: 'Fans', path: `/ipmi/ilo/client/${id}/fan` },
        { label: 'License', path: `/ipmi/ilo/client/${id}/license` },
        { label: 'Memory', path: `/ipmi/ilo/client/${id}/memory` },
        { label: 'Network', path: `/ipmi/ilo/client/${id}/network` },
        { label: 'Power', path: `/ipmi/ilo/client/${id}/power` },
        { label: 'Processor', path: `/ipmi/ilo/client/${id}/cpu` },
    ];

    const { data: authenticatedClient, loading: loadingAuthenticated } = callEndpointNoArguments<AuthenticatedClient>(`ilo/${id}/authenticated`);
    const [client, setClient] = useState<AuthenticatedClient>();

    useEffect(() => {
        if (authenticatedClient) {
            setClient(authenticatedClient);
        }
    }, [authenticatedClient]);

    if (loadingAuthenticated || !client) {
        return <div>Loading client...</div>;
    }

    return (
        <div className="client-page-container">
            <Navbar tabs={tabs} showBackButton={false} />
            <Routes>
                {/* Default route */}
                <Route path="/" element={<ClientDetails client={client} />} />

                {/* Sub-routes */}
                <Route path="bios" element={<BiosDetails client={client} />} />
                <Route path="fan" element={<FanDetails client={client} />} />
                <Route path="license" element={<LicenseDetails client={client} />} />
                <Route path="memory" element={<MemoryDetails client={client} />} />
                <Route path="network" element={<NicDetails client={client} />} />
                <Route path="power" element={<PowerDetails client={client} />} />
                <Route path="cpu" element={<ProcessorDetails client={client} />} />
            </Routes>
        </div>
    );
};

export default ClientPage;
