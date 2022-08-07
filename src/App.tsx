import { useState } from 'react';
import importedMessages from './assets/messages.json';
import { ChatMessage } from './components/ChatMessage';
import { ChatWindow } from './components/ChatWindow';
import { TypingIndicator } from './components/TypingIndicator';
import { useTypingEffect } from './hooks/useMessageQueue';

const App = () => {
  const [stage, setStage] = useState<number>(0);

  const { queuedMessage, messages } = useTypingEffect(stage, importedMessages);

  return (
    <div className="flex items-center justify-center h-screen mx-8 antialiased">
      <ChatWindow>
        <div className="space-y-2">
          {messages.map((message, index) => (
            <ChatMessage key={index}>{message}</ChatMessage>
          ))}
          {queuedMessage && <TypingIndicator></TypingIndicator>}
        </div>
      </ChatWindow>
    </div>
  );
};

export default App;
