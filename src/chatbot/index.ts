import chatbotAnswers from "../assets/chatbotAnswers.json";

/**
 * Creates a new chatbot based on the correct and unsure answers in the
 * `assets/chatbotAnswers.json` structure.
 *
 * @returns A new instance of the free text chatbot.
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
  // Defines the probability map that is used to determine the answer the bot
  // should answer with.
  private probabilityMap: { [key: string]: number } = {};

  /**
   * Creates a new `FreeTextChatbot` with the specified `answers` and
   * `unsureAnswers`. Use `createChatbot` for using the data defined in the
   * `chatbotAnswers` file.
   *
   * @param answers The possible chatbot answers.
   * @param unsureAnswers The possible unsure chatbot answers.
   */
  constructor(answers: ChatbotAnswer[], unsureAnswers: string[]) {
    this.answers = answers;
    this.unsureAnswers = unsureAnswers;
  }

  /**
   * Returns the message probability of a given sentence that was provided by
   * the user. This function can expect the `singleResponse` and `requiredWords`
   * parameters, which are both necessary, when there should be a required word
   * in the sentence to calculate the proper probability.
   *
   * @param userMessage The user message splitted into words.
   * @param recognizedWords The recognized words for the chatbot.
   * @param [singleResponse] When the response should be in a single response.
   * @param [requiredWords] The required words that should occur in the sentence.
   * @returns Probability of the message occurrence.
   */
  private messageProbability = (
    userMessage: string[],
    recognizedWords: string[],
    singleResponse: boolean = false,
    requiredWords: string[] = [],
  ): number => {
    let messageCertainty = 0;
    let hasRequiredWords = true;

    userMessage.forEach((word) => {
      if (recognizedWords.includes(word.toLowerCase())) {
        messageCertainty += 1;
      }
    });

    const percentage = messageCertainty / recognizedWords.length;

    requiredWords.forEach((word) => {
      if (!userMessage.includes(word.toLowerCase())) {
        hasRequiredWords = false;
        return;
      }
    });

    return hasRequiredWords || singleResponse ? percentage * 100 : 0;
  };

  /**
   * Returns the max probability key in the `probabilityMap` of the chatbot
   * class. If the max probability was not found, null will be returned.
   *
   * @returns The max probability in the `probabilityMap`.
   */
  private findMaxProbabilityKey = (): string | null => {
    let maxProbabilityKey: string | null = null;
    let maxProbability: number = 0;
    Object.entries(this.probabilityMap).forEach(([key, probability]) => {
      if (maxProbability < probability) {
        maxProbability = probability;
        maxProbabilityKey = key;
      }
    });

    return maxProbabilityKey;
  };

  /**
   * Returns a random unsure message from the `unsureAnswers` array.
   *
   * @returns Random unsure message from the `unsureAnswers` array.
   */
  private randomUnsureMessage = (): string => {
    return this.unsureAnswers[
      Math.floor(Math.random() * this.unsureAnswers.length)
    ];
  };

  /**
   * Creates a response that will calculate a random response and calculates
   * then the overall message probability that this response will be sent to
   * the user.
   *
   * @param message The split up message into words.
   * @param botResponse What the possible responses of the bot are.
   * @param listOfWords The list of words to recognize the message.
   * @param [singleResponse] When the response should be in a single response.
   * @param [requiredWords] The required words that should occur in the sentence.
   */
  private createResponse = (
    message: string[],
    botResponse: string | string[],
    listOfWords: string[],
    singleResponse: boolean = false,
    requiredWords: string[] = [],
  ): void => {
    let randomBotResponse: string = "";
    if (Array.isArray(botResponse)) {
      randomBotResponse =
        botResponse[Math.floor(Math.random() * botResponse.length)];
    } else {
      randomBotResponse = botResponse;
    }

    // Inserts the bot response with the message probability to the
    // `probabilityMap` object.
    this.probabilityMap[randomBotResponse] = this.messageProbability(
      message,
      listOfWords,
      singleResponse,
      requiredWords,
    );
  };

  /**
   * Checks all messages that belong to the `answers` array. This function will
   * return the string with the best match by creating all the possible
   * responses of the chatbot and then calculating the max probability. The
   * response with the max probability will be returned.
   *
   * @param message The user message split up into words.
   * @returns The best match or `null`.
   */
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

    const bestMatch = this.findMaxProbabilityKey();
    return bestMatch && this.probabilityMap[bestMatch] ? bestMatch : null;
  };

  /**
   * Adds an answer to the chatbot `answers` array.
   *
   * @param answer The answer for the chatbot.
   */
  public addAnswer = (answer: ChatbotAnswer): void => {
    this.answers.push(answer);
  };

  /**
   * Returns a possible unsure or correct answer to a message that the user
   * has specified.
   *
   * @param userInput The message of the user.
   * @returns The response of the chatbot to the message.
   */
  public getResponse = (userInput: string): string => {
    const splitMessage = userInput.toLowerCase().split(/\s+|[,;?!.-]\s*/g);
    const response = this.checkAllMessages(splitMessage);
    return response ?? this.randomUnsureMessage();
  };
}
