import Globals from "../Globals";
import Logger from "../Utils/Logger";
import { Gateway, PathBuilder2ECharacter } from "./Pathbuilder";

/**
 * Dialog object for the Pathbuilder2e importer.
 */
export class Pb2eImportDialog extends FormApplication<FormApplicationOptions, DialogData, Document> {
	
	protected async _updateObject(event: Event, formData?: DialogData): Promise<unknown> {
		if (!formData?.exportCode) {
			throw new Error("Export code is required");
		}

		logger.log("Importing character with code " + formData?.exportCode);

		const gatewayResponse = await Gateway.get().fetchExportedCharacter(formData?.exportCode);
		return gatewayResponse.json()
			.then((characterImport: PathBuilder2ECharacter) => {
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
	}
	

	close(options?: FormApplication.CloseOptions): Promise<void> {
		return super.close(options);
	}

	static get defaultOptions(): FormApplicationOptions {
		const defaults = super.defaultOptions;
		const overrides = {
			height: "auto",
			id: "pb2e-import-dialog",
			template: `modules/${Globals.ModuleName}/templates/actor/import-dialog.hbs`,
			title: "Pathbuilder2e Character Import",
		};

		return foundry.utils.mergeObject(defaults, overrides);
	}
	
}

/**
 * Type used for the dialog to identify and fetch an exported character.
 */
interface DialogData {
	/**
	 * Code identifying the exported character
	 */
	exportCode: string;
}