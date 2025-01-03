export interface IPv4Address {
    octets: number[];
    address: string;
}
export interface IpmiInfo {
    parentHostName: string;
    address: IPv4Address;
    type: string;
    updateIpmiEveryXUpdates: number;
    updateCounter: number;
    ipmiHardware: IpmiPeripheralBase[];
}
export interface IpmiPeripheralBase {
    
}
