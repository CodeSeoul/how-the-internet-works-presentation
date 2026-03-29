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
mdc: true
---

# How Does the Internet Work?

From clicking a link to loading a page — what actually happens?

<div class="pt-12">
  <span class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    CodeSeoul
  </span>
</div>

---
layout: center
class: text-center
---

# You type `codeseoul.org` and press Enter.

<br>

<div class="text-2xl opacity-80">

What happens in the next **500 milliseconds**?

</div>

<br>

<v-click>

Let's trace the journey — starting from what you can see, all the way down to the wires.

</v-click>

---

# The Journey Down

We'll start where you are — at the browser — and go deeper, one layer at a time.

<div class="mt-4">

```mermaid {theme: 'dark', scale: 0.75}
flowchart TD
    L7["<b>Browser / HTTP</b><br/><span style='font-size:0.7em'>Writing the letter</span>"]
    L6["<b>DNS</b><br/><span style='font-size:0.7em'>Looking up the address</span>"]
    L5["<b>TCP / UDP</b><br/><span style='font-size:0.7em'>Registered mail vs. postcard</span>"]
    L4["<b>IP Addresses</b><br/><span style='font-size:0.7em'>The postal address</span>"]
    L3["<b>Packets & Routing</b><br/><span style='font-size:0.7em'>Breaking the letter into postcards</span>"]
    L2["<b>Physical Infrastructure</b><br/><span style='font-size:0.7em'>The mail truck & roads</span>"]

    L7 --> L6 --> L5 --> L4 --> L3 --> L2

    style L7 fill:#8b5cf6,color:#fff
    style L6 fill:#f59e0b,color:#000
    style L5 fill:#ef4444,color:#fff
    style L4 fill:#10b981,color:#000
    style L3 fill:#06b6d4,color:#000
    style L2 fill:#6b7280,color:#fff
```

</div>

---
layout: section
---

# Act 1
## What the Browser Does

Let's start with what you can already see.

---

# What Happens When You Press Enter?

You've typed `codeseoul.org` into the address bar and hit Enter. The browser immediately starts working:

<v-clicks>

1. **Checks its cache** — "Have I been to this site recently? Do I already know the answer?"
2. **Builds an HTTP request** — a structured message asking the server for a page
3. **But first... it needs to find the server** — it only has a name, not an address

</v-clicks>

<br>

<v-click>

Let's look at each of these steps, starting with the message itself.

</v-click>

---

# HTTP — The Browser's Language

**HyperText Transfer Protocol** — how your browser talks to web servers.

<br>

<v-clicks>

- Every time you load a page, your browser sends an **HTTP request**
- The server sends back an **HTTP response**
- It's a simple conversation: *"Can I have this page?" → "Sure, here it is."*

</v-clicks>

---

# Anatomy of an HTTP Request

This is what your browser actually sends to the server:

```http
GET /meetups HTTP/1.1
Host: codeseoul.org
Accept: text/html
User-Agent: Chrome/120
```

<v-clicks>

- **`GET`** — the action (I want to retrieve something)
- **`/meetups`** — the path (which page)
- **`Host: codeseoul.org`** — which server
- **`User-Agent`** — who's asking (your browser)

</v-clicks>

---

# Anatomy of an HTTP Response

And this is what the server sends back:

```http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 4523

<!DOCTYPE html>
<html>
  <head><title>CodeSeoul Meetups</title></head>
  <body>...</body>
</html>
```

<v-clicks>

- **`200 OK`** — status code (success!)
- **`Content-Type`** — what kind of data (HTML, JSON, image...)
- The **body** — the actual page content

</v-clicks>

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
| **200** | OK — here's what you asked for | |
| **301** | Moved permanently — go here instead | |
| **403** | Forbidden — you're not allowed | |
| **404** | Not found — doesn't exist | |
| **500** | Server error — something broke on our end | |
| **418** | I'm a teapot | |

<br>

<v-click>

> **418 I'm a Teapot** is a real HTTP status code from an April Fools' RFC. It means the server refuses to brew coffee because it is, in fact, a teapot.

</v-click>

---

# HTTPS — The Lock Icon

**HTTPS** wraps HTTP in **TLS** (Transport Layer Security) encryption.

