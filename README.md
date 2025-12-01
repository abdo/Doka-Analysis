# Doka Formwork Analysis

AI-powered tool that analyzes construction images and provides voice conversation with formwork experts. Get instant recommendations for Doka formwork products through image analysis or by speaking with an AI specialist.

## Tech Stack

- React 19 + TypeScript
- React Router
- Tailwind CSS
- OpenAI GPT-4o Vision API
- Deepgram Voice Agent SDK
- Web Audio API

## Setup

**Prerequisites:**

- Node.js 18+
- OpenAI API key
- (Optional) Deepgram voice service URL for conversation feature

**Install:**

```bash
npm install
```

**Environment variables:**

Create a `.env` file:

```env
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_WS_URL=wss://your-voice-service-url/talk
```

- Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
- `VITE_WS_URL` is optional - defaults to `ws://localhost:3001/talk` for local development

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

### Image Analysis
- Analyzes construction images using AI
- Recommends formwork from 47 Doka products
- Prioritized recommendations (Essential, Recommended, Optional)
- Direct links to Doka product pages
- Sample images included for testing

### Voice Conversation
- Real-time voice conversation with AI formwork expert
- Powered by Deepgram Voice Agent SDK
- Interactive Q&A about construction projects
- Conversation history display
- Auto-transcription of conversations

## Project Structure

```
src/
├── components/     # UI components
├── pages/          # Page components (Home, Analysis, Conversation)
├── services/       # OpenAI service & API URLs
├── constants/      # Product data & AI prompts
├── hooks/          # Custom hooks for voice/audio
└── types/          # TypeScript types
```

## Usage

### Image Analysis
1. Upload a construction image or choose a sample
2. AI analyzes the structure and identifies elements
3. View prioritized product recommendations
4. Click cards to learn more on Doka's website

### Voice Conversation
1. Click "Talk to an Expert" on the home page
2. Allow microphone access when prompted
3. Speak naturally about your construction project
4. AI expert responds with formwork recommendations
5. View full conversation transcript
6. End call when finished
