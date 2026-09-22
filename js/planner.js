const plannerAddCourseButton = document.getElementById("plannerAddCourseButton");
const plannerCourseOverlay = document.getElementById("plannerCourseOverlay");
const plannerCoursePopupClose = document.getElementById("plannerCoursePopupClose");
const plannerCoursePopupList = document.getElementById("plannerCoursePopupList");
const plannerSelectedCoursesContainer = document.getElementById("plannerSelectedCoursesContainer");
const plannerCoursesSelected = document.getElementById("plannerCoursesSelected");
const plannerTotalDuration = document.getElementById("plannerTotalDuration");
const plannerTotalCost = document.getElementById("plannerTotalCost");
const comparisonBarsContainer = document.getElementById("comparisonBarsContainer");
const plannerCourseSearch = document.getElementById("plannerCourseSearch");
const selectedPlannerCourses = [];

plannerAddCourseButton.addEventListener("click", () => {
    plannerCourseOverlay.style.display = "flex";
    const courseOptions = plannerCoursePopupList.querySelectorAll(".plannerCourseOption");
    courseOptions.forEach(courseOption => {
        courseOption.style.display = "block";
    });
});

plannerCoursePopupClose.addEventListener("click", () => {
    plannerCourseSearch.value = "";
    plannerCourseOverlay.style.display = "none";
});

function addPlannerCourse(course){
    console.log(course);
}

fetch("../data/opportunities.json")
    .then(response => response.json())
    .then(data => {
        data.opportunities.forEach(opportunity => {
            const courseOption = document.createElement("button");
            courseOption.type = "button";
            courseOption.classList.add("plannerCourseOption");
            courseOption.dataset.courseId = opportunity.id;
            courseOption.textContent = opportunity.title;
            courseOption.addEventListener("click", () => {
                addPlannerCourse(opportunity);
            });
            plannerCoursePopupList.appendChild(courseOption);
        });
    })
    .catch(error => {
        console.error("Error loading opportunities:", error);
    });

function addPlannerCourse(course){
    const courseAlreadySelected = selectedPlannerCourses.some(selectedCourse => selectedCourse.id === course.id);
    if(courseAlreadySelected){
        return;
    }
    selectedPlannerCourses.push(course);
    const courseOption = document.querySelector(`[data-course-id="${course.id}"]`);
    courseOption.disabled = true;
    const courseCard = document.createElement("div");
    courseCard.classList.add("plannerSelectedCourseCard");
    courseCard.innerHTML = `
        <div class="plannerCourseInfo">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="plannerCourseDetails">
                <span>${course.durationHours} Hours</span>
                <span>PKR ${course.estimatedCost.toLocaleString()}</span>
            </div>
        </div>
        <button type="button" class="plannerRemoveCourseButton">Remove Course</button>
    `;
    courseCard.querySelector(".plannerRemoveCourseButton").addEventListener("click", () => {
        const courseIndex = selectedPlannerCourses.indexOf(course);
        selectedPlannerCourses.splice(courseIndex, 1);
        courseCard.remove();
        updatePlannerSummary();
    });
    plannerSelectedCoursesContainer.appendChild(courseCard);
    updatePlannerSummary();
    updatePlannerComparison();
    plannerCourseSearch.value = "";
    plannerCourseOverlay.style.display = "none";
}

function updatePlannerSummary(){
    plannerCoursesSelected.textContent = selectedPlannerCourses.length;
    const totalDuration = selectedPlannerCourses.reduce((total, course) => total + course.durationHours, 0);
    const totalCost = selectedPlannerCourses.reduce((total, course) => total + course.estimatedCost, 0);
    plannerTotalDuration.textContent = `${totalDuration} Hours`;
    plannerTotalCost.textContent = `PKR ${totalCost.toLocaleString()}`;
}

function updatePlannerComparison(){
    comparisonBarsContainer.innerHTML = "";
    selectedPlannerCourses.forEach(course => {
        const comparisonBar = document.createElement("div");
        comparisonBar.classList.add("comparisonBar");
        comparisonBar.innerHTML = `
            <div class="comparisonBarLabel">
                <span>${course.title}</span>
                <span>PKR ${course.estimatedCost.toLocaleString()} • ${course.durationHours} Hours</span>
            </div>
            <div class="comparisonBarBackground">
                <div class="comparisonBarFill" style="width: ${course.estimatedCost / Math.max(...selectedPlannerCourses.map(selectedCourse => selectedCourse.estimatedCost)) * 100}%;"></div>
            </div>
        `;
        comparisonBarsContainer.appendChild(comparisonBar);
    });
}

plannerCourseSearch.addEventListener("input", () => {
    const searchValue = plannerCourseSearch.value.toLowerCase();
    const courseOptions = plannerCoursePopupList.querySelectorAll(".plannerCourseOption");
    courseOptions.forEach(courseOption => {
        const courseTitle = courseOption.textContent.toLowerCase();
        if(courseTitle.includes(searchValue)){
            courseOption.style.display = "block";
        }else{
            courseOption.style.display = "none";
        }
    });
});