import { containerDiv, projects} from "./main";
import removeProjIcon from "./resources/icons/minus.svg";
import addProjIcon from "./resources/icons/plus.svg";
import { ChangeDisplay } from "./project";


let globalSidebarDoms = null;
let removeMode = false;
export let currentlySelected = null;
class Project {
    constructor (name) {
        this.name = name;
        this.domElement;
        this.hoverNone = () => {
            this.domElement.style.backgroundColor = "transparent"
            this.domElement.style.color = "black";
        };
        this.hoverRed = () => this.domElement.style.backgroundColor = "darkred";
        this.hoverGrey = () => this.domElement.style.backgroundColor = "grey";
        this.selected = () => {
            this.domElement.style.backgroundColor = "black";
            this.domElement.style.color = "white";
        };
        this.rModeActive = () => {
            this.domElement.style.backgroundColor = "red";
            this.domElement.style.color = "white";
        };
    }
    
    CreateSideEntry() {
        const projectPane = globalSidebarDoms.getProjectPane();

        let projectSideDiv = document.createElement ('div');
        projectSideDiv.classList.add ('project', 'side');
        projectPane.append (projectSideDiv);
        projectSideDiv.dataset.func = "project";
        projectSideDiv.addEventListener("mouseover", (e) => this.OnMouseOver(e));
        projectSideDiv.addEventListener("mouseout", (e) => this.OnMouseOut(e));
        projectSideDiv.addEventListener("click", (e) => this.OnMouseClick(e));

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
        console.log (this);
    }
    OnMouseClick() {
        if (removeMode) {
            let index = projects.findIndex(element => element === this);
            this.domElement.remove();
            projects.splice(index, 1);
            let removeButton = globalSidebarDoms.getRemoveButton();
            console.log (removeButton);
            removeButton.CheckProjects();

        } else {
            SelectProject(this);
        }
    }
    OnMouseOver() {
        if (removeMode) {
            this.hoverRed();
        } else {
            if(currentlySelected !== this){
                this.hoverGrey();
            }
            
        }
        
    }
    OnMouseOut () {
        if (removeMode) {
            this.rModeActive();
        }
        else {
            if (currentlySelected !== this){
                this.hoverNone();
            }
        }
    }
}

class TaskButton {
    constructor () {
        this.hoverNone = () => {
            this.domElement.style.backgroundColor = "transparent"
            this.domElement.style.color = "black";
        };
        this.hoverGrey = () => this.domElement.style.backgroundColor = "grey";
        this.selected = () => {
            this.domElement.style.backgroundColor = "black";
            this.domElement.style.color = "white";
        };
    }

    DomSetup () {
        this.domElement = document.createElement ('div');
        let TaskButton = this.domElement;
        TaskButton.classList.add ("task-button");
        TaskButton.textContent = "Tasks";
        TaskButton.addEventListener("click", (e) => this.OnMouseClick(e));
        TaskButton.addEventListener("mouseover", (e) => this.OnMouseOver(e));
        TaskButton.addEventListener("mouseout", (e) => this.OnMouseOut(e));
    }

    OnMouseClick () {
        SelectProject(this);
    }

    OnMouseOver () {
        if (currentlySelected !== this ) this.hoverGrey();
    }

    OnMouseOut() {
        if (currentlySelected !== this) this.hoverNone();
    }
}

class Buttons {
    constructor (name, classes, func, icon) {
        this.name = name;
        this.classes = classes;
        this.func = func;
        this.icon = icon;
        this.domElement;
        this.hoverNone = () => this.domElement.style.backgroundColor = "transparent";
        this.hoverGrey = () => this.domElement.style.backgroundColor = "grey";
        this.active = () => this.domElement.style.backgroundColor = "red";
    }
    DomSetup () {
        this.domElement = document.createElement('button');
        let button = this.domElement;
        button.classList.add (this.classes);
        button.dataset.func = this.func;
        let buttonIcon = document.createElement ('img');
        buttonIcon.src = this.icon;
        button.appendChild (buttonIcon);
        button.addEventListener("mouseover", (e) => this.OnMouseOver(e));
        button.addEventListener("mouseout", (e) => this.OnMouseOut(e));
        button.addEventListener("click", (e) => this.OnMouseClick(e));
        this.hoverNone();
    }

