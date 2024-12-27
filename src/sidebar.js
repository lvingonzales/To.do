import { containerDiv, projects, Project, getProject} from "./main";
import removeProjIcon from "./resources/icons/minus.svg";
import addProjIcon from "./resources/icons/plus.svg";
import { changeProject, setIsEditable } from "./project-page";
import { clearTaskList, loadTaskList } from "./tasklist";

class ProjectTab {
    constructor (project) {
        this.projectId = project.id;
        this.title = document.createElement ('span');
        this.date = document.createElement ('span');
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
        let project = getProject(this.projectId);
        console.log (project.id)

        let projectSideDiv = this.domElement;
        projectSideDiv.classList.add ('project', 'side');
        projectPane.append (projectSideDiv);
        projectSideDiv.dataset.func = "project";
        console.log (`add listeners`);
        projectSideDiv.addEventListener("mouseover", (e) => this.OnMouseOver(e));
        projectSideDiv.addEventListener("mouseout", (e) => this.OnMouseOut(e));
        projectSideDiv.addEventListener("click", (e) => {
            console.log (e.target);
            this.OnMouseClick(e)
        });

        let statusDiv = document.createElement ('div');
        statusDiv.classList.add ('status-light');
        projectSideDiv.append (statusDiv);

        this.title.classList.add ('project-name', 'side')
        this.title.textContent = project.title;
        projectSideDiv.append (this.title);

        this.date.classList.add ('project-date', 'side')
        this.date.textContent = project.date;
        projectSideDiv.append (this.date);
    }
    updateInfo (project) {
        this.title.textContent = project.title;
        this.date.textContent = project.date;
        //this.domSetup();
    }
    OnMouseClick() {
        let project = getProject (this.projectId);
        console.log (`clicked`);
        if (removeMode) {
            let index = projects.findIndex(element => element.id === this.projectId);
            this.domElement.remove();
            projects.splice(index, 1);
            sidebar.removeButton.CheckProjects();
            localStorage.setItem("projects", JSON.stringify(projects))
            SelectProject(taskSection);
        } else {
            SelectProject(project);
        }
    }
    OnMouseOver() {
        if (removeMode) {
            this.hoverRed();
        } else {
            if (this.domElement.style.backgroundColor !== "black") {
                this.hoverGrey;
            }
        }
        
    }
    OnMouseOut () {
        if (removeMode) {
            this.rModeActive();
        }
        else {
            if (this.domElement.style.backgroundColor !== "black"){
                this.hoverNone();
            }
        }
    }
}

class TaskTab {
    constructor () {
        this.projectId = 0;
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
        SelectProject(getProject(this.projectId));
    }

    OnMouseOver () {
        
    }

    OnMouseOut() {
        
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
            
            getSelectedProject().projectTab.selected();
        }
    }
    
    AddProject () {
        let newProject = new Project("Project Name", "Project Description", "--/--/----");
        newProject.projectTab = new ProjectTab (newProject);
        projects.push (newProject);
        newProject.projectTab.domSetup();
        SelectProject(getProject(newProject.id), true);
        localStorage.setItem("projects", JSON.stringify(projects));
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
    domSetup (taskTab) {
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

        this.body.append (taskTab.projectTab.domElement);

        this.removeButton = new SidebarButtons ("remove", "remove-project", "-", removeProjIcon);
        this.removeButton.DomSetup();
        this.header.append (this.removeButton.domElement);

        this.addButton = new SidebarButtons ("add", "add-project", "+", addProjIcon);
        this.addButton.DomSetup();
        this.header.append (this.addButton.domElement);

        this.projectPane = document.createElement ('div');
        this.projectPane.classList.add ('project-pane');
        this.body.append (this.projectPane);
    }
}

const sidebar = new SideBar();
let removeMode = false;
let taskSection;
let selectedProject;

function SelectProject (project, isNew) {
    selectedProject = project;
    if (isNew) {
        setIsEditable(isNew);
    } else {
        setIsEditable(false);
    }

    projects.forEach (item => {
        if (removeMode && item.title !== "Tasks") {
            item.projectTab.rModeActive();
        } else {
            item.projectTab.hoverNone();
        }
    });

    project.projectTab.selected();

    clearTaskList();
    changeProject(project);
    //loadTaskList(project);
}

function getSelectedProject () {
    return selectedProject;
}

function initSidebar (taskTab) {
    taskTab.projectTab = new TaskTab(taskTab);
    taskTab.projectTab.domSetup();
    sidebar.domSetup(taskTab);
    taskSection = taskTab;
}

export {initSidebar, TaskTab, ProjectTab, getSelectedProject, SelectProject}
