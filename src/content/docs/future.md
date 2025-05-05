---
title: Home
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


path mtu discovery

Hacer como un timeline de lo que ha pasado en la historia respecto al networking
_____

DC design
How many servers we expect to have?
How many servers per rack?
What will be the port speed per server/ How many interfaces?
Leaf switch has 48 10/25/50G ports and 4x400 Gigabit ports uplink
The use case to understand if the hosts will consider east west or north south traffic. Databases 
What is the oversubscription ratio of the data center?, leaf, and spine to spine (next tier) or spine to edge/core
Depending on the leaf reatio, we can decide how many links to spine are required and based on spine models we can calculate how many spines required.
We need to define a minimum failure tolerance to consider so we can define the minimum number of spines required
How much traffic north south we will have?, to leave the datacenter?
What is the planned growth of the data center?
Ask for how much percentage for grow we need to consider so we keep that capacity available.
Will we grow on more racks and therefore leafs?, or we will wrow on capacity used so then the oversubscription ratio will be lower?
Spine has 48 400G ports. 
What redundancy level is required maybe to have twin sites? so maybe we need to add a super spine layer.
Or super spine layer is needed because we reach the limits of a spine of leaf hw

Do we have VM mobiity requirements or containers that need to keep the IP??
Do we have any requirement to isolate the ip addressing?
Based on the number of servers and the number of switches required we can start to define the power, cooling, racks and rack units.

We will consider having a managment network for the datacenter devices
We will need to consider capacitio for monitoring and managing the devices.
Consider havin a ZTP process to provision the devices faster.
Base don the speed port we can consider what Leaf sw to use.
investigate what is the port speed on leaf switch, maybe arista

Networking:
- [ ] IP protocols
    - [ ] IPv4
        - [ ] Most important fields: 
            - [ ] Protocol: to know what protocol is in the payload (TCP, UDP, ARP, OSPF)
            - [ ] S/D IP: used to route traffic or take filter/routing desitions
            - [ ] TTL: to prevent loops 
            - [ ] Heather length: to know where the payload starts
            - [ ] Total Length: to know full size of packet in case of fragmentation
            - [ ] Type of Service (ToS) used for QoS
    - [ ] IPv6
        - [ ] Needed because the IPv4 exhaustion
        - [ ] Enhanced security by having headers for establish IPSec
        - [ ] Simpler header:
            - [ ] IPv6 header
                - [ ] Traffic class: for QoS, Hop Limit: like TTL, S/D IP: same for routing
                - [ ] Next Header: to know what is the next header
                - [ ] Flow label: to identify a flow, can be for an application so no need to open TCP/UDP
            - [ ] Extension Headers
                - [ ] Hop by Hop
                - [ ] Routing Header: to do source routing
                - [ ] Fragment Header: used to store fragment data for receivers to assemble it
                - [ ] Destination Options header
            - [ ] Upper-Layer Protocol Headers: to share protocol specific data (TCP, ports, sequence, etc) so no need to lookup
        - [ ] No NAT is required
        - [ ] Auto configuration since routes advertise network information and hosts can assign its ip
    - [ ] ICMP: error reporting (dest unreachable), Path MTU with “Fragmentation needed”, Redirect
    - [ ] PATH MTU discovery: to know what is maximum size of packet to avoid fragmentation.
    - [ ] ARP: Request broadcast (who has), Reply. Gratuitous to share my IP
    - [ ] DHCP: Discovery broadcast, OFFER by server, REQUEST to ack the offered, ACK by server
    - [ ] DNS 
        - [ ] Hierarchy by having root (13) level, top-level domains (TLDs), second level and subdomains
        - [ ] Records A(IPv4 names) AAAA (IPv6 names), CNAME: one to another name, TXT (text) Normally for domain ownership verification
        - [ ] DNS caching to improve performance and use it for a given time. Each record has a TTL set by user level DNS server, so it expires
- [ ] IP operations
    - [ ] Traceroute: using TTL1 at the beginning, then recording response of IPs that responded with TTL “Time. Exceded”. The destination can respond with
        - [ ] If ICMP, the response is a “Echo reply”
        - [ ] IF TCP the response is a SYNACK
        - [ ] If UDP will respond with Port Unreachable or if open it may not respond.
    - [ ] Life of a packet (include NAT)
