const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// const openSyntaxGuide = vscode.commands.registerCommand('htsl-vscode.openSyntaxGuide', () => {
    //     vscode.env.openExternal(vscode.Uri.parse("https://hypixel.net/threads/updated-guide-htsl.5555038/"));
    // });

    // context.subscriptions.push(openSyntaxGuide);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
