class Plan {
    constructor(title) {
        this.title = title;
        this.components = [];
    }

    add(component) {
        this.components.push(component);
    }

    
    setTitle(title) {
        this.title = title;
    }
}

class Component {
    constructor(title) {
        this.title = title;
    }

    toHTML() {
        return (this.title === undefined ? "" : "<h4 class=\"component-title\">" + plans[i].components[j].title + "</h4>\n");
    }

    setTitle(title) {
        this.title = title;
    }
}

class TodoList extends Component {
    constructor(title) {
        super(title);
        this.list = [];
    }

    toHTML(plansIndex, componentIndex) {
        let text = (this.title === undefined ? "" : "<h4 class=\"component-title\">" + this.title + "</h4>");
        if(this.list.length > 0) {
            text += "<div class=\"checkboxes\">\n";
            for(let i=0; i<this.list.length; i++) {
                text += "<input class=\"task-checkbox\" type=\"checkbox\"" + (this.list[i].done ? " checked" : "") + " onclick=\"toggleTask(" + plansIndex + ", " + componentIndex + ", " + i + ")\"><label>" + this.list[i].text + "</label><br>\n";
            }
            text += "<br></div>\n";
        }
        text += "<button class=\"new-task-button\" onclick=\"newTask(" + plansIndex + ", " + componentIndex + ")\">+ New Task</button>\n";
        text += "<button class=\"rename-component-button\" onclick=\"renameComponent(" + plansIndex + ", " + componentIndex + ")\">Rename</button>\n";
        text += "<button class=\"delete-component-button\" onclick=\"deleteComponent(" + plansIndex + ", " + componentIndex + ")\">Delete</button>\n";
        return text;
    }

    add(text, done) {
        this.list.push({
            text,
            done
        })
    }
}

class Note extends Component {
    constructor(title) {
        super(title);
        this.body = "";
    }

    toHTML(plansIndex, componentIndex) {
        let text = (this.title === undefined ? "" : "<h4 class=\"component-title\">" + this.title + "</h4>");
        if(this.body != "") {
            text += "<p class=\"note-body\">" + this.body + "</p>";
            text += "<button class=\"edit-body-button\" onclick=\"editBody(" + plansIndex + ", " + componentIndex + ")\">Edit</button>\n"
        } else {
            text += "<button class=\"edit-body-button\" onclick=\"editBody(" + plansIndex + ", " + componentIndex + ")\">+ Add note body</button>\n"
        
        }
        text += "<button class=\"rename-component-button\" onclick=\"renameComponent(" + plansIndex + ", " + componentIndex + ")\">Rename</button>\n";
        text += "<button class=\"delete-component-button\" onclick=\"deleteComponent(" + plansIndex + ", " + componentIndex + ")\">Delete</button>\n";
        return text;
    }

    setBody(text) {
        this.body = text;
    }
}