- [ ] DataLink & Switching
    - [ ] Ethernet
        - [ ] MAC 48 bits
        - [ ] Header:
            - [ ] Ethertype to know what is in the payload
    - [ ] MAC address table: to map MAC address to port where it was learned
    - [ ] STP:
        - [ ] To ensure there is only one active path
        - [ ] Every bridge has a bridge ID, and there is a root bridge and all is calculated around it
        - [ ] Root bidge election by checking the priority and MAC
        - [ ] Pathe selection: Root port and designated ports are put in forward. Blocking any non root and designated
    - [ ] VLANS
        - [ ] It adds a 802.1Q tag to the ethernet frame with 4 bytes
        - [ ] The ether type is also changed often to 0x8100
        - [ ] The tag includes 12 bits to define the VLAN number
        - [ ]  native vlan, access port, trunk port
    - [ ] L2 loops: 
        - [ ] When switches have redundant links
        - [ ] ARP packet for example will be sent to all interfaces and will be forwarded to all ports expect the received
        - [ ] Other witches will receive it and will do the same endlessly.
        - [ ] The source Mac of the packet now will be seen on multiple ports and that will cause Mac table instability and updates
        - [ ] Broadcast traffic will eat available BW and affect others.
    - [ ] Broadcast stomrs:
        - [ ] Avoid with STP
        - [ ] Reduce with storm control by limiting the % of broadcast on interface
        - [ ] Create VLANs to reduce the domain where the storm will happen.
- [ ] UDP vs TCP
    - [ ] UDP is faster but prone to loss, less overhead, not reliable, no congestion avoidance, for latency flows
    - [ ] TCP is reliable, congestion avoidance, retransmission
- [ ] TCP operations
    - [ ] TCP header: src-dest port, seqence, W-size (how much can receive), chsum, code, options, payload
    - [ ] MSS: Defines the size of the segment th I support. Defined from MTU minus TCP/IP heather
    - [ ] Window size: how much data I can have in memory to be processed.
    - [ ] Retransmission when a segment is not asked before timeout, when a duplicate is received
    - [ ] Flags SYNC, ACK, SYNACK, FIN, RESET (when invalid segment), Urgent, Push
    - [ ] TCP connection process
        - [ ] TCB (Transmission Control Block) creation:A server creates a TCB and starts listening on port. Client does same to start connection
        - [ ] 3-way hand shake: to confirm server and host are live and listening. Parameter shared like W-size, MSS
        - [ ] Communication
            - [ ] Normal: A sends a segment and B ackes the segment or a set of segments
            - [ ] Retransmission: 
                - [ ] Not asked after timeout 
                - [ ] If the receiver misses a segment it sends a duplicate with sequence of last in order segment
        - [ ] Detect congestion
            - [ ] Packets dropped not being asked.
            - [ ] Round trip increasing
            - [ ] ECN notified by routers
        - [ ] To Help avoid congestion
            - [ ] Reduce congestion window to allow less segments in the network
            - [ ] Adjust sending rate after seeing ECN
- [ ] Datacenter design - CLOSS
    - [ ] Low latency (by having direct connections and less hops) ad high BW (by have all links used)
    - [ ] Addresses limitations of three-tier (core, age, acc). Scale adding switches need bigger egg or core. Single point of failure
    - [ ] Leafs connect to servers and connect to all spines
    - [ ] Good: ECMP, scale horizontally by adding more spine or leafs, Redundancy, no single point of failure. Server to server can be served by spine
    - [ ] Bad: cabling complexity, models with big number of ports, 
    - [ ] If we want to increase BW we just add one more spine, if we need ports then we add a spine
    - [ ] Latency is predictable because we know the hops it takes
    - [ ] We need it because we have now east-west traffic and we want to avoid spanning tree failure or blocking ports
