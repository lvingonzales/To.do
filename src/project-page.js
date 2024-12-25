import { getProject } from "./sidebar";
import { Task, getProjectTab } from "./main";
import { addTaskDisplay } from "./tasklist";

class MainDisplay {
    constructor () {
        this.isEditable;

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
        this.editButton;
    }

    clearDisplay () {
        let taskEntries = document.querySelectorAll('.task')

        taskEntries.forEach (element => {
            while (element.lastElementChild) {
                element.removeChild (element.lastElementChild);
            }
        })

        while (this.taskDom.childNodes.length > 1 ) {
            this.taskDom.removeChild (this.taskDom.lastElementChild);
        }

        while (projectPage.lastElementChild) {
            projectPage.removeChild (projectPage.lastElementChild);
        }
    }

    isEditableDomSetup () {
        this.titleDom = document.createElement('textarea');
        let title = this.titleDom;
        title.classList.add ('project-title');
        projectPage.append (title);

        this.descriptionDom = document.createElement('textarea');
        let description = this.descriptionDom;
        description.classList.add ('project-description');
        projectPage.append (description);

        let buttonWrapper = document.createElement ('div');
        buttonWrapper.id = 'button-wrapper';
        projectPage.append (buttonWrapper);
        
        this.saveButton = document.createElement ('button');
        this.saveButton.setAttribute ('id', 'save-button');
        this.saveButton.enabled = true;
        this.saveButton.textContent = 'Save';
        buttonWrapper.append (this.saveButton);
        this.saveButton.addEventListener ('click', (e) => this.saveInfo(e));

        this.editButton = document.createElement ('button');
        this.editButton.setAttribute ('id', 'edit-button');
        this.editButton.disabled = true;
        this.editButton.textContent = 'Edit';
        buttonWrapper.append (this.editButton);
        this.editButton.addEventListener ('click', (e) => this.editInfo(e));

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
        this.projectNotesDom.addEventListener ('input', (e) => this.addNotes(e));
    }

    notEditableDomSetup () {
        this.titleDom = document.createElement('div');
        let title = this.titleDom;
        title.classList.add ('project-title');
        projectPage.append (title);

        this.descriptionDom = document.createElement('div');
        let description = this.descriptionDom;
        description.classList.add ('project-description');
        projectPage.append (description);

        let buttonWrapper = document.createElement ('div');
        buttonWrapper.id = 'button-wrapper';
        projectPage.append (buttonWrapper);
        
        this.saveButton = document.createElement ('button');
        this.saveButton.setAttribute ('id', 'save-button');
        this.saveButton.disabled = true;
        this.saveButton.textContent = 'Save';
        buttonWrapper.append (this.saveButton);
        this.saveButton.addEventListener ('click', (e) => this.saveInfo(e));

        this.editButton = document.createElement ('button');
        this.editButton.setAttribute ('id', 'edit-button');
        this.editButton.enabled = true;
        this.editButton.textContent = 'Edit';
        buttonWrapper.append (this.editButton);
        this.editButton.addEventListener ('click', (e) => this.editInfo(e));

        this.dateDom = document.createElement('div');
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
        this.projectNotesDom.addEventListener ('input', (e) => this.addNotes(e));
    }

    ChangeInfo (selectedProject) {
        this.titleDom.textContent = selectedProject.title
        this.descriptionDom.textContent = selectedProject.description;
        this.dateDom.textContent = selectedProject.date;
        this.projectNotesDom.value = selectedProject.notes;

        selectedProject.tasks.forEach (task => {
            task.taskListEntry.domSetup();
        })
    }

    saveInfo () {
        let project = getProject();
        let projectTab = getProjectTab(project);
        project.updateInfo(this.titleDom.value, this.descriptionDom.value, this.dateDom.value);

        projectTab.updateInfo();

        this.isEditable = false;
        this.clearDisplay();
        this.notEditableDomSetup();
        this.ChangeInfo(getProject());
    }

    editInfo () {
        this.isEditable = true;
        this.clearDisplay();
        this.isEditableDomSetup();
        this.ChangeInfo(getProject());
    }

    addNotes () {
        let project = getProject();
        project.notes = this.projectNotesDom.value;
        console.log(project.notes);
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

        this.formTitleInput.required = true;
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
        let project = getProject();
        let taskTitle = this.formTitleInput;
        if (!taskTitle.checkValidity()){return console.error('No title entered');}
        let taskDesc = this.formDescInput;
        let taskDate = this.formDateInput;
        let newTask = new Task (taskTitle.value, taskDesc.value, taskDate.value, project);
        newTask.taskListEntry = new TaskCheckListTab (newTask);
        newTask.taskListEntry.domSetup();
        newTask.taskDisplay = addTaskDisplay(newTask);
        project.tasks.push (newTask);
        console.log (newTask);
        this.form.reset();
    }
}

class TaskCheckListTab {
    constructor (task) {
        this.task = task;
        this.checkbox = document.createElement ('input')
        this.title = document.createElement ('label')
        this.date = document.createElement ('div')
        this.domElement = document.createElement ('div');
    }
    domSetup () {
        let element = this.domElement;
        element.classList.add ('task');
        display.taskDom.append (element);

        this.checkbox.type = 'checkbox';
        this.checkbox.id = 'task-title';
        this.checkbox.name = 'task-title';
        element.append (this.checkbox);
        this.checkbox.addEventListener('click', (e) => this.validate(e));

        this.title.for = 'task-title'
        this.title.textContent = this.task.title;
        element.append (this.title);
        
        this.date = document.createElement ('div');
        this.date.classList.add ('task-date');
        this.date.textContent = this.task.date;
        element.append (this.date);
    }

    updateInfo () {
        this.title.textContent = this.task.title;
        this.date.textContent = this.task.date;
        
    }

    validate () {
        if (this.checkbox.checked) {
            this.domElement.classList.add ('complete-task');
        } else {
            this.domElement.classList.remove ('complete-task');
        }
    }
}

const display = new MainDisplay();
const projectPage = document.querySelector (".project-page");

function changeProject (project) {
    display.clearDisplay();
    if (project.title === "Tasks") {
        display.notEditableDomSetup();
        display.editButton.disabled = true;
        display.ChangeInfo(project);
        return;
    }

    if (display.isEditable) {
        display.isEditableDomSetup();
    } else {
        display.notEditableDomSetup();
    }

    display.ChangeInfo(project);
}

function InitMainDisplay () {

    display.notEditableDomSetup();
}

function setIsEditable (state) {
    display.isEditable = state;
}

function ChangeDisplay(selectedProject) {
    lastSelected = selectedProject;
    display.ChangeInfo(selectedProject)
}

export {InitMainDisplay, ChangeDisplay, TaskCheckListTab, setIsEditable, changeProject}
