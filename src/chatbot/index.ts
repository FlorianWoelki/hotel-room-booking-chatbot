const messageProbability = (
  userMessage: string[],
  recognizedWords: string[],
  singleResponse = false,
  requiredWords: string[] = [],
): number => {
  let messageCertainty = 0;
  let hasRequiredWords = true;

  userMessage.forEach((word) => {
    if (recognizedWords.includes(word)) {
      messageCertainty += 1;
    }
  });

  const percentage = messageCertainty / recognizedWords.length;

  requiredWords.forEach((word) => {
    if (!userMessage.includes(word)) {
      hasRequiredWords = false;
      return;
    }
  });

  return hasRequiredWords || singleResponse ? percentage * 100 : 0;
};

const findMaxProbabilityKey = (map: {
  [key: string]: number;
}): string | null => {
  let maxProbabilityKey: string | null = null;
  let maxProbability: number = 0;
  Object.entries(map).forEach(([key, probability]) => {
    if (maxProbability < probability) {
      maxProbability = probability;
      maxProbabilityKey = key;
    }
  });

  return maxProbabilityKey;
};

const checkAllMessages = (message: string[]): string | null => {
  const probabilityMap: { [key: string]: number } = {};

  const createResponse = (
    botResponse: string | string[],
    listOfWords: string[],
    singleResponse = false,
    requiredWords: string[] = [],
  ) => {
    let randomBotResponse: string = '';
    if (Array.isArray(botResponse)) {
      randomBotResponse =
        botResponse[Math.floor(Math.random() * botResponse.length)];
    } else {
      randomBotResponse = botResponse;
    }

    probabilityMap[randomBotResponse] = messageProbability(
      message,
      listOfWords,
      singleResponse,
      requiredWords,
    );
  };

  createResponse(
    ['Hello!', 'Hi, how can I help you?', 'Hello there 😀'],
    ['hello', 'hi', 'hey'],
    true,
  );

  const bestMatch = findMaxProbabilityKey(probabilityMap);
  return bestMatch && probabilityMap[bestMatch] ? bestMatch : null;
};

const randomUnsureMessage = (): string => {
  const items: string[] = ['I am not sure, what that means 😔'];
  return items[Math.floor(Math.random() * items.length)];
};

export const getResponse = (userInput: string): string => {
  const splitMessage = userInput.toLowerCase().split(/\s+|[,;?!.-]\s*/g);
  const response = checkAllMessages(splitMessage);
  return response ?? randomUnsureMessage();
};
