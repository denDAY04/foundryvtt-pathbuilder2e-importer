import { Pb2eImportDialog } from "./Pb2eImportDialog";
import Logger from "../Utils/Logger";


export function listen(): void {
	Hooks.on("getCharacterSheetPF2eHeaderButtons", addCharacterHeaderButton);
}


function addCharacterHeaderButton(characterSheet: any, buttons: ApplicationHeaderButton[]): void {
	Logger.Log("Adding character header button");
	buttons.unshift({
		label: "Import from Pathbuilder",
		class: "import",
		icon: "fas fa-download",
		onclick: (event: Event) => { openDialog(event) }
	});
}

function openDialog(event: Event): void {
	Logger.Log("Opening dialog")
	// TODO continue with https://hackmd.io/@akrigline/ByHFgUZ6u/%2FNBub2oFIT6yeh4NlOGTVFw
	new Pb2eImportDialog({} as Document).render(true); 
}


interface ApplicationHeaderButton {
	label: string;
	class: string;
	icon: string;
	onclick: ((event: Event) => void) | null;
}
