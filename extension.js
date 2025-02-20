// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { WebSocketServer } = require("ws");
const fs = require('fs');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ptsl-plus" is now active!');

	let ws;
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('ptsl-plus.startsocket', async function () {
		const userResponse = await vscode.window.showInputBox({
			placeHolder: 'Type the port number to start the websocket server',
			value: '7000'
		  });
		if (!userResponse) 
			return;
		const port = parseInt(userResponse);
		if (isNaN(port)) {
			vscode.window.showErrorMessage('Invalid port number');
			return
		}
		// The code you place here will be executed every time your command is executed
		ws = new WebSocketServer({ port: port });
		ws.on("connection", (socket) => {
			socket.on("message", (message) => {
				console.log("Received: " + message);
				socket.send("Echo: " + message);
			});
		});
		// Display a message box to the user
		vscode.window.showInformationMessage('PTSL+ Websocket Server started on port ' + port);
	});


	context.subscriptions.push(disposable);
	context.subscriptions.push(vscode.workspace.onDidSaveTextDocument((e) => {
		if (e.fileName.endsWith(".ptsl")) {
			if (ws) {
				ws.clients.forEach((client) => {
					client.send(JSON.stringify({
						"file": e.fileName,
						"content": e.getText()
					}));
				});
			}
		}
	}));
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
