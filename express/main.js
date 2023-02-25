const fs = require("fs");
const process = require("process");
const websocket = require("websocket").w3cwebsocket;
const { v4: uuidv4 } = require("uuid");

var NL_PORT = null;  // Port on which our WebSocket connection is on.
var NL_TOKEN = null; // Token is a unique string used to identify that a extension is what it claims to be
var NL_EXTID = null; // Extension Id is like a name of a extension

process.argv.forEach(function(arg) {
	if (arg.startsWith("--nl-port=")) {
		NL_PORT = parseInt(arg.slice("--nl-port=".length));
	} else if (arg.startsWith("--nl-token=")) {
		NL_TOKEN = arg.slice("--nl-token=".length);
	} else if (arg.startsWith("--nl-extension-id=")) {
		NL_EXTID = arg.slice("--nl-extension-id=".length);
	}
});
if (NL_PORT == null || NL_TOKEN == null || NL_EXTID == null) {
	console.error("Failed to fetch connection information.");
	process.exit(1);
}

const WS_URL = `ws://127.0.0.1:${NL_PORT}?extensionId=${NL_EXTID}`;
const ws = new websocket(WS_URL);

ws.onopen = function() {
	console.log("Connected to application!")
};

ws.onerror = function(e) {
	console.log(e);
};

ws.onclose = function(e) {
	console.log(`Connection has been closed.`);
	process.exit(0);
};

ws.onmessage = function(e) {
	if (typeof e.data === "string") {
		const message = JSON.parse(e.data);
		const eventName = message.event;
		switch (eventName) {
			case "windowClose":
				ws.close(0);
				break;
			case "fromAppToExtension":
				const data = message.data;
				console.log("Message received is: ", data);

				ws.send(JSON.stringify({
					id: uuidv4(),
					method: "app.broadcast",
					accessToken: NL_TOKEN,
					data: {
						event: "fromExtensionToApp",
						data: `Hey neu app. NodeJS here. You sent me: ${data}`
					}
				}));
				break;
		}
	}
};


