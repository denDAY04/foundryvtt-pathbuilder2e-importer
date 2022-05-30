import PreloadTemplates from "./PreloadTemplates";
import * as Pb2eImporterHooks from "./Actor/Pb2eImporterHooks"

Hooks.once("init", async () => {
	await PreloadTemplates();
});

Pb2eImporterHooks.listen();