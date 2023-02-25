const fs = require("fs");
const pkg = require("pkg");

pkg.exec(['express/main.js', '--target', 'host', '--output', 'server']).then(function() {
	fs.renameSync("./neutralino.config.json.bak", "./neutralino.config.json");
	fs.renameSync("./server", "./dist/express-neu/server");
}).catch(err => {
	console.error(err);
});

