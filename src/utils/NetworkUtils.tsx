import { Client } from '../types/ClientInterfaces';
import { IPv4Address } from '../types/IpmiInterfaces';

export function ipv4ToString(ip: IPv4Address): string {
    return ip.octets.join('.');
}

export function getClientIpmiIp(client: Client): string {
    if (client.ipmi && client.impiSystem?.address) {
        return ipv4ToString(client.impiSystem?.address);
    } else {
        return 'N/A';
    }
}