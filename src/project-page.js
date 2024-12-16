import { currentlySelected } from "./sidebar";
import { Task } from "./main";

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

    domSetup (projectPage) {
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
        let addTaskButton = new Buttons('add-task');
        addTaskButton.domSetup();
        task.append (addTaskButton.domElement);

        this.projectNotesDom = document.createElement('div');
        let projectNotes = this.projectNotesDom;
        projectNotes.classList.add ('project-notes');
        projectPage.append (projectNotes);
    }

    ChangeInfo (selectedProject) {
        this.titleDom.textContent = selectedProject.title
        this.descriptionDom.textContent = selectedProject.description;
        this.dateDom.textContent = selectedProject.date;

        lastSelected.tasks.forEach(task => {
            while (task.taskListEntry.domElement.lastElementChild) {
                task.taskListEntry.domElement.removeChild (task.taskListEntry.domElement.lastElementChild);
            }
        })

        while (this.taskDom.childNodes.length > 1 ) {
            this.taskDom.removeChild (this.taskDom.lastElementChild);
        }

        selectedProject.tasks.forEach (task => {
            task.taskListEntry.domSetup();
        })

    }
}

class Buttons {
    constructor (id) {
        this.id = id;
        this.domElement = document.createElement ('div');
        this.icon;
    }

    domSetup () {
        let svgNamespace = "http://www.w3.org/2000/svg";

        this.domElement.setAttribute ('id', this.id);
        display.taskDom.prepend (this.domElement);

        this.icon = document.createElementNS (svgNamespace, 'svg');
        this.icon.setAttribute ("height", "36px");
        this.icon.setAttribute ("viewBox", "0 -960 960 960");
        this.icon.setAttribute ("width", "36px");
        this.icon.setAttribute ("fill", "black");
        this.domElement.append (this.icon);
        let iconPath = document.createElementNS (svgNamespace, 'path');
        iconPath.setAttribute ('d', 'M439.5-440H242.37q-17.03 0-28.76-11.76-11.74-11.76-11.74-28.83 0-17.06 11.74-28.74Q225.34-521 242.37-521H439.5v-197.13q0-17.03 11.76-28.76 11.76-11.74 28.83-11.74 17.06 0 28.74 11.74 11.67 11.73 11.67 28.76V-521h197.13q17.03 0 28.76 11.76 11.74 11.76 11.74 28.83 0 17.06-11.74 28.74Q734.66-440 717.63-440H520.5v197.13q0 17.03-11.76 28.76-11.76 11.74-28.83 11.74-17.06 0-28.74-11.74-11.67-11.73-11.67-28.76V-440Z');
        this.icon.append (iconPath);

        this.domElement.addEventListener("mouseover", (e) => this.onMouseOver(e));
        this.domElement.addEventListener("mouseout", (e) => this.onMouseOut(e));
        this.domElement.addEventListener("click", (e) => this.onMouseClick(e));
    }
    onMouseClick () {
        let newTask = new Task ("New Task", "description", "--/--/----", currentlySelected);
        newTask.taskListEntry = new TaskCheckListTab (newTask);
        newTask.taskListEntry.domSetup();
        currentlySelected.tasks.push (newTask);
        console.log (newTask);
    }

    onMouseOver () {

    }

    onMouseOut () {

    }
}

class TaskCheckListTab {
    constructor (task) {
        this.task = task;
        this.title;
        this.date;
        this.domElement = document.createElement ('div');
    }
    domSetup () {
        console.error (`Creating task checklist`);
        let element = this.domElement;
        element.classList.add ('task');
        display.taskDom.append (element);

        let title = document.createElement ('input');

        title.setAttribute ("type", "checkbox");
        title.setAttribute ("id", "task-title");
        title.setAttribute ("name", "task-title");
        element.append (title);

        let titleLabel = document.createElement ('label');
        titleLabel.setAttribute ("for", "task-title");
        titleLabel.setAttribute ('contenteditable', "");
        titleLabel.textContent = "New Task";
        element.append (titleLabel);
    }
}

const display = new MainDisplay();
let lastSelected;

function InitMainDisplay (contentDiv) {
    
    let projectPageDiv = document.createElement ('div');
    projectPageDiv.classList.add ('project-page');
    contentDiv.append (projectPageDiv);

    display.domSetup(projectPageDiv);
}

function ChangeDisplay(selectedProject) {
    lastSelected = selectedProject;
    display.ChangeInfo(selectedProject)
}

export {InitMainDisplay, ChangeDisplay, TaskCheckListTab}
