// src/components/SystemTab.tsx
import React from 'react';
import { Client } from '../../../types/ClientInterfaces';

interface SystemTabProps {
    client: Client;
}

const SystemTab: React.FC<SystemTabProps> = ({ client }) => {
    const { cpuCount, cpus } = client.system;
    const isSingleCPU = cpuCount === 1;
    const coreCount = isSingleCPU ? cpus[0]?.coreCount : cpus.reduce((max, cpu) => Math.max(max, cpu.coreCount), 0);
    
    return (
        <div className="details-card">
            <h1>{client.name}</h1>
            <h2>System Information</h2>
            <p>CPU Count: {cpuCount}</p>
            {isSingleCPU ? (
                <p>Core Count: {coreCount}</p>
            ) : (
                <p>Cores per CPU: {coreCount}</p>
            )}
        </div>
    );
};

export default SystemTab;
