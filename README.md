# Hotel Room Booking Chatbot

This project was realized with the following technologies:

`JavaScript`, `TypeScript`, `TailwindCSS`, `React`, `Cypress`, `Jest`

## What is it

This Hotel Room Booking Chatbot can be dynamically used to integrate a fully
functional chatbot with customizable chat messages into any website. It is easy
to use and easy to customize.

The project contains two important files that allow the user to customize the
chatbot messages and free text messages. Both files are located under `src/assets`.

### `messages.json`

The starting point of this file is an array which contains all the message objects.
A message object follows the following structure:

```json
{
  // The message id that will be used to jump from the `followMessageId` field.
  "id": "messageId",
  // All the messages that the bot should write to the user before inserting
  // any new input.
  "messages": [
    "Hey there!"
  ],
  // This object defines the type of the user input.
  "userInput": {
    // When the user inputs their data this follow up message id will be used
    // to send the second type of messages.
    "followMessageId": "someOtherId",
    // Defines the type of the user input.
    // Can be: `text`, `terminate`, `freeText`, `selection`, `date`, `link`.
    "type": "text",
    // The validation method for validating the user input.
    // Can be: `text`, `number`, `email`, `mobilePhoneNumber`.
    "validation": "",
    // Placeholder for the input field, if applicable.
    "placeholder": "Enter your fullname"
  }
}
```

It is important to note that when you want to use specific user input in your
text (e.g., the fullname), you can specify in the `followMessageId` message object
the use of a message with a `$` sign. Then the recent user input will be saved
in this placeholder for the full conversation.

Here are some examples for using the different types of `userInput.type`.

<details>
  <summary>`"type": "text"`</summary>

  ```json
  {
    "userInput": {
      "followMessageId": "someOtherId",
      "type": "text",
      "validation": "text",
      "placeholder": "Enter your fullname"
    }
  }
  ```
</details>

<details>
  <summary>`"type": "terminate"`</summary>

  Does not need any other field because at this point, it terminates the chatbot
  and no additional input is required.
</details>

<details>
  <summary>`"type": "freeText"`</summary>

  This allows the user to communicate freely with the chatbot with the given
  answers specified in `chatbotAnswers.json`.

  ```json
  {
    "userInput": {
      "type": "freeText",
      "placeholder": "Enter your message"
    }
  }
  ```
</details>

<details>
  <summary>`"type": "selection"`</summary>

  Defines some kind of selection of `n` selections.

  ```json
  {
    "userInput": {
      "type": "selection",
      "selections": [
        { "value": "Book a Room", "followMessageId": "howManyAdults" },
        { "value": "Arrange a Call Back", "followMessageId": "callBack" },
        { "value": "Something else", "followMessageId": "customMessage" }
      ]
    }
  }
  ```
</details>

<details>
  <summary>`"type": "date"`</summary>

  Allows the user to specify a date range.

  ```json
  {
    "userInput": {
      "followMessageId": "breakfastIncluded",
      "type": "date"
    }
  }
  ```
</details>

<details>
  <summary>`"type": "link"`</summary>

  Allows the user to specify a link that is clickable and will open in a new tab.

  ```json
  {
    "userInput": {
      "type": "link",
      "href": "https://google.com",
      "placeholder": "Go to Google",
      "followMessageId": "endOfConversation"
    }
  }
  ```
</details>

### `chatbotAnswers.json`

This file mainly exists to customize the free text chatbot answers.
All of this data will only be used when specifying the `freeText` type in
a `messages.json` message object.

The main structure looks like this:

```json
{
  "answers": [
    {
      // Defines all the possible responses that the bot can choose from.
      "botResponse": ["Hello!", "Hi, how can I help you?", "Hello there 😀"],
      // Defines all the list of words where for the specific response.
      "listOfWords": ["hello", "hi", "hey"],
      // When the response should be in a single response and does not check
      // for the required words.
      "singleResponse": true,
      // Defines the required words that are necessary to be included in the
      // user message.
      "requiredWords": []
    }
  ],
  // Defines all the messages where a message will be randomily chosen when
  // the chatbot does not find any relatable answer in the `answers` array.
  "unsureAnswers": ["I am not sure, what that means 😔"]
}
```

## Deploy with Docker

To deploy the Chatbot with the help of docker, it is possible to use the
`docker-compose.yml` file. With the help of this command `docker-compose up --build`,
it is possible to build and deploy a docker container that starts the web
application on port `:80`. For that, it reads the `nginx` config in the `deploy`
directory and uses it to allow the communication from the outside.

## Development

To customize this project for your needs, you can clone it and then install all
dependencies:

```sh
$ git clone git@github.com:FlorianWoelki/hotel-room-booking-chatbot.git
$ cd hotel-room-booking-chatbot
$ yarn
```

After the installation, you can customize the `messages.json` and `chatbotAnswers.json`
files in the `src/assets` directory. Then you can run the following command to
start the local development server:

```sh
$ yarn dev
```

Finally, you are ready to go!
