---
title: Overview
---

## Goal

Topics
- Broadcast storm: 
  - what can cause it?
    - BAD NIC?
    - BAD STP config
    - An attacker creates bcast traffic like ARP request
  - How this affect the network
    - The network uses the available BW for broadcast instead of legithim traffic
    - If CAM table is filled with MACs then the switch will flood all traffic
  - which traffics?
    - ARP
    - DHCP
  - How to avoid it?
    - VLANs to segment?
    - storm control?, by 
    - use L3 as much as possible
- Netflow/IPFIX/GNMI/SNMP
- Crear un sistema que testie cual es el packet loss, latency, path. Usando como el sostenuto, o usando IP in IP para que el destino responda al ver que esta destinado a el


Las notas no van a estar cubriendo todo. Solo lo que yo considero es mas comun o he visto en mi carrera o estudio

En todas las capturas de paquete hay que tratar de entender lo mas que se pueda de los campos

Investigar cuales son los ataques comunes que se pueden hacer a la red, para comprometer routers, BW, ruteo 

Que onda con los tuples, hay algo que se pueda mostrar?, como se guarda en la CAM, TCAM, o como se usa para el load balancing