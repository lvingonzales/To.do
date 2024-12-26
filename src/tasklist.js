import { updateInfo } from "./main";

class TaskDisplay {
    constructor(task){
        this.isEditable = false;
        this.mainDiv = document.createElement('div');
        this.mainDiv.classList.add ('list-entry');
        this.task = task;
        this.title;
        this.description;
        this.dates;
        this.notes;

        this.listButtonWrapper = document.createElement ('div');
        this.listButtonWrapper.id = 'list-buttons';
        this.saveButton = document.createElement('button');
        this.saveButton.addEventListener ('click', (e) => this.saveInfo(e));
        this.editButton = document.createElement('button');
        this.editButton.addEventListener ('click', (e) => this.editInfo(e));
    }
    
    isEditableDomSetup () {
        this.title = document.createElement ('textarea');
        
        this.description = document.createElement ('textarea');
       
        this.dates = document.createElement ('textarea');
        
        this.notes = document.createElement ('textarea');

        this.editButton.disabled = "true";
        this.saveButton.enabled = "true";

        

        this.classSetup();
        this.appendElements();
        this.fillInfo();
        let elements = this.mainDiv.querySelectorAll ('textarea');
        elements.forEach (element => {
            element.classList.add ('list-boxes');
        });
    }

    nonEditableDomSetup () {
        this.title = document.createElement ('div');
    
        this.description = document.createElement ('div');
        
        this.dates = document.createElement ('div');
        
        this.notes = document.createElement ('textarea');

        this.editButton.disabled = false;
        this.saveButton.disabled = true;
        
        this.classSetup();
        this.appendElements();
        this.fillInfo()
    }

    replaceElements () {
        if (this.isEditable) {
            this.title = document.createElement ('div');
            this.mainDiv.querySelector('.list-title').replaceWith(this.title);
    
            this.description = document.createElement ('div');
            this.mainDiv.querySelector('.list-description').replaceWith(this.description);
        
            this.dates = document.createElement ('div');
            this.mainDiv.querySelector('.list-date').replaceWith(this.dates);

            this.saveButton.disabled = true;
            this.editButton.disabled = false;
            this.isEditable = false;
        } else {
            this.title = document.createElement ('textarea');
            this.mainDiv.querySelector('.list-title').replaceWith(this.title);
        
            this.description = document.createElement ('textarea');
            this.mainDiv.querySelector('.list-description').replaceWith(this.description);
       
            let lastDate = this.dates.textContent;
            this.dates = document.createElement ('input');
            this.dates.type = 'date';
            this.dates.defaultValue = lastDate;
            this.mainDiv.querySelector('.list-date').replaceWith(this.dates);

            let elements = this.mainDiv.querySelectorAll ('textarea');
            elements.forEach (element => {
                element.classList.add ('list-boxes');
            });

            this.saveButton.disabled = false;
            this.editButton.disabled = true;
            this.isEditable = true;
        }
        
        this.classSetup();
        this.fillInfo();
    }

    fillInfo () {
        this.title.textContent = this.task.title;
        this.description.textContent = this.task.description;
        this.dates.textContent = this.task.date;
        this.notes.textContent = this.task.notes;
        this.saveButton.textContent = `Save`;
        this.editButton.textContent = `Edit`;

        this.title.placeholder = 'Enter a Title';
        this.description.placeholder = 'Enter a description.'
        this.dates.placeholder = '--/--/----';
        this.notes.placeholder = 'Enter your notes.'
    }
    

    classSetup () {
        this.title.classList.add ('list-title');
        this.description.classList.add ('list-description');
        this.dates.classList.add ('list-date');
        this.notes.classList.add ('list-notes');
    }

    appendElements () {
        this.mainDiv.append (this.title, this.description, this.dates, this.notes, this.listButtonWrapper);
        this.listButtonWrapper.append (this.saveButton, this.editButton);
    }

    saveInfo () {
        updateInfo (this.task,this.title.value, this.description.value, this.dates.value);
        this.task.taskListEntry.updateInfo();
        this.replaceElements();
    }

    editInfo () {
        this.replaceElements();
    }
}

const taskList = document.querySelector ('.task-list');

function clearTaskList () {
    while (taskList.lastElementChild) {
        taskList.removeChild (taskList.lastElementChild);
    }
}

function loadTaskList (project) {
    let tasks = project.tasks;
    if (tasks.length === 0) {return;}
    tasks.forEach(task => {
        let taskDisplay = task.taskDisplay;
        taskList.append (taskDisplay);
    })
}

function addTaskDisplay (task) {
    let newTaskDisplay = new TaskDisplay (task);
    newTaskDisplay.nonEditableDomSetup();
    taskList.append (newTaskDisplay.mainDiv);
    return newTaskDisplay.mainDiv;
}

export { addTaskDisplay, clearTaskList, loadTaskList};
