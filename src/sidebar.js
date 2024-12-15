import { containerDiv, projects} from "./main";
import removeProjIcon from "./resources/icons/minus.svg";
import addProjIcon from "./resources/icons/plus.svg";
import { ChangeDisplay } from "./project";
import { TaskButton, Buttons, ProjectButtons } from "./classes";

let globalSidebarDoms = null;
let removeMode = false;
let currentlySelected = null;

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

