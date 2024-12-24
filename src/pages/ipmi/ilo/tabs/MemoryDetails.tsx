import React from 'react';
import { AuthenticatedClient } from '../../../../types/IloInterfaces';

interface Props {
    client?: AuthenticatedClient;
}

const MemoryDetails: React.FC<Props> = ({ client }) => (
    <div>
        <h2>Memory</h2>
        {client && client?.memory?.dimms?.length > 0 ? (
            client.memory.dimms.map((dimm, index) => (
                <p key={index}>
                    DIMM {index + 1}: {dimm.id}, {dimm.status}, {dimm.size}MB, {dimm.manufacturer}, {dimm.partNumber}
                </p>
            ))
        ) : (
            <p>No DIMMs available</p>
        )}
    </div>
);

export default MemoryDetails;
