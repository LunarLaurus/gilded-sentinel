import React, { useEffect } from 'react';
import '../styles/ClientData.css';
import callEndpointNoArguments from '../hooks/useEndpointNoArguments';
import { useNavigate } from 'react-router-dom';
import { ClientsMap } from '../types/ClientInterfaces'; // Import the correct types

const ClientData: React.FC = () => {
    const navigate = useNavigate();

    // Use the custom hook to fetch data from the clients' endpoint
    const { data, loading, error } = callEndpointNoArguments<ClientsMap>('api/clients');

    useEffect(() => {
        // If you want to refetch every 1000ms
        const intervalId = setInterval(() => {
            console.info("Refetching data...");
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center">Error: {error}</div>;
    if (!data) return <div className="text-center">No data available</div>;

    const handleTileClick = (id: string) => {
        navigate(`/client/${id}`);
    };

    const getVendorImagePath = (vendor: string | null | undefined): string => {
        const vendorImageMap: { [key: string]: string } = {
            dell: '/icons/vendor/dell/dell-32x.png',
            hp: '/icons/vendor/hpe/hpe-32x.png',
            hpe: '/icons/vendor/hpe/hpe-32x.png',
        };
    
        return vendor ? vendorImageMap[vendor.toLowerCase()] || '/icons/vendor/default-32x.png' : '/icons/vendor/default-32x.png';
    };    

    const getIpmiImagePath = (ipmi: string | null | undefined): string => {
        const ipmiImageMap: { [key: string]: string } = {
            drac: '/icons/ipmi/drac/drac-32x.png',
            ilo: '/icons/ipmi/ilo/ilo-32x.png',
        };
    
        return ipmi ? ipmiImageMap[ipmi.toLowerCase()] || '/icons/ipmi/default-32x.png' : '/icons/ipmi/default-32x.png';
    };

    return (
        <div className="card-container">
            {Object.keys(data).map((key) => {

                const client = data[key];
                const cpu = client.system.cpus[0];
                const cpuCount = client.system.cpuCount;
                const coreCount = cpu?.coreCount;
                const isSingleCPU = cpuCount === 1;
                const cpuDescription = isSingleCPU
                    ? `${cpuCount} CPU - ${coreCount} Cores`
                    : `${cpuCount} CPUs - ${coreCount} Cores/CPU`;
                const averageCoreTemp = cpu?.coreAverageTemperature.toFixed(2);
                const hottestCoreTemp = cpu?.coreMaxTemperature;
                const cpuTempDescription = `Average Core Temp: ${averageCoreTemp}°C (Hottest: ${hottestCoreTemp}°C)`;

                return (
                    <div
                        key={key}
                        className={'client-card'}
                        onClick={() => handleTileClick(key)}
                    >
                        <img
                            src={getVendorImagePath(client.vendor)}
                            alt={`${client.vendor} logo`}
                            className="vendor-icon"
                        />
                        {client.hasIpmi && (
                            <img
                                src={getIpmiImagePath(client.ipmiSystem?.type)}
                                alt={`${client.hasIpmi} logo`}
                                className="ipmi-icon"
                            />
                        )}

                        <h2>{client.name}</h2>
                        <h3>{cpuDescription}</h3>
                        <p>
                            {cpuTempDescription}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default ClientData;
