---
title: iPerf
description: iPerf
---

[iPerf](https://iperf.fr/) is a cross-platform tool used for network performance measurement and tuning. It can produce standardized performance measurements for any network by creating data streams to measure the throughput between two ends in one or both directions. iPerf has both client and server functionality, allowing it to test the network bandwidth between two hosts.

## iPerf2 vs iPerf3

The main difference is that iPerf2 (stable release as of November 6, 2024 1) is multithreaded, while iPerf3 (started in 2009, with the first release in January 2014) is single-threaded. This difference in design affects how each version handles network performance testing.

:::note
For the purpose of the tests I will will be doing, I will be using mostly iperf3 since it has more rich features but iperf2 only when I need to run multiple clientes at same time.
:::

### iPerf2
- Multithreading: iPerf2 can utilize multiple CPU cores by creating multiple threads. This allows it to handle multiple streams of data simultaneously, distributing the load across several cores.
- Performance: Multithreading can lead to better performance on systems with multiple cores, as it can handle higher data rates and more simultaneous connections without becoming CPU-bound.
- Use Case: Ideal for testing environments where multiple streams need to be tested concurrently, and the system has multiple CPU cores available.

### iPerf3:
- Single-threading: iPerf3 runs on a single thread, meaning it can only utilize one CPU core at a time. Even when testing with multiple streams, it does not create additional threads.
- Performance: This design can become a bottleneck on systems with multiple cores, as it may max out a single core while other cores remain underutilized. 
- Use Case: Designed for high-rate single-stream performance testing



## Install iPerf
:::note
I will be using iPerf on Linux Ubuntu containers or WSL so all my commands will consider that OS
:::
### Install
```bash
sudo apt install iperf

sudo apt install iperf3
```
### Example installation
```bash title="Example installation output for iperf2"
richo@LAPTOP-A3AMEUF1:~$ sudo apt install iperf
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following packages were automatically installed and are no longer required:
  libiperf0 libsctp1
Use 'sudo apt autoremove' to remove them.
The following NEW packages will be installed:
  iperf
0 upgraded, 1 newly installed, 0 to remove and 23 not upgraded.
Need to get 121 kB of archives.
After this operation, 315 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu jammy/universe amd64 iperf amd64 2.1.5+dfsg1-1 [121 kB]
Fetched 121 kB in 1s (133 kB/s)
Selecting previously unselected package iperf.
(Reading database ... 56461 files and directories currently installed.)
Preparing to unpack .../iperf_2.1.5+dfsg1-1_amd64.deb ...
Unpacking iperf (2.1.5+dfsg1-1) ...
Setting up iperf (2.1.5+dfsg1-1) ...
Processing triggers for man-db (2.10.2-1) ...
Processing triggers for ufw (0.36.1-4ubuntu0.1) ...
```
```bash title="Example installation output for iperf3"
richo@LAPTOP-A3AMEUF1:~$ sudo apt install iperf3
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following NEW packages will be installed:
  iperf3
0 upgraded, 1 newly installed, 0 to remove and 23 not upgraded.
Need to get 14.6 kB of archives.
After this operation, 61.4 kB of additional disk space will be used.
Get:1 http://archive.ubuntu.com/ubuntu jammy-updates/universe amd64 iperf3 amd64 3.9-1+deb11u1build0.22.04.1 [14.6 kB]
Fetched 14.6 kB in 1s (21.5 kB/s)
Selecting previously unselected package iperf3.
(Reading database ... 56473 files and directories currently installed.)
Preparing to unpack .../iperf3_3.9-1+deb11u1build0.22.04.1_amd64.deb ...
Unpacking iperf3 (3.9-1+deb11u1build0.22.04.1) ...
Setting up iperf3 (3.9-1+deb11u1build0.22.04.1) ...
Processing triggers for man-db (2.10.2-1) ...
richo@LAPTOP-A3AMEUF1:~$
```
### Check installation
Now you can check the installation for both versions
```bash
richo@LAPTOP-A3AMEUF1:~$ iperf -v
iperf version 2.1.5 (3 December 2021) pthreads
```
```bash
richo@LAPTOP-A3AMEUF1:~$ iperf3 -v
iperf 3.9 (cJSON 1.7.13)
Linux LAPTOP-A3AMEUF1 5.15.167.4-microsoft-standard-WSL2 #1 SMP Tue Nov 5 00:21:55 UTC 2024 x86_64
Optional features available: CPU affinity setting, IPv6 flow label, SCTP, TCP congestion algorithm setting, sendfile / zerocopy, socket pacing, authentication
```

## iPerf server

### Start server

```bash title="Start iPerf2 server"
richo@LAPTOP-A3AMEUF1:~$ iperf -s -D
Running Iperf Server as a daemon
```
```bash title="Start iPerf3 server"
richo@LAPTOP-A3AMEUF1:~$ iperf3 -s -D
richo@LAPTOP-A3AMEUF1:~$
```

### Confirm PID and command used

```bash
richo@LAPTOP-A3AMEUF1:~$ ps aux | grep -E "iperf|USER"
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
richo      74404  0.0  0.0 154108   204 ?        Ssl  18:05   0:00 iperf -s -D
richo      74414  0.0  0.0   8284   508 ?        Ss   18:05   0:00 iperf3 -s -D
richo      74436  0.0  0.0   4024  2080 pts/5    S+   18:07   0:00 grep --color=auto -E iperf|USER
```
We can see the PIDs `74404` and `74414` 
### Test server

```bash title"Connectivity test on iPerf for 1 second"
richo@LAPTOP-A3AMEUF1:~$ iperf -c localhost -t 1
------------------------------------------------------------
Client connecting to localhost, TCP port 5001
TCP window size: 2.50 MByte (default)
------------------------------------------------------------
[  1] local 127.0.0.1 port 60046 connected with 127.0.0.1 port 5001
[ ID] Interval       Transfer     Bandwidth
[  1] 0.0000-1.0071 sec  8.92 GBytes  76.1 Gbits/sec
```
Above can be seen that the connection was successful and was able to transsfer `8.92 GBytes` as a speed of `76.1 Gbits/sec`
```bash title"Connectivity test on iPerf3 for 1 second"
richo@LAPTOP-A3AMEUF1:~$ iperf3 -c localhost -t 1
Connecting to host localhost, port 5201
[  5] local 127.0.0.1 port 46536 connected to 127.0.0.1 port 5201
[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec  8.76 GBytes  75.2 Gbits/sec    0   3.00 MBytes
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-1.00   sec  8.76 GBytes  75.2 Gbits/sec    0             sender
[  5]   0.00-1.05   sec  8.75 GBytes  71.7 Gbits/sec                  receiver

iperf Done.
```
Above can be seen that the connection was successful and was able to transsfer `8.92 GBytes` as a speed of `76.1 Gbits/sec`

### Stop the server

After finding the PID of the server to stop we just run the following command:
```bash
sudo kill <PID>
```
:::note
The server will be stopped if we restart/reboot the system
:::

### Server use case examples

#### iPerf2 UDP on fixed port range
```bash title="iPerf2 server listening on 5500-5599 UDP destination ports"
iperf -s -p 5500-5599 -u -D
```
#### iPerf2 TCP on fixed port range
```bash title="iPerf2 server listening on 5600-5699 TCP destination ports"
iperf -s -p 5600-5699 -D
```
#### iPerf2 UDP joining ASM
```bash title="iPerf2 server joining multicast group 239.255.255.250"
iperf -s -p 5500 -u -B 239.255.255.250 -D
```
#### iPerf2 UDP joining SSM
```bash title="iPerf2 server joining multicast group 239.255.255.250 and source 172.17.177.71"
iperf -s -p 5500 -u -B 239.255.255.250 -H 172.17.177.71 -D
```
#### iPerf3 for UDP/TCP

```bash title="iPerf3 server listening on port 5700 for UDP/TCP and vervose output"
iperf3 -s -p 5700 -V -D
```
:::caution
iperf3 does not need to explicitly add the TCP/UDP argument, it will be listening on both and also will accept one cliente at a time
:::

## iPerf Client

### iPerf2

From the documentation the arguments that I am interested to use are the following

| Option | Description |
|--------|-------------|
| -b, --bandwidth [kmgKMG \| pps] | Bandwidth to read/send at in bits/sec or packets/sec |
| -e, --enhanced | Use enhanced reporting giving more tcp/udp and traffic information |
| -i, --interval  | Seconds between periodic bandwidth reports |
| -p, --port | Client/server port to listen/send on and to connect |
| --sum-only | Output sum only reports |
| -u, --udp | Use UDP rather than TCP |
| -w, --window [KM] | TCP window size (socket buffer size) |
| -M, --mss  | Set TCP maximum segment size (MTU - 40 bytes) |
| -S, --tos  | Set the socket's IP_TOS (byte) field |
| -d, --dualtest | Do a bidirectional test simultaneously (multiple sockets) |
| --full-duplex | Run full duplex test using same socket |
| --incr-dstip | Increment the destination ip with parallel (-P) traffic threads |
| --incr-dstport | Increment the destination port with parallel (-P) traffic threads |
| --incr-srcport | Increment the source port with parallel (-P) traffic threads |
| -n, --num [kmgKMG] | Number of bytes to transmit (instead of -t) |
| -t, --time  | Time in seconds to transmit for (default 10 secs) |
| -B, --bind [<ip> \| <ip:port>] | Bind ip (and optional port) from which to source traffic |
| -H, --ssm-host <ip> | Set the SSM source, use with -B for (S,G) |
| -P, --parallel  | Number of parallel client threads to run |
| -R, --reverse | Reverse the test (client receives, server sends) |
| -S, --tos | IP DSCP or tos settings |
| -T, --ttl  | Time-to-live, for multicast (default 1) |

Based on those arguments I will show next the examples

#### TCP 1M BW test for 5 sec

```bash
richo@LAPTOP-A3AMEUF1:~$ iperf -c 127.0.0.1 -p 5600 -i 1 -b 1M -e -t 5
------------------------------------------------------------
Client connecting to 127.0.0.1, TCP port 5600 with pid 90972 (1 flows)
Write buffer size: 131072 Byte
TOS set to 0x0 (Nagle on)
TCP window size: 2.50 MByte (default)
------------------------------------------------------------
[  1] local 127.0.0.1%lo port 56462 connected with 127.0.0.1 port 5600 (MSS=32741) (sock=3) (irtt/icwnd=25/319) (ct=0.14 ms) on 2025-04-17 16:40:13 (PDT)
[ ID] Interval            Transfer    Bandwidth       Write/Err  Rtry     Cwnd/RTT(var)        NetPwr
[  1] 0.0000-1.0000 sec   128 KBytes  1.05 Mbits/sec  1/0          0      639K/33(26) us  3974
[  1] 1.0000-2.0000 sec   128 KBytes  1.05 Mbits/sec  1/0          0      639K/5327(10543) us  25
[  1] 2.0000-3.0000 sec   128 KBytes  1.05 Mbits/sec  1/0          0      639K/4670(9223) us  28
[  1] 3.0000-4.0000 sec   128 KBytes  1.05 Mbits/sec  1/0          0      639K/3588(7061) us  37
[  1] 4.0000-5.0000 sec   128 KBytes  1.05 Mbits/sec  1/0          0      639K/3149(6174) us  42
[  1] 0.0000-5.0034 sec   768 KBytes  1.26 Mbits/sec  6/0          0      639K/3149(4631) us  50
```

#### UDP 1M BW test for 5 sec
```bash
richo@LAPTOP-A3AMEUF1:~$ iperf -c 127.0.0.1 -p 5600 -i 1 -b 1M -e -t 5 -u
------------------------------------------------------------
Client connecting to 127.0.0.1, UDP port 5600 with pid 103017 (1 flows)
TOS set to 0x0 (Nagle on)
Sending 1470 byte datagrams, IPG target: 11215.21 us (kalman adjust)
UDP buffer size:  208 KByte (default)
------------------------------------------------------------
[  1] local 127.0.0.1%lo port 35995 connected with 127.0.0.1 port 5600 (sock=3) on 2025-04-17 17:31:21 (PDT)
[ ID] Interval            Transfer     Bandwidth      Write/Err  PPS
[  1] 0.0000-1.0000 sec   131 KBytes  1.07 Mbits/sec  0/0       91 pps
[  1] 1.0000-2.0000 sec   128 KBytes  1.05 Mbits/sec  0/0       89 pps
[  1] 2.0000-3.0000 sec   128 KBytes  1.05 Mbits/sec  0/0       89 pps
[  1] 3.0000-4.0000 sec   128 KBytes  1.05 Mbits/sec  0/0       89 pps
[  1] 4.0000-5.0000 sec   128 KBytes  1.05 Mbits/sec  0/0       89 pps
[  1] 0.0000-5.0134 sec   645 KBytes  1.05 Mbits/sec  0/0       90 pps
[  1] Sent 450 datagrams
[  1] Server Report:
[ ID] Interval            Transfer     Bandwidth        Jitter   Lost/Total  Latency avg/min/max/stdev PPS NetPwr
[  1] 0.0000-5.0133 sec   645 KBytes  1.05 Mbits/sec   0.032 ms 0/449 (0%) 0.048/0.002/0.314/0.030 ms 89 pps 2725
```

#### TCP with MSS=2741 bytes, TTL=50, 1M window size

```bash
richo@LAPTOP-A3AMEUF1:~$ iperf -c 127.0.0.1 -p 5600 -i 1 -e -t 3 -M 2741 -w 1M -T 50
------------------------------------------------------------
Client connecting to 127.0.0.1, TCP port 5600 with pid 94260 (1 flows)
Write buffer size: 131072 Byte
TOS set to 0x0 (Nagle on)
TCP window size:  416 KByte (WARNING: requested 1.00 MByte)
------------------------------------------------------------
[  1] local 127.0.0.1%lo port 52518 connected with 127.0.0.1 port 5600 (MSS=2729) (sock=3) (irtt/icwnd=29/26) (ct=0.10 ms) on 2025-04-17 16:54:48 (PDT)
[ ID] Interval            Transfer    Bandwidth       Write/Err  Rtry     Cwnd/RTT(var)        NetPwr
[  1] 0.0000-1.0000 sec  8.94 GBytes  76.8 Gbits/sec  73243/0        100      479K/11(4) us  872736960
[  1] 1.0000-2.0000 sec  9.39 GBytes  80.7 Gbits/sec  76953/0          0      479K/10(2) us  1008638362
[  1] 2.0000-3.0000 sec  9.96 GBytes  85.5 Gbits/sec  81586/0          0      479K/26(6) us  411293854
[  1] 0.0000-3.0016 sec  28.3 GBytes  81.0 Gbits/sec  231783/0        100      479K/219(389) us  46215605
```

#### TCP 30G test with TOS 0xff
```bash
richo@LAPTOP-A3AMEUF1:~$ iperf -c 127.0.0.1 -p 5600 -i 1 -e -n 30G -S 0xff
------------------------------------------------------------
Client connecting to 127.0.0.1, TCP port 5600 with pid 93028 (1 flows)
Write buffer size: 131072 Byte
TOS set to 0xff (Nagle on)
TCP window size: 2.50 MByte (default)
------------------------------------------------------------
[  1] local 127.0.0.1%lo port 46186 connected with 127.0.0.1 port 5600 (MSS=32741) (sock=3) (irtt/icwnd=31/319) (ct=0.13 ms) on 2025-04-17 16:50:20 (PDT)
[ ID] Interval            Transfer    Bandwidth       Write/Err  Rtry     Cwnd/RTT(var)        NetPwr
[  1] 0.0000-1.0000 sec  10.3 GBytes  88.7 Gbits/sec  84560/0          0     3261K/12(2) us  923620698
[  1] 1.0000-2.0000 sec  11.4 GBytes  98.1 Gbits/sec  93515/0         17     3261K/16(2) us  766074880
[  1] 2.0000-2.7970 sec  8.26 GBytes  89.0 Gbits/sec  67685/0          0     3261K/624(1217) us  17837941
[  1] 0.0000-2.7970 sec  30.0 GBytes  92.1 Gbits/sec  245760/0         17     3261K/624(1217) us  18456098
```
#### UDP 1M test with TOS 255

```bash
richo@LAPTOP-A3AMEUF1:~$ iperf -c 127.0.0.1 -p 5600 -i 1 -e -n 1M -S 255 -u
------------------------------------------------------------
Client connecting to 127.0.0.1, UDP port 5600 with pid 93759 (1 flows)
TOS set to 0xff (Nagle on)
Sending 1470 byte datagrams, IPG target: 11215.21 us (kalman adjust)
UDP buffer size:  208 KByte (default)
------------------------------------------------------------
[  1] local 127.0.0.1%lo port 39161 connected with 127.0.0.1 port 5600 (sock=3) on 2025-04-17 16:53:18 (PDT)
[ ID] Interval            Transfer     Bandwidth      Write/Err  PPS
[  1] 0.0000-1.0000 sec   131 KBytes  1.07 Mbits/sec  0/0       91 pps
[  1] 1.0000-2.0000 sec   128 KBytes  1.05 Mbits/sec  0/0       89 pps
[  1] 2.0000-3.0000 sec   128 KBytes  1.05 Mbits/sec  0/0       89 pps
[  1] 3.0000-4.0000 sec   128 KBytes  1.05 Mbits/sec  0/0       89 pps
[  1] 4.0000-5.0000 sec   128 KBytes  1.05 Mbits/sec  0/0       89 pps
[  1] 5.0000-6.0000 sec   128 KBytes  1.05 Mbits/sec  0/0       89 pps
[  1] 6.0000-7.0000 sec   129 KBytes  1.06 Mbits/sec  0/0       89 pps
[  1] 0.0000-7.9967 sec  1.00 MBytes  1.05 Mbits/sec  0/0       90 pps
[  1] Sent 716 datagrams
[  1] Server Report:
[ ID] Interval            Transfer     Bandwidth        Jitter   Lost/Total  Latency avg/min/max/stdev PPS NetPwr
[  1] 0.0000-7.9967 sec  1.00 MBytes  1.05 Mbits/sec   0.003 ms 0/715 (0%) 0.018/0.002/0.180/0.012 ms 89 pps 7330
```

#### TCP bidir for 3 sec

```bash
richo@LAPTOP-A3AMEUF1:~$ iperf -c 127.0.0.1 -p 5600 -i 1 -e -t 3 -d
listener bind failed: Address already in use
------------------------------------------------------------
Client connecting to 127.0.0.1, TCP port 5600 with pid 94934 (1 flows)
Write buffer size: 131072 Byte
TOS set to 0x0 (Nagle on)
TCP window size: 2.50 MByte (default)
------------------------------------------------------------
[  1] local 127.0.0.1%lo port 40380 connected with 127.0.0.1 port 5600 (MSS=32741) (sock=4) (irtt/icwnd=30/319) (ct=0.11 ms) on 2025-04-17 16:58:08 (PDT)
[ ID] Interval            Transfer    Bandwidth       Write/Err  Rtry     Cwnd/RTT(var)        NetPwr
[  1] 0.0000-1.0000 sec  2.50 MBytes  21.0 Mbits/sec  20/0          0      320K/6291(12532) us  417
[  1] 1.0000-2.0000 sec  0.000 Bytes  0.000 bits/sec  0/0          0      320K/6291(12532) us  0
[  1] 2.0000-3.0000 sec  0.000 Bytes  0.000 bits/sec  0/0          0      320K/6291(12532) us  0
[  1] 0.0000-6.1286 sec  2.50 MBytes  3.42 Mbits/sec  20/0          0      320K/6291(12532) us  68
```
:::caution
Sinc eI was using the same address for server and client the server failed. We can see the error in the output
> listener bind failed: Address already in use
:::

#### TCP Full-duplex for 5 sec

```bash title="Example output"
richo@LAPTOP-A3AMEUF1:~$ iperf -c 127.0.0.1 -p 5600 -i 1 -t 3 --full-duplex
------------------------------------------------------------
Client connecting to 127.0.0.1, TCP port 5600
TCP window size: 2.50 MByte (default)
------------------------------------------------------------
[  1] local 127.0.0.1 port 43872 connected with 127.0.0.1 port 5600 (full-duplex)
[ ID] Interval       Transfer     Bandwidth
[  1] 0.0000-1.0000 sec  2.24 GBytes  19.3 Gbits/sec
[ *1] 0.0000-1.0000 sec  1.24 GBytes  10.6 Gbits/sec
[  1] 1.0000-2.0000 sec  1.98 GBytes  17.0 Gbits/sec
[ *1] 1.0000-2.0000 sec  1.57 GBytes  13.5 Gbits/sec
[ *1] 2.0000-3.0000 sec  1.49 GBytes  12.8 Gbits/sec
[  1] 2.0000-3.0000 sec  2.20 GBytes  18.9 Gbits/sec
[  1] 0.0000-3.0000 sec  6.42 GBytes  18.4 Gbits/sec
[ *1] 0.0000-3.0054 sec  4.32 GBytes  12.3 Gbits/sec
```

#### TCP Parallel increasing dst/src-port

```bash
richo@LAPTOP-A3AMEUF1:~$ iperf -c 127.0.0.1 -p 5600 -t 3 -P 4 --incr-dstport --incr-srcport
WARN: option of --incr-srcport requires -B bind option w/port to be set
[  2] local 127.0.0.1 port 42470 connected with 127.0.0.1 port 5601
[  1] local 127.0.0.1 port 45732 connected with 127.0.0.1 port 5600
[  4] local 127.0.0.1 port 46112 connected with 127.0.0.1 port 5603
------------------------------------------------------------
Client connecting to 127.0.0.1, TCP port 5600
TCP window size: 2.50 MByte (default)
------------------------------------------------------------
[  3] local 127.0.0.1 port 49066 connected with 127.0.0.1 port 5602
[ ID] Interval       Transfer     Bandwidth
[  4] 0.0000-3.0055 sec  25.2 GBytes  72.1 Gbits/sec
[  2] 0.0000-3.0055 sec  25.7 GBytes  73.5 Gbits/sec
[  3] 0.0000-3.0051 sec  24.6 GBytes  70.3 Gbits/sec
[  1] 0.0000-3.0051 sec  24.9 GBytes  71.3 Gbits/sec
[SUM] 0.0000-3.0003 sec   100 GBytes   288 Gbits/sec
[ CT] final connect times (min/avg/max/stdev) = 0.062/0.078/0.109/0.021 ms (tot/err) = 4/0
```

#### TCP reverse (started from server)

```bash title="Test requested from client but started from server"
richo@LAPTOP-A3AMEUF1:~$ iperf -c 127.0.0.1 -p 5600 -i 1 -t 3 -R
------------------------------------------------------------
Client connecting to 127.0.0.1, TCP port 5600
TCP window size: 2.50 MByte (default)
------------------------------------------------------------
[  1] local 127.0.0.1 port 48098 connected with 127.0.0.1 port 5600 (reverse)
[ ID] Interval       Transfer     Bandwidth
[ *1] 0.0000-1.0000 sec  8.52 GBytes  73.2 Gbits/sec
[ *1] 1.0000-2.0000 sec  8.32 GBytes  71.5 Gbits/sec
[ *1] 2.0000-3.0000 sec  8.48 GBytes  72.9 Gbits/sec
[ *1] 0.0000-3.0014 sec  25.3 GBytes  72.5 Gbits/sec
```

#### ASM (Any-Source Multicast)

```bash title="Server joining group 239.1.1.1 from any source"
richo@LAPTOP-A3AMEUF1:~$ iperf -s -u -B 239.1.1.1
------------------------------------------------------------
Server listening on UDP port 5001
Joining multicast group  239.1.1.1
Server set to single client traffic mode (per multicast receive)
UDP buffer size:  208 KByte (default)
------------------------------------------------------------
[  1] local 239.1.1.1 port 5001 connected with 172.17.177.71 port 44436
[ ID] Interval       Transfer     Bandwidth        Jitter   Lost/Total Datagrams
[  1] 0.0000-10.0153 sec  1.25 MBytes  1.05 Mbits/sec   0.008 ms 0/895 (0%)
```

```bash title="Client sending packets to 239.1.1.1 as if it is the source"
richo@LAPTOP-A3AMEUF1:~$ iperf -c 239.1.1.1 -u
------------------------------------------------------------
Client connecting to 239.1.1.1, UDP port 5001
Sending 1470 byte datagrams, IPG target: 11215.21 us (kalman adjust)
UDP buffer size:  208 KByte (default)
------------------------------------------------------------
[  1] local 172.17.177.71 port 55142 connected with 239.1.1.1 port 5001
[ ID] Interval       Transfer     Bandwidth
[  1] 0.0000-10.0155 sec  1.25 MBytes  1.05 Mbits/sec
[  1] Sent 896 datagrams
```

#### SSM (Source Specific Multicast)

```bash title="Server joining group 239.1.1.1 t from source 172.17.177.71"
richo@LAPTOP-A3AMEUF1:~$ iperf -s -u -B 239.1.1.1 -H 172.17.177.71
------------------------------------------------------------
Server listening on UDP port 5001
Joining multicast (S,G)=172.17.177.71,239.1.1.1
Server set to single client traffic mode (per multicast receive)
UDP buffer size:  208 KByte (default)
------------------------------------------------------------
[  1] local 239.1.1.1 port 5001 connected with 172.17.177.71 port 52760
[ ID] Interval       Transfer     Bandwidth        Jitter   Lost/Total Datagrams
[  1] 0.0000-10.0154 sec  1.25 MBytes  1.05 Mbits/sec   0.012 ms 0/895 (0%)
```

```bash title="Client sending packets to 239.1.1.1 using 172.17.177.71 as source"
richo@LAPTOP-A3AMEUF1:~$ iperf -c 239.1.1.1 -u
------------------------------------------------------------
Client connecting to 239.1.1.1, UDP port 5001
Sending 1470 byte datagrams, IPG target: 11215.21 us (kalman adjust)
UDP buffer size:  208 KByte (default)
------------------------------------------------------------
[  1] local 172.17.177.71 port 52760 connected with 239.1.1.1 port 5001
[ ID] Interval       Transfer     Bandwidth
[  1] 0.0000-10.0154 sec  1.25 MBytes  1.05 Mbits/sec
[  1] Sent 896 datagrams
```

### iPerf3

The following are the arguments that make sense to use in the iperf3 command for my testing.

| Option | Description |
|--------|-------------|
| -p, --port | Server port to listen on/connect to |
| -i, --interval | Seconds between periodic throughput reports |
| -V, --verbose | More detailed output |
| -u, --udp | Use UDP rather than TCP |
| -b, --bitrate #[KMG][/#] | Target bitrate in bits/sec (0 for unlimited) (default 1 Mbit/sec for UDP, unlimited for TCP) |
| -t, --time | Time in seconds to transmit for (default 10 secs) |
| -n, --bytes #[KMG] | Number of bytes to transmit (instead of -t) |
| -k, --blockcount #[KMG] | Number of blocks (packets) to transmit (instead of -t or -n) |
| --cport <port> | Bind to a specific client port (TCP and UDP, default: ephemeral port) |
| -P, --parallel | Number of parallel client streams to run |
| -R, --reverse | Run in reverse mode (server sends, client receives) |
| --bidir | Run in bidirectional mode |
| -w, --window #[KMG] | Set window size / socket buffer size |
| -M, --set-mss | Set TCP/SCTP maximum segment size (MTU - 40 bytes) |
| -S, --tos N | Set the IP type of service, 0-255 |
| --dscp N or --dscp val | Set the IP dscp value, either 0-63 or symbolic |

#### TCP for 3 sec with vervose output

```bash title="TCP for 3 sec with vervose output on port 5201"
richo@LAPTOP-A3AMEUF1:~$ iperf3 -c 127.0.0.1 -p 5201 -i 2 -t 3 -V
iperf 3.9
Linux LAPTOP-A3AMEUF1 5.15.167.4-microsoft-standard-WSL2 #1 SMP Tue Nov 5 00:21:55 UTC 2024 x86_64
Control connection MSS 32768
Time: Fri, 18 Apr 2025 22:45:40 GMT
Connecting to host 127.0.0.1, port 5201
      Cookie: vtpswdvonieuzo7z4l4njsx4cibdvsqqwetf
      TCP MSS: 32768 (default)
[  5] local 127.0.0.1 port 45406 connected to 127.0.0.1 port 5201
Starting Test: protocol: TCP, 1 streams, 131072 byte blocks, omitting 0 seconds, 3 second test, tos 0
[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-2.00   sec  17.5 GBytes  75.3 Gbits/sec    1   2.37 MBytes
[  5]   2.00-3.00   sec  9.26 GBytes  79.5 Gbits/sec    1   2.37 MBytes
- - - - - - - - - - - - - - - - - - - - - - - - -
Test Complete. Summary Results:
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-3.00   sec  26.8 GBytes  76.7 Gbits/sec    2             sender
[  5]   0.00-3.05   sec  26.8 GBytes  75.5 Gbits/sec                  receiver
CPU Utilization: local/sender 96.6% (1.8%u/94.7%s), remote/receiver 26.4% (1.1%u/25.3%s)
snd_tcp_congestion cubic
rcv_tcp_congestion cubic

iperf Done.
```

#### 1M UDP with TOS 0xff

```bash title="1M UDP with TOS 0xff"
richo@LAPTOP-A3AMEUF1:~$ iperf3 -c 127.0.0.1 -n 1M -u -S 0xff
Connecting to host 127.0.0.1, port 5201
[  5] local 127.0.0.1 port 56479 connected to 127.0.0.1 port 5201
[ ID] Interval           Transfer     Bitrate         Total Datagrams
[  5]   0.00-1.00   sec   128 KBytes  1.05 Mbits/sec  4
[  5]   1.00-2.00   sec   128 KBytes  1.05 Mbits/sec  4
[  5]   2.00-3.00   sec   128 KBytes  1.05 Mbits/sec  4
[  5]   3.00-4.00   sec   128 KBytes  1.05 Mbits/sec  4
[  5]   4.00-5.00   sec   128 KBytes  1.05 Mbits/sec  4
[  5]   5.00-6.00   sec   128 KBytes  1.05 Mbits/sec  4
[  5]   6.00-7.00   sec   128 KBytes  1.05 Mbits/sec  4
[  5]   7.00-7.75   sec   128 KBytes  1.40 Mbits/sec  4
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Jitter    Lost/Total Datagrams
[  5]   0.00-7.75   sec  1.00 MBytes  1.08 Mbits/sec  0.000 ms  0/32 (0%)  sender
[  5]   0.00-7.80   sec   992 KBytes  1.04 Mbits/sec  0.112 ms  0/31 (0%)  receiver
```

#### 10Mbps UDP with TOS 255 and 100 datagrams

```bash title="10M UDP with TOS 255 and 100 datagrams"
richo@LAPTOP-A3AMEUF1:~$ iperf3 -c 127.0.0.1 -k 100 -u -S 255 -b 10M
Connecting to host 127.0.0.1, port 5201
[  5] local 127.0.0.1 port 47233 connected to 127.0.0.1 port 5201
[ ID] Interval           Transfer     Bitrate         Total Datagrams
[  5]   0.00-1.00   sec  1.22 MBytes  10.2 Mbits/sec  39
[  5]   1.00-2.00   sec  1.19 MBytes  9.96 Mbits/sec  38
[  5]   2.00-2.60   sec   736 KBytes  10.1 Mbits/sec  23
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID] Interval           Transfer     Bitrate         Jitter    Lost/Total Datagrams
[  5]   0.00-2.60   sec  3.12 MBytes  10.1 Mbits/sec  0.000 ms  0/100 (0%)  sender
[  5]   0.00-2.64   sec  3.09 MBytes  9.81 Mbits/sec  0.059 ms  0/99 (0%)  receiver
```

#### 4 parallel bidirectional TCP connections

```bash title="4 parallel bidirectional TCP connections"
richo@LAPTOP-A3AMEUF1:~$ iperf3 -c 127.0.0.1 -P 4 -t 1 --bidir
Connecting to host 127.0.0.1, port 5201
[  5] local 127.0.0.1 port 40114 connected to 127.0.0.1 port 5201
[  7] local 127.0.0.1 port 40116 connected to 127.0.0.1 port 5201
[  9] local 127.0.0.1 port 40124 connected to 127.0.0.1 port 5201
[ 11] local 127.0.0.1 port 40134 connected to 127.0.0.1 port 5201
[ 13] local 127.0.0.1 port 40144 connected to 127.0.0.1 port 5201
[ 15] local 127.0.0.1 port 40146 connected to 127.0.0.1 port 5201
[ 17] local 127.0.0.1 port 40160 connected to 127.0.0.1 port 5201
[ 19] local 127.0.0.1 port 40172 connected to 127.0.0.1 port 5201
[ ID][Role] Interval           Transfer     Bitrate         Retr  Cwnd
[  5][TX-C]   0.00-1.00   sec  1.63 GBytes  14.0 Gbits/sec    0   1.50 MBytes
[  7][TX-C]   0.00-1.00   sec  1.63 GBytes  14.0 Gbits/sec    0   1.75 MBytes
[  9][TX-C]   0.00-1.00   sec  1.63 GBytes  14.0 Gbits/sec    0   1.75 MBytes
[ 11][TX-C]   0.00-1.00   sec  1.63 GBytes  14.0 Gbits/sec    1   1.50 MBytes
[SUM][TX-C]   0.00-1.00   sec  6.51 GBytes  55.9 Gbits/sec    1
[ 13][RX-C]   0.00-1.00   sec  1.14 GBytes  9.78 Gbits/sec
[ 15][RX-C]   0.00-1.00   sec   550 MBytes  4.61 Gbits/sec
[ 17][RX-C]   0.00-1.00   sec   471 MBytes  3.95 Gbits/sec
[ 19][RX-C]   0.00-1.00   sec   428 MBytes  3.59 Gbits/sec
[SUM][RX-C]   0.00-1.00   sec  2.55 GBytes  21.9 Gbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
[ ID][Role] Interval           Transfer     Bitrate         Retr
[  5][TX-C]   0.00-1.00   sec  1.63 GBytes  14.0 Gbits/sec    0             sender
[  5][TX-C]   0.00-1.05   sec  1.62 GBytes  13.2 Gbits/sec                  receiver
[  7][TX-C]   0.00-1.00   sec  1.63 GBytes  14.0 Gbits/sec    0             sender
[  7][TX-C]   0.00-1.05   sec  1.62 GBytes  13.2 Gbits/sec                  receiver
[  9][TX-C]   0.00-1.00   sec  1.63 GBytes  14.0 Gbits/sec    0             sender
[  9][TX-C]   0.00-1.05   sec  1.62 GBytes  13.2 Gbits/sec                  receiver
[ 11][TX-C]   0.00-1.00   sec  1.63 GBytes  14.0 Gbits/sec    1             sender
[ 11][TX-C]   0.00-1.05   sec  1.62 GBytes  13.2 Gbits/sec                  receiver
[SUM][TX-C]   0.00-1.00   sec  6.51 GBytes  55.9 Gbits/sec    1             sender
[SUM][TX-C]   0.00-1.05   sec  6.48 GBytes  52.8 Gbits/sec                  receiver
[ 13][RX-C]   0.00-1.00   sec  1.14 GBytes  9.79 Gbits/sec    0             sender
[ 13][RX-C]   0.00-1.05   sec  1.14 GBytes  9.28 Gbits/sec                  receiver
[ 15][RX-C]   0.00-1.00   sec   550 MBytes  4.62 Gbits/sec    0             sender
[ 15][RX-C]   0.00-1.05   sec   550 MBytes  4.38 Gbits/sec                  receiver
[ 17][RX-C]   0.00-1.00   sec   471 MBytes  3.95 Gbits/sec    0             sender
[ 17][RX-C]   0.00-1.05   sec   471 MBytes  3.75 Gbits/sec                  receiver
[ 19][RX-C]   0.00-1.00   sec   428 MBytes  3.59 Gbits/sec    0             sender
[ 19][RX-C]   0.00-1.05   sec   428 MBytes  3.41 Gbits/sec                  receiver
[SUM][RX-C]   0.00-1.00   sec  2.56 GBytes  22.0 Gbits/sec    0             sender
[SUM][RX-C]   0.00-1.05   sec  2.55 GBytes  20.8 Gbits/sec                  receiver

iperf Done.
```

#### Reverse TCP with DSCP 63 and MSS 2000

```bash title="Reverse TCP with DSCP 63 and MSS 2000"
richo@LAPTOP-A3AMEUF1:~$ iperf3 -c 127.0.0.1 -t 1 -R --dscp 63 -M 2000 -V
iperf 3.9
Linux LAPTOP-A3AMEUF1 5.15.167.4-microsoft-standard-WSL2 #1 SMP Tue Nov 5 00:21:55 UTC 2024 x86_64
Control connection MSS 32768
Time: Fri, 18 Apr 2025 23:05:49 GMT
Connecting to host 127.0.0.1, port 5201
Reverse mode, remote host 127.0.0.1 is sending
      Cookie: go54oceeyfv5o5h3uuhpwai3eeqwaie3rw6b
      TCP MSS: 2000
[  5] local 127.0.0.1 port 47010 connected to 127.0.0.1 port 5201
Starting Test: protocol: TCP, 1 streams, 131072 byte blocks, omitting 0 seconds, 1 second test, tos 63
[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec  11.3 GBytes  97.3 Gbits/sec
- - - - - - - - - - - - - - - - - - - - - - - - -
Test Complete. Summary Results:
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-1.05   sec  11.3 GBytes  92.8 Gbits/sec  840             sender
[  5]   0.00-1.00   sec  11.3 GBytes  97.3 Gbits/sec                  receiver
snd_tcp_congestion cubic
rcv_tcp_congestion cubic

iperf Done.
```

#### TCP with 10K window size and src-port 57001

```bash title="TCP with 10K window size and src-port 57001"
richo@LAPTOP-A3AMEUF1:~$ iperf3 -c 127.0.0.1 -t 1 -V -w 10K --cport 57001
iperf 3.9
Linux LAPTOP-A3AMEUF1 5.15.167.4-microsoft-standard-WSL2 #1 SMP Tue Nov 5 00:21:55 UTC 2024 x86_64
Control connection MSS 32768
Time: Fri, 18 Apr 2025 23:10:05 GMT
Connecting to host 127.0.0.1, port 5201
      Cookie: 6jn2c6cabb6mueheriwou2dhz2txgdclvu5j
      TCP MSS: 32768 (default)
[  5] local 127.0.0.1 port 57001 connected to 127.0.0.1 port 5201
Starting Test: protocol: TCP, 1 streams, 131072 byte blocks, omitting 0 seconds, 1 second test, tos 0
[ ID] Interval           Transfer     Bitrate         Retr  Cwnd
[  5]   0.00-1.00   sec   542 MBytes  4.55 Gbits/sec    1   50.0 KBytes
- - - - - - - - - - - - - - - - - - - - - - - - -
Test Complete. Summary Results:
[ ID] Interval           Transfer     Bitrate         Retr
[  5]   0.00-1.00   sec   542 MBytes  4.55 Gbits/sec    1             sender
[  5]   0.00-1.06   sec   542 MBytes  4.29 Gbits/sec                  receiver
CPU Utilization: local/sender 54.8% (2.4%u/52.5%s), remote/receiver 4.0% (0.2%u/3.8%s)
snd_tcp_congestion cubic
rcv_tcp_congestion cubic

iperf Done.
```