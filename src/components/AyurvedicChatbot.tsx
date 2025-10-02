import { useState, useRef, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  MessageCircle, 
  Send, 
  Minimize2, 
  Maximize2, 
  X, 
  Bot, 
  User, 
  Flower2,
  Sparkles,
  Brain,
  Heart,
  Leaf,
  Star,
  Clock,
  AlertCircle
} from 'lucide-react';

interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const ayurvedicResponses = {
  greeting: [
    "🙏 Namaste! I'm your Ayurvedic nutrition assistant. How can I help you achieve better health through holistic nutrition today?",
    "🌸 Welcome to your personal Ayurveda guide! I'm here to help you understand the ancient science of life and nutrition.",
    "✨ Greetings! As your Ayurvedic wellness companion, I can guide you through personalized nutrition and lifestyle recommendations."
  ],
  dosha: {
    vata: "Vata dosha (air + space) governs movement and circulation. People with Vata constitution benefit from warm, cooked, grounding foods like rice, cooked vegetables, and healthy fats. Avoid cold, dry, and raw foods.",
    pitta: "Pitta dosha (fire + water) controls digestion and metabolism. Pitta types should eat cooling, sweet foods like coconut, cucumber, and leafy greens. Avoid spicy, acidic, and fried foods.",
    kapha: "Kapha dosha (earth + water) provides structure and immunity. Kapha constitution benefits from light, warm, spicy foods like ginger, turmeric, and steamed vegetables. Avoid heavy, cold, and oily foods."
  },
  nutrition: [
    "In Ayurveda, food is medicine. The six tastes (sweet, sour, salty, pungent, bitter, astringent) should be included in every meal to maintain doshic balance.",
    "Your digestive fire (Agni) is central to health. Eat your largest meal at midday when Agni is strongest, and have a light dinner before sunset.",
    "Choose foods according to your constitution (Prakriti) and current imbalances (Vikriti). Seasonal eating also helps maintain harmony with nature."
  ],
  lifestyle: [
    "Follow Dinacharya (daily routine): Wake before sunrise, practice yoga/meditation, eat meals at regular times, and sleep by 10 PM for optimal health.",
    "Practice mindful eating: Eat in a calm environment, chew thoroughly, avoid distractions, and express gratitude for your food.",
    "Stay hydrated with warm water throughout the day. Room temperature or warm water supports digestion better than cold water."
  ],
  herbs: [
    "Turmeric is excellent for reducing inflammation and supporting liver health. Add it to warm milk or cooking for daily benefits.",
    "Ginger aids digestion and circulation. Use fresh ginger tea before meals to stimulate Agni (digestive fire).",
    "Triphala is a gentle detoxifier that supports all three doshas. Take it at bedtime for digestive health and detoxification."
  ]
};

const quickSuggestions = [
  "What's my dosha type?",
  "Foods for better digestion",
  "Daily Ayurvedic routine",
  "Seasonal nutrition tips",
  "Balancing Vata dosha",
  "Cooling foods for Pitta",
  "Energizing foods for Kapha",
  "Ayurvedic spices benefits"
];

