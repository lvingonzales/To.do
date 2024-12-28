import "./style.css";
import "./style-sidebar.css";
import "./style-main.css";
import {initSidebar, SelectProject} from "./sidebar.js";
import { InitMainDisplay } from "./project-page.js";

// localStorage.clear();
let defaultProject;
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
        this.taskDisplay;
        this.isCompleted = false;
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

function getProjectsList() {
    return projects;
}

function getProject(id) {
    let project = projects.find (project => project.id === id);
    return project;
}

function getProjectTab (project) {
    return project.projectTab;
}

function initMain () {
    if (!Array.isArray(projects) || !projects.length) {
        defaultProject = new Project ("Tasks", "These are your unorganized tasks.", "");
        projects.push (defaultProject);
        localStorage.setItem ('projects', JSON.stringify(projects));
        console.log (defaultProject);
    } else {
        defaultProject = projects[0];
        console.log (defaultProject);
    }

    initSidebar();
    InitMainDisplay();
    SelectProject (defaultProject);
}

const getDefaultProject = () => defaultProject;

function updateTaskStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStorage() {
    localStorage.setItem ('projects', JSON.stringify(projects));
    let foo = JSON.parse(localStorage.getItem ('projects'));
    console.log (foo);
}

function debugGetProjects () {
    return console.log (getDefaultProject());

}


console.log (tasks);
//console.log (localStorage.getItem ('projects'));

initMain();
debugGetProjects();

export {containerDiv, projects, Project, Task, getProjectTab, updateInfo, updateStorage, getProject, getTasks, getTask, pushTask, getDefaultProject, getProjectsList, updateTaskStorage}
