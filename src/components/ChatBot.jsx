import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { MessageSquare, X } from 'lucide-react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi there! Need help with your presentation?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages(prev => [...prev, { from: 'user', text: trimmed }]);
    setInput('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/chatbot', { message: trimmed }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(prev => [...prev, { from: 'bot', text: res.data.reply }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        from: 'bot',
        text: 'Something went wrong. Try again later.',
      }]);
    }

    setLoading(false);
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-white border border-gray-200 rounded-xl shadow-2xl flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center bg-blue-600 text-white p-3 rounded-t-xl">
            <h4 className="font-semibold text-sm">AI Assistant</h4>
            <button onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></button>
          </div>

          {/* Chat Messages */}
          <div ref={chatRef} className="p-3 h-64 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`px-3 py-2 rounded-lg whitespace-pre-line ${msg.from === 'user' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && <p className="text-xs text-gray-500">Typing...</p>}
          </div>

          {/* Input Area */}
          <div className="flex border-t border-gray-100">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
              className="flex-1 p-2 text-sm outline-none"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="text-blue-600 px-4 font-medium text-sm disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
