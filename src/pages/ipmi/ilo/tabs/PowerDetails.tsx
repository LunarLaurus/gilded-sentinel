import React from 'react';
import '../../../../styles/ilo/IloGenericStyling.css';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client: AuthenticatedClient;
}

const PowerDetails: React.FC<Props> = ({ client }) => {

    React.useEffect(() => {
        document.title = client.serverHostname + " Power Details";
    });

    return (<div className="generic-ilo-container">
        <h2 className="generic-ilo-title">Power Data</h2>
        <p>
            Total Capacity: {client.powerData.capacity}W<br />
            Total Consumption: {client.powerData.consumption}W<br />
            Average Consumption: {client.powerData.averageConsumedWatts}W<br />
            Interval: {client.powerData.intervalInMinutes} minutes<br />
            Max Consumed Watts: {client.powerData.maxConsumedWatts}W<br />
            Min Consumed Watts: {client.powerData.minConsumedWatts}W<br />
            Last Update Time: {new Date(client.powerData.lastUpdateTime).toLocaleString()}
        </p>
        {client.powerData.supplies.length > 0 ? (
            <div className="generic-ilo-grid">
                {client.powerData.supplies.map((supply, index) => (
                    <div
                        key={supply.bayNumber}
                        className={`generic-ilo-card ${!supply.pluggedIn ? 'disabled' : ''}`}
                    >
                        <h2>Power Supply {index + 1}</h2>
                        {supply.pluggedIn ? (
                            <p>
                                Bay Number: {supply.bayNumber}<br />
                                Capacity: {supply.powerCapacity}W<br />
                                Last Power Output: {supply.lastPowerOutputWatts}W<br />
                                Input Voltage: {supply.lineInputVoltage}V<br />
                                Input Voltage Type: {supply.lineInputVoltageType}<br />
                                Hotplug Capable: {supply.hotplugCapable ? 'Yes' : 'No'}<br />
                                <br />
                                Model: {supply.model} ({supply.type})<br />
                                Serial Number: {supply.serialNumber}<br />
                                Spare Part Number: {supply.sparePartNumber}<br />
                                Firmware Version: {supply.firmwareVersion}<br />
                                <br />
                                Status: {supply.health}<br />
                                State: {supply.state}<br />
                                Last Update Time: {new Date(supply.lastUpdateTime).toLocaleString()}
                            </p>

                        ) : (
                            <p>
                                This power supply is not plugged in or disabled.
                            </p>
                        )}
                    </div>

                ))}

            </div>
        ) : (
            <p className="generic-ilo-card">No Power Supplies Available</p>
        )}
    </div>
    );
};

export default PowerDetails;
