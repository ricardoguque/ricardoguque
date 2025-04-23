---
title: ARP
description: Address Resolution protocol
---

## What is ARP

## Lab creation

## ARP Messages

## ARP table

ARP on Linux:  arp -n, ip nieghbor
ARP on Cisco: show arp, show ip arp
Arp on Arista: 

clear the ARP

## ARP cache

## Static ARP

Interesting use cases for static ARP mapping

## ARP timers

Show the timers for Linux, Cisco, Arista

Agging time

## Packet camptures

Linux, Cisco, Arista. All messages

ARP fields and Ethernet headers

## ARP attacks

## Finding duplicate IPs with ARP

- Having 2 deivces with same IP responing to a ARP request. Is there a way to find the duplicate?

What means "incomplete"?

## Gratuitous ARP

To proactively say to the people that I still have the X IP tied to my Y MAC

no se espera un reply

usos
- en los FHR protocols para decir quien es el nuevo que toma el GW
- Cluster servers en el caso de que son active/stanby, si hay un problem el standby ana el GARP
- cuando se hace un clear entonces el equipo manda su GARP de la ip que el tiene y su mac

## Reverse ARP

Used by a RARP server to respond to IP/MAC mapping. What are the alternatives to this?, is DHGCP best?

## Proxy ARP

Un GW device puede responder por ARP request de ips que no estan en el mismo dominio de brodcast. En un domino recive el ARP y en otro lo pide.

Podria ser este caso para no tener que hacer el ip lookup y solo forwardear basado en la MAC?. No porque el GW responde con su propia MAC entonces lo abrira para ver el packete IP

Solo testear el siguiente caso de uso:
1. when you migrate hosts from a large network to a smal part of it. example a /8 to a /24 in same /8. host not migrated will still think the can ask the mac for an ip on the /8. A GW will be responding for this request if it has the other network connected.
![alt text](proxy_arp_1.png)


ARP tables become larger

## ARP posoning

The attacker uses GARP to tell other devices (even the GW) that the attacker MAC is the one for the GW IP. This can lead to Blackholing the traffic or the attacker can inspect the traffic and then send it to the GW.

This can be controlled by having MAC based port authentication like 802.1x

```
richo@LAPTOP-A3AMEUF1:~$ arp -n
Address                  HWtype  HWaddress           Flags Mask            Iface
172.17.176.1             ether   00:15:5d:fd:89:55   C                     eth0
```
```
richo@LAPTOP-A3AMEUF1:~$ sudo arp -d 172.17.176.1
```
```
richo@LAPTOP-A3AMEUF1:~$ sudo tshark -nV arp
Running as user "root" and group "root". This could be dangerous.
Capturing on 'eth0'
 ** (tshark:189034) 21:32:08.626725 [Main MESSAGE] -- Capture started.
 ** (tshark:189034) 21:32:08.626840 [Main MESSAGE] -- File: "/tmp/wireshark_eth0QKAL52.pcapng"
Frame 1: 42 bytes on wire (336 bits), 42 bytes captured (336 bits) on interface eth0, id 0
    Interface id: 0 (eth0)
        Interface name: eth0
    Encapsulation type: Ethernet (1)
    Arrival Time: Apr 20, 2025 21:32:12.397490592 PDT
    [Time shift for this packet: 0.000000000 seconds]
    Epoch Time: 1745209932.397490592 seconds
    [Time delta from previous captured frame: 0.000000000 seconds]
    [Time delta from previous displayed frame: 0.000000000 seconds]
    [Time since reference or first frame: 0.000000000 seconds]
    Frame Number: 1
    Frame Length: 42 bytes (336 bits)
    Capture Length: 42 bytes (336 bits)
    [Frame is marked: False]
    [Frame is ignored: False]
    [Protocols in frame: eth:ethertype:arp]
Ethernet II, Src: 00:15:5d:b0:b6:91, Dst: ff:ff:ff:ff:ff:ff
    Destination: ff:ff:ff:ff:ff:ff
        Address: ff:ff:ff:ff:ff:ff
        .... ..1. .... .... .... .... = LG bit: Locally administered address (this is NOT the factory default)
        .... ...1 .... .... .... .... = IG bit: Group address (multicast/broadcast)
    Source: 00:15:5d:b0:b6:91
        Address: 00:15:5d:b0:b6:91
        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
    Type: ARP (0x0806)
Address Resolution Protocol (request)
    Hardware type: Ethernet (1)
    Protocol type: IPv4 (0x0800)
    Hardware size: 6
    Protocol size: 4
    Opcode: request (1)
    Sender MAC address: 00:15:5d:b0:b6:91
    Sender IP address: 172.17.177.71
    Target MAC address: 00:00:00:00:00:00
    Target IP address: 172.17.176.1

Frame 2: 42 bytes on wire (336 bits), 42 bytes captured (336 bits) on interface eth0, id 0
    Interface id: 0 (eth0)
        Interface name: eth0
    Encapsulation type: Ethernet (1)
    Arrival Time: Apr 20, 2025 21:32:12.397710358 PDT
    [Time shift for this packet: 0.000000000 seconds]
    Epoch Time: 1745209932.397710358 seconds
    [Time delta from previous captured frame: 0.000219766 seconds]
    [Time delta from previous displayed frame: 0.000219766 seconds]
    [Time since reference or first frame: 0.000219766 seconds]
    Frame Number: 2
    Frame Length: 42 bytes (336 bits)
    Capture Length: 42 bytes (336 bits)
    [Frame is marked: False]
    [Frame is ignored: False]
    [Protocols in frame: eth:ethertype:arp]
Ethernet II, Src: 00:15:5d:fd:89:55, Dst: 00:15:5d:b0:b6:91
    Destination: 00:15:5d:b0:b6:91
        Address: 00:15:5d:b0:b6:91
        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
    Source: 00:15:5d:fd:89:55
        Address: 00:15:5d:fd:89:55
        .... ..0. .... .... .... .... = LG bit: Globally unique address (factory default)
        .... ...0 .... .... .... .... = IG bit: Individual address (unicast)
    Type: ARP (0x0806)
Address Resolution Protocol (reply)
    Hardware type: Ethernet (1)
    Protocol type: IPv4 (0x0800)
    Hardware size: 6
    Protocol size: 4
    Opcode: reply (2)
    Sender MAC address: 00:15:5d:fd:89:55
    Sender IP address: 172.17.176.1
    Target MAC address: 00:15:5d:b0:b6:91
    Target IP address: 172.17.177.71
```