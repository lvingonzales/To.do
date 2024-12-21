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

        this.saveButton;
    }

    domSetup (projectPage) {
        this.titleDom = document.createElement('textarea');
        let title = this.titleDom;
        title.classList.add ('project-title');
        projectPage.append (title);

        this.descriptionDom = document.createElement('textarea');
        let description = this.descriptionDom;
        description.classList.add ('project-description');
        projectPage.append (description);
        
        this.saveButton = document.createElement ('button');
        this.saveButton.setAttribute ('id', 'save-button');
        this.saveButton.textContent = 'Save';
        projectPage.append (this.saveButton);
        this.saveButton.addEventListener ('click', (e) => this.updateInfo(e));

        this.dateDom = document.createElement('textarea');
        let date = this.dateDom;
        date.classList.add ('project-date');
        projectPage.append (date);

        this.taskDom = document.createElement('div');
        let task = this.taskDom;
        task.classList.add ('task-checklist');
        projectPage.append (task);
        let taskForm = new addTaskForm();
        taskForm.domSetup();

        this.projectNotesDom = document.createElement('textarea');
        let projectNotes = this.projectNotesDom;
        projectNotes.classList.add ('project-notes');
        projectPage.append (projectNotes);
    }

    ChangeInfo (selectedProject) {
        this.titleDom.textContent = selectedProject.title
        this.descriptionDom.textContent = selectedProject.description;
        this.dateDom.textContent = selectedProject.date;

        if (selectedProject.title === 'Tasks') {
            this.titleDom.setAttribute ('disabled', '');
            this.descriptionDom.setAttribute ('disabled', '');
            this.dateDom.setAttribute ('disabled', '');
        } else {
            this.titleDom.removeAttribute ('disabled');
            this.descriptionDom.removeAttribute ('disabled');
            this.dateDom.removeAttribute ('disabled');
        }

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

    updateInfo () {
        currentlySelected.updateInfo(this.titleDom.value)
        currentlySelected.projectTab.updateInfo(this.titleDom.value, this.dateDom.value);
        console.log (currentlySelected);
    }
}

class addTaskForm {
    constructor () {
        this.form = document.createElement ('form');
        this.formTitleInput;
        this.formDescInput;
        this.formDateInput;
    }
    domSetup () {
        let formWrapper = document.createElement('div');
        formWrapper.setAttribute ('id', 'new-task-form');
        display.taskDom.prepend (formWrapper);

        this.form.setAttribute ("action", "");
        this.form.setAttribute ("method", "get");
        this.form.setAttribute ("class", "new-task-form");
        formWrapper.append (this.form);

        let formFieldWrapper = document.createElement ('div');
        formFieldWrapper.classList.add ('form-fields');
        this.form.append (formFieldWrapper);

        let formTitle = document.createElement ('div');
        let formTitleLabel = document.createElement ('label');
        this.formTitleInput = document.createElement ('input');

        formTitle.setAttribute ('id', 'form-title');
        formFieldWrapper.append (formTitle);

        formTitleLabel.setAttribute ('for', 'task-title');
        formTitleLabel.textContent = 'Task Title:';
        formTitle.append (formTitleLabel);

        this.formTitleInput.setAttribute ('type', 'text');
        this.formTitleInput.setAttribute ('name', 'title');
        this.formTitleInput.setAttribute ('id', 'task-title');
        this.formTitleInput.setAttribute ('autocomplete', 'off');
        formTitle.append (this.formTitleInput);
        console.log (this.formTitleInput);

        let formDesc = document.createElement ('div');
        let formDescLabel = document.createElement ('label');
        this.formDescInput = document.createElement ('input');

        formDesc.setAttribute ('id', 'form-desc');
        formFieldWrapper.append (formDesc);

        formDescLabel.setAttribute ('for', 'task-description');
        formDescLabel.textContent = 'Task Description:';
        formDesc.append (formDescLabel);

        this.formDescInput.setAttribute ('type', 'text');
        this.formDescInput.setAttribute ('name', 'desc');
        this.formDescInput.setAttribute ('id', 'task-description');
        this.formDescInput.setAttribute ('autocomplete', 'off');
        formDesc.append (this.formDescInput);

        let formDate = document.createElement ('div');
        let formDateLabel = document.createElement ('label'); 
        this.formDateInput = document.createElement ('input');

        formDate.setAttribute ('id', 'form-date');
        formFieldWrapper.append (formDate);

        formDateLabel.setAttribute ('for', 'task-date');
        formDateLabel.textContent = 'Task date:';
        formDate.append (formDateLabel);

        this.formDateInput.setAttribute ('type', 'date');
        this.formDateInput.setAttribute ('name', 'date');
        this.formDateInput.setAttribute ('id', 'task-date');
        this.formDateInput.setAttribute ('autocomplete', 'off');
        formDate.append (this.formDateInput);

        let submitButton = document.createElement ('button');
        submitButton.setAttribute ('type', 'submit');
        submitButton.setAttribute ('id', 'form-submit');
        submitButton.textContent = 'Add Task';
        formFieldWrapper.append (submitButton);

        submitButton.addEventListener ("click", this.preventDefault, false);
        submitButton.addEventListener ("click", (e) => this.addTask(e));
    }
    preventDefault(event) {
        event.preventDefault();
    }
    addTask() {
        let taskTitle = this.formTitleInput;
        let taskDesc = this.formDescInput;
        let taskDate = this.formDateInput;
        let newTask = new Task (taskTitle.value, taskDesc.value, taskDate.value, currentlySelected);
        newTask.taskListEntry = new TaskCheckListTab (newTask);
        newTask.taskListEntry.domSetup();
        currentlySelected.tasks.push (newTask);
        console.log (newTask);
        this.form.reset();
    }
}

class TaskCheckListTab {
    constructor (task) {
        this.task = task;
        this.title = task.title;
        this.date = task.date;
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
        titleLabel.textContent = this.title;
        element.append (titleLabel);
        
        let taskDate = document.createElement ('div');
        taskDate.classList.add ('task-date');
        taskDate.textContent = this.date;
        element.append (taskDate);
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
