export interface IPv4Address {
    octets: number[];
}
export interface IpmiInfo {
    parentHostName: string;
    address: IPv4Address;
    impiType: string;
    updateIpmiEveryXUpdates: number;
    updateCounter: number;
}
