import { IPv4Address } from './IpmiInterfaces';

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
    serverHostname: string;
    nics: IloNicObject[];
    healthStatus: number;
    cpuData: IloProcessorSummary;
    memory: IloMemoryObject;
    fans: IloRestFanObject[];
    thermalSensors: IloTemperatureSensor[];
    powerData: IloPowerObject;
    iloLicense: IloLicenseObject;
    oemInformation: IloOemInformation;
    systemType: string;
    iloBootInformation: IloBootObject;
	indicatorLed: string;
    lastUpdate: number;
}

export interface IloTemperatureSensor {
    name: string;
    number: number;
    locationXmm: number;
    locationYmm: number;
    physicalContext: string;
    currentReading: number;
    readingCelsius: number;
    upperThresholdCritical: number;
    upperThresholdFatal: number;
    upperThresholdUser: number;
    health: Health;
    state: State;
    unit: TemperatureUnit;
}
export interface IloFanSpeedUpdateRequestDto {
    iloClientAddress: IPv4Address;
    updateType: string;
    targetFanSpeed: number;
}

export interface IloOemInformation {
    bios: IloBios;
    hostOS: IloHostOsObject;
    powerRegulatorMode: IloPowerRegulatorMode;
    powerRegulatorModesSupported: IloPowerRegulatorMode[];
    trustedModules: IloTpmObject;
    intelligentProvisioningIndex: number;
    intelligentProvisioningLocation: string;
    intelligentProvisioningVersion: string;
    postState: string;
    powerAllocationLimit: string;
    powerAutoOn: string;
    powerOnDelay: string;
    virtualProfile: string;
}
export interface IloBios {
    current: IloBiosObject;
    backup: IloBiosObject;
    bootBlock: IloBiosObject;
    uefiClass: number;
}
export interface IloBiosObject {
    date: string;
    version: string;
    family: string;
    allocation: string;
}
export interface IloHostOsObject {
    osName: string;
    osSysDescription: string;
    osVersion: string;
    osType: number;
}
export interface IloProcessorSummary {
    count: number;
    model: string;
    status: Health;
}
export interface IloTpmObject {
    status: string;
    trustedModules: IloTpm[];
}
export interface IloTpm {
    type: string;
    status: string;
}
export interface IloBootObject {
    bootSourceOverrideEnabled: boolean;
    bootSourceOverrideSupported: string[];
    bootSourceOverrideTarget: string;
    uefiTargetBootSourceOverride: string;
    uefiTargetBootSourceOverrideSupported: string[];
}

export enum IloPowerRegulatorMode {
    OS_CONTROL = 'OS_CONTROL',
    DYNAMIC = 'DYNAMIC',
    MAX = 'MAX',
    MIN = 'MIN',
    UNKNOWN = 'UNKNOWN',
}
export enum Health {
    OK = 'OK',
    WARNING = 'WARNING',
    CRITICAL = 'CRITICAL',
    UNKNOWN = 'UNKNOWN',
}

export enum TemperatureUnit {
    CELSIUS = 'CELSIUS',
    FAHRENHEIT = 'FAHRENHEIT',
    KELVIN = 'KELVIN',
    UNKNOWN = 'UNKNOWN',
}

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
    fanName: string;
    slotId: number;
    currentReading: number;
    unit: Unit;
    statusState: State;
    statusHealth: Health;
    location: string;
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
    health: Health;
    powerCapacity: number;
    pluggedIn: boolean;
    firmwareVersion: string;
    lastPowerOutputWatts: number;
    lineInputVoltage: number;
    lineInputVoltageType: string;
    model: string;
    bayNumber: number;
    hotplugCapable: boolean;
    type: string;
    serialNumber: string;
    sparePartNumber: string;
    state: State;
    lastUpdateTime: number;
}


// License Object
export interface IloLicenseObject {
    license: string;
    licenseKey: string;
    licenseType: string;
}
