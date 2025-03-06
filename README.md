## AI Movie-Based Book Suggestion

📌 Description:
An AI that suggests books destinations based on movie selection. AI can also generate a poster

🔹 Free APIs Used:

Open Library Archive → Fetch book metadata.

🔹 AI Use Case:

CLI: "I loved 'Eat, Pray, Love'. What movies are based on the book? Generate a cover art based on the description of the book"
Indexed movie dataset → Query movie metadata interacted via RAG.
LLM suggests the books movie was adapted from. If there aren't any, LLM suggest books based on the or books related to the genre of the movie
LLM also generates poster of the book and or movie

## Installation

Install dependencies:

```bash
npm i
```

To run:

```bash
npm start
```
