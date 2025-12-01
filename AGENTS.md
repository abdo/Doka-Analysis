# Doka Analysis - Developer Guide

## Project Overview

Doka Analysis is an AI-powered application that helps construction professionals find the right formwork solutions through two main features:
1. **Image Analysis**: Upload construction drawings/photos for AI-powered product recommendations
2. **Voice Conversation**: Real-time voice conversation with an AI formwork expert

## Architecture

### Technology Stack

**Frontend:**
- React 19 with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- Vite as build tool

**AI Services:**
- OpenAI GPT-4o Vision API for image analysis
- Deepgram Voice Agent SDK for real-time voice conversation
- Groq LLM (via Deepgram) for voice conversation intelligence

**Audio Processing:**
- Web Audio API for recording and playback
- Linear16 PCM format at 48kHz (recording) and 24kHz (playback)

### Service Architecture

```
┌─────────────────┐
│   User Browser  │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌────────┐ ┌──────────────────┐
│ Image  │ │ Voice Conversation│
│Analysis│ │   (WebSocket)     │
└───┬────┘ └────────┬──────────┘
    │               │
    ▼               ▼
┌────────┐ ┌────────────────────┐
│ OpenAI │ │ Deepgram Voice     │
│Vision  │ │ Agent (Railway)    │
│  API   │ │                    │
└────────┘ └────────────────────┘
```

## Environment Configuration

Required environment variables (`.env` file):

```env
# Required: OpenAI API key for image analysis
VITE_OPENAI_API_KEY=sk-...

# Optional: WebSocket URL for voice service
# Defaults to ws://localhost:3001/talk if not set
VITE_WS_URL=wss://doka-voice-production.up.railway.app/talk
```

## Component Structure

### Pages

- **HomePage** (`/`): Landing page with image upload and voice conversation options
- **AnalysisResultsPage** (`/analysis`): Displays AI analysis results for uploaded images
- **ConversationPage** (`/conversation`): Real-time voice conversation interface

### Key Components

- **ImageUpload**: Drag-and-drop image upload with preview
- **AnalysisResults**: Displays structured formwork recommendations
- **Header**: Reusable header with Doka branding
- **LoadingSpinner**: Loading state indicator

### Custom Hooks

**Voice Conversation Hooks**:
- `useDeepgramVoice`: WebSocket connection management, message handling, conversation history
- `useAudioRecorder`: Microphone access, audio capture in Linear16 PCM format
- `useAudioPlayer`: Audio playback queue management for AI responses

## Data Flow

### Image Analysis Flow

```
User uploads image
    ↓
ImageUpload component
    ↓
analyzeImage(file) service
    ↓
OpenAI Vision API
    ├─ Sends: Base64 image + product catalog + analysis prompt
    └─ Receives: JSON with structure analysis + recommendations
    ↓
Navigate to /analysis with results
    ↓
AnalysisResults displays recommendations
```

### Voice Conversation Flow

```
User navigates to /conversation
    ↓
Auto-connect to WebSocket (talkWsUrl)
    ↓
Auto-start microphone recording
    ↓
┌─────────── Continuous Loop ───────────┐
│                                       │
│ Audio Input (48kHz Linear16 PCM)     │
│         ↓                             │
│ WebSocket send (binary)               │
│         ↓                             │
│ Deepgram processes                    │
│   ├─ Speech-to-text                   │
│   ├─ LLM (Groq) thinks                │
│   └─ Text-to-speech (ElevenLabs)      │
│         ↓                             │
│ WebSocket receives                    │
│   ├─ Audio data (24kHz Linear16 PCM)  │
│   └─ Transcript messages (JSON)       │
│         ↓                             │
│ Display conversation + play audio     │
│                                       │
└───────────────────────────────────────┘
```

## Product Data

**Location**: `src/constants/doka-data.ts`

Contains 47 Doka formwork products with:
- Product metadata (id, name, description, category, handling)
- Use cases (bestFor array)
- Product links

**Categories**:
- Wall Formwork
- Column Formwork
- Floor/Slab Formwork
- Climbing Formwork
- Shoring Systems
- Safety Systems
- System Components
- Digital Services

## AI Prompts

**Image Analysis**: `src/constants/analysis-prompt.ts`
- System prompt with formwork expertise context
- Structured JSON output format
- Product catalog embedding

**Voice Conversation**: `doka-voice-bun.ts` (backend service)
- Conversational AI expert persona
- Same product catalog
- Interactive Q&A guidelines

## Development Guidelines

### Adding New Products

1. Add product object to `doka-data.ts`
2. Follow existing structure (id, name, description, category, handling, bestFor, imageUrl, link)
3. Product will automatically appear in AI recommendations

### Modifying AI Behavior

**Image Analysis**:
- Edit `DOKA_SYSTEM_PROMPT` in `analysis-prompt.ts`
- Modify `createAnalysisPrompt()` function for output format

**Voice Conversation**:
- Edit `DOKA_VOICE_PROMPT` in `doka-voice-bun.ts` backend service
- Redeploy backend service after changes

### Styling Conventions

- Use Tailwind CSS utility classes
- Follow Doka brand colors:
  - `doka-blue`: #004588
  - `doka-yellow`: #FFDD00
- Maintain responsive design (mobile-first approach)

### State Management

- React hooks for local state
- React Router state for passing data between pages
- No global state management (Redux/Context) currently used

## Testing Approaches

### Manual Testing

**Image Analysis**:
1. Test with sample images (6 pre-loaded samples)
2. Verify JSON structure from OpenAI
3. Check product recommendations match structure
4. Verify links work

**Voice Conversation**:
1. Test microphone permissions
2. Verify WebSocket connection
3. Test conversation flow (user speaks → AI responds)
4. Check conversation history updates
5. Verify audio playback quality

### Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Test microphone permissions carefully

## Deployment Notes

### Frontend Deployment (Vite)

```bash
npm run build
# Outputs to /dist directory
# Serve with static file server
```

**Environment Variables**: Must be set with `VITE_` prefix for Vite to embed them

### Backend Voice Service

- Deployed on Railway: [doka-voice-production.up.railway.app](https://doka-voice-production.up.railway.app)
- Repository: `doka-voice-bun.ts` (standalone Bun WebSocket server)
- Requires `DEEPGRAM_KEY` environment variable
- Uses Bun runtime for WebSocket handling

## Troubleshooting

### Common Issues

**"Microphone access denied"**:
- Check browser permissions
- HTTPS required for production (WebRTC security)

**Voice WebSocket disconnects**:
- Check `VITE_WS_URL` is correct
- Verify backend service is running
- Check browser console for WebSocket errors

**No product recommendations**:
- Verify OpenAI API key is valid
- Check image is construction-related
- Review OpenAI API response in network tab

**Audio playback issues**:
- Verify Web Audio API support
- Check sample rate conversion (24kHz playback)
- Ensure audio chunks are properly buffered

## Future Enhancement Ideas

- Save conversation history to database
- Export recommendations as PDF
- Multi-language support
- Mobile app (React Native)
- Integration with Doka CRM
- Offline mode with local LLM
- Voice commands for image upload
- Comparison view for multiple projects
