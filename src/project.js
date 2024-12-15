import { currentlySelected } from "./sidebar";
import { MainDisplay } from "./classes";

export function InitMainDisplay (contentDiv) {
    let display = new MainDisplay();
    
    let projectPageDiv = document.createElement ('div');
    projectPageDiv.classList.add ('project-page');
    contentDiv.append (projectPageDiv);

    display.DomSetup(projectPageDiv);
}

export function ChangeDisplay() {
    
}
