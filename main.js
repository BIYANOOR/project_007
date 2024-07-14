#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
// Define your enemies and game variables
let enemies = ["🐍 snake", "🦁 lion", "🐕 wild dogs", "👹 monster"];
let maxEnemyHealth = 75;
let enemyAttackDamageWarrior = 25;
let warriorHealth = 100;
let attackDamageToEnemy = 50;
let numEnergy = 3;
let energyHealthAmount = 30;
let energyDropChance = 50;
let gameRunning = true;
// Function to display colored message
function displayMessage(message) {
    console.log(message);
}
// Display a colorful message for the welcome message
displayMessage('🏞️ Welcome to Jungle Adventure!');
async function main() {
    while (gameRunning) {
        // Select a random enemy
        let enemyIndex = Math.floor(Math.random() * enemies.length);
        let enemy = enemies[enemyIndex];
        let currentEnemyHealth = maxEnemyHealth;
        while (currentEnemyHealth > 0) {
            console.log(`\n💖 Your health: ${warriorHealth}`);
            console.log(`👾 Enemy ${enemy} health: ${currentEnemyHealth}`);
            // Ask the user for their action
            let option = await inquirer_1.default.prompt({
                name: "ans",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    { name: "⚔️ Attack", value: "attack" },
                    { name: "💊 Take Energy", value: "energy" },
                    { name: "🏃‍♂️ Run", value: "run" }
                ]
            });
            if (option.ans === "attack") {
                let damageToEnemy = Math.floor(Math.random() * attackDamageToEnemy);
                let damageToWarrior = Math.floor(Math.random() * enemyAttackDamageWarrior + 1);
                // Update health based on the action
                currentEnemyHealth -= damageToEnemy;
                warriorHealth -= damageToWarrior;
                displayMessage(`🗡️ You strike the ${enemy} for ${damageToEnemy}`);
                displayMessage(`🤕 ${enemy} strikes you for ${damageToWarrior} damage`);
                // Check if warrior's health drops below zero
                if (warriorHealth < 1) {
                    console.log("\n💀 You have taken too much damage. You are too weak to continue Jungle Adventure.");
                    gameRunning = false;
                    break;
                }
                // Check if the enemy is defeated
                if (currentEnemyHealth <= 0) {
                    displayMessage(`🎉 ${enemy} was defeated`);
                    // Randomly give energy to the player
                    let randomNumber = Math.floor(Math.random() * 100 + 1);
                    if (randomNumber < energyDropChance) {
                        numEnergy++;
                        displayMessage(`✨ Enemy gives you energy.`);
                    }
                    console.log(`💖 You have ${warriorHealth} health`);
                    console.log(`🔋 You have ${numEnergy} energy left`);
                }
            }
            else if (option.ans === "energy") {
                if (numEnergy > 0) {
                    warriorHealth += energyHealthAmount;
                    numEnergy--;
                    displayMessage(`💉 You use energy for ${energyHealthAmount}`);
                    console.log(`💖 Now your health is ${warriorHealth}`);
                    console.log(`🔋 You have remaining energy ${numEnergy}`);
                }
                else {
                    console.log("⚠️ You have no energy. Try to defeat enemies to get more energy.");
                }
            }
            else if (option.ans === "run") {
                displayMessage(`🏅 Congratulations, you ran away from the ${enemy}`);
                break;
            }
        }
        // Check if the warrior is too weak to continue
        if (warriorHealth < 1) {
            console.log("\n💀 You are out of the Jungle Adventure because you are too weak.");
            break;
        }
        // Ask the user if they want to continue or exit
        let userOption = await inquirer_1.default.prompt({
            name: "ans",
            type: "list",
            message: "What would you like to do now?",
            choices: [
                { name: "➡️ Continue", value: "continue" },
                { name: "❌ Exit", value: "exit" }
            ]
        });
        if (userOption.ans === "exit") {
            displayMessage(`🚪 You have successfully exited from Jungle Adventure`);
            break;
        }
    }
}
// Start the main function
main();
