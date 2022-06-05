import Logger from "./Logger";

class Announcer {
	private constructor() {
		// static class
	}

	private static message(message: string, sticky: boolean, level: Level = Level.INFO): void {
		const options = {
			permanent: sticky,
		};
		switch (level) {
			case Level.INFO:
				Logger.log(message);
				return ui.notifications?.info(message, options);
			case Level.WARNING:
				Logger.warn(message);
				return ui.notifications?.warn(message, options);
			case Level.ERROR:
				Logger.err(message)
				return ui.notifications?.error(message, options);
		}
	}

	static error(str: string, sticky = false): void {
		let message = str;
		if (!message.startsWith("Error:")) {
			message = "Error: " + message;
		}
		Announcer.message(message, sticky, Level.ERROR);
	}

	static info(str: string, sticky = false): void {
		Announcer.message(str, sticky);
	}

	static warn(str: string, sticky = false): void {
		Announcer.message(str, sticky, Level.WARNING);
	}
}

enum Level {
	INFO,
	WARNING,
	ERROR,
}

export default Announcer;
