document.addEventListener("DOMContentLoaded", function () {

    const story = {
        currentScene: "startGame",
        playerName: null,
        messages: [],
        messageIndex: 0,
        scenes: {
            startGame: function () {
                this.currentScene = "startGame";
                this.playerName = null;
                messagesContainer.innerHTML = ""; // Clears the innerHTML of the messages container
                this.messages = [];
                this.messageIndex = 0;
                var gameEnded = false;
                story.currentScene = "scene1_1";
                story.scenes.scene1.scene1_1();
            },
            scene1: {
                scene1_1: function () {
                    showMessage("You have just woken up, you don't know where you are, or how you got there.", "");
                    showContinueButton();
                    const continueButton = document.getElementById("continue-button");
                    continueButton.addEventListener("click", story.scenes.scene1.scene1_2);
                },
                scene1_2: function () {
                    showMessage("You don't even remember your name!", "");
                    showContinueButton();
                    const continueButton = document.getElementById("continue-button");
                    continueButton.addEventListener("click", story.scenes.scene1.scene1_3);
                },
                scene1_3: function () {
                    showMessage("As you yawn and rub your eyes, you realize even a temporary name may be helpful...", "");
                    showNameInput();
                    hideContinueButton();
                    saveButton.addEventListener("click", saveName);

                }
            },
            scene2: {
                scene2_1: function () {
                    showMessage("Thank you, " + story.playerName + ", your adventure begins now!");
                    showContinueButton();
                    const continueButton = document.getElementById("continue-button");
                    continueButton.addEventListener("click", story.scenes.scene2.scene2_2);
                },
                scene2_2: function () {
                    showMessage("As you look around and take in your surroundings, you find yourself in a small wooded enclave.");
                    showContinueButton();
                    hideNameInput();
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
                    showOptions([
                        { text: "Kick it again, much harder.", action: story.scenes.scene5.scene5_1 },
                        { text: "Look around to see if there is anything you can use to open the chest.", action: story.scenes.scene3.scene3_2 },
                        { text: "That hurt your pride more than your foot. Well good... you didn't want that stupid chest open anyway.", action: story.scenes.scene3.scene3_3 }
                    ]);
                },
                scene3_2: function () {
                    showMessage("You search the area and see...");
                    story.currentScene = "scene4";
                    showOptions([
                        { text: "...that looking is stupid, let's trying kicking again!", action: story.scenes.scene3.scene3_1 },
                        { text: "Your morals. Maybe I shouldn't touch someone else's shit.", action: story.scenes.scene3.scene3_3 }
                    ]);
                },
                scene3_3: function () {
                    showMessage("You decide it's best not to meddle with someone else's property and leave the chest alone.");
                    story.currentScene = "scene4";
                    showOptions([
                        { text: "Kick at the rusted lock, hoping it will open.", action: story.scenes.scene3.scene3_1 },
                        { text: "Look around to see if there is anything you can use to open the chest.", action: story.scenes.scene3.scene3_2 }
                    ]);
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
                },
                scene4_3: function () {
                    showMessage("You decide it's best not to meddle with someone else's property and leave the chest alone.");
                    story.currentScene = "endGame";
                    showEndMessage();
                }
            },

            scene5: {
                scene5_1: function () {
                    showMessage("You kick the lock, it jingles but doesn’t break…the same can’t be said for your toe. Lose 30 health.");
                    story.currentScene = "scene4";
                    showOptions([
                        { text: "Momma didn't raise no bitch, kick it again, show it you really mean it!", action: story.scenes.scene5.scene5_2 },
                        { text: "Throw the chest against a tree in frustration.", action: story.scenes.scene5.scene5_2 },
                        { text: "Give up. This chest clearly wants to stay shut more than you want to open it.", action: story.scenes.scene3.scene3_3 }
                    ]);
                },
                scene5_2: function () {
                    showMessage("You can practically hear the chest mocking you, as if saying 'Kick me once, shame on me; kick me thrice, shame on you.' Lose 30 health.");
                    story.currentScene = "scene4";
                    showOptions([
                        { text: "Fourth time's the charm, right?", action: story.scenes.scene5.scene5_3 },
                        { text: "Kick at the rusted lock, hoping it will open.", action: story.scenes.scene3.scene3_1 },
                        { text: "You know, this is someone's property, I should probably leave it alone.", action: story.scenes.scene3.scene3_3 }
                    ]);
                },
                scene5_3: function () {
                    showMessage("...But I guess you’re lacking charm, as you kick it a third time with your broken toe, you feel the rust enter the open wound. You feel woozy. And probably have Tetanus. Lose 80  health.");
                    story.currentScene = "scene4";
                    showOptions([
                        { text: "One more time. Kicking is the hill I die on, it’s who I am! I’m nothing without it!", action: story.scenes.scene5.scene5_4 },
                        { text: "Kick at the rusted lock, hoping it will open.", action: story.scenes.scene3.scene3_1 },
                        { text: "Look around to see if there is anything you can use to open the chest.", action: story.scenes.scene3.scene3_2 }
                    ]);
                },
                scene5_4: function () {
                    showMessage("Using all your remaining energy, you kick your bloodied stump at the lock. You miss your kick entirely, and fall backwards.");
                    showOptions([]); // Pass an empty array to hide the option buttons
                    showContinueButton();
                    const continueButton = document.getElementById("continue-button");
                    continueButton.addEventListener("click", story.scenes.scene5.scene5_5);
                },
                scene5_5: function () {
                    showMessage("Hitting your head on the ground. Consciousness is starting to fade… Lose 160 health.");
                    showOptions([]); // Pass an empty array to hide the option buttons
                    showContinueButton();
                    const continueButton = document.getElementById("continue-button");
                    continueButton.addEventListener("click", story.scenes.scene5.scene5_6);
                },
                scene5_6: function () {
                    const continueButton = document.getElementById("continue-button");
                    continueButton.removeEventListener("click", story.scenes.scene5.scene5_6);
                    gameEndNegative();
                }
            }
        }
    };
    //**************************************GLOBAL FUNCTIONS*******************************************************************************************


    //**************************************START & NAVIGATION FUNCTIONS********************************************************************
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
            story.currentScene = "scene1_1"; // Set the current scene to scene1_1
            story.scenes.scene1.scene1_1(); // Call the scene1_1 function to display the scene
        });
    }


    function hideStartButton() {
        const startButton = document.getElementById("start-button");
        startButton.style.display = "none";
    }


    function showScene() {
        const currentScene = story.scenes[story.currentScene];

        // Clear the messages container
        const messageElement = document.getElementById("message");
        messageElement.textContent = "";

        // Clear the image container
        const imageElement = document.getElementById("image");
        imageElement.src = "";
        imageElement.style.display = "none";

        // Display the messages of the current scene
        if (currentScene.messages) {
            currentScene.messages.forEach(message => {
                showMessage(message.text, message.image);
            });
        }

        // Display the options of the current scene
        if (currentScene.options) {
            showOptions(currentScene.options);
        }

        // Call the displayNextMessage function of the current scene
        if (currentScene.displayNextMessage) {
            currentScene.displayNextMessage();
        }
    }

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
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";

        if (options.length > 0) {
            options.forEach(option => {
                const button = document.createElement("button");
                button.textContent = option.text;
                button.classList.add("option-button");
                button.addEventListener("click", option.action);
                optionsContainer.appendChild(button);
            });
            optionsContainer.style.display = "block"; // Show the option container
        } else {
            optionsContainer.style.display = "none"; // Hide the option container
        }

        const continueButton = document.getElementById("continue-button");
        if (options.length > 0) {
            continueButton.style.display = "none"; // Hide the "Continue" button
        } else {
            continueButton.style.display = "block"; // Show the "Continue" button
        }
    }

    function showContinueButton() {
        const continueButton = document.getElementById("continue-button");
        continueButton.style.display = "block";

        // Remove the event listener from the previous continue button, if any
        const clonedContinueButton = continueButton.cloneNode(true);
        continueButton.parentNode.replaceChild(clonedContinueButton, continueButton);

        clonedContinueButton.addEventListener("click", function () {
            const currentScene = story.scenes[story.currentScene];

            if (story.currentScene === "startGame") {
                currentScene.displayNextMessage();
            } else if (currentScene.messageIndex < currentScene.messages.length) {
                currentScene.displayNextMessage();
            } else {
                const sceneKeys = Object.keys(story.scenes);
                const currentIndex = sceneKeys.indexOf(story.currentScene);
                if (currentIndex < sceneKeys.length - 1) {
                    story.currentScene = sceneKeys[currentIndex + 1];
                    showScene();
                } else {
                    hideContinueButton();
                    showNameInput();
                }
            }
        });
    }

    function hideContinueButton() {
        const continueButton = document.getElementById("continue-button");
        continueButton.style.display = "none";
    }

    //**************************************NAME MECHANICS*********************************************************************************


    function showNameInput() {
        const nameInputContainer = document.getElementById("name-input-container");
        nameInputContainer.style.display = "block";

        const saveButton = document.getElementById("name-button");
        saveButton.addEventListener("click", saveName);
    }

    function saveName() {
        const nameField = document.getElementById("name-field");
        const playerName = nameField.value.trim(); // Trim whitespace from the input

        const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces allowed

        if (!nameRegex.test(playerName)) {
            showMessage("Please enter a valid name.");
            return;
        }

        story.playerName = playerName;
        nameField.disabled = true;

        const saveButton = document.getElementById("name-button");
        saveButton.removeEventListener("click", saveName);
        saveButton.textContent = "Saved";
        saveButton.disabled = true;

        if (story.currentScene === story.scenes.scene1.scene1_3) {
            scene1_3(); // Call the scene1_3 function to display the default message
        }
        hideNameInput();
        story.currentScene = "scene2_1";
        story.scenes.scene2.scene2_1();
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

    //**************************************ENDGAME & PLAYAGAIN FUNCTIONS***********************************************************************

    function hideTryAgainButton() {
        var playAgainButton = document.getElementById("play-again-button");
        playAgainButton.style.display = "none";
    }

    function gameEndNegative() {
        showMessage("Sorry, " + story.playerName + ", yours was not a story with a happy ending. Better luck next time!");
        showOptions([]);
        hideContinueButton();
        hideTryAgainButton();
        showPlayAgainButton();
    }

    function showPlayAgainButton() {
        const playAgainButton = document.getElementById("play-again-button");
        playAgainButton.style.display = "block";
        playAgainButton.addEventListener("click", resetGame);
    }

    function resetGame() {
        // Reset the story object
        story.playerName = null;
        story.messages = [];
        story.messageIndex = 0;

        // Reset the name input
        resetNameInput();

        // Hide the play again button
        hidePlayAgainButton();
        hideContinueButton();
        // Show the start button
        const startButton = document.getElementById("start-button");
        startButton.style.display = "block";
        document.getElementById("intro-image").style.display = "block";
        document.getElementById("game-title").style.display = "block";
        // Reset the game UI
        const messageElement = document.getElementById("message");
        messageElement.textContent = "";
        const imageElement = document.getElementById("image");
        imageElement.src = "";
        imageElement.style.display = "none";
        const optionsContainer = document.getElementById("options");
        optionsContainer.innerHTML = "";
        optionsContainer.style.display = "none";
        hideContinueButton();
        hideNameInput();
        // Remove the event listener from the continue button

        // Load the scene1_1
        loadScene("startGame");
        story.scenes.startGame();
    }

    function restartGame() {
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

    function hidePlayAgainButton() {
        const playAgainButton = document.getElementById("play-again-button");
        playAgainButton.style.display = "none";
    }

    startGame();
});
