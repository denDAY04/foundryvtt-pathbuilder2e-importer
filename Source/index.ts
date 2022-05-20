import Logger from "./Utils/Logger";
import PreloadTemplates from "./PreloadTemplates";
import { RegisterSettings } from "./Utils/Settings";
import { Gateway, CharacterImport } from "./Pathbuilder";

Hooks.once("init", async () => {
	RegisterSettings();
	await PreloadTemplates();
});

Hooks.once("setup", () => {
	Logger.Log("Module is being setup.")
});

Hooks.once("ready", async () => {
	Logger.Ok("Module is now ready.");

	Logger.Log("Testing Gateway");
	const gatewayResponse = await Gateway.get().fetchExportedCharacter("120206");
	gatewayResponse.json()
		.then((characterImport: CharacterImport) => {
			Logger.Ok("Gateway request success")
			if (characterImport.success) {
				Logger.Ok("Character imported successful");
				Logger.Log(JSON.stringify(characterImport.build))
			} else {
				Logger.Err("Character imported failed");
			}
		})
		.catch((err: any) => {
			Logger.Err("Gateway request failed: " + err); 
		});
});