export function AyurvedicChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: '1',
        type: 'bot',
        content: ayurvedicResponses.greeting[0],
        timestamp: new Date(),
        suggestions: ['What is Ayurveda?', 'Tell me about doshas', 'Nutrition guidelines', 'Daily routine tips']
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const generateBotResponse = (userMessage: string): ChatMessage => {
    const message = userMessage.toLowerCase();
    let response = "";
    let suggestions: string[] = [];

    // Analyze user message and generate appropriate response
    if (message.includes('dosha') || message.includes('constitution')) {
      if (message.includes('vata')) {
        response = ayurvedicResponses.dosha.vata;
        suggestions = ['Vata diet plan', 'Vata balancing foods', 'Morning routine for Vata'];
      } else if (message.includes('pitta')) {
        response = ayurvedicResponses.dosha.pitta;
        suggestions = ['Pitta cooling foods', 'Summer diet for Pitta', 'Pitta lifestyle tips'];
      } else if (message.includes('kapha')) {
        response = ayurvedicResponses.dosha.kapha;
        suggestions = ['Kapha energizing foods', 'Spring detox for Kapha', 'Exercise for Kapha'];
      } else {
        response = "The three doshas are Vata (air+space), Pitta (fire+water), and Kapha (earth+water). Each person has a unique combination. Which dosha would you like to learn about?";
        suggestions = ['Tell me about Vata', 'Tell me about Pitta', 'Tell me about Kapha'];
      }
    } else if (message.includes('food') || message.includes('diet') || message.includes('nutrition')) {
      response = ayurvedicResponses.nutrition[Math.floor(Math.random() * ayurvedicResponses.nutrition.length)];
      suggestions = ['Six tastes explained', 'Best foods for my dosha', 'Ayurvedic meal timing'];
    } else if (message.includes('routine') || message.includes('lifestyle') || message.includes('dinacharya')) {
      response = ayurvedicResponses.lifestyle[Math.floor(Math.random() * ayurvedicResponses.lifestyle.length)];
      suggestions = ['Morning routine', 'Evening routine', 'Seasonal adjustments'];
    } else if (message.includes('herb') || message.includes('spice') || message.includes('turmeric') || message.includes('ginger')) {
      response = ayurvedicResponses.herbs[Math.floor(Math.random() * ayurvedicResponses.herbs.length)];
      suggestions = ['Common Ayurvedic herbs', 'Spice combinations', 'Herbal teas'];
    } else if (message.includes('hello') || message.includes('hi') || message.includes('namaste')) {
      response = ayurvedicResponses.greeting[Math.floor(Math.random() * ayurvedicResponses.greeting.length)];
      suggestions = quickSuggestions.slice(0, 4);
    } else if (message.includes('what is') || message.includes('explain')) {
      response = "🌿 Ayurveda is a 5,000-year-old system of natural healing from India. It focuses on preventing and treating illness through lifestyle practices, including proper diet, herbal remedies, and spiritual practices. The goal is to achieve balance between mind, body, and consciousness.";
      suggestions = ['Core principles', 'Benefits of Ayurveda', 'How to get started'];
    } else if (message.includes('agni') || message.includes('digest')) {
      response = "🔥 Agni (digestive fire) is crucial for good health. Strong Agni ensures proper digestion and prevents toxin formation. To strengthen Agni: eat warm, cooked foods; avoid cold drinks; use digestive spices like ginger and cumin; and eat your main meal at noon.";
      suggestions = ['Foods that boost Agni', 'Signs of weak Agni', 'Digestive spices'];
    } else if (message.includes('ama') || message.includes('toxin')) {
      response = "🚫 Ama (toxins) forms when Agni is weak and food isn't properly digested. Signs include white coating on tongue, fatigue, and joint stiffness. To reduce Ama: fast occasionally, drink warm water, use detoxifying spices, and eat light, easy-to-digest foods.";
      suggestions = ['Detox foods', 'Signs of Ama', 'Natural detox methods'];
    } else if (message.includes('season') || message.includes('weather')) {
      response = "🍂 Seasonal eating (Ritucharya) is essential in Ayurveda. Spring: light, detoxifying foods; Summer: cooling, hydrating foods; Monsoon: warm, dry foods; Winter: nourishing, warming foods. This helps maintain doshic balance throughout the year.";
      suggestions = ['Spring diet tips', 'Summer cooling foods', 'Winter warming foods'];
    } else {
      response = "🤔 I'd love to help you with that! I specialize in Ayurvedic nutrition, dosha balancing, daily routines, and wellness practices. Could you ask me something more specific about these topics?";
      suggestions = quickSuggestions.slice(0, 4);
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(content);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 hover:scale-110 group animate-pulse hover:animate-none"
        size="sm"
        title="Ask AyurBot - Your Ayurvedic Nutrition Assistant"
      >
        <div className="relative">
          <MessageCircle className="w-9 h-9 text-white group-hover:scale-110 transition-transform duration-200" />
          <Sparkles className="w-4 h-4 text-yellow-300 absolute -top-2 -right-2 animate-pulse" />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white flex items-center justify-center animate-bounce">
            <Flower2 className="w-3 h-3 text-green-800" />
          </div>
        </div>
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-96 bg-white dark:bg-gray-900 shadow-2xl border-0 z-50 transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-[600px]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-t-lg">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-full">
            <Flower2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium">AyurBot</h3>
            <p className="text-xs text-orange-100">Your Ayurvedic Guide</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 p-0 text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4 h-[400px]" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : 'order-2'}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground ml-4'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>

                    {/* Bot Suggestions */}
                    {message.type === 'bot' && message.suggestions && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-muted-foreground">Quick questions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs h-7 px-3 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-700"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 order-2">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t bg-muted/30">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Ayurveda, doshas, nutrition..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }
                }}
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                disabled={!inputValue.trim() || isTyping}
                size="sm"
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-1 mt-3">
              {quickSuggestions.slice(0, 3).map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="text-xs h-6 px-2 text-muted-foreground hover:text-foreground"
                  disabled={isTyping}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  );
}