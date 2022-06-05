import { PathBuilder2ECharacter } from "./PathbuilderTypes";

const PATHBUILDER_URL_BASE = "https://pathbuilder2e.com/json.php?id=";

/**
 * Singleton gateway to the Pathbuilder2e API.
 */
class Gateway {
	private static instance: Gateway;

	private constructor() {
		// no public instantiation allowed
	}

	/**
	 * Get the singleton instance.
	 * @returns the gateway instance
	 */
	public static get(): Gateway {
		if (!Gateway.instance) {
			Gateway.instance = new Gateway();
		}
		return Gateway.instance;
	}

	/**
	 * Fetch the data from an exported character identified by a code.
	 * @param exportCode The code identifying the exported character data.
	 * @returns A promise of a response with either an error or the exported data.
	 */
	public fetchExportedCharacter(exportCode: string): Promise<Response> {
		const url: string = PATHBUILDER_URL_BASE + exportCode;
		return window.fetch(url);
	}
}

/**
 * The typeBody of the response from the Pathbuilder API when importing a character.
 */
interface PathBuilder2ECharacterResponse {
	/**
	 * Indicates whether the request for the exported character was successful.
	 */
	success: boolean;
	/**
	 * The character's data.
	 */
	build?: JSON;
}

class Translator {
	private static instance: Translator;

	private constructor() {
		// singleton
	}

	/**
	 * Get the singleton instance.
	 * @returns the translator instance
	 */
	public static get(): Translator {
		if (!Translator.instance) {
			Translator.instance = new Translator();
		}
		return Translator.instance;
	}

	public translate(data: JSON): any {
		const translated: PathBuilder2ECharacter = JSON.parse(JSON.stringify(data));
		console.log(translated);
		// TODO how do we parse this to character
	}
}

export { Gateway, PathBuilder2ECharacterResponse, Translator }