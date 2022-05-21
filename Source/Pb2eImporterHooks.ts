import Logger from "./Utils/Logger";


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
}


interface ApplicationHeaderButton {
	label: string;
	class: string;
	icon: string;
	onclick: ((event: Event) => void) | null;
}
