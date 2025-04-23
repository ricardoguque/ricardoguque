---
title: IPv4 Address
description: Internet Protocol Version 4 Address
---

IPv4 address is the identifier for the "Internet Protocol" and is part of the network layer of the OSI model. Since it is part of the network layer, then it means all applications that follow that OSI reference model will be using the Internet Protocol to encapsulate the application data.

:::note
This section will be covering only the IPv4 address. The IPv6 address will be covered in a different section.
:::

## IP Address vs MAC Address
Comparede to a MAC address, IP address is a logical address that can be changed, while MAC address is something well defined hardcoded in the device.

Imagine this as if your name is the MAC address and your IP is the address where you live. You can change your address, but your name is always the same.

## IP Address version
IP address has two versions, IPv4 and IPv6. IPv4 is the most common version and is a 32-bit address, while IPv6 is a 128-bit address.

## IPv4 representation
It is represented in decimal format and is divided into four octets. Each octet is separated by a dot (.) and can have a value between 0 and 255.

The following are examples of IPv4 addresses:

| Decimal     | Binary                           |
|-------------|----------------------------------|
| 192.168.1.1 | 11000000.10101000.00000001.00000001 |
| 10.0.0.1    | 00001010.00000000.00000000.00000001 |
| 172.16.0.1  | 10101100.00010000.00000000.00000001 |
| 8.8.8.8     | 00001000.00001000.00001000.00001000 |

## IPv4 Address Classes
IP address is divided into five classes, A, B, C, D, and E. Each class has a different range of addresses and is used for different purposes.

| Class | Range of Addresses       | Subnet Mask | Number of Networks | Number of Hosts per Network |
|-------|--------------------------|---------------------|--------------------|-----------------------------|
| A     | 0.0.0.0 - 127.255.255.255 | 255.0.0.0           | 128                | 16777216                 |
| B     | 128.0.0.0 - 191.255.255.255 | 255.255.0.0         | 16384              | 65536                     |
| C     | 192.0.0.0 - 223.255.255.255 | 255.255.255.0       | 2097152            | 254                       |
| D     | 224.0.0.0 - 239.255.255.255 | N/A (Multicast)     | N/A                | N/A                         |
| E     | 240.0.0.0 - 255.255.255.255 | N/A (Reserved)      | N/A                | N/A                         |


## IPv4 subnetting
Since the classfull addressing started to become ineficient because of the waste of IP address in large networks, the classless addressing was introduced. This is done by subdividing the network into smaller subnets and more specifically is by borrowing bits from the host part of the address to create more subnets.

With subnetting, VLSM (Variable Length Subnet Mask) is used to create subnets of different sizes. This allows for more efficient use of IP addresses and reduces the waste of IP addresses.

For example with subnet 188.45.25.0/24 we can have now 4 subnets of 30 hosts and 2 subnets of 62 hosts as in the table below:

| Network IP     | Subnet Mask     | Number of Hosts |
|----------------|-----------------|-----------------|
| 188.45.25.0    | 255.255.255.224 | 30              |
| 188.45.25.32   | 255.255.255.224 | 30              |
| 188.45.25.64   | 255.255.255.224 | 30              |
| 188.45.25.96   | 255.255.255.224 | 30              |
| 188.45.25.128  | 255.255.255.192 | 62              |
| 188.45.25.192  | 255.255.255.192 | 62              |

## IPv4 Private and Public Address
One divission of the IP address is the private and public address. The private address is used for internal networks and is not routable on the internet. The public address is used for external networks and is routable on the internet.

### Private
- Used for internal networks
- Not routable on the internet
- Can be used by multiple networks

:::note
The private ip ranges are: 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16
:::

### Public
- Used for external networks
- Routable on the internet
- Unique to each network
- Assigned to companies by IANA

## Broadcast, Unicast, Multicast and Anycast
IP address can be divided into four types, broadcast, unicast, multicast and anycast.

- **Broadcast**: On each subnet, there is a broadcast address that is used to send data to all devices on the subnet. The broadcast address is the last address in the subnet.
- **Unicast**: Unicast is used to send data to a single device on the network. The unicast address is the IP address of the destination device.
- **Multicast**: Multicast is used to send data to a group of devices on the network, the ones that are interested in receiving the data. 
- **Anycast**: Anycast is used to send data to the nearest device in a group of devices. The anycast address is the IP address of the nearest device.