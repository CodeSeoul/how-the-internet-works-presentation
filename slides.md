---
theme: seriph
colorSchema: dark
background: https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920
class: text-center
highlighter: shiki
drawings:
  persist: false
transition: slide-left
title: "How Does the Internet Work?"
info: |
  ## How Does the Internet Work?
  A CodeSeoul presentation

  Learn more at [CodeSeoul](https://codeseoul.org)
---

# How Does the Internet Work?

From clicking a link to loading a page — what actually happens?

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    CodeSeoul 🇰🇷
  </span>
</div>

---
transition: fade-out
---

# What We'll Cover

<v-clicks>

1. 🌍 What *is* the Internet, really?
2. 🔌 Physical infrastructure — cables, routers, data centers
3. 🏠 IP addresses — the Internet's postal system
4. 📖 DNS — the Internet's phone book
5. 📦 Packets & routing — how data actually travels
6. 📚 The TCP/IP stack — layers of communication
7. 🌐 HTTP/HTTPS — the language of the web
8. 🔄 Putting it all together — the life of a web request

</v-clicks>

---
layout: section
---

# Part 1
## What *is* the Internet?

---

# Not Magic — Just Wires (Mostly)

The Internet is a **global network of networks** — billions of devices connected together.

<v-clicks>

- It is **not** the World Wide Web (the Web is just one application that runs *on* the Internet)
- It is **not** "the cloud" — the cloud is just someone else's computer
- It **is** a set of agreed-upon protocols that allow any device to talk to any other device

</v-clicks>

<br>

<v-click>

> "The Internet is a network of networks. That's it. That's the tweet."

</v-click>

---

# A Very Brief History

```mermaid
timeline
    title Evolution of the Internet
    1969 : ARPANET - 4 nodes
         : UCLA, Stanford, UCSB, Utah
    1983 : TCP/IP adopted
         : "The Internet" is born
    1989 : Tim Berners-Lee invents the Web
         : HTML, HTTP, URLs
    1993 : Mosaic browser released
         : The public gets online
    2007 : iPhone launches
         : Mobile internet era
    2024 : 5.5 billion users
         : 67% of world population
```

---
layout: section
---

# Part 2
## Physical Infrastructure

---

# Undersea Cables

The backbone of the global Internet lives on the ocean floor.

<br>

<v-clicks>

- ~550 active submarine cables worldwide
- Carry **99%** of intercontinental data
- Up to 25,000 km long
- Fiber optic, about the diameter of a garden hose

</v-clicks>

<br>

<v-click>

> 🗺️ Explore the map yourself: [submarinecablemap.com](https://www.submarinecablemap.com/)

</v-click>

---

# The Last Mile

How data gets from the backbone to **your device**.

<br>

| Connection Type | Speed | How It Works |
|----------------|-------|-------------|
| **Fiber (FTTH)** | Fastest 🚀 | Light pulses through glass — the gold standard |
| **Coaxial cable** | Fast | Shared cable TV infrastructure |
| **DSL (copper)** | Slow | Old phone lines — being phased out |
| **Wireless (4G/5G)** | Varies | Radio waves to cell towers |
| **Satellite** | High latency | For remote areas — Starlink etc. |

<br>

<v-click>

> 🇰🇷 **South Korea** averages ~200 Mbps. Most of Seoul is connected via FTTH (Fiber to the Home).

</v-click>

---

# How Networks Connect

The Internet is networks connected to networks, all the way up.

```
                    🌐
              ╱      |      ╲
         IXP ——— IXP ——— IXP          Internet Exchange Points
        ╱   ╲     |     ╱   ╲         where big networks meet
      ISP   ISP  ISP  ISP   ISP       Internet Service Providers
       |     |    |    |      |        deliver to end users
      🏠    🏢   🏠   📱    🏠
```

<v-clicks>

- **IXP** (Internet Exchange Point) — where networks swap traffic directly, e.g. **KINX in Seoul** 🇰🇷
- **ISP** (Internet Service Provider) — KT, SKT, LG U+ connect you to the IXPs

</v-clicks>

---

# Key Physical Components

| Component | What It Does | Example |
|-----------|-------------|---------|
| **Modem** | Converts signals between your network and ISP | Your home modem |
| **Router** | Forwards packets between networks | Home WiFi router, Cisco enterprise |
| **Switch** | Connects devices within a local network | Office network switch |
| **Server** | Hosts content and services | A machine in a data center |
| **IXP** | Where different networks exchange traffic | KINX in Seoul 🇰🇷 |

---
layout: section
---

# Part 3
## IP Addresses

---

# IPv4 — The Original Address System

An **IP address** is a unique identifier for a device on a network — like a postal address.

<br>

```
192.168.1.1
```

<br>

<v-clicks>

- 4 groups of numbers, each 0–255
- ~4.3 billion possible addresses
- **We ran out!** 😱 (officially exhausted in 2011)

</v-clicks>

---

# IPv6 — The New Address System

Designed to solve the address shortage — with room to spare.

<br>

```
2001:0db8:85a3:0000:0000:8a2e:0370:7334
```

<br>

<v-clicks>

- 8 groups of hexadecimal numbers
- **340 undecillion** possible addresses (3.4 × 10³⁸)
- That's enough to give every grain of sand on Earth its own IP address
- Adoption is gradual — most systems still run both IPv4 and IPv6

</v-clicks>

---

# Public vs Private IPs

Your home has **one public IP** visible to the Internet. But inside, each device gets a **private IP**.

```
    Your Home Network                    The Internet
    ┌────────────────┐                  ┌──────────────┐
    │ 📱 192.168.1.2 │                  │              │
    │ 💻 192.168.1.3 │──► Router ──────►│  Web Server  │
    │ 🎮 192.168.1.4 │   Public IP:     │  93.184.216.34│
    └────────────────┘   203.0.113.5    └──────────────┘
         Private IPs
```

Your router uses **NAT** (Network Address Translation) to map between them.

---

# How NAT Works

All your devices share **one public IP** — the router keeps track of who asked for what.

```
                    NAT translates:
                    192.168.1.3:54321
                    ↔ 203.0.113.5:54321
```

<v-clicks>

- 📱 Phone sends a request → router tags it with a unique port number
- 🌐 Response comes back to that port → router forwards it to the right device
- The outside world only ever sees **203.0.113.5** — your private IPs stay hidden

</v-clicks>

---
layout: section
---

# Part 4
## DNS — The Phone Book

---

# Nobody Remembers IP Addresses

**DNS** (Domain Name System) translates human-readable names into IP addresses.

<br>

```
codeseoul.org  →  DNS lookup  →  185.199.108.153
```

<br>

Without DNS, you'd have to type `185.199.108.153` into your browser every time.

---

# The DNS Hierarchy

DNS is organized like a tree, starting from the root.

```
                    . (Root)
                 ╱     |     ╲
              .com   .org   .kr
              ╱        |       ╲
         google    codeseoul   naver
```

<v-clicks>

- **Root servers** — 13 sets of servers that know where to find everything
- **TLD servers** — manage `.com`, `.org`, `.kr`, etc.
- **Authoritative servers** — have the final answer for a specific domain

</v-clicks>

---

# How a DNS Lookup Works

What happens when your browser asks "What's the IP for `codeseoul.org`?"

<v-clicks>

1. Browser checks its **local cache** — "Have I looked this up recently?"
2. Asks the **recursive resolver** (usually your ISP) to find out
3. Resolver asks a **root server** → "Try the `.org` server"
4. Resolver asks the **.org server** → "Try this nameserver for `codeseoul.org`"
5. Resolver asks the **authoritative nameserver** → "`185.199.108.153`"
6. Result is **cached** so we don't repeat this every time

</v-clicks>

---

# DNS in Action

```bash
# Try this at home!
$ nslookup codeseoul.org
Server:  dns.google
Address: 8.8.8.8

Name:    codeseoul.org
Address: 185.199.108.153

# Or dig for more detail
$ dig codeseoul.org

;; ANSWER SECTION:
codeseoul.org.    3600    IN    A    185.199.108.153

# TTL = 3600 seconds (1 hour) — how long to cache this answer
```

---

# Common DNS Record Types

| Type | Purpose | Example |
|------|---------|---------|
| **A** | Domain → IPv4 address | `codeseoul.org → 185.199.108.153` |
| **AAAA** | Domain → IPv6 address | `google.com → 2607:f8b0:4004:...` |
| **CNAME** | Domain → another domain (alias) | `www.example.com → example.com` |
| **MX** | Mail server for the domain | `codeseoul.org → mail.google.com` |

<br>

<v-click>

> You can look these up yourself with `dig codeseoul.org MX` or `nslookup -type=MX codeseoul.org`

</v-click>

---
layout: section
---

# Part 5
## Packets & Routing

---

# Data Travels in Packets

You don't send a whole file at once — it gets broken into **packets**.

<div class="mt-4">

```
Original message: "Hello, CodeSeoul! How's it going?"

┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ Packet 1 │  │ Packet 2 │  │ Packet 3 │  │ Packet 4 │
│ "Hello, " │  │"CodeSeoul"│  │"! How's " │  │"it going?"│
│ Seq: 1   │  │ Seq: 2   │  │ Seq: 3   │  │ Seq: 4   │
│ From: A  │  │ From: A  │  │ From: A  │  │ From: A  │
│ To: B    │  │ To: B    │  │ To: B    │  │ To: B    │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
```

</div>

<v-clicks>

- Each packet can take a **different route** to the destination
- Packets may arrive **out of order** — that's fine, they get reassembled
- If a packet is **lost**, only that packet needs to be resent

</v-clicks>

---

# How Routers Make Decisions

Each router looks at the **destination IP** and decides: "Where should I send this next?"

```
        📱 You (Seoul)
         │
    ┌────▼────┐
    │ Router 1│ ──► "Destination is in the US..."
    │ (KT/SKT)│
    └────┬────┘
         │
    ┌────▼────┐
    │  KINX   │ ──► "Route via Pacific submarine cable"
    │ (Seoul) │
    └────┬────┘
         │ ≈ 10,000 km undersea cable
    ┌────▼────┐
    │ Router  │ ──► "Almost there, forward to local network"
    │  (LA)   │
    └────┬────┘
         │
    ┌────▼────┐
    │ Server  │ ──► Destination reached!
    │(Oregon) │
    └─────────┘
```

This whole trip takes about **~120ms** (round trip) — you barely notice it.

---

# Traceroute — See the Path

```bash
# Watch packets hop across the world!
$ traceroute google.com

 1  192.168.1.1     (1 ms)     # Your router
 2  10.0.0.1        (5 ms)     # ISP local
 3  72.14.215.69    (8 ms)     # ISP backbone
 4  108.170.242.97  (12 ms)    # Google edge (Seoul)
 5  216.58.220.110  (15 ms)    # Google server

# From Seoul to Google: 5 hops, 15ms
# Thanks to CDNs and edge servers nearby!
```

---

# Why Some Websites Feel Slow

Not all requests are equal. Several things add up to make a page feel sluggish.

<br>

<v-clicks>

- **Physical distance** — speed of light in fiber ≈ 200,000 km/s (fast, but not instant)
- **Too many hops** — each router adds a small delay
- **Congestion** — too much traffic at a router, packets queue up
- **CDNs help!** — Content Delivery Networks put copies of data closer to you

</v-clicks>

<br>

<v-click>

> This is why a Korean website loads instantly in Seoul but feels slow from Europe — and vice versa.

</v-click>

---
layout: section
---

# Part 6
## The TCP/IP Stack

---

# Layers of Communication

Think of it like sending a physical letter ✉️

<div class="mt-4">

| Layer | Name | Job | Analogy |
|-------|------|-----|---------|
| 4 | **Application** | What you want to say | Writing the letter |
| 3 | **Transport** | Reliable delivery | Registered mail vs postcard |
| 2 | **Internet** | Addressing & routing | Postal address |
| 1 | **Link** | Physical transmission | The mail truck |

</div>

<v-click>

```
Sending                                    Receiving
┌─────────────┐                           ┌─────────────┐
│ Application │  HTTP "GET /index.html"    │ Application │
├─────────────┤                           ├─────────────┤
│  Transport  │  TCP: port 443, seq #1    │  Transport  │
├─────────────┤                           ├─────────────┤
│  Internet   │  IP: src→dst address      │  Internet   │
├─────────────┤                           ├─────────────┤
│    Link     │  Ethernet/WiFi frame      │    Link     │
└──────┬──────┘                           └──────▲──────┘
       └──────── Physical medium ────────────────┘
```

</v-click>

---

# TCP — Reliable Delivery

**Transmission Control Protocol** — the careful postal service.

<br>

<v-clicks>

- Three-way handshake before any data is sent (SYN → SYN-ACK → ACK)
- Guarantees **all data arrives**
- Guarantees **correct order**
- Automatically **retransmits** lost packets
- Slower, but dependable

</v-clicks>

<br>

<v-click>

**Used for:** Web browsing, email, file transfer, APIs — anything where missing data would be a problem.

</v-click>

---

# UDP — Speed Over Reliability

**User Datagram Protocol** — the "just throw it and hope" approach.

<br>

<v-clicks>

- No handshake — just start sending
- No guarantee of delivery
- No guarantee of order
- No retransmission of lost packets
- **Fast** and lightweight

</v-clicks>

<br>

<v-click>

**Used for:** Video streaming, gaming, VoIP, DNS lookups — where speed matters more than perfection.

</v-click>

---

# TCP vs UDP — When to Use Which?

<br>

> **Analogy:** TCP is like a phone call (connection established, back-and-forth). UDP is like shouting across a room (fast, but you might miss something).

<br>

| | TCP | UDP |
|---|-----|-----|
| **Connection** | Handshake first | No handshake |
| **Reliability** | Guaranteed delivery | Best effort |
| **Speed** | Slower | Faster |
| **Order** | Guaranteed | Not guaranteed |
| **Example** | Loading this webpage | Watching a YouTube stream |

---

# The TCP Handshake

```
    Client                          Server
      │                               │
      │──── SYN (seq=100) ───────────►│  "Hey, want to talk?"
      │                               │
      │◄─── SYN-ACK (seq=300,ack=101)│  "Sure! I hear you."
      │                               │
      │──── ACK (ack=301) ───────────►│  "Great, let's go!"
      │                               │
      │       Connection established   │
      │◄─────── Data exchange ────────►│
      │                               │
      │──── FIN ─────────────────────►│  "I'm done."
      │◄─── ACK ──────────────────────│  "OK, bye."
      │                               │
```

This happens every time you open a web page — in about **~1ms** on a local network.

---
layout: section
---

# Part 7
## HTTP/HTTPS

---

# HTTP — The Language of the Web

**HyperText Transfer Protocol** — how your browser talks to web servers.

```http
# REQUEST (what your browser sends)
GET /meetups HTTP/1.1
Host: codeseoul.org
Accept: text/html
User-Agent: Chrome/120

# RESPONSE (what the server sends back)
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 4523

<!DOCTYPE html>
<html>
  <head><title>CodeSeoul Meetups</title></head>
  <body>...</body>
</html>
```

---

# HTTP Methods (Verbs)

How you tell the server **what you want to do**.

<br>

| Method | Purpose | Example |
|--------|---------|---------|
| **GET** | Retrieve data | Load a webpage |
| **POST** | Submit/create data | Submit a signup form |
| **PUT** | Update (replace) data | Replace your profile |
| **PATCH** | Update (partial) data | Change just your email |
| **DELETE** | Remove data | Delete a comment |

---

# HTTP Status Codes

How the server tells you **what happened**.

<br>

| Code | Meaning | |
|------|---------|--|
| **200** | OK — here's what you asked for | ✅ |
| **301** | Moved permanently — go here instead | ↪️ |
| **403** | Forbidden — you're not allowed | 🚫 |
| **404** | Not found — doesn't exist | 🔍 |
| **500** | Server error — something broke on our end | 💥 |
| **418** | I'm a teapot | 🫖 |

<br>

<v-click>

> **418 I'm a Teapot** is a real HTTP status code from an April Fools' RFC. It means the server refuses to brew coffee because it is, in fact, a teapot.

</v-click>

---

# HTTPS — HTTP + Security

**HTTPS** wraps HTTP in **TLS** (Transport Layer Security) encryption.

```
Without HTTPS (HTTP):
📱 ──── "password123" ────────► 🖥️
              👀 Anyone can read this!

With HTTPS:
📱 ──── "k8$#f!x@mQ2..." ────► 🖥️
              🔒 Encrypted — unreadable!
```

<br>

> 🔒 Always check for the lock icon in your browser! No lock = your data is visible to anyone on the network.

---

# The TLS Handshake (simplified)

How your browser and the server establish a secure connection.

<v-clicks>

1. **Client Hello** — "I support these encryption methods"
2. **Server Hello** — "Let's use this one. Here's my certificate."
3. **Certificate Verify** — Client checks: "Is this certificate legit?" (via Certificate Authority)
4. **Key Exchange** — Both sides generate a shared secret key
5. **Encrypted Session** — All data is now encrypted with that key

</v-clicks>

<br>

<v-click>

This all happens in milliseconds, before any webpage content is sent.

</v-click>

---
layout: section
---

# Part 8
## Putting It All Together

---

# The Life of a Web Request

What happens when you type `codeseoul.org` and press Enter?

<v-clicks>

1. **Browser checks cache** — "Have I been here recently?"
2. **DNS lookup** — `codeseoul.org` → `185.199.108.153`
3. **TCP handshake** — SYN → SYN-ACK → ACK (establish connection)
4. **TLS handshake** — Exchange certificates, establish encryption
5. **HTTP request** — `GET / HTTP/1.1` (send the request)
6. **Server processes** — Server finds the page, builds the HTML
7. **HTTP response** — Server sends back HTML, CSS, JS, images
8. **Browser renders** — Parse HTML → Build DOM → Apply CSS → Execute JS
9. **Sub-requests** — Browser fetches images, fonts, scripts (repeat steps 2-8)
10. **Page complete!** — You see the CodeSeoul website 🎉

</v-clicks>

<v-click>

**Total time: ~200–500ms** for a well-optimized site

</v-click>

---

# Let's Watch It Happen

Open DevTools (F12) → Network tab → Visit any website

```
Name              Status  Type       Size     Time
─────────────────────────────────────────────────────
codeseoul.org     200     document   4.5 KB   120 ms
style.css         200     stylesheet 2.1 KB    45 ms
app.js            200     script     8.3 KB    62 ms
logo.png          200     image      15 KB     38 ms
font.woff2        200     font       24 KB     55 ms
analytics.js      200     script     3.2 KB    89 ms
─────────────────────────────────────────────────────
6 requests | 57.1 KB transferred | 310 ms total
```

<v-click>

### Try it yourself! 🧪

1. Open Chrome → F12 → Network tab
2. Visit `codeseoul.org`
3. Watch every request in real time
4. Click any request to see headers, response, timing

</v-click>

---
layout: two-cols
---

# Review: Key Takeaways

<v-clicks>

✅ The Internet is a **network of networks** using agreed-upon protocols

✅ Data travels through **physical cables** (mostly undersea fiber)

✅ **IP addresses** identify devices; **DNS** translates names to IPs

✅ Data is split into **packets** that can take different routes

✅ **TCP** ensures reliable delivery; **UDP** prioritizes speed

✅ **HTTP** is how browsers talk to servers; **HTTPS** adds encryption

✅ A single page load involves **many steps** happening in milliseconds

</v-clicks>

::right::

<div class="ml-8 mt-12">

# Want to Explore More?

<v-clicks>

🔧 **Tools to try:**
- `nslookup` / `dig` — DNS lookups
- `traceroute` / `tracert` — Trace packet routes
- `ping` — Test connectivity
- Browser DevTools (F12) — Watch network traffic
- Wireshark — Deep packet inspection

📚 **Resources:**
- [How DNS Works (comic)](https://howdns.works/)
- [Submarine Cable Map](https://www.submarinecablemap.com/)
- [MDN Web Docs: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)

</v-clicks>

</div>

---
layout: center
class: text-center
---

# Thank You!

Questions? 🙋

<br>

**CodeSeoul** — [codeseoul.org](https://codeseoul.org)

<div class="pt-8 text-sm opacity-60">

Slides made with [Slidev](https://sli.dev) 💚

</div>
