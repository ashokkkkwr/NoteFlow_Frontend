import { createContext } from "react";

// Define the interface for the context
interface NoteContextType {
    state: {
        name: string;
        class: string;
    };
    update: () => void;
}
const initialNoteContext: NoteContextType = {
    state: {
        name: "",
        class: ""
    },
    update: () => {}
};
const noteContext = createContext<NoteContextType>(initialNoteContext);

export default noteContext;
