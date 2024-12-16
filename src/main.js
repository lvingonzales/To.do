import "./style.css";
import "./style-sidebar.css";
import "./style-main.css";
import { initSidebar, ProjectTab, TaskTab } from "./sidebar.js";
import { InitMainDisplay } from "./project-page.js";
const containerDiv = document.querySelector(".container");

const projects = [];

class Project {
    constructor (title, description, date) {
        this.id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.notes;
        this.tasks = [];
        this.projectTab;
    }
}

class Task {
    constructor (title, description, date, project) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.notes;
        this.project = project;
        this.taskListEntry;
        this.taskDisplay;
    }
}

function initMain () {
    let contentDiv = document.createElement('div');
    contentDiv.classList.add ("content");
    containerDiv.append (contentDiv);
    InitMainDisplay(contentDiv);
    initSidebar();
}

initMain();

export {containerDiv, projects, Project, Task}
