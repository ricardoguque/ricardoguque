---
title: MAC Address
description: MAC Address
---

A MAC address is a identifier for a network interface controller (NIC) and is used to identify devices on a local area network (LAN). Different than the IP address, the MAC address will be allways the same for a device (or its NIC) even if it is placed on a different network.

It is a 48-bit address that is usually represented in hexadecimal format and is divided into six octets. Each octet is separated by a colon (:) or a hyphen (-) and can have a value between 00 and FF.

The following are examples of MAC addresses:
- 00:15:5d:b0:b6:91
- 00-15-5d-b0-b6-91

Vendors are assigned a unique identifier by the IEEE, which is the first three octets of the MAC address. The last three octets are assigned by the vendor and can be any value.

## Ethernet Frame
The MAC address is part of the Ethernet frame and is used to identify the source and destination of the frame. Ethernet is used by the data link layer of the OSI model and is used to encapsulate the data from the network layer.

The follwoing are the fields of the Ethernet frame:
| Field         | Length (Bytes) | Description                           |
|---------------|----------------|---------------------------------------|
| Destination MAC Address | 6              | The MAC address of the destination device. |
| Source MAC Address      | 6              | The MAC address of the source device.      |
| 802.1Q Tag (optional) | 4              | VLAN tag for identifying the VLAN.   |
| EtherType/Length        | 2              | Indicates the protocol type or the length of the payload. |
| Payload/Data            | 42|46 - MTU       | The actual data being transmitted.         |
| Frame Check Sequence (FCS) | 4           | Error-checking code to ensure data integrity. |

:::note
For payload, the lenght can be between 42 and 46 bytes, and that is because the minimum size of the frame is 64 bytes, therefore:
- If we have a non 802.1q tag the heather + FCS is 22 bytes, so the payload must be 42 bytes
- If we have a 802.1q tag the heather + FCS is 26 bytes, so the payload must be 46 bytes
:::
## Ethertype values

The following are some common Ethertype values used in Ethernet frames:
| Ethertype | Description                           |
|-----------|---------------------------------------|
| 0x0800    | Internet Protocol Version 4 (IPv4)   |
| 0x0806    | Address Resolution Protocol (ARP)     |
| 0x8035    | Reverse Address Resolution Protocol (RARP) |
| 0x86DD    | Internet Protocol Version 6 (IPv6)   |
| 0x8847    | MPLS unicast                         |
| 0x8848    | MPLS multicast                       |
| 0x88CC    | Link Layer Discovery Protocol (LLDP) |
| 0x88E5    | IEEE 802.1AE MAC security (MACsec)  |

:::note
Thertype helps the receiving device to identify the protocol used in the payload and process it accordingly. For example, if the Ethertype is 0x0800, the receiving device will process the payload as an IPv4 packet.
:::