<div class="grid grid-cols-2 gap-6 mt-6">
  <div class="bg-red-500/10 border border-red-500/50 rounded-xl p-5">
    <div class="text-red-400 font-bold mb-2">Without HTTPS</div>
    <div class="text-center text-2xl my-3"><code>"password123"</code></div>
    <div class="text-center text-sm opacity-70">Anyone on the network can read this!</div>
  </div>
  <div class="bg-green-500/10 border border-green-500/50 rounded-xl p-5">
    <div class="text-green-400 font-bold mb-2">With HTTPS</div>
    <div class="text-center text-2xl my-3"><code>"k8$#f!x@..."</code></div>
    <div class="text-center text-sm opacity-70">Encrypted — completely unreadable!</div>
  </div>
</div>

<br>

> Always check for the lock icon in your browser! No lock = your data is visible to anyone on the network.

---

# The TLS Handshake (simplified)

How your browser and the server establish a secure connection.

```mermaid {theme: 'dark', scale: 0.75}
sequenceDiagram
    participant B as Browser
    participant S as Server

    B->>S: Client Hello
    Note right of S: "I support these encryption methods"
    S->>B: Server Hello + Certificate
    Note left of B: "Let's use this one.<br/>Here's my certificate."
    Note over B: Verify certificate<br/>via Certificate Authority
    B->>S: Key Exchange
    Note over B,S: Both sides generate a shared secret key
    Note over B,S: All data is now encrypted
```

<v-click>

This all happens in milliseconds, before any webpage content is sent.

</v-click>

---
layout: section
---

# The browser knows *what* to say...

## But *where* does it send it?

The browser has a name — `codeseoul.org` — but it needs a number.

---
layout: section
---

# Act 2
## Finding the Server

DNS — the Internet's contacts app.

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

```mermaid {theme: 'dark', scale: 0.85}
flowchart TD
    Root((".<br/>Root"))
    COM[".com"]
    ORG[".org"]
    KR[".kr"]
    Google["google"]
    CS["codeseoul"]
    Naver["naver"]
    Root --> COM & ORG & KR
    COM --> Google
    ORG --> CS
    KR --> Naver
    style Root fill:#4a9eff,color:#fff
    style COM fill:#f59e0b,color:#000
    style ORG fill:#f59e0b,color:#000
    style KR fill:#f59e0b,color:#000
    style CS fill:#10b981,color:#000
```

<v-clicks>

- **Root servers** — 13 sets of servers that know where to find everything
- **TLD servers** — manage `.com`, `.org`, `.kr`, etc.
- **Authoritative servers** — have the final answer for a specific domain

</v-clicks>

---

# How a DNS Lookup Works

What happens when your browser asks "What's the IP for `codeseoul.org`?"

```mermaid {theme: 'dark', scale: 0.65}
sequenceDiagram
    participant Browser as Browser
    participant Resolver as Recursive Resolver<br/>(Your ISP)
    participant Root as Root Server
    participant TLD as .org Server
    participant Auth as Authoritative<br/>Nameserver

    Browser->>Resolver: What's the IP for codeseoul.org?
    Resolver->>Root: Where do I find .org domains?
    Root-->>Resolver: Try this .org server
    Resolver->>TLD: Where is codeseoul.org?
    TLD-->>Resolver: Try this nameserver
    Resolver->>Auth: What's the IP for codeseoul.org?
    Auth-->>Resolver: 185.199.108.153
    Resolver-->>Browser: 185.199.108.153 (cached for 1 hour)
```

---

# DNS Caching — Your Browser Remembers

That full lookup doesn't happen every time. Answers get **cached** at multiple levels:

<br>

<v-clicks>

1. **Browser cache** — Chrome remembers the answer for minutes
2. **Operating system cache** — your computer keeps its own copy
3. **ISP resolver cache** — your ISP remembers answers for thousands of users
4. **Only if all caches miss** does the full Root → TLD → Authoritative lookup happen

</v-clicks>

<br>

<v-click>

> This is why the first visit to a website can feel slower than the second — by the second time, the answer is already cached.

</v-click>

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
layout: section
---

# DNS gave us an IP address.

## Now the browser needs to open a connection. But how?

---
layout: section
---

# Act 3
## Making a Reliable Connection

TCP & UDP — registered mail vs. shouting across a room.

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

# The TCP Handshake

