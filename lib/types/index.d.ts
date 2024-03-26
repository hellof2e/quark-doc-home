import { QuarkElement } from "quarkc";
import "quark-doc-header";
declare global {
    interface HTMLElementTagNameMap {
        "quark-doc-home": QuarkDocHome;
    }
}
export default class QuarkDocHome extends QuarkElement {
    #private;
    constructor();
    darkMode: boolean;
    activeFwIndex: number;
    iconCopiedChange: boolean;
    componentDidMount(): void;
    scrollTo: () => void;
    copyPrompt: () => void;
    render(): any;
}
