// FEATURED COURSES SECTION JS STARTED

const featuredCoursesContainer = document.getElementById("featuredCoursesContainer");

if(featuredCoursesContainer) {
    fetch("../data/opportunities.json")
    .then(response => response.json())
    .then(data => {
        const featuredCourses = data.opportunities.slice(0, 4);
        featuredCourses.forEach(opportunity => {
            const card = document.createElement("div");
            card.classList.add("featuredCourseCard");

            const image = document.createElement("img");
            image.classList.add("featuredCourseImage");
            image.src = opportunity.image;

            const content = document.createElement("div");
            content.classList.add("featuredCourseContent");

            const name = document.createElement("h3");
            name.classList.add("featuredCourseName");
            name.textContent = opportunity.title;

            const info = document.createElement("div");
            info.classList.add("featuredCourseInfo");

            const price = document.createElement("span");
            price.classList.add("featuredCoursePrice");
            price.textContent = `PKR ${opportunity.estimatedCost}`;

            const duration = document.createElement("span");
            duration.classList.add("featuredCourseDuration");
            duration.textContent = `${opportunity.durationHours} Hours`;

            const description = document.createElement("p");
            description.classList.add("featuredCourseDescription");
            description.textContent = opportunity.description;

            const skills = document.createElement("div");
            skills.classList.add("featuredCourseSkills");
            opportunity.skills.forEach(skill => {
            const skillSpan = document.createElement("span");
            skillSpan.textContent = skill;

            skills.appendChild(skillSpan);
            });

            const button = document.createElement("a");
            button.classList.add("featuredCourseButton");
            button.textContent = "More Details";
            button.href = `pages/details.html?id=${opportunity.id}`;

            featuredCoursesContainer.appendChild(card);
            card.appendChild(image);
            card.appendChild(content);
            content.appendChild(name);
            content.appendChild(info);
            info.appendChild(price);
            info.appendChild(duration);
            content.appendChild(description);
            content.appendChild(skills);
            content.appendChild(button);
    });        
});
}

// FEATURED COURSES SECTION JS ENDED


// TESTIMONIALS SECTION JS STARTED

const testimonialsContainer = document.getElementById("testimonialsContainer");

if(testimonialsContainer) {
    let testimonialIndex = 0;

fetch("../data/testimonials.json")
    .then(response => response.json())
    .then(data => {

        const testimonial = data.testimonials[testimonialIndex];
        const testimonials = data.testimonials;

        let card = document.createElement("div");
        card.classList.add("testimonialCard");

        let image = document.createElement("img");
        image.classList.add("testimonialImage");
        image.src = testimonial.image;
        image.alt = "Student testimonial";

        const content = document.createElement("div");
        content.classList.add("testimonialContent");

        let text = document.createElement("p");
        text.classList.add("testimonialText");
        text.textContent = `"${testimonial.message}"`;

        let name = document.createElement("h3");
        name.classList.add("testimonialName");
        name.textContent = testimonial.name;

        let role = document.createElement("p");
        role.classList.add("testimonialRole");
        role.textContent = testimonial.role;

        testimonialsContainer.appendChild(card);

        card.appendChild(image);
        card.appendChild(content);

        content.appendChild(text);
        content.appendChild(name);
        content.appendChild(role);

        card.style.transform = "translateX(-50%)";

        let nextCard = document.createElement("div");
        nextCard.classList.add("testimonialCard");

        let nextImage = document.createElement("img");
        nextImage.classList.add("testimonialImage");

        const nextContent = document.createElement("div");
        nextContent.classList.add("testimonialContent");

        let nextText = document.createElement("p");
        nextText.classList.add("testimonialText");

        let nextName = document.createElement("h3");
        nextName.classList.add("testimonialName");

        let nextRole = document.createElement("p");
        nextRole.classList.add("testimonialRole");

        testimonialsContainer.appendChild(nextCard);

        nextCard.appendChild(nextImage);
        nextCard.appendChild(nextContent);

        nextContent.appendChild(nextText);
        nextContent.appendChild(nextName);
        nextContent.appendChild(nextRole);

        const nextTestimonial = testimonials[1];

        nextImage.src = nextTestimonial.image;
        nextImage.alt = "Student testimonial";

        nextText.textContent = `"${nextTestimonial.message}"`;
        nextName.textContent = nextTestimonial.name;
        nextRole.textContent = nextTestimonial.role;

        nextCard.style.transform = "translateX(150%)";

        setInterval(() => {
            card.style.transform = "translateX(-250%)";
            nextCard.style.transform = "translateX(-50%)";

            setTimeout(() => {
                const temp = card;
                card = nextCard;
                nextCard = temp;

                nextCard.style.transition = "none";
                nextCard.style.transform = "translateX(150%)";
                nextCard.offsetHeight;
                nextCard.style.transition = "transform 0.5s ease";

                const tempImage = image;
                image = nextImage;
                nextImage = tempImage;

                const tempText = text;
                text = nextText;
                nextText = tempText;

                const tempName = name;
                name = nextName;
                nextName = tempName;

                const tempRole = role;
                role = nextRole;
                nextRole = tempRole;

                testimonialIndex++;

                if (testimonialIndex >= testimonials.length) {
                    testimonialIndex = 0;
                }

                let nextIndex = testimonialIndex + 1;

                if (nextIndex >= testimonials.length) {
                    nextIndex = 0;
                }

                const nextTestimonial = testimonials[nextIndex];

                nextImage.src = nextTestimonial.image;
                nextText.textContent = `"${nextTestimonial.message}"`;
                nextName.textContent = nextTestimonial.name;
                nextRole.textContent = nextTestimonial.role;
            }, 500);
        }, 3000);
});
}

// TESTIMONIALS SECTION JS ENDED