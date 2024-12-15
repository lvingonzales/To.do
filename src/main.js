import "./style.css";
import "./style-sidebar.css";
import "./style-main.css";
import { SidebarDisplay } from "./sidebar.js";
import { InitMainDisplay } from "./project.js";
export const containerDiv = document.querySelector(".container");

export const Tasks = [];
export const projects = [];

function init () {
    SidebarDisplay();

    let contentDiv = document.createElement('div');
    contentDiv.classList.add ("content");
    containerDiv.append (contentDiv);

    InitMainDisplay(contentDiv);
}

init();

