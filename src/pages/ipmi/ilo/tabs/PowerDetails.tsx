import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client?: AuthenticatedClient;
}

const PowerDetails: React.FC<Props> = ({ client }) => (
    <div>
        <h2>Power Data</h2>
        <p>Capacity: {client?.powerData?.capacity}W</p>
        <p>Consumption: {client?.powerData?.consumption}W</p>
        <p>Average Consumed Watts: {client?.powerData?.averageConsumedWatts}W</p>
        <p>Interval: {client?.powerData?.intervalInMinutes} minutes</p>
        <p>Max Consumed Watts: {client?.powerData?.maxConsumedWatts}W</p>
        <p>Min Consumed Watts: {client?.powerData?.minConsumedWatts}W</p>
        {client && client?.powerData?.supplies?.length > 0 && (
            <>
                <h3>Power Supplies</h3>
                {client.powerData.supplies.map((supply, index) => (
                    <p key={index}>
                        Power Supply {index + 1}: ID: {supply.id}, Status: {supply.status}, Voltage: {supply.inputVoltage}V, Capacity: {supply.powerCapacity}W
                    </p>
                ))}
            </>
        )}
    </div>
);

export default PowerDetails;
