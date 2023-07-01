const story = {
  currentScene: "startGame",
  playerName: null,
  messages: [],
  messageIndex: 0,
  scenes: {
    startGame: {
      startGame: function () {
        this.playerName = null;
        this.messages = [
          { text: "You have just woken up, you don't know where you are, or how you got there.", image: "" },
          { text: "You don't even remember your name!", image: "" },
          { text: "As you yawn and rub your eyes, you realize even a temporary name may be helpful...", image: "" }
        ];
        this.messageIndex = 0;
        this.displayNextMessage();
      },
      
    displayNextMessage: function () {
      if (this.messageIndex < this.messages.length) {
        showMessage(this.messages[this.messageIndex].text, this.messages[this.messageIndex].image);

        if (this.messageIndex === this.messages.length - 1) {
          showNameInput();
          const continueButton = document.getElementById("continue-button");
          continueButton.style.display = "none"; // Hide the Continue button
        } else {
          const continueButton = document.getElementById("continue-button");
          continueButton.style.display = "block"; // Show the Continue button
        }

        this.messageIndex++;
      }
    }
  },
    
    scene2: {
      scene2: function () {
        showMessage("Thank you, " + story.playerName + ", your adventure begins now!");
        showMessage("As you look around and take in your surroundings, you find yourself in a small wooded enclave.", "./cyoaimages/forestenclave.png", "forestenclave", "enclavemsg");

        story.currentScene = "scene3";
        showOptions(story.scenes.scene3.options);
      }
    },
    scene3: {
      scene3_1: function () {
        showMessage("You kick at the rusted lock, but it doesn't budge. It seems sturdy.");
        story.currentScene = "scene4";
        showOptions(story.scenes.scene4.options);
      },
      scene3_2: function () {
        showMessage("You search the area and find a crowbar hidden behind a tree. It might come in handy.");
        story.currentScene = "scene4";
        showOptions(story.scenes.scene4.options);
      },
      scene3_3: function () {
        showMessage("You decide it's best not to meddle with someone else's property and leave the chest alone.");
        story.currentScene = "endGame";
        showEndMessage();
      }
    },
    scene4: {
      scene4_1: function () {
        showMessage("You use the crowbar to pry open the chest. Inside, you find a map and a key.");
        showMessage("The map reveals the location of a hidden treasure nearby. Excited, you decide to go searching for it.");
        story.currentScene = "endGame";
        showEndMessage();
      },
      scene4_2: function () {
        showMessage("You decide it's best not to meddle with someone else's property and leave the chest alone.");
        story.currentScene = "endGame";
        showEndMessage();
      }
    },
    endGame: {
      endGame: function () {
        showMessage("Congratulations, you have reached the end of the game!");
        showOptions([{ text: "Play Again", action: story.scenes.startGame.startGame }]);
        story.currentScene = "startGame";
      }
    }
  }
};

function showMessage(text, image = "") {
  const messageElement = document.getElementById("message");
  messageElement.textContent = text;
  // Display the image if provided
  if (image) {
    const imageElement = document.getElementById("image");
    imageElement.src = image;
    imageElement.style.display = "block";
  }
}

function showOptions(options) {
  const optionsElement = document.getElementById("options");
  optionsElement.innerHTML = "";

  options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option.text;
    button.addEventListener("click", option.action);
    optionsElement.appendChild(button);
  });
}

function showNameInput() {
  const nameInputContainer = document.getElementById("name-input-container");
  nameInputContainer.style.display = "block";
}

function showContinueButton() {
  const continueButton = document.getElementById("continue-button");
  continueButton.style.display = "block";
}

function showEndMessage() {
  const endMessageElement = document.getElementById("end-message");
  endMessageElement.style.display = "block";
}

function startGame() {
  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", function () {
    // Hide the intro elements
    const introImage = document.getElementById("intro-image");
    const gameTitle = document.getElementById("game-title");
    introImage.style.display = "none";
    gameTitle.style.display = "none";

    // Hide the Start button
    startButton.style.display = "none";

    // Start the game
    story.scenes.startGame.startGame();
  });
}




startGame();
