
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
        this.saveButton = document.createElement('button');
        this.editButton = document.createElement('button');
    }
    
    isEditableDomSetup () {
        this.title = document.createElement ('textarea');
        this.title.classList.add ('list-title');


        this.description = document.createElement ('textarea');
        this.description.classList.add ('list-description');


        this.date = document.createElement ('textarea');
        this.dates.classList.add ('list-date');


        this.notes = document.createElement ('textarea');
        this.notes.classList.add ('list-notes');
    }

    notEditableDomSetup () {
        this.title = document.createElement ('div');
        this.title.classList.add ('list-title');

        this.description = document.createElement ('div');
        this.description.classList.add ('list-description');

        this.date = document.createElement ('div');
        this.dates.classList.add ('list-date');

        this.notes = document.createElement ('textarea');
        this.notes.classList.add ('list-notes');
    }
}

const taskList = document.querySelector ()
