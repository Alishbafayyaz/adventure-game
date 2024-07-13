import inquirer from "inquirer";

// Game Variables
let enemies: string[] = ['Zombie', 'Skeleton', 'Assassin'];
let maxEnemyHealth: number = 100;
let enemyAttackDamage: number = 25;

// Player Variables
let health: number = 100;
let attackDamage: number = 50;
let healthPotion: number = 3;
let healthPotionHealAmount: number = 30;
let healthPotionDropChance: number = 50; // percentage

let running: boolean = true;

console.log(`\n\tWelcome to the Dungeon!`);

async function main() {
    while (running) {
        console.log(`-------------------------------------------------------`);

        let enemyHealth: number = Math.floor(Math.random() * (maxEnemyHealth + 1));
        let enemy: string = enemies[Math.floor(Math.random() * enemies.length)];

        console.log(`\t# ${enemy} has appeared! #\n`);

        while (enemyHealth > 0 && health > 0) {
            console.log(`\tYour HP: ${health}`);
            console.log(`\t${enemy}'s Health: ${enemyHealth}`);

            let action = await inquirer.prompt([
                {
                    name: "perform",
                    type: "list",
                    choices: ['Attack', 'Drink Health Potion', 'Run!'],
                    message: "\nWhat would you like to do? "
                }
            ]);

            if (action.perform === 'Attack') {
                let damageDealt: number = Math.floor(Math.random() * attackDamage);
                let damageTaken: number = Math.floor(Math.random() * enemyAttackDamage);

                enemyHealth -= damageDealt;
                health -= damageTaken;

                console.log(`\n\t> You strike the ${enemy} for ${damageDealt} damage.`);
                console.log(`\t> You receive ${damageTaken} in retaliation.\n`);

                if (health < 1) {
                    console.log(`\tYou have taken too much damage. You are too weak to go on!`);
                    break;
                }

            } else if (action.perform === 'Drink Health Potion') {
                if (healthPotion > 0) {
                    health += healthPotionHealAmount;
                    healthPotion--;

                    console.log(`\tYou drink Health Potion, healing yourself for ${healthPotionHealAmount}.`);
                    console.log(`\tYou now have ${health} HP.`);
                    console.log(`\tYou have ${healthPotion} health potions left.`);

                } else {
                    console.log(`\tYou have no health potions left! Defeat enemies for a chance to get one.`);
                }

            } else if (action.perform === 'Run!') {
                console.log(`\tYou run away from ${enemy}!`);
                break; // Exit the battle loop
            }
        }

        if (health < 1) {
            console.log(`\tYou limp out of the dungeon, weak from battle.\n`);
            break; // Exit the main game loop
        } else {
            console.log(`-------------------------------------------------------`);
            console.log(`\t# ${enemy} was defeated! #`);
            console.log(`\t# You have ${health} HP left. #\n`);

            if (Math.floor(Math.random() * 100) < healthPotionDropChance) {
                healthPotion++;
                console.log(`# The ${enemy} left a health potion! #`);
                console.log(`# You now have ${healthPotion} health potion(s). # `);
            }
            console.log(`-------------------------------------------------------`);

            let response = await inquirer.prompt([
                {
                    name: "answer",
                    type: "list",
                    choices: ['Continue Dungeon', 'Exit Dungeon'],
                    message: "\nWhat would you like to do now? "

                }
            ]);

            if (response.answer === 'Continue Dungeon') {
                console.log(`\tYou continue on your adventure.`);
            } else if (response.answer === 'Exit Dungeon') {
                console.log(`\t\nYou Exited the Dungeon, successful from your adventure!`);
                running = false; // Exit the main game loop
            }
        }
    }

    console.log(`\n---------- Thanks For Playing ----------`);
}

// Start the game
main();