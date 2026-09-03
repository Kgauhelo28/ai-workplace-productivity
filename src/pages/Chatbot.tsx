import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, RotateCcw, User, Bot } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Disclaimer } from '@/components/ui/Disclaimer';
import { Loader } from '@/components/ui/Loader';
import { generateChatResponse, generateWelcomeMessage, type ChatMessage } from '@/lib/ai/chatbot';

const suggestedPrompts = [
  'How do I write a professional email?',
  'Tips for effective meeting notes?',
  'How should I prioritize my tasks?',
  'Best practices for workplace research?',
];

function makeMessage(role: 'user' | 'assistant', content: string): ChatMessage {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: Date.now(),
  };
}

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    makeMessage('assistant', generateWelcomeMessage()),
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText || loading) return;

    const userMessage = makeMessage('user', messageText);
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = generateChatResponse(messageText, { messages: newMessages });
      setMessages((prev) => [...prev, makeMessage('assistant', response)]);
      setLoading(false);
    }, 900 + Math.random() * 600);
  };

  const handleReset = () => {
    setMessages([makeMessage('assistant', generateWelcomeMessage())]);
    setInput('');
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden flex flex-col" >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-gradient-to-r from-primary-50/50 to-accent-50/50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center shadow-sm">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success-500 ring-2 ring-white" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-slate-900 text-base">AI Assistant</h3>
              <p className="text-xs text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-success-500" />
                Online · Ready to help
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-slate-400 hover:bg-white hover:text-slate-600 transition-colors"
            title="Clear conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-4 min-h-[400px] max-h-[550px] bg-slate-50/30">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 animate-fade-in-up ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-slate-200 text-slate-600'
                    : 'bg-gradient-to-br from-primary-600 to-accent-600 text-white'
                }`}
              >
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-primary-600 text-white rounded-tr-sm'
                    : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-soft'
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="px-4 py-3 bg-white border border-slate-200 rounded-2xl rounded-tl-sm shadow-soft">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce-dot" />
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce-dot" style={{ animationDelay: '0.16s' }} />
                  <span className="w-2 h-2 bg-primary-500 rounded-full animate-bounce-dot" style={{ animationDelay: '0.32s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggested Prompts */}
        {messages.length <= 1 && (
          <div className="px-5 pb-3 flex flex-wrap gap-2">
            {suggestedPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-slate-200 text-slate-600 rounded-lg hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50/30 transition-all duration-200"
              >
                <Sparkles className="w-3 h-3" />
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-slate-100 bg-white">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about productivity..."
              rows={1}
              className="flex-1 px-4 py-2.5 text-sm text-slate-700 bg-slate-50 border border-slate-200 rounded-xl resize-none transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 focus:bg-white placeholder:text-slate-400 scrollbar-thin"
              style={{ maxHeight: '120px' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || loading}
              className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 active:bg-primary-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      <Disclaimer />
    </div>
  );
}
