import "./style.css";
import "./style-sidebar.css";
import "./style-main.css";
import { initSidebar, ProjectTab, TaskTab } from "./sidebar.js";
import { InitMainDisplay } from "./project-page.js";

const containerDiv = document.querySelector(".container");
let projectIdCounter = 0;
let taskIdCounter = 0;
const projects = [];
const tasks = [];

class Project {
    constructor (title, description, date) {
        this.id = projectIdCounter++;
        this.title = title;
        this.description = description;
        this.date = date;
        this.notes = "";
        this.projectTab;
    }
}

class Task {
    constructor (title, description, date, project) {
        this.title = title;
        this.id = taskIdCounter++;
        this.description = description;
        this.date = date;
        this.notes = "";
        this.projectId = project.id;
        this.taskListEntry;
        this.taskDisplay;
    }
}

function updateInfo (object, title, desc, date) {
    object.title = title;
    object.description = desc;
    object.date = date;
}

function getTasks (projectId) {
    return tasks.map (task => task.projectid === projectId);
}

function pushTask (newTask) {
    tasks.push (newTask);
}

function getTask (id) {
    console.log (id);
    console.log (tasks);
    let task = tasks.find (task => task.id === id);
    return task;
}

function getProject(id) {
    let project = projects.find (project => project.id === id);
    return project;
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

export {containerDiv, projects, Project, Task, getProjectTab, updateInfo, updateStorage, getProject, getTasks, getTask, pushTask}
