import "./style.css";
import "./style-sidebar.css";
import "./style-main.css";
import { initSidebar, ProjectTab, TaskTab } from "./sidebar.js";
import { InitMainDisplay } from "./project-page.js";

const containerDiv = document.querySelector(".container");

const projects = JSON.parse(localStorage.getItem ('projects') || '[]');

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
}

class Task {
    constructor (title, description, date, project) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.notes = "";
        //this.project = project;
        this.taskListEntry;
        this.taskDisplay;
    }
}

function updateInfo (object, title, desc, date) {
    object.title = title;
    object.description = desc;
    object.date = date;
}

function getProjectTab (project) {
    return project.projectTab;
}

function initMain () {
    InitMainDisplay();
    initSidebar();
}

function updateStorage() {
    localStorage.setItem ('projects', JSON.stringify(projects));
    let foo = JSON.parse(localStorage.getItem ('projects'));
    console.log (foo);
}

console.log (localStorage.getItem ('projects'));

initMain();

export {containerDiv, projects, Project, Task, getProjectTab, updateInfo, updateStorage}
