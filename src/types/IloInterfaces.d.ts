import { IPv4Address } from 'IpmiInterfaces';

export interface Nic {
    port: number;
    description: string;
    location: string;
    mac: string;
    ip: IPv4Address | null;
    status: string;
}

export interface UnauthenticatedClient {
    iloAddress: IPv4Address;
    serialNumber: string;
    serverModel: string;
    serverId: string;
    serverUuid: string;
    productId: string;
    iloText: string;
    iloVersion: string;
    iloFwBuildDate: string;
    iloSerialNumber: string;
    iloUuid: string;
    healthStatus: number;
    nics: Nic[];
    lastUpdateTime: number;
    timeBetweenUpdates: number;
}

export interface IloFanSpeedUpdateRequestDto {
    iloClientAddress: IPv4Address;
    updateType: string;
    targetFanSpeed: number;
}