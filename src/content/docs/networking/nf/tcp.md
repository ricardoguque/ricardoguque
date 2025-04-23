---
title: TCP
description: TCP
---

- Mostrar todos los casos como se ven los siguientes protocolos incluyendo diferentes caso como cuando es satisfactorio como cuando falla o cuando se termina la sesion: SSH, SCP, HTTP, FTP, TFTP, Telnet

Reliable via:
- 3-way hand shake
- Retransmission
- session termination: to stop resources when they are not needed anymore

how the ports are decided?

TCP header:
- source port (16 bit): used for connection tracking
- d port (16 bit): it is the port of the application
- sequence number (32 bit): to track the delivery of all packets
- acknowledgment number (32 bit): it should be in sync with the sequence number.
- Reserved (4 bit): not used so far
- Header lenght: where data begins. (can TCP packets have a heather length different?, how)
- Flags (6 bits): 6 primary flags, and 4 extra flags
  - primary
    - URG: to mark data as urgent. Who use it?.
    - ACK: to acknowledge the receive of data and also SYN?
    - PSH: Push lets the receiver know to process the data right away instead of taking it to the buffer
    - RST: Reset to reset the connection. normally done by firwalls, but why?. What means to reset, to do the 3-WHS?
    - SYN: initiates connection from 3-WHS
    - FIN: gracefull termination done by who?, is it acknowledged?
  - Extra
    - Reserved
    - Nonce
    - CWR: Congestion window reduced. To anounce congestion so the it can start reducing trasmission.
    - ECN echo: to acknowledge CWR congestion
- Window (16 bit):
  - how much un-acknowledge to send
  - can be adjusted in the flight, what is that?
- Checksum (16 bit): to check the integrity of the data, example of application of this
- Options:
  - MSS: Maximum segment size: the receiver says the largest amount of data that can recieve. This is the data that an IP packet can carry, not considering the L2/L3 header
  - NOP: paddin TCP header to meet the various size requiremnets
  - Window scaling: to increase the window size
  - SACK: to notify when data was received out of order. receiver send it to sender
- Data

3-WHS:
- SYN
- SYNACK
- ACK

How the data is segmented before send it and it has a sequence number and how it is reassembled when it is received

Retransmission:
- If SACK negotiated, the receiver notify what is the missing sequence number. But while this happens we continue acknowledgin the other data?

a lab where we define a different MSS and we can see the transmission of a file takes more packets on network

Do a example grecefull from 3-WHS to FIN

cuales son los rangos de los ephimeral ports?. Cuales son los well known ports?

what is a socket?: a socket is a combination of IP address and port number. It is used to identify a specific process on a host. A socket is created by the application layer and is used by the transport layer to send and receive data. The socket is bound to a specific port number, which is used to identify the application that is using the socket.

How a server can identify the application that created the socket?

show how TCP does congestion avoidance