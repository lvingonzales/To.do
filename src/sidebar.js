import { containerDiv, projects} from "./main";
import removeProjIcon from "./resources/icons/minus.svg";
import addProjIcon from "./resources/icons/plus.svg";



let globalSidebarDoms = null;
let removeMode = false;
class Project {
    constructor (name) {
        this.name = name;
        this.domElement;
        this.currentlySelected;
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
        this.rModeActive = () => this.domElement.style.backgroundColor = "red";
    }
    
    CreateSideEntry() {
        const projectPane = globalSidebarDoms.getProjectPane();

        let projectSideDiv = document.createElement ('div');
        projectSideDiv.classList.add ('project', 'side');
        projectPane.append (projectSideDiv);
        projectSideDiv.dataset.func = "project";
        projectSideDiv.addEventListener("mouseover", (e) => this.OnMouseClick(e));
        projectSideDiv.addEventListener("mouseout", (e) => this.OnMouseClick(e));
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
        let removeMode = InputHandler().getRemoveMode();
        if (removeMode) {
            let index = projects.findIndex(element => element.domElement === this);
            this.domElement.remove();
            projects.splice(index, 1);
        } else {
            projects.forEach((item) => {
                item.currentlySelected = false;
                item.hoverNone();
            })
            this.currentlySelected = true;
            this.selected();
            console.log (this);
        }
    }
    OnMouseOver() {
        let removeMode = InputHandler().getRemoveMode();
        if (removeMode) {
            this.hoverRed();
        } else {
            if(!this.currentlySelected){
                this.hoverGrey();
            }
            
        }
        
    }
    OnMouseOut () {
        let removeMode = InputHandler().getRemoveMode();
        if (removeMode) {
            this.rModeActive();
        }
        else {
            if (!this.currentlySelected){
                this.hoverNone();
            }
        }
    }
}

function CreateSidebarDoms () {
    const inputHandler = InputHandler();
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
        const removeProjButton = document.createElement ('button');
        removeProjButton.classList.add ('remove-project');
        removeProjButton.dataset.func = "-";
        let removeProjButtonIcon = document.createElement ('img');
        removeProjButtonIcon.src = removeProjIcon;
        removeProjButton.append (removeProjButtonIcon);
        removeProjButton.addEventListener("click", inputHandler.removeProject);
        removeButton = removeProjButton;
    }
    const getRemoveButton = () => removeButton;

    const setAddButton = () => {
        // Add Add project button
        const addProjButton = document.createElement ('button');
        addProjButton.classList.add ('add-project');
        addProjButton.dataset.func = "+";
        let addProjButtonIcon = document.createElement ('img');
        addProjButtonIcon.src = addProjIcon;
        addProjButton.append (addProjButtonIcon);
        addProjButton.addEventListener("click", inputHandler.addProject);
        addButton = addProjButton;
    }
    const getAddButton = () => addButton;

    const setProjectPane = () => {
        // Create the project pane
        const projectPaneDiv = document.createElement ('div');
        projectPaneDiv.classList.add ('project-pane');
        projectPane = projectPaneDiv;
    }
    const getProjectPane = () => projectPane;

    return {getSideBar, getLogo, getHeader, getRemoveButton, getAddButton, getProjectPane,
        setSideBar, setHeader, setLogo, setRemoveButton, setAddButton, setProjectPane,
    }
}

function InputHandler () {

    const setRemoveMode = () => removeMode = removeMode ? removeMode = false : removeMode = true;

    const getRemoveMode = () => removeMode;

    function addProject () {
        let newName = prompt(`Enter a name for your project: `);
        projects.push (new Project(newName));
        const newProject = projects.findLast((element) => element);
        newProject.CreateSideEntry();
        SelectProject(newProject);
        // console.log (projects);
    }
    
    function removeProject () {
        if (projects.length === 0) return alert(`NO PROJECTS TO DELETE`);
        setRemoveMode();
        if (getRemoveMode()) {
            projects.forEach((item) => {
                item.domElement.style.backgroundColor = "red";
            })
        } else {
            projects.forEach((item) => {
                item.domElement.style.backgroundColor = "transparent";
            })
        }
    }
    
    function SelectProject (selectedProject) {
        projects.forEach( project => {
            if (project !== selectedProject) {
                project.currentlySelected = false;
                project.hoverNone();
            }
        });

        selectedProject.currentlySelected = true;
        selectedProject.selected();
    }

    return {addProject, removeProject, getRemoveMode, SelectProject}
}

export function SidebarDisplay () {
    globalSidebarDoms = CreateSidebarDoms();

    globalSidebarDoms.setSideBar();
    const sidebar = globalSidebarDoms.getSideBar();
    globalSidebarDoms.setHeader();
    const header = globalSidebarDoms.getHeader();
    
    containerDiv.prepend (sidebar);
    sidebar.append (header);
    globalSidebarDoms.setLogo();
    header.append (globalSidebarDoms.getLogo());
    globalSidebarDoms.setRemoveButton();
    header.append (globalSidebarDoms.getRemoveButton());
    globalSidebarDoms.setAddButton();
    header.append (globalSidebarDoms.getAddButton());
    globalSidebarDoms.setProjectPane();
    sidebar.append (globalSidebarDoms.getProjectPane());

}
