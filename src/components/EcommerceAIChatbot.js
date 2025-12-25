import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, ShoppingBag, RefreshCw, Package, MessageSquare, X, Minimize2, Maximize2 } from 'lucide-react';

const EcommerceAIChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 // const [userId] = useState('user_' + Math.random().toString(36).substr(2, 9));
  const [tenantId] = useState('tenant_demo');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        id: 1,
        text: "Hello! I'm your AI market.vrksatechnology.com customer service assistant. I can help you with:\n\n• Order tracking\n• Refund requests\n• Product inquiries\n• Returns & exchanges\n• General support\n\nHow can I assist you today?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }]);
    }
  }, [isOpen]);

  const quickActions = [
    { label: 'Track Order', icon: Package, action: 'track' },
    { label: 'Request Refund', icon: RefreshCw, action: 'refund' },
    { label: 'Product Help', icon: ShoppingBag, action: 'product' },
  ];

  const handleQuickAction = (action) => {
    let message = '';
    switch(action) {
      case 'track':
        message = 'I need to track my order';
        break;
      case 'refund':
        message = 'I want to request a refund';
        break;
      case 'product':
        message = 'I have a question about a product';
        break;
    }
    handleSendMessage(message);
  };

  const callAIAPI = async (userMessage) => {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: `You are a helpful e-commerce customer service AI assistant for tenant: ${tenantId}. 
You help customers with:
- Order tracking (provide order status, shipping info)
- Refund requests (process refunds, explain policies)
- Product inquiries (answer questions about products)
- Returns and exchanges (guide through the process)

Guidelines:
- Be friendly, professional, and empathetic
- Ask for order numbers when needed (format: ORD-XXXXX)
- For refunds, ask for reason and order details
- Provide clear, concise responses
- If you need to escalate, offer to connect to human agent

Keep responses under 150 words unless detailed explanation is needed.`,
          messages: [
            { role: 'user', content: userMessage }
          ]
        })
      });

      const data = await response.json();
      return data.content[0].text;
    } catch (error) {
      console.error('AI API Error:', error);
      return "I am upgrading .Please Register and login to our services. Please try again or contact our support team support@vrksatechnology.in or contact 9566192356 directly.";
    }
  };

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call to backend
    setTimeout(async () => {
      const aiResponse = await callAIAPI(messageText);
      
      const botMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-yellow-600 hover:bg-yellow-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 z-50"
      >
        <MessageSquare size={28} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white rounded-lg shadow-2xl z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-80 h-[350px]'
    } flex flex-col`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-full p-2">
            <Bot className="text-yellow-600" size={24} />
          </div>
          <div>
            <h3 className="font-semibold">AI market.vrksatechnology.com Customer Support</h3>
            <p className="text-xs text-yellow-100">Online • Instant replies</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-yellow-500 p-1 rounded transition-colors"
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-yellow-500 p-1 rounded transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Quick Actions */}
          <div className="bg-gray-50 p-3 border-b flex gap-2 overflow-x-auto">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickAction(action.action)}
                className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg text-sm hover:bg-yellow-50 hover:text-yellow-600 transition-colors whitespace-nowrap border border-gray-200"
              >
                <action.icon size={16} />
                {action.label}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.sender === 'user' ? 'bg-yellow-600' : 'bg-gray-300'
                }`}>
                  {msg.sender === 'user' ? (
                    <User size={18} className="text-white" />
                  ) : (
                    <Bot size={18} className="text-gray-700" />
                  )}
                </div>
                <div className={`flex-1 ${msg.sender === 'user' ? 'flex justify-end' : ''}`}>
                  <div className={`inline-block max-w-[85%] p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-yellow-600 text-white rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-yellow-100' : 'text-gray-400'
                    }`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  <Bot size={18} className="text-gray-700" />
                </div>
                <div className="bg-white p-3 rounded-lg rounded-tl-none border border-gray-200">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={isLoading || !input.trim()}
                className="bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
              >
                <Send size={20} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2 text-center">
             {/* Powered by AI • Tenant: {tenantId}  */}
               Powered by AI vrksatechnology.com
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default EcommerceAIChatbot;
