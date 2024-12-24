import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client?: AuthenticatedClient;
}

const FanDetails: React.FC<Props> = ({ client }) => (
    <div>
        <h2>Fans</h2>
        {client && client?.fans?.length > 0 ? (
            client.fans.map((fan, index) => (
                <p key={index}>
                    Fan {index + 1}: {fan.id}, {fan.currentReading} {fan.unit}, Health: {fan.statusHealth}, State: {fan.statusState}
                </p>
            ))
        ) : (
            <p>No Fans available</p>
        )}
    </div>
);

export default FanDetails;
