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
Run the following command to install
```bash
sudo apt install iperf

sudo apt install iperf3
```
### Example installation
See the following installation examples
```bash title="Example installation output for iperf"
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

```bash
richo@LAPTOP-A3AMEUF1:~$ iperf -s -D
Running Iperf Server as a daemon
```
```bash
richo@LAPTOP-A3AMEUF1:~$ iperf3 -s -D
richo@LAPTOP-A3AMEUF1:~$
```

### Confirm Daeamon PID

```bash
richo@LAPTOP-A3AMEUF1:~$ ps aux | grep -E "iperf|USER"
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
richo      74404  0.0  0.0 154108   204 ?        Ssl  18:05   0:00 iperf -s -D
richo      74414  0.0  0.0   8284   508 ?        Ss   18:05   0:00 iperf3 -s -D
richo      74436  0.0  0.0   4024  2080 pts/5    S+   18:07   0:00 grep --color=auto -E iperf|USER
```
We can see the PIDs `74404` and `74414` 
### Test connectivity

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

#### iPerf2

We can define the following ways to have iPerf listening for specific port for UDP and specific for UDP and also adding some delay/jitter/latency details
```bash title="start iPerf2 server listening on 5500-5599 UDP destination ports
iperf -s -p 5500-5599 --histograms -u -D
```
```bash title="start iPerf2 server listening on 5600-5699 TCP destination ports
iperf -s -p 5600-5699 --histograms -D
```
Additionally in the case we want to test multicast we can use the following to join an specific group and be waiting for a client to send packets to that group to respond.
```bash
iperf -s -p 5500 -u -B 239.255.255.250
```
#### iPerf3

Based on the available options for iPerf3 server the following is an example to run iPerf3 server in a specific port for UDP and TCP with vervose output
```bash
iperf3 -s -p 5700 -V -D
```
:::caution
iperf3 does not need to explicitly add the TCP/UDP argument, it will be listening on both and also will accept one cliente at a time
:::

## iPerf Client

### iPerf

:::note
I will be using arguments on the examples, if an argument has been already explained then I will not explain on further examples
:::

#### TCP BW test for a period of time and specific buffer lenght

The following command performs the following test:
- Connects to server 127.0.0.1
- In destination port TCP 5600
- will be printing the data at intervals of 1 second
- using a BW speed of 1M
- Defining a buffer lenght of 5000 bytes
- Showing enhanced (-e) output of the result
- For a period of 5 seconds
```bash
iperf -c 127.0.0.1 -p 5600 -i 1 -b 1M -l 5000 -e -t 5
```
And see the result example
```bash
richo@LAPTOP-A3AMEUF1:~$ iperf -c 127.0.0.1 -p 5600 -i 1 -b 1M -l 5000 -e -t 5
------------------------------------------------------------
Client connecting to 127.0.0.1, TCP port 5600 with pid 83401 (1 flows)
Write buffer size: 5000 Byte
TOS set to 0x0 (Nagle on)
TCP window size: 2.50 MByte (default)
------------------------------------------------------------
[  1] local 127.0.0.1%lo port 59618 connected with 127.0.0.1 port 5600 (MSS=32741) (sock=3) (irtt/icwnd=29/319) (ct=0.12 ms) on 2025-04-16 22:14:53 (PDT)
[ ID] Interval            Transfer    Bandwidth       Write/Err  Rtry     Cwnd/RTT(var)        NetPwr
[  1] 0.0000-1.0000 sec   132 KBytes  1.08 Mbits/sec  27/0          0      320K/326(471) us  414
[  1] 1.0000-2.0000 sec   127 KBytes  1.04 Mbits/sec  26/0          0      320K/72(20) us  1806
[  1] 2.0000-3.0000 sec   127 KBytes  1.04 Mbits/sec  26/0          0      320K/85(8) us  1529
[  1] 3.0000-4.0000 sec   127 KBytes  1.04 Mbits/sec  26/0          0      320K/96(14) us  1354
[  1] 4.0000-5.0000 sec   132 KBytes  1.08 Mbits/sec  27/0          0      320K/93(13) us  1452
[  1] 0.0000-5.0457 sec   649 KBytes  1.05 Mbits/sec  133/0          0      320K/94(11) us  1402
```
:::note
this same test can be done for UDP adding the `-u` argument as follows
```bash
iperf -c 127.0.0.1 -p 5600 -i 1 -b 1M -l 5000 -e -t 5
```
:::
### iPerf3

### BW measurement

# Para que solo sume todo los de los diferentes streams sin detalle por cada uno
iperf -c 127.0.0.1 -i 1 -p 5500 --sum-only -P 10

```bash title="Command to run from the client"
iperf -c <server_ip> -u -b 100M
```
```bash title="BW measument example
iperf -c 20.47.147.59 -u -b 100M
```



iperf3 -V -c 20.47.147.59 -p 5201

Bandwidth Measurement:

Measure the maximum TCP and UDP bandwidth.
Example: iperf -c <server_ip> -u -b 100M (UDP test with 100 Mbps bandwidth).
Latency and Jitter:

Measure latency and jitter for UDP tests.
Example: iperf -c <server_ip> -u -i 1 (UDP test with interval reporting).
Parallel Streams:

Test multiple parallel streams to measure aggregate bandwidth.
Example: iperf -c <server_ip> -P 10 (10 parallel streams).
Bidirectional Testing:

Measure bidirectional bandwidth.
Example: iperf -c <server_ip> -d (dual test mode).
Reverse Mode:

Run the test in reverse mode to measure the bandwidth from server to client.
Example: iperf -c <server_ip> -R (reverse mode).
Window Size:

Set the TCP window size to optimize performance.
Example: iperf -c <server_ip> -w 256K (256 KB window size).
Duration:

Specify the duration of the test.
Example: iperf -c <server_ip> -t 60 (60 seconds test duration).
Report Formats:

Output results in different formats (e.g., JSON).
Example: iperf -c <server_ip> --json (JSON output).
Server Mode:

Run iperf in server mode to listen for incoming tests.
Example: iperf -s (start server).
Client Mode:

Run iperf in client mode to initiate tests.
Example: iperf -c <server_ip> (start client).



iperf -c <server_ip> -P 5 -t 60
This runs a TCP test with 5 parallel streams for 60 seconds.



iperf -c <server_ip> -u -b 10M -t 60
This runs a UDP test with a bandwidth of 10 Mbps for 60 seconds.

Here’s an example of a more granular test setup:

TCP Test with Multiple Streams and Custom Window Size:


This runs a TCP test with 10 parallel streams, a window size of 512 KB, and a duration of 120 seconds.

UDP Test with Custom Bandwidth and Buffer Length:


This runs a UDP test with a bandwidth of 20 Mbps, a buffer length of 128 KB, and a duration of 120 seconds.