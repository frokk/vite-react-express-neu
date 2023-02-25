const fs = require("fs");

fs.renameSync("./neutralino.config.json", "./neutralino.config.json.bak");

var json = JSON.parse(fs.readFileSync("./neutralino.config.json.bak", { encoding: "utf-8" }));
json.extensions.forEach((extension, i) => {
	if (json.extensions[i].id = "js.neutralino.nodejs.express_extension") {
		json.extensions[i].command = "./server";
	}
})

fs.writeFileSync("./neutralino.config.json", JSON.stringify(json), { encoding: "utf-8" });

