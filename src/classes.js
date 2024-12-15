class Projects {
    constructor (title, description, date) {
        this.id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.notes;
        this.tasks = [];
        CreateSideBarButton();
    }
    CreateSideBarButton () {
        this.sidebarButton = new ProjectButtons(this.title, this.date);
        this.sidebarButton.CreateSideEntry();
    }
}

class MainDisplay {
    constructor () {
        this.titleText;
        this.titleDom;

        this.descriptionText;
        this.descriptionDom;

        this.dateText;
        this.dateDom;

        this.taskChecklistDom;

        this.addTaskButtonDom;
        this.addTaskButtonImg;

        this.taskDom;

        this.projectNotesText;
        this.projectNotesDom;
    }

    DomSetup (projectPage) {
        

        this.titleDom = document.createElement('div');
        let title = this.titleDom;
        title.classList.add ('project-title');
        projectPage.append (title);

        this.descriptionDom = document.createElement('div');
        let description = this.descriptionDom;
        description.classList.add ('project-description');
        projectPage.append (description);

        this.dateDom = document.createElement('div');
        let date = this.dateDom;
        date.classList.add ('project-date');
        projectPage.append (date);

        this.taskDom = document.createElement('div');
        let task = this.taskDom;
        task.classList.add ('task-checklist');
        projectPage.append (task);

        this.projectNotesDom = document.createElement('div');
        let projectNotes = this.projectNotesDom;
        projectNotes.classList.add ('project-notes');
        projectPage.append (projectNotes);
    }

    ChangeInfo () {

    }
}

class ProjectButtons {
    constructor (name, date) {
        this.name = name;
        this.date = date;
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
        projectDate.textContent = this.date;
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
        projects.push (new Projects(newName,  "Project Description", "--/--/----"));
        let newProject = projects.findLast(element => element);
        newProject.CreateSideEntry();
        SelectProject(newProject);
    }
}

export {MainDisplay, ProjectButtons, TaskButton, Buttons, Projects};
