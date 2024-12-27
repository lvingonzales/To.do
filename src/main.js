import "./style.css";
import "./style-sidebar.css";
import "./style-main.css";
import {initSidebar} from "./sidebar.js";
import { InitMainDisplay } from "./project-page.js";

//localStorage.clear();
const containerDiv = document.querySelector(".container");
let projectIdCounter;
let taskIdCounter;
let projects = JSON.parse(localStorage.getItem("projects") || "[]");
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

if (!Array.isArray(projects) || !projects.length) {
    projectIdCounter = 0;
} else {
    projectIdCounter = projects.findLast(element => element).id + 1;
}

if (!Array.isArray(tasks) || !tasks.length) {
    taskIdCounter = 0;
} else {
    taskIdCounter = tasks.findLast(element => element).id + 1;
}

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
    }
}

function updateInfo (object, title, desc, date) {
    object.title = title;
    object.description = desc;
    object.date = date;
}

function getTasks (projectId) {
    return tasks.filter (task => task.projectId === projectId);
}

function pushTask (newTask) {
    tasks.push (newTask);
    localStorage.setItem ("tasks", JSON.stringify(tasks));
    console.log (JSON.parse(localStorage.getItem('tasks') || "[]"));
}

function getTask (id) {
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
    let taskTab;
    if (!Array.isArray(projects) || !projects.length) {
        taskTab = new Project ("Tasks", "These are your unorganized tasks.", "");
        projects.push (taskTab);
        localStorage.setItem ('projects', JSON.stringify(projects));
    } else {
        taskTab = projects[0];
    }
    initSidebar(taskTab);
    InitMainDisplay(taskTab);
    //taskTab.projectTab.selected();
}

function updateStorage() {
    localStorage.setItem ('projects', JSON.stringify(projects));
    let foo = JSON.parse(localStorage.getItem ('projects'));
    console.log (foo);
}

console.log (localStorage.getItem ('projects'));

initMain();

export {containerDiv, projects, Project, Task, getProjectTab, updateInfo, updateStorage, getProject, getTasks, getTask, pushTask}
