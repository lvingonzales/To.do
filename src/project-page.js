import { Task, getProjectTab, updateInfo, getTasks, getTask, pushTask, getDefaultProject, getProjectsList, updateTaskStorage, updateProjectStorage } from "./main";
import { getSelectedProject, SelectProject } from "./sidebar";
import { addTaskDisplay, clearTaskDisplay } from "./tasklist";

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

    clearTaskList () {
        let taskEntries = document.querySelectorAll('.task')

        taskEntries.forEach (element => {
            while (element.lastElementChild) {
                element.removeChild (element.lastElementChild);
            }
        })

        while (this.taskDom.childNodes.length > 1 ) {
            this.taskDom.removeChild (this.taskDom.lastElementChild);
        }
    }

    domSetup () {
        this.titleDom = document.createElement('textarea');
        this.titleDom.classList.add ('project-title');
        projectPage.append (this.titleDom);

        this.descriptionDom = document.createElement('textarea');
        this.descriptionDom.classList.add ('project-description');
        projectPage.append (this.descriptionDom);

        let buttonWrapper = document.createElement ('div');
        buttonWrapper.id = 'button-wrapper';
        projectPage.append (buttonWrapper);
        
        this.saveButton = document.createElement ('button');
        this.saveButton.setAttribute ('id', 'save-button');
        this.saveButton.disabled = false;
        this.saveButton.textContent = 'Save';
        buttonWrapper.append (this.saveButton);
        this.saveButton.addEventListener ('click', (e) => this.saveInfo(e));

        this.editButton = document.createElement ('button');
        this.editButton.setAttribute ('id', 'edit-button');
        this.editButton.disabled = true;
        this.editButton.textContent = 'Edit';
        buttonWrapper.append (this.editButton);
        this.editButton.addEventListener ('click', (e) => this.editInfo(e));

        this.dateDom = document.createElement('input');
        this.dateDom.type = "date";
        this.dateDom.classList.add ('project-date');
        projectPage.append (this.dateDom);

        this.taskDom = document.createElement('div');
        this.taskDom.classList.add ('task-checklist');
        projectPage.append (this.taskDom);
        let taskForm = new addTaskForm();
        taskForm.domSetup();

        this.projectNotesDom = document.createElement('textarea');
        this.projectNotesDom.classList.add ('project-notes');
        projectPage.append (this.projectNotesDom);
        this.projectNotesDom.addEventListener ('input', (e) => this.addNotes(e));
    }

    replaceElements () {
        if (this.isEditable) {
            // Editable version of the project view

            this.titleDom = document.createElement ('textarea');
            projectPage.querySelector('.project-title').replaceWith(this.titleDom);

            this.descriptionDom = document.createElement('textarea');
            projectPage.querySelector('.project-description').replaceWith(this.descriptionDom);

            this.dateDom = document.createElement('input');
            this.dateDom.type = "date";
            projectPage.querySelector('.project-date').replaceWith(this.dateDom);

            this.saveButton.disabled = false;
            this.editButton.disabled = true; 
        } else {
            // Non-editable version of the project view

            this.titleDom = document.createElement ('div');
            projectPage.querySelector('.project-title').replaceWith(this.titleDom);

            this.descriptionDom = document.createElement('div');
            projectPage.querySelector('.project-description').replaceWith(this.descriptionDom);

            this.dateDom = document.createElement('div');
            projectPage.querySelector('.project-date').replaceWith(this.dateDom);

            this.saveButton.disabled = true;
            this.editButton.disabled = false;
        }

        this.applyClasses();
    }

    applyClasses() {
        this.titleDom.classList.add ('project-title');
        this.descriptionDom.classList.add ('project-description');
        this.dateDom.classList.add ('project-date');

        if (this.isEditable) {
            this.titleDom.classList.add ('edit-areas');
            this.descriptionDom.classList.add ('edit-areas');
            this.dateDom.classList.add ('edit-areas');
        }
    }

    loadInfo (project) {
        if (project === getDefaultProject()) {
            this.isEditable = false;
            this.replaceElements();
            this.saveButton.disabled = true;
            this.editButton.disabled = true;
        }

        this.titleDom.textContent = project.title;
        this.descriptionDom.textContent = project.description;
        this.dateDom.textContent = project.date;
        this.projectNotesDom.value = project.notes;
    }

    saveInfo () {
        let project = getSelectedProject();
        let projectTab = getProjectTab(project);
        updateInfo(project, this.titleDom.value, this.descriptionDom.value, this.dateDom.value);

        projectTab.updateInfo(project);

        this.isEditable = false;
        this.replaceElements();
        this.loadInfo(project);
        localStorage.setItem('projects', JSON.stringify(getProjectsList()))
    }

    editInfo () {
        this.isEditable = true;
        this.replaceElements()
        this.loadInfo(getSelectedProject());
    }

    addNotes () {
        let project = getSelectedProject();
        project.notes = this.projectNotesDom.value;
        updateProjectStorage();
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
        let project = getSelectedProject();
        let taskTitle = this.formTitleInput;
        if (!taskTitle.checkValidity()){return console.error('No title entered');}
        let taskDesc = this.formDescInput;
        let taskDate = this.formDateInput;
        let newTask = new Task (taskTitle.value, taskDesc.value, taskDate.value, project);
        console.log (newTask);
        pushTask(newTask);
        addTaskDisplay(newTask);
        addTaskCheckBox(newTask);
        this.form.reset();
    }
}

