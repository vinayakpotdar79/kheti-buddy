import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { sendChatMessage } from '../services/api';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Namaste! I am Kheti Buddy AI. How can I help you with your farming today?"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Create history including the new message
      const history = [...messages, userMessage].map(({ role, content }) => ({ role, content }));
      
      const response = await sendChatMessage(history);
      
      if (response && response.success) {
        setMessages((prev) => [...prev, { role: 'assistant', content: response.message }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev, 
        { role: 'assistant', content: "I'm having trouble connecting right now. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <div className="chatbot-status"></div>
              <div className="chatbot-title-text flex items-center gap-2">
                <Bot size={20} className="text-emerald-400" />
                Kheti Buddy AI
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} className="text-emerald-100/50" />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`message ${msg.role === 'user' ? 'message-user' : 'message-ai'}`}
              >
                <div className="flex items-start gap-2">
                  {msg.role === 'assistant' && <Bot size={16} className="mt-1 flex-shrink-0" />}
                  <div className="whitespace-pre-line">{msg.content}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message message-ai flex items-center gap-2">
                <Sparkles size={16} className="animate-pulse text-emerald-400" />
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-container">
            <form onSubmit={handleSubmit} className="chatbot-form">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about farming..."
                className="chatbot-input"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || loading}
                className="chatbot-send-btn"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="chatbot-button group"
        >
          <MessageSquare size={24} className="group-hover:hidden" />
          <Sparkles size={24} className="hidden group-hover:block animate-pulse" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
