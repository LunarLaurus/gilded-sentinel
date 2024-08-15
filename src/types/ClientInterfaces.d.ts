import { IntegratedLightsOutInfo } from './IloInterfaces';

export interface Client {
    name: string;
    ilo?: IntegratedLightsOutInfo;
    system: System;
}

export interface System {
    cpus: CPU[];
    cpuCount: number;
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
