'use client';
import React, { useState } from 'react';
import { FaQuestionCircle, FaGithub, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const Navbar = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      text: '👋 Hi! I’m your AI assistant. Here’s how I can help:\n• Get instant reviews of your code.\n• Highlight errors and best practices.\n• Chat with me for coding help! 💻✨',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage() {
    if (!chatInput.trim()) return;

    const userMessage = { role: 'user', text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    try {
      // ✅ Same endpoint for chat and review
      const response = await axios.post('http://localhost:3000/ai/get-review', {
        code: chatInput,
      });
      const reply =
        response.data?.reply || 'I am still learning, please try again later.';
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: reply },
      ]);
    } catch (error) {
      console.error(error);
      setChatMessages((prev) => [
        ...prev,
        { role: 'assistant', text: '⚠️ Error getting reply. Try again.' },
      ]);
    }

    setIsLoading(false);
  }

  return (
    <nav className="relative flex flex-col justify-center p-4 bg-[#0a0f1a] text-gray-100">
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="bg-[url('https://www.transparenttextures.com/patterns/circuit.png')] 
                      opacity-10 w-full h-full"
        />
      </div>

      <div className="flex items-center justify-between z-10">
        <div className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-cyan-400 flex items-center space-x-1">
              <span role="img" aria-label="AI Icon"><img className="w-8 h-8 object-contain" src="/public/CodeForge_AI.png" alt="" /></span> 
              <span>CodeForge AI</span>
            </span>
          </div>
          <span className="text-sm text-gray-500">Instant AI Code Reviews</span>
        </div>

        <div className="flex items-center space-x-4 text-gray-300">
          <button
            onClick={() => setShowHelp(!showHelp)}
            title="Help"
            className="hover:text-cyan-400 transition p-2 rounded-full"
          >
            <FaQuestionCircle />
          </button>
          
          <a
            href="https://github.com/anksindia"
            target="_blank"
            rel="noopener noreferrer"
            title="View Source"
            className="hover:text-cyan-400 transition p-2 rounded-full"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="absolute right-4 top-16 w-80 rounded-xl bg-gray-800 p-4 shadow-lg z-20 flex flex-col space-y-3 border border-gray-700"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="flex justify-between items-center">
              <span className="text-cyan-300 font-bold">CodeForge Assistant</span>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-400 hover:text-gray-100"
              >
                <FaTimes />
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-3 p-1">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[80%] rounded-xl p-3 text-sm ${
                    msg.role === 'assistant'
                      ? 'bg-cyan-700 text-gray-100 self-start rounded-bl-none'
                      : 'bg-gray-600 text-gray-100 self-end rounded-br-none'
                  }`}
                  style={{
                    alignSelf: msg.role === 'assistant' ? 'flex-start' : 'flex-end',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {msg.text}
                </div>
              ))}
              {isLoading && (
                <div className="text-cyan-300 text-sm animate-pulse">Typing…</div>
              )}
            </div>

            <div className="flex space-x-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded p-2 text-sm bg-gray-700 text-gray-100 focus:outline-none"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading}
                className="bg-cyan-500 text-gray-900 rounded p-2 font-bold hover:bg-cyan-400 disabled:opacity-50"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
