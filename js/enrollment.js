const courseSearch = document.getElementById("courseSearch");
const courseSuggestions = document.querySelector(".enrollmentCourseSuggestions");
const courseSuggestionItems = document.querySelectorAll(".enrollmentCourseSuggestion");
const addCourseButton = document.querySelector(".enrollmentAddCourseButton");
const additionalCoursesContainer = document.querySelector(".additionalCoursesContainer");
const enrollmentForm = document.querySelector(".enrollmentForm");
const courseDropdown = document.querySelector(".enrollmentCourseDropdown");
const enrollmentSuccessOverlay = document.querySelector(".enrollmentSuccessOverlay");
const enrollmentSuccessButton = document.querySelector(".enrollmentSuccessButton");

let opportunities = [];

fetch("../data/opportunities.json")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
    opportunities = data.opportunities.map(function(opportunity){
        return opportunity.title;
    });

    console.log(opportunities);

        opportunities.forEach(function(course){
            const suggestion = document.createElement("div");

            suggestion.classList.add("enrollmentCourseSuggestion");
            suggestion.textContent = course;

            courseSuggestions.appendChild(suggestion);
        });

    });

courseSuggestions.addEventListener("click", function(event){
    if (event.target.classList.contains("enrollmentCourseSuggestion")){
        courseSearch.value = event.target.textContent;
        courseSuggestions.style.display = "none";
        addCourseButton.disabled = false;
    }
});

courseSearch.addEventListener("click", function(){
    courseSuggestions.style.display = "grid";
});

document.addEventListener("click", function(event){
    if (!courseDropdown.contains(event.target)){
        courseSuggestions.style.display = "none";
    }
});

document.addEventListener("click", function(event){
    const additionalInputs = document.querySelectorAll(".additionalCourseSearch");

    additionalInputs.forEach(function(input){
        const suggestions = input.nextElementSibling;

        if (!input.contains(event.target) && !suggestions.contains(event.target)){
            suggestions.style.display = "none";
        }
    });
});

courseSearch.addEventListener("input", function(){
    const searchValue = courseSearch.value.toLowerCase();

    courseSuggestionItems.forEach(function(course){
        const courseName = course.textContent.toLowerCase();

        if (courseName.includes(searchValue)){
            course.style.display = "block";
        } else {
            course.style.display = "none";
        }
    });
        if (courseSearch.value.trim() === ""){
        addCourseButton.disabled = true;
    }
});

additionalCoursesContainer.addEventListener("click", function(event){
    if (event.target.classList.contains("additionalCourseSearch")){
        const suggestions = event.target.nextElementSibling;

        suggestions.style.display = "grid";
    }
});

addCourseButton.addEventListener("click", function(){
    const newCourseGroup = document.createElement("div");

    newCourseGroup.classList.add("enrollmentFormGroup");

    newCourseGroup.innerHTML = `
        <label>Select Another Course</label>
        <input type="text" class="additionalCourseSearch" placeholder="Search or select a course">
        <div class="enrollmentCourseSuggestions">
        </div>
        <p class="enrollmentError"></p>
    `;

    const suggestions = newCourseGroup.querySelector(".enrollmentCourseSuggestions");

    opportunities.forEach(function(course){
        const suggestion = document.createElement("div");

        suggestion.classList.add("enrollmentCourseSuggestion");
        suggestion.textContent = course;

        suggestions.appendChild(suggestion);
    });

    additionalCoursesContainer.appendChild(newCourseGroup);
    addCourseButton.disabled = true;
});

