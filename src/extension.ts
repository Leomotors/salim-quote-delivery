import * as vscode from 'vscode';
import fetch from "node-fetch";

const SalimAPIUrl: string = "https://watasalim.vercel.app/api/quotes"
const AllSalimQuotes: string = "https://github.com/narze/awesome-salim-quotes/blob/main/README.md"

const LinkToHeaven: string = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
const RickRollChance: number = 5

let QuoteArray: string[] = []

export async function activate(context: vscode.ExtensionContext) {

    // * Fetching Quotes from API
    fetch(SalimAPIUrl, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" }
    }).then(response => response.json())
        .then(json => {
            for (let quote of json.quotes) {
                QuoteArray.push(quote.body)
            }
            console.log("[EXTENSION'S QUOTE READY] Successfully pulled quote data from narze's repository")
        })
        .catch(err => console.log(err))

    let deliwry: vscode.Disposable = vscode.commands.registerCommand('salim-quote-delivery.getSalimQuote', () => {
        // * Check for Errors
        if (QuoteArray.length == 0) {
            vscode.window.showErrorMessage("ERROR: Quote Array is empty. There maybe issues initializing or API is down.")
            return
        }

        // * Random Quote Index
        let randIndex: number = Math.floor(Math.random() * QuoteArray.length)

        // * Show it
        vscode.window.showInformationMessage(`${QuoteArray[randIndex]} (#${randIndex + 1})`);

        // * You have a Chance to be sent to Heaven
        if (Math.floor(Math.random() * 100) < RickRollChance) {
            vscode.env.openExternal(vscode.Uri.parse(LinkToHeaven))
        }
    })

    let showAllQuotes: vscode.Disposable = vscode.commands.registerCommand('salim-quote-delivery.showAllQuotes', () => {
        vscode.env.openExternal(vscode.Uri.parse(AllSalimQuotes))
    })

    context.subscriptions.push(deliwry)
    context.subscriptions.push(showAllQuotes)
}

export function deactivate() { }
