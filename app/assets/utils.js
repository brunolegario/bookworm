export function ShortenString(string, size) {
    if (string === null || string === '') {
        return string;
    }

    if (string.length > size) {
        string = string.substring(0, size) + '...';
    }

    return string;
}
