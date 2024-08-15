export interface IPv4Address {
    octets: number[];
}
export interface IntegratedLightsOutInfo {
    iloParentHostName: string;
    iloAddress: IPv4Address;
    updateIloEveryXUpdates: number;
    updateCounter: number;
}
