---
title: UDP
description: UDP
---

Best effort delivery
not session oriented
lightwheight since not over head on the header

usecases:
- RTP like video or voice

are there UDP cases where we have a response?, and how the cliente knows how is responded. what in the header can be mapped to know is specifically for a application session

Datagram:
- s port (16 bit): same as tcp
- d port (16 bit): same as tcp
- checksum: to determine if the received data is consistent
- data: size varies
- lenght (16 bit): header + data lenth

