export {}; // the fil needs to be marked as a module, e.g. either containing imports or exports

declare global {

    class CharacterPF2e {
        ancestry: unknown | null;
        heritage: unknown | null;
        background: unknown | null;
        class: unknown | null;
        deity: unknown | null;
    }

    namespace CharacterPF2e {

    }
}