```mermaid {theme: 'dark', scale: 0.8}
sequenceDiagram
    participant C as Client
    participant S as Server

    C->>S: SYN (seq=100)
    Note right of S: "Hey, want to talk?"
    S->>C: SYN-ACK (seq=300, ack=101)
    Note left of C: "Sure! I hear you."
    C->>S: ACK (ack=301)
    Note right of S: "Great, let's go!"
    Note over C,S: Connection established
    C<<->>S: Data exchange
    C->>S: FIN
    Note right of S: "I'm done."
    S->>C: ACK
    Note left of C: "OK, bye."
```

This happens every time you open a web page — in about **~1ms** on a local network.

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

# TCP vs UDP — The Analogy

<br>

> **TCP** is like a **phone call** — you establish a connection, confirm the other person is there, and have a back-and-forth conversation.

<br>

> **UDP** is like **shouting across a room** — fast, but you might miss something.

<br>

<v-click>

Which one would you use for a bank transfer? For a live video call?

</v-click>

---

# TCP vs UDP — Comparison

<br>

| | TCP | UDP |
|---|-----|-----|
| **Connection** | Handshake first | No handshake |
| **Reliability** | Guaranteed delivery | Best effort |
| **Speed** | Slower | Faster |
| **Order** | Guaranteed | Not guaranteed |
| **Example** | Loading this webpage | Watching a YouTube stream |

---
layout: section
---

# TCP uses IP addresses to find the destination.

## But what *are* IP addresses?

---
layout: section
---

# Act 4
## Addressing Every Device

IP addresses — the Internet's postal system.

---

# What Is an IP Address?

An **IP address** is a unique identifier for a device on a network — like a **postal address** for a computer.

<br>

<v-clicks>

- Every device on the Internet needs one to send and receive data
- Just like a postal address tells the mail carrier where to deliver, an IP address tells the network where to send packets
- There are two versions: **IPv4** (the original) and **IPv6** (the new one)

</v-clicks>

---

# IPv4 — The Original Address System

<br>

```
192.168.1.1
```

<br>

<v-clicks>

- 4 groups of numbers, each 0–255
- ~4.3 billion possible addresses
- Designed in the 1980s — seemed like plenty at the time

</v-clicks>

---

# We Ran Out!

**4.3 billion addresses** sounded like a lot...

<br>

<v-clicks>

- But there are now **5.5 billion** Internet users
- Plus phones, tablets, smart TVs, IoT devices, servers...
- IPv4 addresses were **officially exhausted in 2011**
- We needed a new system.

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
- **340 undecillion** possible addresses (3.4 x 10 to the 38th)
- That's enough to give every grain of sand on Earth its own IP address
- Adoption is gradual — most systems still run both IPv4 and IPv6

</v-clicks>

---

# Public vs Private IPs

Your home has **one public IP** visible to the Internet. But inside, each device gets a **private IP**.

```mermaid {theme: 'dark', scale: 0.8}
flowchart LR
    subgraph home["Your Home Network"]
        direction TB
        Phone["Phone 192.168.1.2"]
        Laptop["Laptop 192.168.1.3"]
        Console["Console 192.168.1.4"]
    end
    Router{"Router<br/>Public IP:<br/>203.0.113.5"}
    Server["Web Server<br/>93.184.216.34"]
    home --> Router --> Server
    style home fill:#1e3a5f,stroke:#4a9eff
    style Router fill:#f59e0b,color:#000
    style Server fill:#10b981,color:#000
```

Your router uses **NAT** (Network Address Translation) to map between them.

---

# How NAT Works

All your devices share **one public IP** — the router keeps track of who asked for what.

<br>

```mermaid {theme: 'dark', scale: 0.9}
sequenceDiagram
    participant Phone as Phone<br/>192.168.1.3
    participant Router as Router<br/>203.0.113.5
    participant Server as Web Server

    Phone->>Router: Request (port 54321)
    Note over Router: NAT translates<br/>192.168.1.3:54321<br/>to 203.0.113.5:54321
    Router->>Server: Request from 203.0.113.5:54321
    Server->>Router: Response to 203.0.113.5:54321
    Note over Router: NAT looks up<br/>port 54321 = Phone
    Router->>Phone: Response delivered
```

---
layout: section
---

# Every device has an address.

## But how does data actually get from A to B?

---
layout: section
---

# Act 5
## How Data Travels

