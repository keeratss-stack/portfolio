document.querySelectorAll("a").forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const href = this.getAttribute("href");

        if (href.startsWith("#")) {

            e.preventDefault();

            const target = document.querySelector(href);

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});



function animateSkills() {

    document.querySelector(".html").style.width = "60%";
    document.querySelector(".Cpp").style.width = "65%";
    document.querySelector(".python").style.width = "30%";
    document.querySelector(".C").style.width = "50%";

}

window.addEventListener("scroll", animateSkills);



fetch("https://api.github.com/users/USERNAME/repos")
    // ENTER YOUR GITHUB USERNAME ABOVE

    .then(response => response.json())

    .then(data => {

        const repoContainer = document.getElementById("repos");

        data.slice(0, 6).forEach(repo => {

            const repoCard = document.createElement("div");

            repoCard.classList.add("repo-card");

            repoCard.innerHTML = `
<h3>${repo.name}</h3>
<p>${repo.description || "No description"}</p>
<a href="${repo.html_url}" target="_blank">View Project</a>
`;

            repoContainer.appendChild(repoCard);

        });

    });



const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    sections.forEach(section => {

        const top = window.scrollY;
        const offset = section.offsetTop - 400;

        if (top > offset) {
            section.classList.add("show");
        }

    });

});
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let mouse = { x: null, y: null };

window.addEventListener("mousemove", function (e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 2;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }
    }

    draw() {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}


function init() {
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
        ));
    }
}


function connect() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {

            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = dx * dx + dy * dy;

            if (distance < 10000) {
                ctx.strokeStyle = "rgba(255,255,255,0.1)";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    connect();
    requestAnimationFrame(animate);
}

init();
animate();