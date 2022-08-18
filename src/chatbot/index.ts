import chatbotAnswers from '../assets/chatbotAnswers.json';

/**
 * Creates a new chatbot based on the correct and unsure answers in the
 * `assets/chatbotAnswers.json` structure.
 *
 * @returns {FreeTextChatbot} A new instance of the free text chatbot.
 */
export const createChatbot = (): FreeTextChatbot => {
  return new FreeTextChatbot(
    chatbotAnswers.answers,
    chatbotAnswers.unsureAnswers,
  );
};

interface ChatbotAnswer {
  botResponse: string | string[];
  listOfWords: string[];
  singleResponse?: boolean;
  requiredWords?: string[];
}

export default class FreeTextChatbot {
  private answers: ChatbotAnswer[];
  private unsureAnswers: string[];
  private probabilityMap: { [key: string]: number } = {};

  constructor(answers: ChatbotAnswer[], unsureAnswers: string[]) {
    this.answers = answers;
    this.unsureAnswers = unsureAnswers;
  }

  private messageProbability = (
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

  private findMaxProbabilityKey = (map: {
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

  private randomUnsureMessage = (): string => {
    return this.unsureAnswers[
      Math.floor(Math.random() * this.unsureAnswers.length)
    ];
  };

  private createResponse = (
    message: string[],
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

    this.probabilityMap[randomBotResponse] = this.messageProbability(
      message,
      listOfWords,
      singleResponse,
      requiredWords,
    );
  };

  private checkAllMessages = (message: string[]): string | null => {
    this.probabilityMap = {};

    this.answers.forEach((answer) => {
      this.createResponse(
        message,
        answer.botResponse,
        answer.listOfWords,
        answer.singleResponse,
        answer.requiredWords,
      );
    });

    const bestMatch = this.findMaxProbabilityKey(this.probabilityMap);
    return bestMatch && this.probabilityMap[bestMatch] ? bestMatch : null;
  };

  public addAnswer = (answer: ChatbotAnswer) => {
    this.answers.push(answer);
  };

  public getResponse = (userInput: string): string => {
    const splitMessage = userInput.toLowerCase().split(/\s+|[,;?!.-]\s*/g);
    const response = this.checkAllMessages(splitMessage);
    return response ?? this.randomUnsureMessage();
  };
}
