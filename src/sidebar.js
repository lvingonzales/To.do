import { containerDiv, projects } from "./main";
import removeProjIcon from "./resources/icons/minus.svg";
import addProjIcon from "./resources/icons/plus.svg";

export function Sidebar () {
    const sidebarDiv = document.createElement ('div');
    const headerDiv = document.createElement ('div');
    const logoDiv = document.createElement ('div');
    const removeProjButton = document.createElement ('button');
    const addProjButton = document.createElement ('button');
    const projectPaneDiv = document.createElement ('div');
    let removeMode = false;

    class Project {
        constructor (name) {
            this.name = name;
        }
        CreateSideEntry() {
            let projectSideDiv = document.createElement ('div');
            projectSideDiv.classList.add ('project', 'side');
            projectPaneDiv.append (projectSideDiv);
            projectSideDiv.dataset.func = "project";
            projectSideDiv.addEventListener("click", InputHandler);
            let statusDiv = document.createElement ('div');
            statusDiv.classList.add ('status-light');
            projectSideDiv.append (statusDiv);
            let projectName = document.createElement ('span');
            projectName.textContent = this.name;
            projectName.classList.add ('project-name', 'side')
            projectSideDiv.append (projectName);
            let projectDate = document.createElement ('span');
            projectDate.textContent = `--/--/----`;
            projectDate.classList.add ('project-date', 'side')
            projectSideDiv.append (projectDate);
            this.domElement = projectSideDiv;
        }
    }
    
    const appendDoms = () => {
    // Create The Main Div
    sidebarDiv.classList.add ('sidebar');
    containerDiv.prepend (sidebarDiv);

    // Create the Header Div
    headerDiv.classList.add ('header');
    sidebarDiv.append (headerDiv);

    // Create the logo Div
    logoDiv.classList.add ('logo');
    logoDiv.innerText = "TO.DO";
    headerDiv.append (logoDiv);

    // Add remove project button
    removeProjButton.classList.add ('remove-project');
    removeProjButton.dataset.func = "-";
    headerDiv.append (removeProjButton);
    let removeProjButtonIcon = document.createElement ('img');
    removeProjButtonIcon.src = removeProjIcon;
    removeProjButton.append (removeProjButtonIcon);
    removeProjButton.addEventListener("click", InputHandler);

    // Add Add project button
    addProjButton.classList.add ('add-project');
    addProjButton.dataset.func = "+";
    headerDiv.append (addProjButton);
    let addProjButtonIcon = document.createElement ('img');
    addProjButtonIcon.src = addProjIcon;
    addProjButton.append (addProjButtonIcon);
    addProjButton.addEventListener("click", InputHandler);

    // Create the project pane
    projectPaneDiv.classList.add ('project-pane');
    sidebarDiv.append (projectPaneDiv);
    }
    
    const getProjectPane = () => projectPaneDiv;

    function InputHandler (e) {
        const selectedFunction = e.currentTarget.dataset.func;
        console.log (e);

        if (selectedFunction == "+") {
            addProject();
        } else if (selectedFunction == "-") {
            removeProject();
        } else if (selectedFunction == "project") {
            onClickProject();
        }
        function addProject () {
            projects.push (new Project(`New Project`));
            const newProject = projects.findLast((element) => element);

            newProject.CreateSideEntry();
            console.log (projects);
        }
        
        function removeProject () {
            activateRemovalMode();
        }

        function onClickProject () {
            if (removeMode) {
                const projectIndex = projects.findIndex(element => element.domElement === e.currentTarget);
                
                projects[projectIndex].domElement.remove();
                projects.splice(projectIndex, 1);

            }
        }
    }

    function activateRemovalMode () {
        if (removeMode) {
            removeMode = false;
        } else {
            removeMode = true;
        }

        if (removeMode) {
            removeProjButton.style.backgroundColor = "black";
        } else {
            removeProjButton.style.backgroundColor = "transparent";
        }
    }

    appendDoms();
}