- [ ] BGP
    - [ ] iBGP (TTL255), eBGP (TTL1)
    - [ ] Messages
        - [ ] To form: SYN>ACK>SYNACK (Active|Connect)>Open (each) (timers, RID, AS)> Keepalive
        - [ ] Recurrent: Updates (route updates) and Keepalive and Notification: Something bad has happened: close session
    - [ ] States: IDLE (no route), ACTIVE (no config match), ESTABLISHED (routing begin)
    - [ ] To scale BGP: bigger devices, in RR divide by AF, summarize
    - [ ] Atribute categories:
        - [ ] Well known: Should go on every BGP update: As-path, Next hop, Origin, LP, Atomic aggregate
        - [ ] Optional may or may not be recognized and are not passed along if not recognized. Community, aggregator, MED, ORIGINATOR ID, Cluster ID
        - [ ] Transitive: AS_PATH, NH, Origin, Atomic aggregate, Agregator, community
    - [ ] Loop prevention: AS-Path, split horizon, cluster list
    - [ ] Traffic engineering:
        - [ ] Use LP to set the exit point from iBGP peers (highest best)
        - [ ] Use MED in multi homed to same AS to suggest a point to reach your network. (Lower the best)
        - [ ] Use Weight on local device to prefer one exit to another
        - [ ] Use communities to be used by other routers to decide what attribute to set
        - [ ] Use AS prepped to deprefer a route, ether when learning it or when sending to external neighbors
    - [ ] Why a route is not in the BGP table?:  Next-hop in routing table, AS in the AS-PATH
    - [ ] BGP bet path selection: weight > LP > AS-PATH > origin > MED    
- [ ] MP-BGP: Use to carry information for different protocols using addres families
- [ ] MPLS L3VPN
    - [ ] P routers, PE, CE.
    - [ ] Uses MPBGP
    - [ ] Components: VRF, VPN label, VPN prefix (distinguisher + prefix) , route target, route distinguisher
    - [ ] Configuration:
        - [ ] Create VRF with route target export import
        - [ ] Configure interfaces to be part of the VRF
        - [ ] Configure your PE router to be neighbor of L3VPN routers
        - [ ] Configure redistribution from CE to PE so prefix are shared
    - [ ] Control plane:
        - [ ] PE learns route from a VRF interface
        - [ ] The route then is redistributed to the BGP instance for the VRF
        - [ ] The PE will create the VPNv4 update including the VPN prefix  by adding r-ditinguishe  + the prefix and VPN label
        - [ ] The PE announces to its neighbors the prefix so neighbors that are importing that route target accept that prefix and save that info in the VRF.
    - [ ] Forwarding plane
        - [ ] CE sends packet to PE on VRf interface
        - [ ] PE sees the packet arrive on a vhf based interface so it does the lookup on that VRF
        - [ ] PE defines what will be the next-hop of the packet treated to the PE that announced the prefix. 
        - [ ] The PE pushes the VPN label and also pushes the transport label based on the signaled one to reach the remote PE destination
        - [ ] PHP can happened before packet arrives to PE and is exposed the VPN label
        - [ ] Once the remote PE receives the packet it finds exposed the VPN and knows needs to look up on certain VRF
        - [ ] The packet is forwarded to the destination in the VRF
- [ ] MPLS
    - [ ] Label swap, push, pop
    - [ ] LDP
        - [ ] Discover by seeing hello to 224.0.0.2 port 646
        - [ ] The TCP connection is done between RID IP
        - [ ] LSR assign labels for is FECs and then signals that label to neighbors
- [ ] OSPF
    - [ ] Its a loop green routing protocol since al routers have all routing information in the area
    - [ ] Router types: Backbone, ABR, ASBR
    - [ ] Is link state because the calculation is based on the link cost, which is being shared from router to router
    - [ ] The cost is calculated by default from the BW of the interface but can be changed
    - [ ] Route preference: L1/L2 internat > Intra area L3 > E1 L5 > N1 L7 > E2  L5> N2 L7
    - [ ] Stub all but L5. NSSA redid permitted with L7. T Stubby L1/L2 & 0/0. NSS Totaly SA 1/2/7 + 0/0
    - [ ] Hello over 224.0.0.5 all routers.
    - [ ] Hello: RID, Hello/Deadh interval, Mask, Area, PRIO
    - [ ] Adjacency states:
        - [ ] DOWN: mando hello pero no recibe respuesta
        - [ ] INIT: I have received a hello packet from a neighbor, but they have not acknowledged a hello from me
        - [ ] 2WAY: I have received a hello packet from a neighbor and they have acknowledged my hello,
        - [ ] EXSTART: Master & slave relationship is formed, where master has higher Router-ID
        - [ ] EXCHANGE: Local link state database is sent through DBD packets
        - [ ] LOADING: Link State Request packets are sent to ask for more information about a particular LSA
        - [ ] FULL-STATE: Neighbors are fully adjacent and databases are synchronized
    - [ ] Errors: Dead/Hello, Mask, Area, pass, MTU, network type,
