import Globals from "../Globals";
import Logger from "../Utils/Logger";
import { Gateway, PathBuilder2ECharacterResponse, Translator } from "./Pathbuilder";

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
			.then(this.handleImportData)
			.catch(this.handleImportError);
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

	handleImportData(characterImport: PathBuilder2ECharacterResponse): Promise<any> {
		Logger.Log("Gateway request success")

		if (characterImport.success && characterImport.build) {
			Logger.Log("Character export fetch successful");
			ui.notifications?.info("Character import successful");

			Logger.Log(JSON.stringify(characterImport.build));
			
			Translator.get().translate(characterImport.build);
		} else {
			Logger.Err("Character export fetch error");
			ui.notifications?.error("Character import failed", {permanent: true});
		}

		return Promise.resolve();
	}

	handleImportError(err: any): Promise<any> {
		Logger.Err("Gateway request failed");
		Logger.Log(err.toString())
		ui.notifications?.error("Could not contact the Pathbuilder site", {permanent: true});

		return Promise.resolve();
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