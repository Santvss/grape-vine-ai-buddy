import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Bot, 
  Send, 
  User,
  Grape,
  Lightbulb,
  AlertCircle,
  Leaf,
  Droplets,
  Bug
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  category?: 'general' | 'disease' | 'irrigation' | 'pest' | 'nutrition' | 'pruning';
}

export const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "Hello! I'm your vineyard AI assistant. I can help you with grape cultivation, disease identification, irrigation planning, pest management, and general viticulture questions. How can I assist you today?",
      timestamp: new Date(Date.now() - 300000),
      category: 'general'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): { content: string; category: Message['category'] } => {
    const message = userMessage.toLowerCase();
    
    // Disease-related queries
    if (message.includes('disease') || message.includes('mildew') || message.includes('rot') || message.includes('fungus')) {
      return {
        content: "For grape diseases, here are key preventive measures:\n\n• **Powdery Mildew**: Apply sulfur-based fungicides during humid conditions. Ensure good air circulation.\n• **Downy Mildew**: Use copper-based treatments and avoid overhead watering.\n• **Black Rot**: Remove infected berries immediately and improve canopy management.\n• **Botrytis**: Reduce humidity around clusters and maintain proper spacing.\n\nWould you like specific treatment recommendations for any particular disease symptoms you're observing?",
        category: 'disease'
      };
    }
    
    // Irrigation queries
    if (message.includes('water') || message.includes('irrigation') || message.includes('drought')) {
      return {
        content: "For optimal grape irrigation:\n\n• **Timing**: Water early morning to reduce evaporation and disease risk\n• **Frequency**: Deep, infrequent watering promotes strong root development\n• **Amount**: 1-2 inches per week during growing season\n• **Soil Test**: Check moisture at 12-18 inches depth\n• **Critical Periods**: Increase during fruit set and veraison\n\n**Drought Stress Signs**: Wilting leaves, reduced berry size, early leaf drop. Consider deficit irrigation techniques for wine grapes to concentrate flavors.",
        category: 'irrigation'
      };
    }
    
    // Pest management
    if (message.includes('pest') || message.includes('insect') || message.includes('aphid') || message.includes('mite')) {
      return {
        content: "Common grape pests and management:\n\n• **Grape Phylloxera**: Use resistant rootstocks, monitor for galls on roots\n• **Spider Mites**: Increase humidity, use predatory mites, avoid broad-spectrum pesticides\n• **Aphids**: Encourage beneficial insects, use horticultural oils\n• **Thrips**: Yellow sticky traps, maintain weed-free vineyard edges\n• **Japanese Beetles**: Hand-picking, pheromone traps away from vines\n\n**IPM Approach**: Monitor weekly, use beneficial insects, targeted treatments only when thresholds are exceeded.",
        category: 'pest'
      };
    }
    
    // Pruning queries
    if (message.includes('prun') || message.includes('trim') || message.includes('cut')) {
      return {
        content: "Grape pruning guidelines:\n\n**Winter Pruning (Dormant Season)**:\n• Remove 90% of previous year's growth\n• Keep strongest canes with good bud spacing\n• Maintain 2-4 main canes per vine\n• Cut just above outward-facing buds\n\n**Summer Pruning**:\n• Remove suckers and water sprouts\n• Thin shoots to improve air circulation\n• Remove leaves around fruit clusters (after fruit set)\n\n**Tools**: Use sharp, clean pruning shears. Disinfect between vines to prevent disease spread.",
        category: 'pruning'
      };
    }
    
    // Nutrition queries
    if (message.includes('fertiliz') || message.includes('nutrition') || message.includes('soil') || message.includes('nutrient')) {
      return {
        content: "Grape nutrition essentials:\n\n**Soil Testing**: Annual tests for pH (6.0-7.0 ideal), nutrients, organic matter\n\n**Key Nutrients**:\n• **Nitrogen**: Moderate levels, avoid excess (promotes vegetative growth over fruit)\n• **Phosphorus**: Important for root development and flowering\n• **Potassium**: Critical for fruit quality and cold hardiness\n• **Magnesium**: Essential for photosynthesis\n\n**Timing**: Apply fertilizers in early spring before bud break. Avoid late-season nitrogen to promote dormancy.\n\n**Organic Options**: Compost, aged manure, cover crops (legumes for nitrogen)",
        category: 'nutrition'
      };
    }
    
    // General viticulture
    return {
      content: "I can help with various aspects of grape growing:\n\n• **Disease Management**: Prevention and treatment of common grape diseases\n• **Irrigation Planning**: Water management strategies for optimal fruit quality\n• **Pest Control**: Integrated pest management approaches\n• **Pruning Techniques**: Seasonal pruning for vine health and productivity\n• **Soil & Nutrition**: Fertilization and soil health management\n• **Harvest Timing**: Determining optimal harvest dates\n\nWhat specific aspect would you like to explore? Feel free to describe any symptoms or challenges you're experiencing in your vineyard.",
      category: 'general'
    };
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputMessage);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        category: response.category
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'disease': return AlertCircle;
      case 'irrigation': return Droplets;
      case 'pest': return Bug;
      case 'nutrition': return Leaf;
      case 'pruning': return Grape;
      default: return Lightbulb;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'disease': return 'bg-destructive/10 text-destructive';
      case 'irrigation': return 'bg-sky/10 text-sky';
      case 'pest': return 'bg-harvest/10 text-harvest';
      case 'nutrition': return 'bg-forest/10 text-forest';
      case 'pruning': return 'bg-grape/10 text-grape';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const quickQuestions = [
    "How do I identify powdery mildew?",
    "When should I water my vines?",
    "What are signs of nutrient deficiency?",
    "How do I prune young vines?",
    "Best practices for pest prevention?"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">AI Vineyard Assistant</h2>
          <p className="text-muted-foreground">Get expert advice for your grape cultivation questions</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-forest rounded-full animate-pulse"></div>
          <span className="text-sm text-muted-foreground">AI Online</span>
        </div>
      </div>

      {/* Quick Questions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="text-lg">Quick Questions</CardTitle>
          <CardDescription>Click on any question to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(question)}
                className="text-sm"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="shadow-farm">
        <CardContent className="p-0">
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => {
              const IconComponent = message.type === 'user' ? User : getCategoryIcon(message.category);
              
              return (
                <div
                  key={message.id}
                  className={`flex space-x-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.type === 'assistant' && (
                    <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  
                  <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === 'user'
                          ? 'bg-primary text-primary-foreground ml-auto'
                          : 'bg-muted'
                      }`}
                    >
                      {message.type === 'assistant' && message.category && (
                        <div className="flex items-center space-x-2 mb-2">
                          <IconComponent className="w-4 h-4" />
                          <Badge variant="secondary" className={getCategoryColor(message.category)}>
                            {message.category}
                          </Badge>
                        </div>
                      )}
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                    </div>
                    <div className={`text-xs text-muted-foreground mt-1 ${
                      message.type === 'user' ? 'text-right' : 'text-left'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                  
                  {message.type === 'user' && (
                    <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-secondary-foreground" />
                    </div>
                  )}
                </div>
              );
            })}
            
            {isTyping && (
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-grape rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-grape rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-grape rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about grape growing, diseases, irrigation, pests..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-primary hover:opacity-90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Press Enter to send • This AI assistant provides general guidance. Always consult local agricultural experts for specific issues.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};