Packets & routing — breaking the letter into postcards.

---

# Data Travels in Packets

You don't send a whole file at once — it gets broken into **packets**.

<div class="grid grid-cols-4 gap-3 mt-8">
  <div class="bg-blue-500/20 border border-blue-500 rounded-lg p-3 text-center text-sm">
    <div class="font-bold text-blue-300">Packet 1</div>
    <div class="text-xs mt-1 opacity-80">"Hello, "</div>
    <div class="text-xs opacity-60">Seq: 1 | From: A | To: B</div>
  </div>
  <div class="bg-green-500/20 border border-green-500 rounded-lg p-3 text-center text-sm">
    <div class="font-bold text-green-300">Packet 2</div>
    <div class="text-xs mt-1 opacity-80">"CodeSeoul"</div>
    <div class="text-xs opacity-60">Seq: 2 | From: A | To: B</div>
  </div>
  <div class="bg-purple-500/20 border border-purple-500 rounded-lg p-3 text-center text-sm">
    <div class="font-bold text-purple-300">Packet 3</div>
    <div class="text-xs mt-1 opacity-80">"! How's "</div>
    <div class="text-xs opacity-60">Seq: 3 | From: A | To: B</div>
  </div>
  <div class="bg-amber-500/20 border border-amber-500 rounded-lg p-3 text-center text-sm">
    <div class="font-bold text-amber-300">Packet 4</div>
    <div class="text-xs mt-1 opacity-80">"it going?"</div>
    <div class="text-xs opacity-60">Seq: 4 | From: A | To: B</div>
  </div>
</div>

<v-clicks>

- Each packet can take a **different route** to the destination
- Packets may arrive **out of order** — that's fine, they get reassembled
- If a packet is **lost**, only that packet needs to be resent

</v-clicks>

---

# How Routers Make Decisions

Each router looks at the **destination IP** and decides: "Where should I send this next?"

```mermaid {theme: 'dark', scale: 0.75}
flowchart TD
    You["You (Seoul)"]
    R1["Router 1 (KT/SKT)"]
    KINX["KINX (Seoul IXP)"]
    Cable["Undersea cable ~10,000 km"]
    LA["Router (Los Angeles)"]
    Server["Server (Oregon)"]

    You -->|"Request sent"| R1
    R1 -->|"Destination is in the US..."| KINX
    KINX -->|"Route via Pacific cable"| Cable
    Cable --> LA
    LA -->|"Forward to local network"| Server

    style Cable fill:#0ea5e9,color:#fff
    style Server fill:#10b981,color:#000
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

- **Physical distance** — speed of light in fiber is about 200,000 km/s (fast, but not instant)
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

# Packets travel through routers.

## But what physical medium carries them?

---
layout: section
---

# Act 6
## The Physical Internet

All those layers ride on something real.

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

> Explore the map yourself: [submarinecablemap.com](https://www.submarinecablemap.com/)

</v-click>

---

# The Last Mile

How data gets from the backbone to **your device**.

<br>

| Connection Type | Speed | How It Works |
|----------------|-------|-------------|
| **Fiber (FTTH)** | Fastest | Light pulses through glass — the gold standard |
| **Coaxial cable** | Fast | Shared cable TV infrastructure |
| **DSL (copper)** | Slow | Old phone lines — being phased out |
| **Wireless (4G/5G)** | Varies | Radio waves to cell towers |
| **Satellite** | High latency | For remote areas — Starlink etc. |

<br>

<v-click>

> **South Korea** averages ~200 Mbps. Most of Seoul is connected via FTTH (Fiber to the Home).

</v-click>

---

# How Networks Connect

The Internet is networks connected to networks, all the way up.

```mermaid {theme: 'dark', scale: 0.85}
flowchart TD
    Internet(("Internet"))
    IXP1["IXP<br/><span style='font-size:0.7em'>Seoul</span>"]
    IXP2["IXP<br/><span style='font-size:0.7em'>Tokyo</span>"]
    IXP3["IXP<br/><span style='font-size:0.7em'>LA</span>"]
    ISP1["ISP<br/>KT"]
    ISP2["ISP<br/>SKT"]
    ISP3["ISP<br/>NTT"]
    ISP4["ISP<br/>AT&T"]
    D1["Home"]
    D2["Office"]
    D3["Phone"]
    D4["Home"]
    Internet --- IXP1 & IXP2 & IXP3
    IXP1 --- ISP1 & ISP2
    IXP2 --- ISP3
    IXP3 --- ISP4
    ISP1 --- D1
    ISP2 --- D2
    ISP3 --- D3
    ISP4 --- D4
    style Internet fill:#4a9eff,color:#fff
    style IXP1 fill:#f59e0b,color:#000
    style IXP2 fill:#f59e0b,color:#000
    style IXP3 fill:#f59e0b,color:#000
