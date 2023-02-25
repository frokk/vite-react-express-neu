import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

async function callNodeJSExtension() {
	try {
		console.log("Calling extension with input: " + "Lmao Ass");
		await Neutralino.extensions.dispatch("js.neutralino.nodejs.express_extension", "fromAppToExtension", "Lmao Ass");
	} catch {
		console.log("Error: Extension isn't loaded!");
	}
}

function onNodeJSExtensionResponse(evt) {
	console.log(evt.detail);
}

Neutralino.events.on("fromExtensionToApp", onNodeJSExtensionResponse);
Neutralino.events.on("windowClose", function() { Neutralino.app.exit(); });

Neutralino.events.on("extensionReady", (evt) => {
	console.log("Extension ready: " + evt.detail);
});
Neutralino.events.on("extClientConnect", (evt) => {
	console.log("Extension connected: " + evt.detail);
});

callNodeJSExtension();

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)

