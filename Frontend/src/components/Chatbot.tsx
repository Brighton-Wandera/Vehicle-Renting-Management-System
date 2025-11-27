import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Mic, MicOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm VeloRent Assistant. How can I help you with your vehicle rental needs today?",
            sender: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const [usedVoiceInput, setUsedVoiceInput] = useState(false);
    const [continuousVoiceMode, setContinuousVoiceMode] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const autoSendRef = useRef(false);

    // Initialize speech recognition
    useEffect(() => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInputText(transcript);
                setUsedVoiceInput(true);

                // Mark that we should auto-send
                autoSendRef.current = true;
            };

            recognitionRef.current.onerror = (event: any) => {
                if (event.error !== 'no-speech' && event.error !== 'aborted') {
                    setIsListening(false);
                    setContinuousVoiceMode(false);
                }
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
                // Restart listening if in continuous mode
                if (continuousVoiceMode) {
                    setTimeout(() => {
                        if (recognitionRef.current && continuousVoiceMode) {
                            try {
                                recognitionRef.current.start();
                                setIsListening(true);
                            } catch (e) {
                                // Recognition already started
                            }
                        }
                    }, 500);
                }
            };
        }
    }, [continuousVoiceMode]);

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Auto-send when voice input completes
    useEffect(() => {
        if (autoSendRef.current && inputText.trim()) {
            autoSendRef.current = false;
            // Small delay to ensure the UI updates
            setTimeout(() => {
                handleSendMessage();
            }, 300);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inputText]);

    // Reset voice mode when chatbot closes
    useEffect(() => {
        if (!isOpen && continuousVoiceMode) {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
            setIsListening(false);
            setContinuousVoiceMode(false);
        }
    }, [isOpen, continuousVoiceMode]);

    const toggleVoiceInput = () => {
        if (!recognitionRef.current) {
            alert('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
            return;
        }

        if (isListening || continuousVoiceMode) {
            recognitionRef.current.stop();
            setIsListening(false);
            setContinuousVoiceMode(false);
        } else {
            recognitionRef.current.start();
            setIsListening(true);
            setContinuousVoiceMode(true);
        }
    };

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            // Cancel any ongoing speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1.0;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleSendMessage = () => {
        if (!inputText.trim()) return;

        const wasVoiceInput = usedVoiceInput;
        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputText,
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputText('');
        setUsedVoiceInput(false);

        // Simulate bot response
        setTimeout(() => {
            const botResponse = generateBotResponse(userMessage.text.toLowerCase());
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                sender: 'bot',
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);

            // Speak the response if user used voice input
            if (wasVoiceInput) {
                speak(botResponse);
                // After bot speaks, restart listening if in continuous mode
                setTimeout(() => {
                    if (continuousVoiceMode && recognitionRef.current) {
                        try {
                            recognitionRef.current.start();
                            setIsListening(true);
                        } catch (e) {
                            // Recognition already started
                        }
                    }
                }, 2000); // Wait for speech to complete
            }
        }, 1000);
    };

    const generateBotResponse = (input: string): string => {
        if (input.includes('price') || input.includes('cost') || input.includes('rate')) {
            return "Our rental rates vary by vehicle type and duration. Daily rates start from $49 for economy cars and go up to $299 for luxury vehicles. Would you like to browse our fleet for specific pricing?";
        } else if (input.includes('book') || input.includes('rent') || input.includes('reserve')) {
            return "Great! You can book a vehicle by using our booking form on the homepage, or browse our fleet to select your preferred vehicle. Would you like me to guide you through the booking process?";
        } else if (input.includes('insurance') || input.includes('coverage')) {
            return "All our rentals include comprehensive insurance coverage. We offer basic coverage with every rental, plus optional premium coverage for added peace of mind. Would you like more details?";
        } else if (input.includes('location') || input.includes('pickup') || input.includes('where')) {
            return "We have multiple convenient pickup locations across the city. You can select your preferred location when booking. Would you like to see our locations?";
        } else if (input.includes('hours') || input.includes('open') || input.includes('available')) {
            return "We're available 24/7 for pickups and drop-offs at select locations. Our customer service team is also available 24/7 to assist you. How else can I help?";
        } else {
            return "I'd be happy to help you with that! You can also browse our fleet, check pricing, or contact our team directly. What would you like to know more about?";
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="mb-4 w-96 h-[500px] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <MessageCircle className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="font-semibold">VeloRent Assistant</h3>
                                    <p className="text-xs opacity-90">Online 24/7</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 p-2 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/5">
                            {messages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${message.sender === 'user'
                                            ? 'bg-primary text-primary-foreground'
                                            : 'bg-secondary text-secondary-foreground'
                                            }`}
                                    >
                                        <p className="text-sm">{message.text}</p>
                                        <p className="text-xs opacity-70 mt-1">
                                            {message.timestamp.toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-border bg-background">
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inputText}
                                    onChange={(e) => {
                                        setInputText(e.target.value);
                                        // Stop continuous voice mode when user types
                                        if (e.target.value && continuousVoiceMode) {
                                            if (recognitionRef.current) {
                                                recognitionRef.current.stop();
                                            }
                                            setIsListening(false);
                                            setContinuousVoiceMode(false);
                                        }
                                    }}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 px-4 py-2.5 rounded-full border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                />
                                <button
                                    onClick={toggleVoiceInput}
                                    className={`p-2.5 rounded-full transition-colors ${(isListening || continuousVoiceMode)
                                        ? 'bg-destructive text-destructive-foreground animate-pulse'
                                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                        }`}
                                    title={continuousVoiceMode ? 'Stop continuous voice input' : 'Start voice input'}
                                >
                                    {(isListening || continuousVoiceMode) ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!inputText.trim()}
                                    className="p-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                            {isListening && (
                                <p className="text-xs text-muted-foreground mt-2 text-center">
                                    Listening... Speak now
                                </p>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center hover:bg-primary/90 transition-colors"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
            </motion.button>
        </div>
    );
};

export default Chatbot;
