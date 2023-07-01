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
          } else {
            showContinueButton();
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

// Helper functions for displaying messages, options, and managing user input
// ...

function startGame() {
  document.getElementById("start-button").style.display = "none";
  document.getElementById("intro-image").style.display = "none";
  document.getElementById("game-title").style.display = "none";
  document.getElementById("continue-button").style.display = "none";
  document.getElementById("play-again-button").style.display = "none";
  document.getElementById("name-input").style.display = "none";
  document.getElementById("message").textContent = "";
  document.getElementById("options").textContent = "";
  story.scenes.startGame.startGame();
}

function continueGame() {
  const currentScene = story.scenes[story.currentScene];
  currentScene.displayNextMessage();
}

function showNameInput() {
  const nameInput = document.getElementById("name-input");
  nameInput.style.display = "block";
  const continueButton = document.getElementById("continue-button");
  continueButton.style.display = "none";
}

// ...

// Usage:
startGame();
