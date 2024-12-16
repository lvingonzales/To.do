import { currentlySelected } from "./sidebar";

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

        this.projectNotesDom = document.createElement('div');
        let projectNotes = this.projectNotesDom;
        projectNotes.classList.add ('project-notes');
        projectPage.append (projectNotes);
    }

    ChangeInfo (selectedProject) {
        this.titleDom.textContent = selectedProject.title
        this.descriptionDom.textContent = selectedProject.description;
        this.dateDom.textContent = selectedProject.date;
    }
}

const display = new MainDisplay();

export function InitMainDisplay (contentDiv) {
    
    let projectPageDiv = document.createElement ('div');
    projectPageDiv.classList.add ('project-page');
    contentDiv.append (projectPageDiv);

    display.domSetup(projectPageDiv);
}

export function ChangeDisplay(selectedProject) {
    display.ChangeInfo(selectedProject)
}
