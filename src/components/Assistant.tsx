import { useState, useEffect, useRef } from 'react';
import { Sparkles, Trash2, Maximize2, Minimize2, X, ArrowUp, Paperclip, Mic } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface AssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Assistant({ isOpen, onClose }: AssistantProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Math.random().toString(36).substr(2, 9),
      sender: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate assistant reply
    setTimeout(() => {
      let replyText = '';
      const query = text.toLowerCase().trim();

      if (query.includes('about') || query.includes('who are you') || query.includes('who is')) {
        replyText =
          "I am an AI Assistant showcasing Debanjan Bera's work. Debanjan is a passionate Full-Stack & AI Developer focused on turning ideas into thoughtful products — from engaging interfaces to powerful backends and intelligent agentic workflows.";
      } else if (query.includes('skill') || query.includes('expertise') || query.includes('tech') || query.includes('what can you do')) {
        replyText =
          "Debanjan's expertise includes Frontend development (React, Next.js, TypeScript, Tailwind CSS, GSAP for smooth animations), Backend development (Node.js, Express, databases), and AI/LLM integration (building customized agents and automation scripts).";
      } else if (query.includes('experience') || query.includes('work') || query.includes('job') || query.includes('resume')) {
        replyText =
          "Debanjan has a rich history of building products. He specializes in creating scalable web applications, fine-tuning user experiences, and deploying AI solutions to automate complex business workflows. Check out his projects page to see detailed case studies!";
      } else if (query.includes('contact') || query.includes('email') || query.includes('reach') || query.includes('hire')) {
        replyText =
          "You can reach Debanjan at contact@debanjan.com, or use the Contact form on this page! He is always open to exciting freelance projects, collaborations, and full-time opportunities.";
      } else if (query.includes('project') || query.includes('portfolio') || query.includes('work')) {
        replyText =
          "You can view Debanjan's featured projects in the 'Projects' section of this website. They range from custom web platforms to specialized automation setups and interactive UIs.";
      } else if (query.includes('hello') || query.includes('hi') || query.includes('hey')) {
        replyText = "Hello! I am Debanjan's portfolio assistant. How can I help you learn more about his background, skills, or projects today?";
      } else {
        replyText =
          "That's an interesting question! I am a portfolio guide. You can ask me about Debanjan's skills, professional experience, projects, or how to get in touch with him.";
      }

      const assistantMsg: Message = {
        id: Math.random().toString(36).substr(2, 9),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleClearChat = () => {
    setMessages([]);
  };

  const presets = [
    { label: 'About Me', desc: 'Who are you?', query: 'Tell me about yourself' },
    { label: 'Skills & Expertise', desc: 'View your core skills', query: 'What are your skills & expertise?' },
    { label: 'Work Experience', desc: 'See past experience', query: 'Tell me about your work experience' },
  ];

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setIsFullscreen(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed z-50 bg-surface border border-border-subtle shadow-2xl flex flex-col transition-all duration-300 ease-standard overflow-hidden font-sans origin-bottom-right
        ${
          isFullscreen
            ? 'top-4 bottom-4 left-4 right-4 md:top-8 md:bottom-8 md:left-24 md:right-24 rounded-2xl'
            : 'inset-0 w-full h-full max-h-full rounded-none border-none sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[400px] sm:h-[800px] sm:max-h-[calc(100vh-120px)] sm:rounded-2xl sm:border'
        }
        ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto visible'
            : 'opacity-0 scale-80 pointer-events-none invisible'
        }
      `}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-subtle bg-surface-elevated select-none">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center ">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-semibold text-text-primary flex items-center gap-1.5 leading-none">
              Assistant

            <span className="text-text-secondary font-medium">built by Debanjan</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-text-secondary">
          <button
            onClick={handleClearChat}
            className="p-1.5 hover:text-text-primary hover:bg-white/5 rounded-md transition-colors"
            title="Clear Chat"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 hover:text-text-primary hover:bg-white/5 rounded-md transition-colors hidden sm:block"
            title={isFullscreen ? 'Minimize' : 'Maximize'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 hover:text-text-primary hover:bg-white/5 rounded-md transition-colors"
            title="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar  flex flex-col">
        {messages.length === 0 ? (
          <div className="flex-1 flex flex-col justify-center space-y-8 select-none animate-fade-in py-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-text-primary tracking-tight leading-tight flex items-center gap-2">
                Hello there! <span className="inline-block animate-wave origin-[70%_70%]">👋</span>
              </h2>
              <p className="text-lg text-text-secondary font-medium">
                How can I help you today?
              </p>
            </div>

            <div className="space-y-3 pt-10">
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleSendMessage(preset.query)}
                  className="w-full text-left p-3 bg-surface-elevated hover:bg-white/5 border border-border-subtle rounded-2xl flex flex-col gap-0.5 hover:border-white/20 transition-all group cursor-pointer"
                >
                  <span className="text-sm font-semibold text-text-primary group-hover:text-white transition-colors">
                    {preset.label} <span className="text-xs text-text-secondary ml-1">{preset.desc}</span>
                  </span>
                  {/* <span className="text-xs text-text-secondary">{preset.desc}</span> */}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 flex-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-normal ${
                    msg.sender === 'user'
                      ? 'bg-white overflow-hidden text-black rounded-tr-sm font-semibold'
                      : 'bg-surface-elevated text-text-primary border border-border-subtle rounded-tl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-surface-elevated text-text-primary border border-border-subtle rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                  <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputText);
        }}
        className="p-4 border-t border-border-subtle bg-surface-elevated"
      >
        <div className="flex flex-col bg-bg border border-border-subtle rounded-3xl p-3 px-4 focus-within:border-white/20 transition-colors">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(inputText);
              }
            }}
            placeholder="Send a message... (type / for commands)"
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none resize-none h-14 custom-scrollbar"
          />
          <div className="flex items-center justify-between mt-1">
            <div className="flex items-center gap-3 text-text-secondary">
              <button
                type="button"
                className="p-1 hover:text-text-primary rounded hover:bg-white/5 transition-colors cursor-pointer"
                title="Attach file (disabled)"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-1 hover:text-text-primary rounded hover:bg-white/5 transition-colors cursor-pointer"
                title="Use voice input (disabled)"
              >
                <Mic className="w-4 h-4" />
              </button>
              <div 
                className="w-5 h-5 rounded-full border-2 border-text-muted/40 cursor-pointer hover:border-text-primary/45 transition-colors" 
                title="Circle status icon"
              />
            </div>
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-20 disabled:scale-100 disabled:pointer-events-none transition-all cursor-pointer"
              title="Send"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
