let assignments = [];

function addAssignment() {
    const name = prompt("Enter assignment name:");
    const description = prompt("Enter description (optional):");
    const className = prompt("Enter class name:");
    const dueDate = prompt("Enter due date (YYYY-MM-DD):");

    const assignment = {
        name: name || "Untitled",
        description: description || "",
        className: className || "Unknown",
        dateCreated: new Date().toISOString().split('T')[0],
        dueDate: dueDate || "No Due Date"
    };

    assignments.push(assignment);
    renderTable();
}

function renderTable() {
    const tbody = document.querySelector("#assignmentsTable tbody");
    tbody.innerHTML = ""; // Clear existing rows

    assignments.forEach(assignment => {
        const row = document.createElement("tr");

        for (const key in assignment) {
            const cell = document.createElement("td");
            cell.textContent = assignment[key];
            row.appendChild(cell);
        }

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
