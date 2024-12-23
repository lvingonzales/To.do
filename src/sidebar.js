import { containerDiv, projects, Project} from "./main";
import removeProjIcon from "./resources/icons/minus.svg";
import addProjIcon from "./resources/icons/plus.svg";
import { ChangeDisplay, changeProject, enableEditing, setIsEditable } from "./project-page";
import { clearTaskList, loadTaskList } from "./tasklist";

class ProjectTab {
    constructor (parent) {
        this.project = parent;
        this.title = parent.title;
        this.date = parent.date;
        this.domElement = document.createElement ('div');
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
    
    domSetup() {
        const projectPane = sidebar.projectPane;

        let projectSideDiv = this.domElement;
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
        projectName.textContent = this.title;
        projectName.classList.add ('project-name', 'side')
        projectSideDiv.append (projectName);

        let projectDate = document.createElement ('span');
        projectDate.textContent = this.date;
        projectDate.classList.add ('project-date', 'side')
        projectSideDiv.append (projectDate);
    }
    updateInfo () {
        this.domElement.remove();
        while (this.domElement.lastElementChild) {
            this.domElement.removeChild (this.domElement.lastElementChild);
        }
        this.title = this.project.title;
        this.date = this.project.date;
        this.domSetup();
    }
    OnMouseClick() {
        if (removeMode) {
            let index = projects.findIndex(element => element === this);
            this.domElement.remove();
            projects.splice(index, 1);
            sidebar.removeButton.CheckProjects();
            if (getProject().title !== "Tasks") {
                SelectProject(taskSection);
            }
        } else {
            SelectProject(this.project);
        }
    }
    OnMouseOver() {
        if (removeMode) {
            this.hoverRed();
        } else {
            if(currentlySelected !== this.project){
                this.hoverGrey();
            }
            
        }
        
    }
    OnMouseOut () {
        if (removeMode) {
            this.rModeActive();
        }
        else {
            if (currentlySelected !== this.project){
                this.hoverNone();
            }
        }
    }
}

class TaskTab {
    constructor (project) {
        this.project = project;
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

    domSetup () {
        this.domElement = document.createElement ('div');
        let TaskButton = this.domElement;
        TaskButton.classList.add ("task-button");
        TaskButton.textContent = "Tasks";
        TaskButton.addEventListener("click", (e) => this.OnMouseClick(e));
        TaskButton.addEventListener("mouseover", (e) => this.OnMouseOver(e));
        TaskButton.addEventListener("mouseout", (e) => this.OnMouseOut(e)); 
    }

    OnMouseClick () {
        SelectProject(this.project);
    }

    OnMouseOver () {
        if (currentlySelected !== this.project ) this.hoverGrey();
    }

    OnMouseOut() {
        if (currentlySelected !== this.project ) this.hoverNone();
    }
}

class SidebarButtons {
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
            if (projects.length === 1) return alert(`Nothing here boss`);
            removeMode = removeMode ? removeMode = false : removeMode = true;
            this.SwitchRemoveMode();
        } else {
            removeMode = false;
            sidebar.removeButton.SwitchRemoveMode();
            this.AddProject();
        }
    }

    CheckProjects() {
        if (projects.length === 1) {
            removeMode = false;
            this.hoverNone();
            SelectProject(taskSection)
        }
    }

    SwitchRemoveMode() {
        if (removeMode) {
            this.active();
            for (let project of projects) {
                if (project.title === "Tasks") {continue;};
                project.projectTab.rModeActive();
            }
        } else {
            this.hoverNone();
            for (let project of projects) {
                if (project.title === "Tasks") {continue;};
                project.projectTab.hoverNone();
            }
            currentlySelected.projectTab.selected();
        }
    }
    
    AddProject () {
        // let newName;
        // if (!(newName = (prompt(`Enter a name for your project: `)))) return;
        let newProject = new Project("Project Name", "Project Description", "--/--/----");
        newProject.projectTab = new ProjectTab (newProject);
        newProject.projectTab.domSetup();
        projects.push (newProject);
        // setIsEditable(true);
        SelectProject(newProject, true);
    }
}

class SideBar  {
    constructor () {
        this.body;
        this.header;
        this.logo;
        this.logo;
        this.removeButton;
        this.addButton;
        this.projectPane;
    }
    domSetup () {
        this.body = document.createElement ('div');
        this.body.classList.add ('sidebar');
        containerDiv.prepend (this.body);

        this.header = document.createElement ('div');
        this.header.classList.add ('header');
        this.body.append (this.header);

        this.logo = document.createElement ('div');
        this.logo.classList.add ('logo');
        this.logo.innerText = "TO.DO";
        this.header.append (this.logo);

        this.removeButton = new SidebarButtons ("remove", "remove-project", "-", removeProjIcon);
        this.removeButton.DomSetup();
        this.header.append (this.removeButton.domElement);

        this.addButton = new SidebarButtons ("add", "add-project", "+", addProjIcon);
        this.addButton.DomSetup();
        this.header.append (this.addButton.domElement);

        let taskTab = new Project ("Tasks", "These are your unorganized tasks.", "");
        taskTab.projectTab = new TaskTab(taskTab);
        taskTab.projectTab.domSetup();
        this.body.append (taskTab.projectTab.domElement);
        projects.push (taskTab);
        SelectProject (taskTab);
        taskTab.projectTab.selected();
        taskSection = taskTab;

        this.projectPane = document.createElement ('div');
        this.projectPane.classList.add ('project-pane');
        this.body.append (this.projectPane);
    }
}

const sidebar = new SideBar();
let removeMode = false;
let currentlySelected = null;
let taskSection;

function SelectProject (project, isNew) {
    if (isNew) {
        setIsEditable(isNew);
    } else {
        setIsEditable(false);
    }
    if (currentlySelected) {
        if (removeMode) {
            currentlySelected.projectTab.hoverRed();
        } else {
            currentlySelected.projectTab.hoverNone();
        }
    }
    currentlySelected = project;
    project.projectTab.selected();
    changeProject(project);
    clearTaskList();
    loadTaskList(project);
}



function getProject () {
    return currentlySelected;
}


function initSidebar () {
    sidebar.domSetup();
}

export {initSidebar, TaskTab, ProjectTab, getProject}
