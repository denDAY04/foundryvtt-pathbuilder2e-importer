import Globals from "../Globals";
import Color from "color";

class Logger {
	// static class
	private constructor() {}

	private static GetCurrentTime(): string {
		return `[${(new Date().toLocaleTimeString())}] `;
	}

	static log(str: string, colour: Color = Color("white"), bold = false): void {
		const time = ToConsole(Logger.GetCurrentTime(), Color("gray"), false)
		const moduleName = ToConsole(Globals.ModuleName + " ", Color("cyan"), true);
		const text = ToConsole(str, colour, bold);
		console.log(time.str + moduleName.str + text.str, ...time.params.concat(moduleName.params, text.params));
	}

	static err(str: string): void {
		Logger.log(str, Color("orange"));
	}

	static warn(str: string): void {
		Logger.log(str, Color("yellow"));
	}

	static ok(str: string): void {
		Logger.log(str, Color("green"));
	}
}

interface ConsoleColour {
	str: string,
	params: Array<string>;
}

const ToConsole = (str: string, col: Color, bold: boolean): ConsoleColour => {
	return {
		str: `%c` + str + `%c`,
		params: [
			"color: " + col.hex() + ";" + (bold ? "font-weight: bold;" : ""),
			"color: unset; font-weight: unset;"
		]
	}
};

export default Logger;