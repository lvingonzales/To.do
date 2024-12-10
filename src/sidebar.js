import { containerDiv } from "./main";
import removeProjIcon from "./resources/icons/minus.svg";

export function CreateSidebar () {
    const sidebarDiv = document.createElement ('div');
    sidebarDiv.classList.add ('sidebar');
    containerDiv.appendChild (sidebarDiv);

    function CreateHeader () {
        let headerDiv = document.createElement ('div');
        headerDiv.classList.add ('header');
        sidebarDiv.appendChild (headerDiv);

        let logoDiv = document.createElement ('div');
        logoDiv.classList.add ('logo');
        logoDiv.innerText = "TO.DO";
        headerDiv.appendChild (logoDiv);

        let removeProjButton = document.createElement ('button');
        let removeProjButtonIcon = document.createElement ('img');
        removeProjButtonIcon.src = removeProjIcon;
        
    }
}
