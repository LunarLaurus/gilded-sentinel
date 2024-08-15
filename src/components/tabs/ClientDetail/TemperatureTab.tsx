// src/components/TemperatureTab.tsx
import React from 'react';
import { Client } from '../../../types/ClientInterfaces';
import TemperatureChart from '../../subcomponent/TemperatureChart/TemperatureChart';

interface TemperatureTabProps {
    client: Client;
}

const TemperatureTab: React.FC<TemperatureTabProps> = ({ client }) => {
    return (
        <div className="details-card">
            <h2>System Temperature Information</h2>
            {client.system.cpus.map((cpu, index) => (
                <div key={index} className="cpu-details">
                    <h3>CPU {index + 1}</h3>
                    <p>Package Temperature: {cpu.cpuPackageTemperature}°C</p>
                    <p>Core Max: {cpu.coreMaxTemperature}°C</p>
                    <p>Core Avg: {cpu.coreAverageTemperature.toFixed(2)}°C</p>
                    <h4>Core Temperatures:</h4>
                    <div className="core-temperatures-list">
                            {Object.entries(cpu.coreTemperatures).map(([core, temp]) => (
                                <div key={core} className="core-temperature-item">
                                    <span className="core-name">C#{core}: </span> 
                                    <span className="core-temp">{temp}°C</span>
                                </div>
                            ))}
                        </div>
                </div>
            ))}
            <br/>
            <div className="graph-container">
                <center><h2>Graph</h2></center>
                <TemperatureChart id={client.name} />
            </div>
        </div>
    );
};

export default TemperatureTab;
