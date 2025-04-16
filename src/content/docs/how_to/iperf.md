---
title: iPerf
description: iPerf
---

sudo apt install iperf3

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