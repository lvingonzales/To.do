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
        this.notes = "";
        this.tasks = [];
        this.projectTab;
    }
    updateInfo (title, desc, date, notes) {
        this.title = title;
        this.description = desc;
        this.date = date;
        this.notes = notes;
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

function getProjectTab (project) {
    return project.projectTab;
}

function initMain () {
    InitMainDisplay();
    initSidebar();
}

initMain();

export {containerDiv, projects, Project, Task, getProjectTab}
