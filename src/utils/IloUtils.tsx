export function getIloVersion(input: string): number | null {
    const match = input.match(/iLO\s*(\d+)/i);
    if (match && match[1]) {
        return parseInt(match[1], 10);
    }
    return -1;
}

/**
 * Calculates the time since the last update and returns a concise status string.
 * @param lastUpdateTime - The last update time of the client.
 * @param now - The current time (default is new Date()).
 * @param onlineThresholdMs - Time threshold (in ms) to consider as "Online" (default is 2 minutes).
 * @param zeroPad - Whether to zero-pad hours, minutes, and seconds (default is true).
 * @returns A string in the format "days hours mins secs" or "Online".
 */
export function getLastOnlineFlag(
    lastUpdateTime: string | number | Date,
    now: Date = new Date(),
    onlineThresholdMs: number = 1000 * 120,
    zeroPad: boolean = true
): string {
    const lastUpdate = new Date(lastUpdateTime);
    const diffMs = now.getTime() - lastUpdate.getTime();
    if (isNaN(diffMs) || diffMs < 0) {
        return 'Invalid timestamp';
    }
    if (diffMs <= onlineThresholdMs) {
        return 'Online';
    }

    const diffSeconds = Math.floor(diffMs / 1000);
    const seconds = diffSeconds % 60;
    const diffMinutes = Math.floor(diffSeconds / 60);
    const minutes = diffMinutes % 60;
    const diffHours = Math.floor(diffMinutes / 60);
    const hours = diffHours % 24;
    const days = Math.floor(diffHours / 24);

    const pad = (value: number) => (zeroPad ? value.toString().padStart(2, '0') : value.toString());

    const parts: string[] = [];
    if (days > 0) parts.push(`${days} ${days === 1 ? 'Day' : 'Days'}`);
    if (hours > 0) parts.push(`${pad(hours)} ${hours === 1 ? 'Hour' : 'Hours'}`);
    if (minutes > 0) parts.push(`${pad(minutes)} ${minutes === 1 ? 'Minute' : 'Minutes'}`);
    if (seconds > 0 || parts.length === 0) parts.push(`${pad(seconds)} ${seconds === 1 ? 'Second' : 'Seconds'}`);

    return parts.join(' ');
}


