import React from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
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

const IloClientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Tab and route configuration
    const routes = [
        { label: 'Client Details', path: 'detail', component: ClientDetails },
        { label: 'Bios', path: 'bios', component: BiosDetails },
        { label: 'Thermal', path: 'thermal', component: FanDetails },
        { label: 'License', path: 'license', component: LicenseDetails },
        { label: 'Memory', path: 'memory', component: MemoryDetails },
        { label: 'Network', path: 'network', component: NicDetails },
        { label: 'Power', path: 'power', component: PowerDetails },
        { label: 'Processor', path: 'cpu', component: ProcessorDetails },
    ];

    const { data: authenticatedClient, loading: loadingAuthenticated } = callEndpointNoArguments<AuthenticatedClient>(`ilo/${id}/authenticated`);

    if (loadingAuthenticated || !authenticatedClient) {
        return <div>Loading client...</div>;
    }

    return (
        <div className="client-page-container">
            <Navbar
                tabs={[
                    { label: 'Back to Client List', path: '/ipmi/ilo',
                    fakeBackButton: true },
                    ...routes.map((route) => ({
                        label: route.label,
                        path: `/ipmi/ilo/client/${id}/${route.path}`
                    })),
                ]}
                showBackButton={false}
            />
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={<route.component client={authenticatedClient} />}
                    />
                ))}
            </Routes>
        </div>
    );
};

export default IloClientPage;
