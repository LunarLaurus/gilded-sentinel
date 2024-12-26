import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';
import IloFanSettingsCard from '../../../../components/subcomponent/ipmi/ilo/IloFanSettingsCard';

interface Props {
    client: AuthenticatedClient;
}

const FanDetails: React.FC<Props> = ({ client }) => (
    <div>
        <h2>Fans</h2>
        {client.fans.length > 0 ? (
            client.fans.map((fan, index) => (
                <p key={index++}>
                    {fan.fanName}: {fan.currentReading} {fan.unit} [{fan.statusHealth}/{fan.statusState}]
                </p>
            ))
        ) : (
            <p>No Fans available</p>
        )}
        <IloFanSettingsCard
                            key={client.serverId}
                            ip={client.iloAddress}
                            model={client.serverModel}
                            serial={client.serialNumber}
                            iloUuid={client.iloUuid}
        />
        <h2>Temperature</h2>
        <div className="ipmi-management-clients-grid">
                {client.thermalSensors
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((sensor) => (
                        <div
                            key={sensor.number + '-' + sensor.name}
                            className="ipmi-management-client-card"
                        >
                            <h3>{sensor.name}</h3>
                            <p>
                                Location:<br />
                                    X: {sensor.locationXmm}<br />
                                    Y: {sensor.locationYmm}<br />
                                <br />                                
                                physicalContext: {sensor.physicalContext}<br />
                                currentReading: {sensor.currentReading}<br />
                                readingCelsius: {sensor.readingCelsius}<br />
                                upperThresholdCritical: {sensor.upperThresholdCritical}<br />
                                upperThresholdFatal: {sensor.upperThresholdFatal}<br />
                                upperThresholdUser: {sensor.upperThresholdUser}<br />
                                Health: {sensor.health}<br />
                                State: {sensor.state}<br />
                                Unit: {sensor.unit}<br />
                            </p>
                        </div>
                    ))}
            </div>
    </div>
);

export default FanDetails;