    OnMouseOver () {
        if (this.func === "-") {
            this.active();
        } else {
            this.hoverGrey();
        }
    }

    OnMouseOut () {
        if (this.func === "-" && !removeMode) {
            this.hoverNone();
        } else if (this.func === "+") {
            this.hoverNone();
        }
    }

    OnMouseClick () {
        if (this.func === "-") {
            if (projects.length === 0) return alert(`Nothing here boss`);
            removeMode = removeMode ? removeMode = false : removeMode = true;
            this.SwitchRemoveMode();
        } else {
            removeMode = false;
            globalSidebarDoms.getRemoveButton().SwitchRemoveMode();
            this.AddProject();
        }
    }

    CheckProjects() {
        if (projects.length === 0) {
            removeMode = false;
            this.hoverNone();
        }
    }

    SwitchRemoveMode() {
        if (removeMode) {
            this.active();
            projects.forEach(project => {
                project.rModeActive();
            })
        } else {
            this.hoverNone();
            projects.forEach((project) => {
                project.hoverNone();
            })
            currentlySelected.selected();
        }
    }
    
    AddProject () {
        let newName;
        if (!(newName = (prompt(`Enter a name for your project: `)))) return;
        projects.push (new Project(newName));
        let newProject = projects.findLast(element => element);
        newProject.CreateSideEntry();
        SelectProject(newProject);
    }
}

function SelectProject (selectedProject) {
    if (currentlySelected) {
        currentlySelected.hoverNone();
    }
    currentlySelected = selectedProject;
    selectedProject.selected();
}

function CreateSidebarDoms () {
    let sidebar;
    let logo;
    let header;
    let removeButton;
    let addButton;
    let projectPane;

    
    const setSideBar = () => {
        // Create The Main Div
        const sidebarDiv = document.createElement ('div');
        sidebarDiv.classList.add ('sidebar');
        sidebar = sidebarDiv
    }
    const getSideBar = () => sidebar;

    const setHeader = () => {
        // Create the Header Div
        const headerDiv = document.createElement ('div');
        headerDiv.classList.add ('header');
        header = headerDiv
    }
    const getHeader = () => header;

    const setLogo = () => {
        // Create the logo Div
        const logoDiv = document.createElement ('div');
        logoDiv.classList.add ('logo');
        logoDiv.innerText = "TO.DO";
        logo = logoDiv
    }
    const getLogo = () => logo;

    const setRemoveButton = () => {
        // Add remove project button
        removeButton = new Buttons ("remove", "remove-project", "-", removeProjIcon);
        removeButton.DomSetup();
    }
    const getRemoveButton = () => removeButton;

    const setAddButton = () => {
        // Add Add project button
        addButton = new Buttons ("add", "add-project", "+", addProjIcon);
        addButton.DomSetup();
    }
    const getAddButton = () => addButton;

    const setProjectPane = () => {
        // Create the project pane
        const projectPaneDiv = document.createElement ('div');
        projectPaneDiv.classList.add ('project-pane');
        projectPane = projectPaneDiv;
    }

    const SetupDomElements = () => {
        setSideBar();
        setHeader();
        setLogo();
        setRemoveButton();
        setAddButton();
        setProjectPane();
    }
    const getProjectPane = () => projectPane;

    return {getSideBar, getLogo, getHeader, getRemoveButton, getAddButton, getProjectPane, SetupDomElements}
}

export function SidebarDisplay () {
    globalSidebarDoms = CreateSidebarDoms();
    globalSidebarDoms.SetupDomElements();
    const sidebar = globalSidebarDoms.getSideBar();
    const header = globalSidebarDoms.getHeader();

    containerDiv.prepend (globalSidebarDoms.getSideBar());
    sidebar.append (globalSidebarDoms.getHeader());
    header.append (globalSidebarDoms.getLogo());
    header.append (globalSidebarDoms.getRemoveButton().domElement);
    header.append (globalSidebarDoms.getAddButton().domElement);
    const TaskButtonDiv = new TaskButton();
    TaskButtonDiv.DomSetup();
    sidebar.append (TaskButtonDiv.domElement);
    currentlySelected = TaskButtonDiv;
    TaskButtonDiv.selected();
    sidebar.append (globalSidebarDoms.getProjectPane());

    return {getRemoveButton: globalSidebarDoms.getRemoveButton}
}
