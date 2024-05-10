
export function addressEllipsis (address: string, startLength: number, endLength?: number) {
  return address
    ? `${address.substring(0, startLength)}...${address.substring(address.length - (endLength || 6))}`
    : null
}
