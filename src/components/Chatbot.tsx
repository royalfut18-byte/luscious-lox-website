import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone, MapPin, Clock, Scissors, CalendarCheck } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE = "Hi, I'm the Luscious Lox assistant. I can help with extensions, services, bookings, pricing guidance, hours and location.";

const QUICK_BUTTONS: Array<{ label: string; icon: typeof MessageCircle; message?: string; href?: string }> = [
  { label: 'Book consultation', icon: CalendarCheck, message: 'How do I book a consultation?' },
  { label: 'Hair extensions', icon: Scissors, message: 'Tell me about your hair extension services' },
  { label: 'Opening hours', icon: Clock, message: 'What are your opening hours?' },
  { label: 'Location', icon: MapPin, message: 'Where is your salon located?' },
  { label: 'Call salon', icon: Phone, href: 'tel:+61418865734' },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'assistant', content: WELCOME_MESSAGE },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showQuickButtons, setShowQuickButtons] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    setError(null);
    setShowQuickButtons(false);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
    };

    const updatedMessages = [...messages.filter(m => m.id !== 'welcome'), userMessage];
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message,
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQuickButton = (message: string) => {
    sendMessage(message);
  };

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-espresso text-cream shadow-[0_8px_30px_rgba(28,18,16,0.3)] hover:shadow-[0_12px_40px_rgba(28,18,16,0.4)] hover:scale-105 transition-all duration-300 flex items-center justify-center group"
            aria-label="Open chat"
          >
            <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-muted-gold rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] sm:w-[380px] h-[min(600px,calc(100dvh-6rem))] bg-cream rounded-[1.5rem] shadow-luxury border border-champagne/30 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 bg-espresso text-cream rounded-t-[1.5rem]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-muted-gold/20 border border-muted-gold/30 flex items-center justify-center">
                  <span className="font-heading text-sm italic text-muted-gold">L</span>
                </div>
                <div>
                  <h3 className="font-heading text-sm font-medium">Luscious Lox</h3>
                  <p className="text-[10px] text-cream/50 font-body">Hair Extension Specialists</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13px] font-body leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-espresso text-cream rounded-br-md'
                        : 'bg-white text-espresso border border-champagne/30 rounded-bl-md shadow-soft'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Quick action buttons */}
              {showQuickButtons && messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_BUTTONS.map((btn) =>
                    btn.href ? (
                      <a
                        key={btn.label}
                        href={btn.href}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-champagne/40 text-[11px] font-body font-medium text-espresso hover:border-muted-gold/40 hover:shadow-soft transition-all duration-200"
                      >
                        <btn.icon size={12} className="text-muted-gold" />
                        {btn.label}
                      </a>
                    ) : (
                      <button
                        key={btn.label}
                        onClick={() => handleQuickButton(btn.message!)}
                        className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white border border-champagne/40 text-[11px] font-body font-medium text-espresso hover:border-muted-gold/40 hover:shadow-soft transition-all duration-200"
                      >
                        <btn.icon size={12} className="text-muted-gold" />
                        {btn.label}
                      </button>
                    )
                  )}
                </div>
              )}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-white border border-champagne/30 shadow-soft">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-muted-gold/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-gold/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 rounded-full bg-muted-gold/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] px-4 py-2.5 rounded-2xl rounded-bl-md bg-rose-tint text-warm-gray border border-rose-200 text-[12px] font-body">
                    {error}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <form onSubmit={handleSubmit} className="px-4 py-3 border-t border-champagne/20 bg-white/50">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about extensions, hours, bookings..."
                  disabled={isLoading}
                  maxLength={1000}
                  className="flex-1 px-4 py-2.5 rounded-full bg-white border border-champagne/40 text-[13px] font-body text-espresso placeholder:text-warm-gray/40 focus:outline-none focus:border-muted-gold/50 focus:ring-1 focus:ring-muted-gold/20 disabled:opacity-50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 rounded-full bg-espresso text-cream flex items-center justify-center hover:bg-espresso/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 flex-shrink-0"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-center text-[9px] text-warm-gray/40 font-body mt-2">
                AI assistant - for detailed enquiries call 0418 865 734
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