class TaskCheckListTab {
    constructor (task) {
        this.taskId = task.id;
        this.checkbox = document.createElement ('input')
        this.title = document.createElement ('label')
        this.date = document.createElement ('div')
        this.domElement = document.createElement ('div');
    }
    domSetup () {
        let task = getTask(this.taskId);
        console.log (task);
        let element = this.domElement;
        element.classList.add ('task');
        display.taskDom.append (element);

        this.checkbox.type = 'checkbox';
        this.checkbox.id = 'task-title';
        this.checkbox.name = 'task-title';
        element.append (this.checkbox);
        this.checkbox.addEventListener('click', (e) => this.validate(e));

        this.title.for = 'task-title'
        this.title.textContent = task.title;
        element.append (this.title);
        
        this.date = document.createElement ('div');
        this.date.classList.add ('task-date');
        this.date.textContent = task.date;
        element.append (this.date);
    }

    updateInfo () {
        let task = getTask (this.taskId);
        this.title.textContent = task.title;
        this.date.textContent = task.date;
    }

    validate () {
        let task = getTask(this.taskId);

        if (this.checkbox.checked) {
            this.domElement.classList.add ('complete-task');
            task.isCompleted = true;
        } else {
            this.domElement.classList.remove ('complete-task');
            task.isCompleted = false;
        }
        
        task.taskDisplay.markTask(task.isCompleted);

        updateTaskStorage();
    }

    initializeTaskList (task) {
        if (task.isCompleted) {
            this.checkbox.checked = true;
            console.log (`task initialized as complete`);
        }
    }
}

function removeTaskCheckBox (task) {
    task.taskListEntry.domElement.remove();
}

function addTaskCheckBox (task) {
    let newTaskBox = new TaskCheckListTab(task);
    newTaskBox.domSetup();
    newTaskBox.updateInfo();
    newTaskBox.initializeTaskList(task);
    newTaskBox.validate();
    return newTaskBox;
}

const display = new MainDisplay();
const projectPage = document.querySelector (".project-page");

function changeProject (project) {
    display.replaceElements();
    display.loadInfo(project);

    display.clearTaskList();
    clearTaskDisplay();
    let tasks = getTasks(project.id);
    tasks.forEach(task => {
        task.taskDisplay = addTaskDisplay (task);
        task.taskListEntry = addTaskCheckBox (task);
    });
}

function InitMainDisplay () {
    display.domSetup();
    //let tasks = getTasks (taskTab.id);

    // tasks.forEach (task => {
    //     task.taskListEntry = new TaskCheckListTab (task);
    //     task.taskListEntry.domSetup();
    //     task.taskDisplay = addTaskDisplay(task);
    // })
}

function setIsEditable (state) {
    display.isEditable = state;
}

function ChangeDisplay(selectedProject) {
    lastSelected = selectedProject;
    display.ChangeInfo(selectedProject);
}

function loadTaskWidgets (project) {
    let tasks = getTasks(project.id);
    if (!Array.isArray (tasks) || !tasks.length) {return;}
        
    tasks.forEach (task => {
        addTaskCheckBox(task);
        addTaskDisplay(task);
    });
}
export {InitMainDisplay, ChangeDisplay, TaskCheckListTab, setIsEditable, changeProject, removeTaskCheckBox};
