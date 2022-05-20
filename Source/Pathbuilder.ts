
const PATHBUILDER_URL_BASE = "https://pathbuilder2e.com/json.php?id=";

/**
 * Singleton gateway to the Pathbuilder2e API.
 */
export class Gateway {
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
 * JSON body of the response from Pathbuilder when importing a character
 */
export interface CharacterImport {
	/**
	 * Indicates whether the request for the exported character was successful.
	 */
	success: boolean;
	/**
	 * The character's data.
	 */
	build?: JSON;
}
