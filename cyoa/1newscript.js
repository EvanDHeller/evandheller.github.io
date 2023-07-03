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

document.addEventListener("DOMContentLoaded", function () {
  const story = {
    currentScene: "startGame",
    playerName: null,
    messages: [],
    messageIndex: 0,
    scenes: {
      startGame: {
        startGame: function () {
          story.currentScene = "startGame";
          story.playerName = null;
          story.messages = [];
          story.messageIndex = 0;
        },
      },
      scene1: {
        startGame: function () {
          story.currentScene = "startGame";
          story.playerName = null;
          story.messages = [];
          story.messageIndex = 0;
          var gameEnded = false;
        },
      },
      scene1_1: function () {
        showMessage(
          "You have just woken up, you don't know where you are, or how you got there.",
          ""
        );
        showContinueButton();
        const continueButton = document.getElementById("continue-button");
        continueButton.addEventListener("click", story.scenes.scene2.scene1_2);
      },
      scene1_2: function () {
        showMessage("You don't even remember your name!", "");
        showContinueButton();
        const continueButton = document.getElementById("continue-button");
        continueButton.addEventListener("click", story.scenes.scene2.scene1_3);
      },
      scene1_3: function () {
        showMessage(
          "As you yawn and rub your eyes, you realize even a temporary name may be helpful...",
          ""
        );
        showContinueButton();
        const continueButton = document.getElementById("continue-button");
        continueButton.addEventListener("click", story.scenes.scene2.scene2_1);
      },
      scene2: {
        scene2_1: function () {
          showMessage(
            "Thank you, " + story.playerName + ", your adventure begins now!"
          );
          showContinueButton();
          const continueButton = document.getElementById("continue-button");
          continueButton.addEventListener("click", story.scenes.scene2.scene2_2);
        },
        scene2_2: function () {
          showMessage(
            "As you look around and take in your surroundings, you find yourself in a small wooded enclave."
          );
          showContinueButton();
          const continueButton = document.getElementById("continue-button");
          continueButton.addEventListener("click", story.scenes.scene2.scene2_3);
        },
        scene2_3: function () {
          showMessage(
            "In the center of the enclave, you notice a cleanly cut tree trunk with a large locked chest atop it."
          );
          showOptions([
            {
              text: "Kick at the rusted lock, hoping it will open.",
              action: story.scenes.scene3.scene3_1,
            },
            {
              text: "Look around to see if there is anything you can use to open the chest.",
              action: story.scenes.scene3.scene3_2,
            },
            {
              text: "You know, this is someone's property, I should probably leave it alone.",
              action: story.scenes.scene3.scene3_3,
            },
         .
