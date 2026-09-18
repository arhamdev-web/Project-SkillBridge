const opportunitiesContainer = document.getElementById("opportunitiesContainer");

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
});