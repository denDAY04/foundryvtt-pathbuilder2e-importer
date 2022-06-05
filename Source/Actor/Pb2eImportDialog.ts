import Globals from "../Globals";
import Announcer from "../Utils/Announcer";
import Logger from "../Utils/Logger";
import { Gateway, PathBuilder2ECharacterResponse, Translator } from "./Pathbuilder";

/**
 * Dialog object for the Pathbuilder2e importer.
 */
export class Pb2eImportDialog extends FormApplication<FormApplicationOptions, DialogData, CharacterPF2e> {

	protected async _updateObject(event: Event, formData?: DialogData): Promise<unknown> {
		if (!formData?.exportCode) {
			Announcer.error("Missing export code", true)
			return Promise.reject();
		}

		Logger.log("Importing character with code " + formData?.exportCode);
		console.log(this.object);

		try {
			const gatewayResponse = await Gateway.get().fetchExportedCharacter(formData?.exportCode);
			return gatewayResponse.json()
				.then(this.handleJsonData)
				.catch(this.handleJsonError);
		} catch(err) {
			Announcer.error("Could not contact the Pathbuilder API", true);
			return Promise.reject(err);
		}
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

	handleJsonData(characterImport: PathBuilder2ECharacterResponse): Promise<any> {
		if (characterImport.success && characterImport.build) {
			Announcer.info("Character import successful");

			Logger.log(JSON.stringify(characterImport.build));
			
			Translator.get().translate(characterImport.build);
			return Promise.resolve();
		} else {
			Announcer.error("Bad import data", true);
			return Promise.reject();
		}
	}

	handleJsonError(err: unknown): Promise<any> {
		Announcer.error("Failed to read import data", true);
		return Promise.reject(err);
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