#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Item {
    name;
    constructor(name) {
        this.name = name;
    }
}
class Inventory {
    items = [];
    addItem(item) {
        this.items.push(item);
    }
    removeItem(itemName) {
        this.items = this.items.filter(item => item.name !== itemName);
    }
    listItems() {
        if (this.items.length === 0) {
            console.log(chalk.red("No items in inventory."));
        }
        else {
            console.log(chalk.bold.yellow("Inventory Items:"));
            this.items.forEach(item => console.log(item.name));
        }
    }
}
const inventory = new Inventory();
const startProgram = async (inventory) => {
    while (true) {
        console.log(chalk.bold.italic.blue("------------------------------------------------------------"));
        console.log(chalk.bold.italic.blue("-------------Welcome to the Simple Inventory System-------------"));
        console.log(chalk.bold.italic.blue("------------------------------------------------------------"));
        const response = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "What would you like to do?",
                choices: ["Add Item", "List Items", "Remove Item", "Exit"]
            }
        ]);
        if (response.choice === "Exit") {
            console.log(chalk.red.italic("Exiting..."));
            process.exit();
        }
        if (response.choice === "Add Item") {
            const addItemResponse = await inquirer.prompt({
                name: "itemName",
                type: "input",
                message: "Enter the name of the item:"
            });
            const item = new Item(addItemResponse.itemName);
            inventory.addItem(item);
            console.log(chalk.green(`Item "${item.name}" added to inventory.`));
        }
        if (response.choice === "List Items") {
            inventory.listItems();
        }
        if (response.choice === "Remove Item") {
            const removeItemResponse = await inquirer.prompt({
                name: "itemName",
                type: "input",
                message: "Enter the name of the item to remove:"
            });
            inventory.removeItem(removeItemResponse.itemName);
            console.log(chalk.green(`Item "${removeItemResponse.itemName}" removed from inventory.`));
        }
    }
};
startProgram(inventory);
