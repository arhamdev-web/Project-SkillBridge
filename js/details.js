const params = new URLSearchParams(window.location.search);
const opportunityId = params.get("id");

fetch("../data/opportunities.json")
    .then(response => response.json())
    .then(data => {
        const opportunity = data.opportunities.find(item => item.id == opportunityId);
        const skillsContainer = document.querySelector(".courseSkillsContainer");
        const topicsContainer = document.querySelector(".courseOverviewTopics");
        const overviewFirst = document.querySelector("#overviewFirst");
        const overviewSecond = document.querySelector("#overviewSecond");
        const requirementsList = document.querySelector(".courseRequirementsList");
        const outcomesContainer = document.querySelector(".learningOutcomesContainer");
        const courseCategory = document.querySelector("#courseCategory");
        const courseTitle = document.querySelector("#courseTitle");
        const courseDescription = document.querySelector("#courseDescription");
        const courseDuration = document.querySelector("#courseDuration");
        const courseCost = document.querySelector("#courseCost");
        const courseLevel = document.querySelector("#courseLevel");

        // HERO SECTION

        courseCategory.textContent = opportunity.category;
        courseTitle.textContent = opportunity.title;
        courseDescription.textContent = opportunity.description;
        courseDuration.textContent = `${opportunity.durationHours} Hours`;
        courseCost.textContent = `PKR ${opportunity.estimatedCost}`;
        courseLevel.textContent = opportunity.level;

        // WHAT YOU'LL LEARN SECTION

        overviewFirst.textContent = opportunity.overview[0];
        overviewSecond.textContent = opportunity.overview[1];

        opportunity.topics.forEach(topic => {
            const topicElement = document.createElement("div");
            topicElement.classList.add("courseOverviewTopic");

            const icon = document.createElement("i");
            icon.className = topic.icon;

            const topicText = document.createElement("div");

            const topicTitle = document.createElement("h3");
            topicTitle.textContent = topic.title;

            const topicDescription = document.createElement("p");
            topicDescription.textContent = topic.description;


            topicText.appendChild(topicTitle);
            topicText.appendChild(topicDescription);

            topicElement.appendChild(icon);
            topicElement.appendChild(topicText);

            topicsContainer.appendChild(topicElement);
        });

        // SKILL YOU'LL GAIN SECTION

        opportunity.skillDetails.forEach(skill => {
            const skillElement = document.createElement("div");
            skillElement.classList.add("courseSkill");

            const icon = document.createElement("i");
            icon.className = skill.icon;

            const skillName = document.createElement("span");
            skillName.textContent = skill.name;

            skillElement.appendChild(icon);
            skillElement.appendChild(skillName);

            skillsContainer.appendChild(skillElement);
        });

        // COURSE REQUIREMENTS SECTION

        opportunity.requirements.forEach(requirement => {
            const requirementElement = document.createElement("div");
            requirementElement.classList.add("courseRequirement");

            const icon = document.createElement("i");
            icon.className = requirement.icon;

            const requirementText = document.createElement("span");
            requirementText.textContent = requirement.text;

            requirementElement.appendChild(icon);
            requirementElement.appendChild(requirementText);

            requirementsList.appendChild(requirementElement);
        });

        // LEARNING OUTCOMES SECTION

        opportunity.outcomes.forEach((outcome, index) => {
            const outcomeElement = document.createElement("div");
            outcomeElement.classList.add("learningOutcome");

            const number = document.createElement("span");
            number.textContent = `0${index + 1}`;

            const outcomeText = document.createElement("div");

            const outcomeTitle = document.createElement("h3");
            outcomeTitle.textContent = outcome.title;

            const outcomeDescription = document.createElement("p");
            outcomeDescription.textContent = outcome.description;

            outcomeText.appendChild(outcomeTitle);
            outcomeText.appendChild(outcomeDescription);

            outcomeElement.appendChild(number);
            outcomeElement.appendChild(outcomeText);

            outcomesContainer.appendChild(outcomeElement);
        });

    });