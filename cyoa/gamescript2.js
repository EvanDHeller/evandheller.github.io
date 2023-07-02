document.addEventListener("DOMContentLoaded", function () {
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
            showMessage(
              this.messages[this.messageIndex].text,
              this.messages[this.messageIndex].image
            );

            if (this.messageIndex === this.messages.length - 1) {
              showNameInput();
              hideContinueButton();
            } else {
              showContinueButton();
            }

            this.messageIndex++;
          }

          if (this.currentScene === "startGame" && this.messageIndex === 1) {
            // Hide the start button after the first message
            hideStartButton();
          }
        }
      },
      scene2: {
        scene2_1: function () {
          showMessage("Thank you, " + story.playerName + ", your adventure begins now!");
          showContinueButton();
          const nextMessageButton = document.getElementById("continue-button");
          nextMessageButton.addEventListener("click", story.scenes.scene2.scene2_2); // Assign listener to the next message button
        },
        scene2_2: function () {
          showMessage("As you look around and take in your surroundings, you find yourself in a small wooded enclave.");
          showContinueButton();
          const continueButton = document.getElementById("continue-button");
          continueButton.addEventListener("click", story.scenes.scene2.scene2_3);
        },
        scene2_3: function () {
          showMessage("In the center of the enclave, you notice a cleanly cut tree trunk with a large locked chest atop it.");
          showOptions([
            { text: "Kick at the rusted lock, hoping it will open.", action: story.scenes.scene3.scene3_1 },
            { text: "Look around to see if there is anything you can use to open the chest.", action: story.scenes.scene3.scene3_2 },
            { text: "You know, this is someone's property, I should probably leave it alone.", action: story.scenes.scene3.scene3_3 }
          ]);
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

    const saveButton = document.getElementById("name-button");
    saveButton.addEventListener("click", saveName);
  }

function saveName() {
  const nameField = document.getElementById("name-field");
  story.playerName = nameField.value;
  nameField.disabled = true;

  const saveButton = document.getElementById("name-button");
  saveButton.removeEventListener("click", saveName);
  saveButton.addEventListener("click", story.scenes.scene2.scene2_1);
  saveButton.textContent = "Saved";
  saveButton.disabled = true;

  hideNameInput();

  // Check if the current scene is the "startGame" scene
  if (story.currentScene === "startGame") {
    // Check if this is the last message in the "startGame" scene
    if (story.messageIndex === story.scenes.startGame.messages.length - 1) {
      // Set the current scene to "scene2_1"
      story.currentScene = "scene2_1";
    } else {
      // Display the next message in the "startGame" scene
      story.scenes.startGame.displayNextMessage();
    }
  } else if (story.currentScene === "scene2_1") {
    story.scenes.scene2.scene2_1();
  }
}


  function resetNameInput() {
    const nameField = document.getElementById("name-field");
    nameField.value = "";
    nameField.disabled = false;

    const saveButton = document.getElementById("name-button");
    saveButton.addEventListener("click", saveName);
    saveButton.textContent = "Save";
    saveButton.disabled = false;
  }

  function hideNameInput() {
    const nameInputContainer = document.getElementById("name-input-container");
    nameInputContainer.style.display = "none";
  }

  function showContinueButton() {
    const continueButton = document.getElementById("continue-button");
    continueButton.style.display = "block";
    continueButton.addEventListener("click", story.scenes.startGame.displayNextMessage.bind(story.scenes.startGame));
  }

  function hideStartButton() {
    const startButton = document.getElementById("start-button");
    startButton.style.display = "none";
  }

  function hideContinueButton() {
    const continueButton = document.getElementById("continue-button");
    continueButton.style.display = "none";
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
});
