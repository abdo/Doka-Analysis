import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeepgramVoice } from '../hooks/useDeepgramVoice';
import { useAudioRecorder } from '../hooks/useAudioRecorder';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

// Doka avatar/logo representation
const DOKA_EXPERT_AVATAR = "https://i.pravatar.cc/300?img=23";

export function ConversationPage() {
  const navigate = useNavigate();
  const conversationEndRef = useRef<HTMLDivElement>(null);
  
  const { playAudio, stop, isPlaying } = useAudioPlayer();
  const { startRecording, stopRecording, isRecording } = useAudioRecorder();
  const { 
    connect, 
    disconnect, 
    sendAudio, 
    isConnected,
    userTranscript,
    agentResponse,
    conversationHistory,
    error 
  } = useDeepgramVoice(playAudio);

  // Determine current state
  const getState = () => {
    if (isPlaying) return 'speaking';
    if (isRecording) return 'listening';
    return 'idle';
  };

  const state = getState();

  const handleEnd = () => {
    stopRecording();
    stop();
    disconnect();
    navigate('/');
  };

  // Auto-scroll to newest message
  useEffect(() => {
    if (conversationEndRef.current) {
      conversationEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversationHistory]);

  // Auto-start call when page loads
  useEffect(() => {
    const startCall = async () => {
      connect();
      
      // Wait for connection then start recording
      setTimeout(async () => {
        await startRecording((audioData) => {
          sendAudio(audioData);
        });
      }, 1000);
    };

    startCall();

    // Cleanup on unmount
    return () => {
      stopRecording();
      stop();
      disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-doka-blue transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            <span className="font-semibold">Back</span>
          </button>
          <h1 className="text-xl font-bold text-doka-blue">Talk to Expert</h1>
          <div className="w-20"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8 max-w-7xl">
        {/* Avatar Section */}
        <div className="lg:w-1/3 flex flex-col items-center justify-start">
          <div className="sticky top-8">
            <div className="relative">
              {/* Animated ring based on state */}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                state === 'listening' ? 'ring-4 ring-blue-400 ring-offset-4 animate-pulse' :
                state === 'speaking' ? 'ring-4 ring-doka-yellow ring-offset-4 animate-pulse' :
                'ring-2 ring-gray-300 ring-offset-2'
              }`}></div>
              
              {/* Avatar */}
              <div className="relative w-48 h-48 rounded-full overflow-hidden bg-white shadow-2xl border-4 border-white">
                <img src={DOKA_EXPERT_AVATAR} alt="Doka Expert" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Status Info */}
            <div className="mt-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Doka Expert</h2>
              <p className={`text-sm font-semibold ${
                !isConnected ? 'text-gray-500' :
                state === 'listening' ? 'text-blue-600' :
                state === 'speaking' ? 'text-doka-yellow' :
                'text-gray-600'
              }`}>
                {!isConnected && "Connecting..."}
                {isConnected && state === 'listening' && "🎤 Listening..."}
                {isConnected && state === 'speaking' && "🔊 Speaking..."}
                {isConnected && state === 'idle' && "Ready"}
              </p>
            </div>

            {/* Controls */}
            <div className="mt-8 space-y-3">
              <button
                onClick={handleEnd}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>End Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* Conversation History */}
        <div className="lg:w-2/3 flex flex-col">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 flex flex-col h-[600px]">
            {/* Conversation Header */}
            <div className="bg-gradient-to-r from-doka-blue to-blue-700 text-white px-6 py-4 rounded-t-2xl">
              <h3 className="text-lg font-bold">Conversation</h3>
              <p className="text-sm text-blue-100">Ask about formwork solutions for your project</p>
            </div>

            {/* Messages Area */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {conversationHistory.length === 0 && (
                <div className="text-center text-gray-400 py-12">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-16 h-16 mx-auto mb-4 opacity-50">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                  <p className="text-lg font-semibold">Start speaking to begin...</p>
                </div>
              )}

              {conversationHistory.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-doka-blue text-white rounded-br-none'
                      : 'bg-gray-100 text-gray-800 rounded-bl-none'
                  }`}>
                    <p className="text-xs font-semibold mb-1 opacity-75">
                      {message.role === 'user' ? 'You' : 'Doka Expert'}
                    </p>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Current transcripts (live) */}
              {userTranscript && !conversationHistory.find(m => m.role === 'user' && m.content === userTranscript) && (
                <div className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-doka-blue/70 text-white rounded-br-none animate-pulse">
                    <p className="text-xs font-semibold mb-1 opacity-75">You (speaking...)</p>
                    <p className="text-sm leading-relaxed">{userTranscript}</p>
                  </div>
                </div>
              )}

              {agentResponse && !conversationHistory.find(m => m.role === 'agent' && m.content === agentResponse) && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] rounded-2xl px-4 py-3 bg-gray-100/70 text-gray-800 rounded-bl-none animate-pulse">
                    <p className="text-xs font-semibold mb-1 opacity-75">Doka Expert (speaking...)</p>
                    <p className="text-sm leading-relaxed">{agentResponse}</p>
                  </div>
                </div>
              )}

              <div ref={conversationEndRef} />
            </div>

            {/* Error Display */}
            {error && (
              <div className="mx-6 mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-sm text-red-700 font-semibold">Error: {error}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