```

**IXP** = Internet Exchange Point &nbsp;&nbsp; **ISP** = Internet Service Provider

---

# Key Physical Components

| Component | What It Does | Example |
|-----------|-------------|---------|
| **Modem** | Converts signals between your network and ISP | Your home modem |
| **Router** | Forwards packets between networks | Home WiFi router, Cisco enterprise |
| **Switch** | Connects devices within a local network | Office network switch |
| **Server** | Hosts content and services | A machine in a data center |
| **IXP** | Where different networks exchange traffic | KINX in Seoul |

---
layout: section
---

# Part 7
## Putting It All Together

---

# The Journey — Revisited

We've traced every layer. Here's the full picture.

<div class="mt-4">

```mermaid {theme: 'dark', scale: 0.75}
flowchart TD
    L7["<b>Browser / HTTP</b><br/><span style='font-size:0.7em'>Writing the letter</span>"]
    L6["<b>DNS</b><br/><span style='font-size:0.7em'>Looking up the address</span>"]
    L5["<b>TCP / UDP</b><br/><span style='font-size:0.7em'>Registered mail vs. postcard</span>"]
    L4["<b>IP Addresses</b><br/><span style='font-size:0.7em'>The postal address</span>"]
    L3["<b>Packets & Routing</b><br/><span style='font-size:0.7em'>Breaking the letter into postcards</span>"]
    L2["<b>Physical Infrastructure</b><br/><span style='font-size:0.7em'>The mail truck & roads</span>"]

    L7 --> L6 --> L5 --> L4 --> L3 --> L2

    style L7 fill:#8b5cf6,color:#fff,stroke:#a78bfa,stroke-width:3px
    style L6 fill:#f59e0b,color:#000,stroke:#fbbf24,stroke-width:3px
    style L5 fill:#ef4444,color:#fff,stroke:#f87171,stroke-width:3px
    style L4 fill:#10b981,color:#000,stroke:#34d399,stroke-width:3px
    style L3 fill:#06b6d4,color:#000,stroke:#22d3ee,stroke-width:3px
    style L2 fill:#6b7280,color:#fff,stroke:#9ca3af,stroke-width:3px
```

</div>

You now understand every layer.

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
10. **Page complete!** — You see the CodeSeoul website

</v-clicks>

<v-click>

**Total time: ~200-500ms** for a well-optimized site

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

### Try it yourself!

1. Open Chrome → F12 → Network tab
2. Visit `codeseoul.org`
3. Watch every request in real time
4. Click any request to see headers, response, timing

</v-click>

---

# Key Takeaways

<v-clicks>

The Internet is a **network of networks** using agreed-upon protocols

Data travels through **physical cables** (mostly undersea fiber)

**IP addresses** identify devices; **DNS** translates names to IPs

Data is split into **packets** that can take different routes

**TCP** ensures reliable delivery; **UDP** prioritizes speed

**HTTP** is how browsers talk to servers; **HTTPS** adds encryption

A single page load involves **many steps** happening in milliseconds

</v-clicks>

---

# Want to Explore More?

<v-clicks>

**Tools to try:**
- `nslookup` / `dig` — DNS lookups
- `traceroute` / `tracert` — Trace packet routes
- `ping` — Test connectivity
- Browser DevTools (F12) — Watch network traffic
- Wireshark — Deep packet inspection

**Resources:**
- [How DNS Works (comic)](https://howdns.works/)
- [Submarine Cable Map](https://www.submarinecablemap.com/)
- [MDN Web Docs: HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)

</v-clicks>

---
layout: center
class: text-center
---

# Thank You!

Questions?

<br>

**CodeSeoul** — [codeseoul.org](https://codeseoul.org)

<div class="pt-8 text-sm opacity-60">

Slides made with [Slidev](https://sli.dev)

</div>
