import { Pb2eImportDialog } from "./Pb2eImportDialog";
import Logger from "../Utils/Logger";
import Announcer from "../Utils/Announcer";


export function listen(): void {
	Hooks.on("getCharacterSheetPF2eHeaderButtons", addCharacterHeaderButton);
}


function addCharacterHeaderButton(characterSheet: any, buttons: ApplicationHeaderButton[]): void {
	Logger.log("Adding character header button");
	buttons.unshift({
		label: "Import from Pathbuilder",
		class: "import",
		icon: "fas fa-download",
		onclick: (event: Event) => { openDialog(event) }
	});
}

function openDialog(event: any): void {
	Logger.log("Opening dialog")

	const $actorSheet = $(event.currentTarget).closest("div.sheet.actor.character")[0];
	const actorId: string = ($actorSheet.id as string).replace("actor-", "");

	const actor: CharacterPF2e | undefined = (game as {actors: Collection<CharacterPF2e>}).actors.get(actorId); 

	if (!actor) {
		Logger.log("Found no actor with ID " + actorId);
		Announcer.error("Failed to resolve the active character", true);
	} else {
		new Pb2eImportDialog(actor).render(true); 
	}
}


interface ApplicationHeaderButton {
	label: string;
	class: string;
	icon: string;
	onclick: ((event: Event) => void) | null;
}
