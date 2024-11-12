let assignments = [];
let editingIndex = null;

function showForm(editIndex = null) {
    const formContainer = document.getElementById("formContainer");
    formContainer.style.display = "block";
    editingIndex = editIndex;

    if (editIndex !== null) {
        const assignment = assignments[editIndex];
        document.getElementById("name").value = assignment.name;
        document.getElementById("description").value = assignment.description;
        document.getElementById("className").value = assignment.className;
        document.getElementById("dueDate").value = assignment.dueDate;
        document.getElementById("formTitle").textContent = "Edit Assignment";
    } else {
        document.getElementById("formTitle").textContent = "Add Assignment";
        clearForm();
    }
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
    document.getElementById("className").value = "";
    document.getElementById("dueDate").value = "";
}

function saveAssignment() {
    const name = document.getElementById("name").value || "Untitled";
    const description = document.getElementById("description").value || "";
    const className = document.getElementById("className").value || "Unknown";
    const dueDate = document.getElementById("dueDate").value || "No Due Date";

    const assignment = {
        name,
        description,
        className,
        dateCreated: new Date().toISOString().split('T')[0],
        dueDate
    };

    if (editingIndex !== null) {
        assignments[editingIndex] = assignment;
        editingIndex = null;
    } else {
        assignments.push(assignment);
    }

    renderTable();
    cancelForm();
}

function cancelForm() {
    document.getElementById("formContainer").style.display = "none";
    editingIndex = null;
}

function deleteAssignment(index) {
    if (confirm("Are you sure you want to delete this assignment?")) {
        assignments.splice(index, 1);
        renderTable();
    }
}

function renderTable() {
    const tbody = document.querySelector("#assignmentsTable tbody");
    tbody.innerHTML = ""; // Clear existing rows

    assignments.forEach((assignment, index) => {
        const row = document.createElement("tr");

        for (const key in assignment) {
            const cell = document.createElement("td");
            cell.textContent = assignment[key];
            row.appendChild(cell);
        }

        const actionsCell = document.createElement("td");
        actionsCell.innerHTML = `
            <button onclick="showForm(${index})">Edit</button>
            <button onclick="deleteAssignment(${index})">Delete</button>
        `;
        row.appendChild(actionsCell);

        tbody.appendChild(row);
    });
}

function sortAssignments() {
    const sortBy = document.getElementById("sort").value;

    assignments.sort((a, b) => {
        if (sortBy === "dueDate" || sortBy === "dateCreated") {
            return new Date(a[sortBy]) - new Date(b[sortBy]);
        } else {
            return a[sortBy].localeCompare(b[sortBy]);
        }
    });

    renderTable();
}
