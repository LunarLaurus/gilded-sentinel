import React from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import { FetchEndpoint } from '../../../hooks/useEndpointNoArguments';
import { AuthenticatedClient } from '../../../types/IloInterfaces';
import Navbar from '../../../components/navigation/Navbar';
import ClientDetails from './tabs/ClientDetails';
import FanDetails from './tabs/FanDetails';
import MemoryDetails from './tabs/MemoryDetails';
import NicDetails from './tabs/NicDetails';
import PowerDetails from './tabs/PowerDetails';
import { useQuery } from '@tanstack/react-query';

const IloClientPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    
    const { data: authenticatedClient, isLoading, isError } = useQuery({
        queryKey: [`authIloClient-${id}`],
        queryFn: () => FetchEndpoint<AuthenticatedClient>(`ilo/${id}/authenticated`),
    });

    // Tab and route configuration
    const routes = [
        { label: 'Client Details', path: 'detail', component: ClientDetails },
        { label: 'Thermal', path: 'thermal', component: FanDetails },
        { label: 'Memory', path: 'memory', component: MemoryDetails },
        { label: 'Network', path: 'network', component: NicDetails },
        { label: 'Power', path: 'power', component: PowerDetails },
    ];

    if (isLoading) {
        return <div>Loading clients...</div>;
    }
    if (!authenticatedClient || authenticatedClient === null) {
        return <div>
            Valid Response: {authenticatedClient ? 'true' : 'false'}, 
            Valid Data: {authenticatedClient !== null}
            </div>;
    }
    if (isError) {
        return <div>Error loading client.</div>;
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