additionalCoursesContainer.addEventListener("click", function(event){
    if (event.target.classList.contains("enrollmentCourseSuggestion")){
        const suggestions = event.target.parentElement;
        const input = suggestions.previousElementSibling;
        const selectedCourse = event.target.textContent;

        const allCourseInputs = document.querySelectorAll("#courseSearch, .additionalCourseSearch");

        let courseAlreadySelected = false;

        allCourseInputs.forEach(function(courseInput){
            if (courseInput !== input && courseInput.value === selectedCourse){
                courseAlreadySelected = true;
            }
        });

        if (courseAlreadySelected){
            return;
        }

        input.value = selectedCourse;
        suggestions.style.display = "none";
        addCourseButton.disabled = false;
    }
});

// VALIDATION JS

enrollmentForm.addEventListener("submit", function(event){
    event.preventDefault();

    const allCourseInputs = document.querySelectorAll("#courseSearch, .additionalCourseSearch");

    for (let courseInput of allCourseInputs){
        const courseError = courseInput.closest(".enrollmentFormGroup").querySelector(".enrollmentError");

        if (courseInput.value.trim() === ""){
            courseError.textContent = "Please select a course.";
            courseInput.style.borderColor = "var(--error)";
            return;
        }

        courseError.textContent = "";
        courseInput.style.borderColor = "var(--border)";
    }

    const fullName = document.getElementById("fullName");
    const fullNameError = fullName.nextElementSibling;

    if (fullName.value.trim() === ""){
        fullNameError.textContent = "Please enter your full name.";
        fullName.style.borderColor = "var(--error)";
        return;
    }

    fullNameError.textContent = "";
    fullName.style.borderColor = "var(--border)";

    const email = document.getElementById("email");
    const emailError = email.nextElementSibling;

    if (email.value.trim() === ""){
        emailError.textContent = "Please enter your email address.";
        email.style.borderColor = "var(--error)";
        return;
    }

    if (!email.value.includes("@") || !email.value.includes(".")){
        emailError.textContent = "Please enter a valid email address.";
        email.style.borderColor = "var(--error)";
        return;
    }

    emailError.textContent = "";
    email.style.borderColor = "var(--border)";

    const phone = document.getElementById("phone");
    const phoneError = phone.nextElementSibling;

    if (phone.value.trim() === ""){
        phoneError.textContent = "Please enter your phone number.";
        phone.style.borderColor = "var(--error)";
        return;
    }

    const phonePattern = /^(03\d{9}|\+923\d{9})$/;

    if (!phonePattern.test(phone.value)){
        phoneError.textContent = "Please enter a valid Pakistani phone number.";
        phone.style.borderColor = "var(--error)";
        return;
    }

    phoneError.textContent = "";
    phone.style.borderColor = "var(--border)";

    const age = document.getElementById("age");
    const ageError = age.nextElementSibling;

    if (age.value.trim() === ""){
        ageError.textContent = "Please enter your age.";
        age.style.borderColor = "var(--error)";
        return;
    }

    if (age.value < 10 || age.value > 100){
        ageError.textContent = "Please enter a valid age.";
        age.style.borderColor = "var(--error)";
        return;
    }

    ageError.textContent = "";
    age.style.borderColor = "var(--border)";

    const city = document.getElementById("city");
    const cityError = city.nextElementSibling;

    if (city.value.trim() === ""){
        cityError.textContent = "Please enter your city.";
        city.style.borderColor = "var(--error)";
        return;
    }

    cityError.textContent = "";
    city.style.borderColor = "var(--border)";

    const message = document.getElementById("message");
    const messageError = message.nextElementSibling;

    if (message.value.trim() === ""){
        messageError.textContent = "Please tell us about your learning goals.";
        message.style.borderColor = "var(--error)";
        return;
    }

    messageError.textContent = "";
    message.style.borderColor = "var(--border)";

    enrollmentForm.reset();
    additionalCoursesContainer.innerHTML = "";
    addCourseButton.disabled = true;

    enrollmentSuccessOverlay.classList.add("active");

});

enrollmentSuccessButton.addEventListener("click", function(){

    enrollmentSuccessOverlay.classList.remove("active");

    setTimeout(function(){
        window.location.href = "../index.html";
    }, 300);

});