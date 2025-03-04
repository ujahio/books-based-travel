## AI Book-Based Travel Guide
📌 Description:
An AI that suggests travel destinations based on book settings & real locations.

🔹 Free APIs Used:

Google Books API → Fetch book metadata.
Wikipedia API → Fetch real locations mentioned in books.
Google Maps API (Limited Free Requests) → Fetch travel guides & attractions.
🔹 AI Use Case:

CLI: "I loved 'Eat, Pray, Love'. Where should I travel?"
Uses RAG to fetch book locations.
Uses Google Maps API to suggest real-world travel guides.
Saves user travel interests in lowdb.


## Installation

Install dependencies:

```bash
npm i
```

To run:

```bash
npm start
```