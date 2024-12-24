// IPv4 Address
import { IPv4Address } from 'IpmiInterfaces';

// NIC Interface
export interface Nic {
    port: number;
    description: string;
    location: string;
    mac: string;
    ip: IPv4Address | null;
    status: string;
}

// Unauthenticated Client
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

export interface AuthenticatedClient {
    iloAddress: IPv4Address;
    iloUuid: string;
    iloUser: {
        authData: string;
        wrappedAuthData?: string;
    };
    serialNumber: string;
    serverModel: string;
    serverId: string;
    serverUuid: string;
    productId: string;
    iloText: string;
    iloVersion: string;
    iloFwBuildDate: string;
    iloSerialNumber: string;
    nics: IloNicObject[];
    healthStatus: number;
    bios: IloBios;
    cpuData: IloProcessorSummary;
    memory: IloMemoryObject;
    fans: IloRestFanObject[];
    powerData: IloPowerObject;
    license: IloLicenseObject;
    lastUpdate: number;
}

// Fan Speed Update Request
export interface IloFanSpeedUpdateRequestDto {
    iloClientAddress: IPv4Address;
    updateType: string;
    targetFanSpeed: number;
}

// IloBios Interface
export interface IloBios {
    current: IloBiosObject;
    backup: IloBiosObject;
    bootBlock: IloBiosObject;
    uefiClass: number;
}

// IloProcessorSummary
export interface IloProcessorSummary {
    count: number;
    model: string;
    status: Health;
}

// Health Enum
export enum Health {
    OK = 'OK',
    WARNING = 'WARNING',
    CRITICAL = 'CRITICAL',
    UNKNOWN = 'UNKNOWN',
}

// Memory Interfaces
export interface IloMemoryObject {
    dimms: IloMemoryDimm[];
    lastUpdateTime: number;
}

export interface IloMemoryDimm {
    status: DimmStatus;
    location: DimmLocation;
    type: DimmTechnology;
    generation: DimmGeneration;
    ecc: ErrorCorrection;
    hpMemoryType: HpMemoryType;
    id: string;
    name: string;
    manufacturer: string;
    partNumber: string;
    rank: number;
    size: number;
    maximumFrequency: number;
    minimumVoltageVolts: number;
    dataWidth: number;
    totalWidth: number;
    lastUpdateTime: number;
}

export interface DimmLocation {
    processorId: number;
    dimmId: number;
}

// Memory Enums
export enum DimmStatus {
    OK = 'OK',
    WARNING = 'WARNING',
    CRITICAL = 'CRITICAL',
    UNKNOWN = 'UNKNOWN',
}

export enum DimmTechnology {
    DDR3 = 'DDR3',
    DDR4 = 'DDR4',
    UNKNOWN = 'UNKNOWN',
}

export enum DimmGeneration {
    SDRAM = 'SDRAM',
    DDR = 'DDR',
    UNKNOWN = 'UNKNOWN',
}

export enum ErrorCorrection {
    NONE = 'NONE',
    ECC = 'ECC',
    UNKNOWN = 'UNKNOWN',
}

export enum HpMemoryType {
    STANDARD = 'STANDARD',
    FAST = 'FAST',
    UNKNOWN = 'UNKNOWN',
}

// Rest Fan Object
export interface IloRestFanObject {
    id: string;
    currentReading: number;
    unit: Unit;
    statusState: State;
    statusHealth: Health;
    lastUpdateTime: number;
}

// Fan Enums
export enum State {
    ENABLED = 'ENABLED',
    DISABLED = 'DISABLED',
    OFFLINE = 'OFFLINE',
    IN_TEST = 'IN_TEST',
    STARTING = 'STARTING',
    ABSENT = 'ABSENT',
    UNKNOWN = 'UNKNOWN',
}

export enum Unit {
    RPM = 'RPM',
    PERCENT = 'PERCENT',
    UNKNOWN = 'UNKNOWN',
}

// Power Interfaces
export interface IloPowerObject {
    capacity: number;
    consumption: number;
    averageConsumedWatts: number;
    intervalInMinutes: number;
    maxConsumedWatts: number;
    minConsumedWatts: number;
    supplies: IloPowerSupplyObject[];
    lastUpdateTime: number;
}

export interface IloPowerSupplyObject {
    id: string;
    status: Health;
    inputVoltage: number;
    powerCapacity: number;
}

// License Object
export interface IloLicenseObject {
    license: string;
    licenseKey: string;
    licenseType: string;
}
