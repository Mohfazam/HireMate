import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Bot, Loader2, MessageSquare, Brain, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { mockJobs } from '../../assets/mockData';

const genAI = new GoogleGenerativeAI('AIzaSyCpjHkojeQ3BhzbyEKssnRCo9Jo7X89KjU');

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const AIAssistantTab: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generatePrompt = (userInput: string) => {
    return `You are an AI recruiting assistant with access to the following job data:
${JSON.stringify(mockJobs, null, 2)}

Please help the recruiter with their question. Only answer questions related to recruiting, job postings, and candidates.
If the question is not related to recruiting or the available data, politely decline to answer.

User question: ${userInput}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = generatePrompt(userMessage);
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="flex-1 p-4 flex flex-col h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center">
              <Bot className="text-zinc-900" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-zinc-100">AI Recruiting Assistant</h2>
              <p className="text-sm text-zinc-400">Powered by Gemini</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-800/50">
              <Brain size={16} className="text-cyan-400" />
              <span className="text-sm text-zinc-300">AI Ready</span>
            </div>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center flex-col gap-4 text-center p-8">
            <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4">
              <MessageSquare className="text-zinc-400" size={32} />
            </div>
            <h3 className="text-xl font-medium text-zinc-200">Ask me anything about recruiting</h3>
            <p className="text-zinc-400 max-w-md">
              I can help you analyze job postings, candidate profiles, and provide insights about your recruitment process.
            </p>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {[
                "Show me the best candidates for the Senior React position",
                "What's the average experience level of our candidates?",
                "Compare the skill requirements across all positions",
                "Analyze the candidate pipeline for Frontend roles"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  className="p-3 text-sm text-left rounded-xl bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800 transition-colors flex items-center gap-2"
                  onClick={() => setInput(suggestion)}
                >
                  <Sparkles size={14} className="text-cyan-400" />
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-auto mb-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] rounded-xl p-4 ${
                    message.role === 'assistant'
                      ? 'bg-zinc-800/50 text-zinc-100'
                      : 'bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-zinc-100'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about recruiting, candidates, or job postings..."
            className="w-full bg-zinc-800/50 text-zinc-100 rounded-xl py-3 pl-4 pr-12 outline-none focus:ring-2 focus:ring-cyan-500/50"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center text-zinc-900 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AIAssistantTab;