# Pathbuilder2e Importer add-on for FVTT
Foundry Virtual Tabletop add-on for importing Pathfinder characters from Pathbuilder2e.com

## Commands
The following commands are built into the project.
- npm run build
- npm run build:watch
- npm run clean
- npm run package "1.0.0" (replace the version number here with whatever version you are publishing)

Build will convert all of your TS files into a single bundle.js, and all of your less style sheets into css versions (remember to have them included in your module.json)
build:watch will rebuild whenever the files change
Clean will remove the dist folder and any remaining build artefacts.

Package will perform all the prior steps, but will then change all references to the internal version with the new version specified. After doing such, it will generate a new zip file inside of a "package" folder, and automatically commit the file for you.
This commit can then be pushed, and properly updated for people using the module to easily update their own copies.

## Resources

FVTT module making for beginners - https://hackmd.io/@akrigline/ByHFgUZ6u/%2FTi7X9dG_TcexHNw3SVsDKQ

FVTT API - https://foundryvtt.com/api/

FVTT Dev guides - https://foundryvtt.wiki/en/development/guides

FVTT Pathfinder 2E system - https://gitlab.com/hooking/foundry-vtt---pathfinder-2e/