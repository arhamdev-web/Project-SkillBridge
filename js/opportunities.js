// COURSE SECTION

const opportunitiesContainer = document.getElementById("opportunitiesContainer");

let opportunityCards;

fetch("../data/opportunities.json")
    .then(response => response.json())
    .then(data => {
        data.opportunities.forEach(opportunity => {
            const card = document.createElement("div");
            card.classList.add("opportunityCard");
            
            const image = document.createElement("img");
            image.src = opportunity.image;
            
            const content = document.createElement("div");
            content.classList.add("opportunityCardContent");

            const title = document.createElement("h2");
            title.textContent = opportunity.title;

            const description = document.createElement("p");
            description.textContent = opportunity.description;

            const skills = document.createElement("div");
            skills.classList.add("opportunityCardSkills");
            opportunity.skills.forEach(skill => {
                const skillSpan = document.createElement("span");
                skillSpan.textContent = skill;
                skills.appendChild(skillSpan);
            });

            const link = document.createElement("a");
            link.textContent = "View Details";
            link.href = `details.html?id=${opportunity.id}`;
            
            opportunitiesContainer.appendChild(card);
            card.appendChild(image);
            card.appendChild(content);
            content.appendChild(title);
            content.appendChild(description);
            content.appendChild(skills);
            content.appendChild(link);

        });

            opportunityCards = document.querySelectorAll(".opportunityCard");
});


// SEARCH SYSTEM SECTION


const searchInput = document.querySelector(".opportunitiesSearchInput");
const searchButton = document.querySelector(".opportunitiesSearchButton");
const searchSuggestions = document.querySelector(".searchSuggestions");

    searchButton.addEventListener("click", function() {
        const oldMessage = document.querySelector(".noCoursesMessage");

        if (oldMessage) {
            oldMessage.remove();
        }

        const searchValue = searchInput.value.toLowerCase();
        
        let matchFound = false;
        opportunityCards.forEach(card => {
            const title = card.querySelector("h2").textContent.toLowerCase();
                if (title.includes(searchValue)) {
                card.style.display = "block";
                card.classList.add("searchResult");
                matchFound = true;
                } else {
                    card.style.display = "none";
                }
            });

            if (!matchFound) {
                const message = document.createElement("div");
                message.classList.add("noCoursesMessage", "searchResult");

                const icon = document.createElement("i");
                icon.classList.add("fa-solid", "fa-magnifying-glass");

                const title = document.createElement("h3");
                title.textContent = "No courses found";

                const text = document.createElement("p");
                text.textContent = "Try searching for another course or keyword.";

                message.appendChild(icon);
                message.appendChild(title);
                message.appendChild(text);

                opportunitiesContainer.appendChild(message);
            }  
    });

    searchInput.addEventListener("input", function() {
    const searchValue = searchInput.value.toLowerCase();

    searchSuggestions.innerHTML = "";

        if (searchValue === "") {
            searchSuggestions.style.display = "none";

            opportunityCards.forEach(card => {
            card.style.display = "block";
            });

            return;
        }

    searchSuggestions.style.display = "flex";

        opportunityCards.forEach(card => {
            const title = card.querySelector("h2").textContent.toLowerCase();

            if (title.includes(searchValue)) {
                const suggestion = document.createElement("div");
                suggestion.textContent = title;

                searchSuggestions.appendChild(suggestion);

                suggestion.addEventListener("click", function() {
                    searchInput.value = title;
                    searchButton.click();
                });
            }
        });
    });