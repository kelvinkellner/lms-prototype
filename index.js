let plans = [];

const popupHolder = document.getElementById("popup-holder");

const plansHolder = document.getElementById("plans-holder");
const newPlanButton = document.getElementById("new-plan-button");

const updateButton = document.getElementById("update-button");

function renamePlan(plansIndex) {
    plans[plansIndex].setTitle(prompt("What is the new Plan title?"));
    updatePlansHolder();
}

function deletePlan(plansIndex) {
    popupHolder.innerHTML = "";
    plans.splice(plansIndex, 1);
    updatePlansHolder();
}

function renameComponent(plansIndex, componentIndex) {
    plans[plansIndex].components[componentIndex].setTitle(prompt("What is the new component title?"));
    updatePlansHolder();
}

function deleteComponent(plansIndex, componentIndex) {
    plans[plansIndex].components.splice(componentIndex, 1);
    updatePlansHolder();
}

function editBody(plansIndex, componentIndex) {
    plans[plansIndex].components[componentIndex].setBody(prompt("What is the new note body?"));
    updatePlansHolder();
}

function newTask(plansIndex, componentIndex) {
    plans[plansIndex].components[componentIndex].add(prompt("What is the new task?"), false);
    updatePlansHolder();
}

function toggleTask(plansIndex, componentIndex, taskIndex) {
    plans[plansIndex].components[componentIndex].list[taskIndex].done = !plans[plansIndex].components[componentIndex].list[taskIndex].done;
    updatePlansHolder();
}

function clearPopups() {
    popupHolder.innerHTML = "";
}

function addComponentSubmit(index) {
    const title = document.getElementById("new-component-title").value;
    const radios = document.getElementsByName("new-component-type");
    let type = undefined;

    for(let i=0; i<radios.length; i++) {
        if(radios[i].checked) {
            type = radios[i].value;
        }
    }

    if (type=="timed-event") {
        alert("Timed events will appear in the calendar on the left.\nThis feature has not been implemented in this prototype.");
    } else if(type=="todo-list") {
        plans[index].add(new TodoList(title));
    } else if (type=="note") {
        plans[index].add(new Note(title));
    } else {
        console.log("Invalid Component type selected.");
    }

    clearPopups();
    updatePlansHolder();
}

function addComponentPopup(index) {
    popupHolder.innerHTML = `<form id="new-component-menu"">
        <input type="radio" id="todo-list" name="new-component-type" value="todo-list" checked>
        <label for="todo-list">To-do List</label><br>
        <input type="radio" id="note" name="new-component-type" value="note">
        <label for="note">Note</label><br>
        <input type="radio" id="timed-event" name="new-component-type" value="timed-event">
        <label for="timed-event">Timed Event</label><br><br>
        <label for="title">Title (optional):</label>
        <input type="text" id="new-component-title" value=""><br><br>
        <input type="button" value="Add" onclick="addComponentSubmit(${index})">
        <input type="button" value="Cancel" onclick="clearPopups()">
        <hr>
    </form>
    `
}

function updatePlansHolder() {
    let text = "";
    if (plans.length == 0) {
        text = "<p id=\"placeholder\">You have no plans, try creating one...</p>\n";
    } else {
        for(let i=0; i<plans.length; i++) {
            // open
            text += "<div class=\"plan\"><h3 class=\"plan-title\">" + plans[i].title + "</h3>";
            if(plans[i].components.length <= 0) {
                text += "<button class=\"add-component-button\" onclick=\"addComponentPopup(" + i + ")\">+ Add component</button>\n";
            }
            text += "<button class=\"rename-plan-button\" onclick=\"renamePlan(" + i + ")\">Rename plan</button>\n";
            text += "<button class=\"delete-plan-button\" onclick=\"deletePlan(" + i + ")\">Delete plan</button>\n";
            // components   
            if(plans[i].components.length > 0) {
                text += "<div class=\"components-list\"><br>";
                for(let j=0; j<plans[i].components.length; j++) {
                    text += plans[i].components[j].toHTML(i, j) + "<br>";
                }
                text += "<br></div>";
            }
            // new component button
            if(plans[i].components.length > 0) {
                text += "<button class=\"add-component-button\" onclick=\"addComponentPopup(" + i + ")\">+ Add component</button>";
            }
            // close
            text += "</div>\n<hr>\n";
        }
    }
    plansHolder.innerHTML = text;
}

newPlanButton.addEventListener("click", function() {
    const title = prompt("What is the title for this Plan?");
    if (title !== null) {
        const plan = new Plan(title);

        plans.push(plan);
        updatePlansHolder();
    }
});

plansHolder.addEventListener("load", updatePlansHolder);

updateButton.addEventListener("click", function() {
    updatePlansHolder();
    console.log(plans);
});

$(document).ready(function() {
    $(window).keydown(function(event){
      if(event.keyCode == 13) {
        event.preventDefault();
        return false;
      }
    });
  });