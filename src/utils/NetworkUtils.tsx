import { Client } from '../types/ClientInterfaces';
import { IPv4Address } from '../types/IpmiInterfaces';

export function ipv4ToString(ip: IPv4Address): string {
    return ip.octets.join('.');
}

export function getClientIpmiIp(client: Client): string {
    if (client.hasIpmi && client.ipmiSystem?.address) {
        return ipv4ToString(client.ipmiSystem?.address);
    } else {
        return 'N/A';
    }
}