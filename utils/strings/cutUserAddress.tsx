export function cutUserAddress(address : string) {
    if (address) {
        return (address.substring(0, 5) + "...." + address.substring(address.length - 5, address.length));
    } else {
        return (null);
    }
}