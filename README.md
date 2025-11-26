# Doka Formwork Analysis

AI tool that analyzes construction images and recommends Doka formwork products.

## Tech Stack

- React 19 + TypeScript
- React Router
- Tailwind CSS
- OpenAI GPT-4o Vision API

## Setup

**Prerequisites:**

- Node.js 18+
- OpenAI API key

**Install:**

```bash
npm install
```

**Environment variables:**

Create a `.env` file:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys).

**Run:**

```bash
npm run dev
```

App runs at `http://localhost:5173`

## Build

```bash
npm run build
```

## Features

- Analyzes construction images using AI
- Recommends formwork from 46+ Doka products
- Prioritized recommendations (Essential, Recommended, Optional)
- Direct links to Doka product pages
- Sample images included for testing

## Project Structure

```
src/
├── components/     # UI components
├── pages/          # Page components
├── services/       # OpenAI service
├── constants/      # Product data & AI prompts
└── types/          # TypeScript types
```

## Usage

1. Upload a construction image or choose a sample
2. AI analyzes the structure and identifies elements
3. View prioritized product recommendations
4. Click cards to learn more on Doka's website
