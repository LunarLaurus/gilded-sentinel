import { Client } from '../types/ClientInterfaces';
import { IPv4Address } from '../types/IloInterfaces';

export function ipv4ToString(ip: IPv4Address): string {
    return ip.octets.join('.');
}

export function getClientIloIp(client: Client): string {
    if (client.ilo && client.ilo.iloAddress) {
        return ipv4ToString(client.ilo.iloAddress);
    } else {
        return 'N/A';
    }
}