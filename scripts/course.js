const courses = [
    { name: "CSE 110", type: "CSE", completed: true },
    { name: "CSE 210", type: "CSE", completed: false },
    { name: "CSE 111", type: "CSE", completed: true },
    { name: "WDD 130", type: "WDD", completed: false },
    { name: "WDD 131", type: "WDD", completed: true },
    { name: "WDD 231", type: "WDD", completed: false }
];

function displayCourses(filter) {
    const container = document.getElementById("course-container");
    container.innerHTML = "";

    let filteredCourses = filter ? courses.filter(course => course.type === filter) : courses;

    filteredCourses.forEach(course => {
        let courseItem = document.createElement("div");
        courseItem.textContent = course.name;
        courseItem.style.padding = "10px";
        courseItem.style.margin = "5px";
        courseItem.style.borderRadius = "5px";
        courseItem.style.backgroundColor = course.completed ? "#8B0000" : "#c4c4c4";
        courseItem.style.color = "white";
        container.appendChild(courseItem);
    });
}

document.getElementById("all").addEventListener("click", () => displayCourses());
document.getElementById("cse").addEventListener("click", () => displayCourses("CSE"));
document.getElementById("wdd").addEventListener("click", () => displayCourses("WDD"));

displayCourses();
