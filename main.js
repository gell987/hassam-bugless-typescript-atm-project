#!/usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
let answer_user;
let user_cash;
let conditions = false;
let all_cash;
let error;
let data;
const sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
const timeouter = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
const time = (ms = 1000) => new Promise((r) => setTimeout(r, ms));
async function greet() {
    console.clear();
    const rainboxTitle = chalkAnimation.rainbow("Hassam's ATM PIAIC(PIAIC202061)\n");
    await sleep();
    rainboxTitle.stop();
}
async function after_greet() {
    console.log(chalk.black.bgBlueBright(`
enter deposit (to deposit any amount of money since its not real money. after that please enter the amount of money you want to deposit)
enter withdraw (to withdraw the amount ur account has in it.)
enter balance (to check how much money does your account have in it)
if you want to quit enter q
`));
    const answers = await inquirer.prompt({
        name: "user_input",
        type: "input",
        message: "input =",
    });
    answer_user = answers.user_input;
    if (answer_user == "deposit") {
        await time();
        var amount_of_cash = inquirer.prompt({
            name: "cashss",
            type: "number",
            message: "enter the number of money you want to deposit: ",
        });
        let waiting_middle_man = await amount_of_cash;
        user_cash = waiting_middle_man.cashss;
        all_cash = +user_cash;
        await time();
    }
    else if (answer_user == "withdraw") {
        var withdraw_amount = inquirer.prompt({
            name: "withdraw",
            type: "number",
            message: "enter number of money you want to withdraw",
        });
        let withdraw_cash = (await withdraw_amount).withdraw;
        if (all_cash < withdraw_cash) {
            let errorr = createSpinner("insufficient balance try again later!");
            errorr.start();
            await timeouter();
            errorr.error();
        }
        else {
            all_cash -= Number(withdraw_cash);
            console.log(chalk.bgBlack.whiteBright(`
            CHEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE CHO CHO CHO kuz kuz kuz
            please take your money`));
        }
    }
    else if (answer_user == "balance") {
        console.log(chalk.bgWhiteBright.blackBright(`
                your account balance is ${all_cash}
                have a nice day`));
    }
    else if (answer_user == "q") {
        conditions = true;
        process.exit(1);
    }
}
await greet();
while (true) {
    if (conditions == false) {
        await after_greet();
    }
    else {
        break;
    }
}
