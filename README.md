## AI Movie/Book Recommendation App

📌 Description:
An AI that suggests books based on movie selection and vice versa. AI can also generate a poster related to books or movies.

🔹 Free APIs Used:

Open Library Archive → Fetch book metadata.

🔹 AI Use Case:

What recommendation do you need: "I loved 'Eat, Pray, Love'. What movies are based on the book? Generate a cover art based on the description of the book."
Indexed movie dataset → Query movie metadata interacted via RAG.
Dalle also generates poster of the book and or movie.

## Installation

Install dependencies:

```bash
npm i
```

To run:

```bash
npm start
```

## Dependency

- Upstash - serverless vector db
- OpenAI - primary LLM provider

## Setup

### Setting up Upstash Vector DB

1. Register on [Upstash](https://upstash.com/).
2. Create a new vector database.
3. Add `UPSTASH_VECTOR_REST_URL` and `UPSTASH_VECTOR_REST_TOKEN` to env variables.

### Adding Environmental Variables

Create a `.env` file in the root directory and add the following variables:

```env
OPENAI_API_KEY=
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=
OPENAI_TEXT_GEN_LLM_MODEL=
OPENAI_IMAGE_GEN_LLM_MODEL=
```
