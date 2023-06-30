// Define your story object with scenes and options
const story = {
  currentScene: "startGame",
  playerName: null,
  messages: [],
  messageIndex: 0,

  startGame: function() {
    this.playerName = null;
    this.messages = [
      { text: "You have just woken up, you don't know where you are, or how you got there.", image: "" },
      { text: "You don't even remember your name!", image: "" },
      { text: "As you yawn and rub your eyes, you realize even a temporary name may be helpful...", image: "" }
    ];
    this.messageIndex = 0;
    this.displayNextMessage();
  },

  displayNextMessage: function() {
    if (this.messageIndex < this.messages.length) {
      showMessage(this.messages[this.messageIndex].text, this.messages[this.messageIndex].image);

      if (this.messageIndex === this.messages.length - 1) {
        // Last message, show name input instead of continue button
        showNameInput();
      } else {
        showContinueButton();
      }

      this.messageIndex++;
    } else {
      // If all messages are displayed, reset the game
      this.currentScene = "startGame";
      resetGame();
    }
  },


scene2: function () {
    const thankYouMessage = "Thank you, " + this.playerName + ", your adventure begins now!";
    const enclaveMessage = "As you look around and take in your surroundings, you find yourself in a small wooded enclave.";
    const enclaveImage = "./cyoaimages/forestenclave.png";
    const enclaveImageId = "forestenclave";
    const enclaveMessageId = "enclavemsg";
    const centerEnclaveMessage = "In the center of the enclave, you notice a cleanly cut tree trunk with a large locked chest atop it.";

    showMessage(thankYouMessage);
    showContinueButton(); // Display the continue button

    // Attach an event listener to the continue button
    const continueButton = document.getElementById("continue-button");
    continueButton.onclick = () => {
        showMessage(enclaveMessage, enclaveImage, enclaveImageId, enclaveMessageId);
        showContinueButton(); // Display the continue button

        // Attach an event listener to the continue button
        const continueButton = document.getElementById("continue-button");
        continueButton.onclick = () => {
            showMessage(centerEnclaveMessage);
            this.currentScene = "scene3";
            showOptions([
                { text: "Kick at the rusted lock, hoping it will open.", action: () => this.scene3(1) },
                { text: "Look around to see if there is anything you can use to open the chest.", action: () => this.scene3(2) },
                { text: "You know, this is someone's property, I should probably leave it alone.", action: () => this.scene3(3) }
            ]);
        };
    };
},




    scene3: function (option) {
        switch (option) {
            case 1:
                showMessage("You kick at the rusted lock, but it doesn't budge. It seems sturdy.");
                this.currentScene = "scene4";
                showOptions([
                    { text: "Look around to see if there is anything you can use to open the chest.", action: () => this.scene4(1) },
                    { text: "You know, this is someone's property, I should probably leave it alone.", action: () => this.scene4(2) }
                ]);
                break;
            case 2:
                showMessage("You search the area and find a crowbar hidden behind a tree. It might come in handy.");
                this.currentScene = "scene4";
                showOptions([
                    { text: "Try using the crowbar to open the chest.", action: () => this.scene4(1) },
                    { text: "You know, this is someone's property, I should probably leave it alone.", action: () => this.scene4(2) }
                ]);
                break;
            case 3:
                showMessage("You decide it's best not to meddle with someone else's property and leave the chest alone.");
                this.currentScene = "endGame";
                showEndMessage();
                break;
            default:
                showMessage("Please choose a valid option.");
                break;
        }
    },

    scene4: function (option) {
        switch (option) {
            case 1:
                showMessage("You use the crowbar to pry open the chest. Inside, you find a map and a key.");
                showMessage("The map reveals the location of a hidden treasure nearby. Excited, you decide to go searching for it.");
                this.currentScene = "endGame";
                showEndMessage();
                break;
            case 2:
                showMessage("You decide it's best not to meddle with someone else's property and leave the chest alone.");
                this.currentScene = "endGame";
                showEndMessage();
                break;
            default:
                showMessage("Please choose a valid option.");
                break;
        }
    },

     endGame: function() {
    showMessage("Congratulations, you have reached the end of the game!");
    showOptions([{ text: "Play Again", action: () => this.startGame() }]);
    this.currentScene = "startGame";
  }
};

// Helper functions for displaying messages, options, and managing user input

function showMessage(message, image = "", imageId = "", messageId = "") {
    const messageElement = document.getElementById("message");
    messageElement.innerHTML = "";

    const textElement = document.createElement("span");
    textElement.textContent = message;
    if (messageId !== "") {
        textElement.id = messageId;
    }
    messageElement.appendChild(textElement);

    if (image !== "") {
        const imageElement = document.createElement("img");
        imageElement.src = image;
        if (imageId !== "") {
            imageElement.id = imageId;
        }
        messageElement.appendChild(imageElement);
    }

    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";
}


function showOptions(options) {
    const optionsElement = document.getElementById("options");
    optionsElement.innerHTML = "";

    options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option.text;
        button.className = "option-button";
        button.onclick = option.action;
        optionsElement.appendChild(button);
    });

    const continueButton = document.getElementById("continue-button");
    continueButton.style.display = "none";
}

function showContinueButton() {
    const continueButton = document.getElementById("continue-button");
    continueButton.style.display = "inline-block";
}

function startGame() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("intro-image").style.display = "none";
    document.getElementById("game-title").style.display = "none";
    document.getElementById("continue-button").style.display = "none";
    document.getElementById("play-again-button").style.display = "none";
    document.getElementById("name-input").style.display = "none";
    document.getElementById("message").textContent = "";
    document.getElementById("options").textContent = "";
    story.startGame();
}


function continueGame() {
    story.displayNextMessage();
}

function showNameInput() {
    const nameInput = document.getElementById("name-input");
    nameInput.style.display = "block";
    const continueButton = document.getElementById("continue-button");
    continueButton.style.display = "none";
}

function saveName() {
    const nameField = document.getElementById("name-field");
    const playerName = nameField.value;
    if (playerName.trim() === "") {
        showMessage("Please enter a valid name.");
    } else {
        story.playerName = playerName;
        document.getElementById("name-input").style.display = "none";
        story.scene2(); // Call scene2 after setting playerName
    }
}


function showEndMessage() {
    document.getElementById("continue-button").style.display = "none";
    document.getElementById("play-again-button").style.display = "inline-block";
}

function resetGame() {
  story.currentScene = "startGame"; // Reset current scene to "startGame"
  story.playerName = null;
  story.messages = []; // Reset messages
  story.messageIndex = 0;
}
