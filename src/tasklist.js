
class TaskDisplay {
    constructor(task){
        this.isEditable = true;
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
        this.editButton = document.createElement('button');
    }
    
    isEditableDomSetup () {
        this.title = document.createElement ('textarea');
        
        this.description = document.createElement ('textarea');
       
        this.dates = document.createElement ('textarea');
        
        this.notes = document.createElement ('textarea');

        this.classSetup();
        this.appendElements();
        this.fillInfo();
    }

    nonEditableDomSetup () {
        this.title = document.createElement ('div');
    
        this.description = document.createElement ('div');
        
        this.dates = document.createElement ('div');
        
        this.notes = document.createElement ('textarea');
        
        this.classSetup();
        this.appendElements();
        this.fillInfo()
    }

    fillInfo () {
        this.title.textContent = this.task.title;
        this.description.textContent = this.task.description;
        this.dates.textContent = this.task.date;
        this.notes.textContent = this.task.notes;
        this.saveButton.textContent = `Save`;
        this.editButton.textContent = `Edit`;
    }
    

    classSetup () {
        this.title.classList.add ('list-title');
        this.description.classList.add ('list-description');
        this.dates.classList.add ('list-date');
        this.notes.classList.add ('list-notes');

    }

    appendElements () {
        taskList.append (this.mainDiv);
        this.mainDiv.append (this.title, this.description, this.dates, this.notes, this.listButtonWrapper);
        this.listButtonWrapper.append (this.saveButton, this.editButton);
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
    newTaskDisplay.isEditable = true;
    newTaskDisplay.isEditableDomSetup();
    return newTaskDisplay.mainDiv;
}

export { addTaskDisplay, clearTaskList, loadTaskList};