- [ ] RSVP-TE
    - [ ] Control pane
        - [ ] Each router will be configured with the BW reserved on the interfaces
        - [ ] OSPF will help to share the information about the reserved BW, available, and other attributes
        - [ ] The constrains for calculation can be, nodes, links, available BW, link color use/avoid, hop count
        - [ ] The ingress router uses the information to calculate best paths for the LSP
        - [ ] The path message is sent to to the devices in the path
        - [ ] If message gets to the egress, it responds back with Resv and each router assigns a label
        - [ ] The Ingres will start to send Reservation message
    - [ ] FRR - precomputing 
        - [ ] Node protection
        - [ ] Link protection
        - [ ] Swiping the label to use the one for the backup path
- [ ] QoS : traffic management and prioritization with a set of techniques
    - [ ] Traffic classification based on application type, or source/dest ip, port, plans
    - [ ] Traffic marking using DSCP
    - [ ] Queu management, how dequeue will be determined, strict?, round-robin?
    - [ ] Congestion avoidance how:
        - [ ] Proactively drop packets when queue size approaches some level. Randon Early Detection
        - [ ] Marking TCP packet with ECN so they know there is congestion and they lower the transmission.
    - [ ] Shaping
        - [ ] To remove burst traffic and have prepared resource for critical traffic 
        - [ ] Buffers the packets or delays them
        - [ ] Shaping could be used on critical traffic since it does not induces drop
    - [ ] Policing
        - [ ] Drops packets when we reach to a certain traffic
        - [ ] Best or strictly enforce certain SLA
- [ ] Tshoot: 
    - [ ] Confirm if the issue is still there. If so then:
        - [ ] Understand if there is a recent change that could be affecting this so we roll it back for mitigation
        - [ ] if there is a redundant path we could use so the service is not interrupted.
    - [ ] Understand the synthoms, and if the issue is not there how we could replicate it
    - [ ] Based on the sinthoms isolate the cause
        - [ ] Traceroute, to check where there is latency or broken
    - [ ] Quickly identify different solutions and evaluate what is best
    - [ ] Implement the solution
    - [ ] Document and look for ways to improve the process or config that was the RC
- [ ] Segment Routing
    - [ ] We can signal the labels using OSPF, ISIS to IPv6 using the Extension Headers
    - [ ] Path can be created by head-end or PCE. 
    - [ ] Label stack can have Node SID or Adjacency SID
    - [ ] No need to maintain the state of the tunnels on all routers
    - [ ] TI-LFA (FRR), precomputes backup paths for every link and node in the routing table
- [ ] EVPN/VXLAN:
    - [ ] Mobility for VM from 1 host to other so they can keep same address
    - [ ] Workloads can be sent to another Datacenter easily extending L2
- [ ] ISIS:
    - [ ] Uses Dijkstra, Link state, all have the topology, L1 just in area, L2 like ABRs
    - [ ] Use more in SPs, multi topology on same instance
- [ ] Network designs:
    - [ ] S2S VPN tunnel
    - [ ] Allow traffic over LTE
- [ ] Multicast
    - [ ] When data is sent from one to many, the interested ones
    - [ ] To not repeat the same traffic to multiple hosts interested on the same. That reduces BW
    - [ ] IGMP
        - [ ] To manage multicast membership about which host is interested on which multicast group
        - [ ] Different versions but V3 allows for source specific
        - [ ] Using IGMP we will be able know which host joined to a group
    - [ ] PIM
        - [ ] Protocol to create distribution trees
        - [ ] Dense mode: the multicast is flooded at start to all routers and routers can be removed from the tree
        - [ ] Sports Mode: the tree is created when an explicit request to a groups is done
        - [ ] Source Specific: the tree is built to the specific source. No need for RP, receivers know the source they want
    - [ ] Source tree: when tree is rooted from the source extending to the receivers. Uses PIM-SM or PIM-DM
    - [ ] Shared Tree: Tree rooted at Rendezvous point, traffic starts to sent to RP and then goes to receivers.
    - [ ] Reverse Path Forwarding: to avoid loop, we receive the multicast from an interface where I reach the source
    - [ ] MSDP to connect multiple PIM -SM domains
    - [ ] The RP knows about all sources and interested receivers so it maintains the distribution trees efficiently instead of flooding everywhere. Then receivers can ask for an specific source
