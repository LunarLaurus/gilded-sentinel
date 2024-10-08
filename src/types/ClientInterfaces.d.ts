import { IpmiInfo } from './IpmiInterfaces';

export interface Client {
    name: string;
    vendor: string;
    hasIpmi: boolean;
    system: System;
    ipmiSystem?: IpmiInfo;
}

export interface System {
    cpus: CPU[];
    cpuCount: number;
    cpuCoreCount: number;
}

export interface CPU {
    cpuId: number;
    coreCount: number;
    coreTemperatures: CoreTemperatures;
    cpuPackageTemperature: number;
    coreMaxTemperature: number;
    coreAverageTemperature: number;
}

export interface CoreTemperatures {
    [key: string]: number;
}

export interface ClientsMap {
    [key: string]: Client;
}
