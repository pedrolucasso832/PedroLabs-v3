const projects = [
    {
        title: "PousaPet",
        category: ["site", "app"],
        type: "Plataforma web",
        year: "2025",
        description:
            "Interface para gerenciar e agendar cuidados com animais de estimação e animais em situação de abandono.",
        url: "https://pedrolucasso832.github.io/PousaPet/",
        tags: ["HTML", "CSS", "JavaScript"],
        accent: "#8ed5c1"
    },
    {
        title: "PedroLabs Portfolio v1",
        category: ["portfolio", "site"],
        type: "Portfólio",
        year: "2025",
        description:
            "Primeira versão do meu portfólio profissional, criada para apresentar projetos, habilidades e contatos.",
        url: "https://pedrolucasso832.github.io/portfolio-pedro/",
        tags: ["UI", "Responsivo", "Front-end"],
        accent: "#d8b476"
    },
    {
        title: "FCJA Agendamento",
        category: ["app"],
        type: "Sistema",
        year: "2026",
        description:
            "Interface para agendamento e gerenciamento de serviços com fluxo simples para o usuário.",
        url: "https://pedrolucasso832.github.io/fcja-agendamento/",
        tags: ["Agendamento", "JavaScript", "UX"],
        accent: "#ff7a66"
    },
    {
        title: "Helo'sBurguer",
        category: ["site"],
        type: "Site",
        year: "2026",
        description:
            "Landingpage de uma hamburgueria fictícia.",
        url: "https://pedrolucasso832.github.io/Helos-Burguer/",
        tags: ["HTML", "CSS", "JavaScript"],
        accent: "#62a8ff"
    }
];

const menuMobile = document.getElementById("menu-mobile");
const navList = document.getElementById("nav-list");
const navLinks = document.querySelectorAll(".nav-link");
const currentYear = document.getElementById("ano-atual");
const form = document.getElementById("form");
const statusMessage = document.getElementById("mensagem-status");
const projectsGrid = document.getElementById("projects-grid");
const filterButtons = document.querySelectorAll("[data-filter]");
const themeToggle = document.getElementById("theme-toggle");

const motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: light)");

function getCurrentTheme() {
    return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

function updateThemeButton(theme) {
    if (!themeToggle) return;

    const isLight = theme === "light";
    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", isLight ? "Ativar modo escuro" : "Ativar modo claro");
    themeToggle.title = isLight ? "Ativar modo escuro" : "Ativar modo claro";
}

function setTheme(theme, shouldSave = true) {
    document.documentElement.dataset.theme = theme;
    updateThemeButton(theme);

    if (shouldSave) {
        localStorage.setItem("pedrolabs-theme", theme);
    }
}

function setMenuState(isOpen) {
    if (!menuMobile || !navList) return;

    menuMobile.classList.toggle("is-active", isOpen);
    navList.classList.toggle("is-active", isOpen);
    menuMobile.setAttribute("aria-expanded", String(isOpen));
    menuMobile.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
}

function closeMenu() {
    setMenuState(false);
}

function createPreview(project) {
    const preview = document.createElement("div");
    preview.className = "project-preview";
    preview.style.setProperty("--project-color", project.accent);
    preview.setAttribute("aria-hidden", "true");

    preview.innerHTML = `
        <div class="preview-window">
            <div class="preview-bar">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="preview-line"></div>
            <div class="preview-line"></div>
            <div class="preview-blocks">
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    return preview;
}

function createProjectCard(project, index) {
    const card = document.createElement("article");
    card.className = "project-card";
    card.dataset.reveal = "";
    card.dataset.categories = project.category.join(" ");
    card.style.transitionDelay = motionReduced ? "0ms" : `${Math.min(index * 80, 240)}ms`;

    const media = document.createElement("a");
    media.className = "project-media";
    media.href = project.url;
    media.target = project.url.startsWith("http") ? "_blank" : "_self";
    media.rel = project.url.startsWith("http") ? "noopener noreferrer" : "";
    media.setAttribute("aria-label", `Abrir projeto ${project.title}`);
    media.appendChild(createPreview(project));

    const body = document.createElement("div");
    body.className = "project-body";

    const meta = document.createElement("div");
    meta.className = "project-meta";
    meta.innerHTML = `${project.type} <span></span> ${project.year}`;

    const title = document.createElement("h3");
    title.textContent = project.title;

    const description = document.createElement("p");
    description.textContent = project.description;

    const tags = document.createElement("div");
    tags.className = "project-tags";
    project.tags.forEach((tag) => {
        const tagElement = document.createElement("span");
        tagElement.textContent = tag;
        tags.appendChild(tagElement);
    });

    const actions = document.createElement("div");
    actions.className = "project-actions";

    const projectLink = document.createElement("a");
    projectLink.className = "project-link";
    projectLink.href = project.url;
    projectLink.target = project.url.startsWith("http") ? "_blank" : "_self";
    projectLink.rel = project.url.startsWith("http") ? "noopener noreferrer" : "";
    projectLink.innerHTML = 'Abrir projeto <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>';
    actions.appendChild(projectLink);

    body.append(meta, title, description, tags, actions);
    card.append(media, body);

    return card;
}

function renderProjects(filter = "all") {
    if (!projectsGrid) return;

    projectsGrid.innerHTML = "";

    projects
        .filter((project) => filter === "all" || project.category.includes(filter))
        .forEach((project, index) => {
            projectsGrid.appendChild(createProjectCard(project, index));
        });

    observeRevealItems();
}

function updateActiveFilter(selectedButton) {
    filterButtons.forEach((button) => {
        const isActive = button === selectedButton;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}

function showStatus(message, type = "success") {
    if (!statusMessage) return;

    statusMessage.textContent = message;
    statusMessage.classList.remove("is-error", "is-success");
    statusMessage.classList.add(type === "error" ? "is-error" : "is-success");
}

let revealObserver;
let revealEventsBound = false;
let revealTicking = false;

function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    return rect.top < viewportHeight * 0.88 && rect.bottom > viewportHeight * 0.06;
}

function revealVisibleItems(items) {
    items.forEach((item) => {
        if (isElementInViewport(item)) {
            item.classList.add("is-visible");
        }
    });
}

function scheduleRevealCheck(items) {
    if (revealTicking) return;

    revealTicking = true;
    window.requestAnimationFrame(() => {
        revealVisibleItems(items);
        revealTicking = false;
    });
}

function observeRevealItems() {
    const revealItems = document.querySelectorAll("[data-reveal]");
    const heroSection = document.getElementById("home");

    if (motionReduced || !("IntersectionObserver" in window)) {
        revealItems.forEach((item) => item.classList.add("is-visible"));
        return;
    }

    document.documentElement.classList.add("reveal-enabled");
    heroSection?.classList.add("is-visible");
    revealVisibleItems(revealItems);
    window.requestAnimationFrame(() => revealVisibleItems(revealItems));
    window.setTimeout(() => revealVisibleItems(revealItems), 180);
    window.setTimeout(() => revealVisibleItems(revealItems), 600);

    if (!revealEventsBound) {
        window.addEventListener("load", () => revealVisibleItems(document.querySelectorAll("[data-reveal]")));
        window.addEventListener("hashchange", () => {
            window.setTimeout(() => revealVisibleItems(document.querySelectorAll("[data-reveal]")), 120);
        });
        window.addEventListener("scroll", () => scheduleRevealCheck(document.querySelectorAll("[data-reveal]")), {
            passive: true
        });
        revealEventsBound = true;
    }

    if (!revealObserver) {
        revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const shouldReplay = entry.target.dataset.replay === "true";

                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");

                        if (!shouldReplay) {
                            revealObserver.unobserve(entry.target);
                        }
                    } else if (shouldReplay) {
                        entry.target.classList.remove("is-visible");
                    }
                });
            },
            {
                root: null,
                rootMargin: "0px 0px -12% 0px",
                threshold: 0.16
            }
        );
    }

    revealItems.forEach((item) => revealObserver.observe(item));
}

function setupActiveNavigation() {
    const sections = document.querySelectorAll("main section[id]");

    if (!("IntersectionObserver" in window)) return;

    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
                });
            });
        },
        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }
    );

    sections.forEach((section) => navObserver.observe(section));
}

if (menuMobile && navList) {
    menuMobile.addEventListener("click", () => {
        const isOpen = menuMobile.getAttribute("aria-expanded") !== "true";
        setMenuState(isOpen);
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

filterButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(button.classList.contains("is-active")));

    button.addEventListener("click", () => {
        updateActiveFilter(button);
        renderProjects(button.dataset.filter);
    });
});

if (themeToggle) {
    updateThemeButton(getCurrentTheme());

    themeToggle.addEventListener("click", () => {
        const nextTheme = getCurrentTheme() === "light" ? "dark" : "light";
        setTheme(nextTheme);
    });
}

colorSchemeQuery.addEventListener("change", (event) => {
    if (localStorage.getItem("pedrolabs-theme")) return;

    setTheme(event.matches ? "light" : "dark", false);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name")?.value.trim();
        const email = document.getElementById("email")?.value.trim();
        const message = document.getElementById("message")?.value.trim();

        if (!name || !email || !message) {
            showStatus("Preencha todos os campos.", "error");
            return;
        }

        const phone = "5583988510269";
        const text = `Olá, me chamo ${name}. Meu e-mail é: ${email}\n\n${message}`;
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        const whatsappWindow = window.open(url, "_blank");

        if (whatsappWindow) {
            whatsappWindow.opener = null;
            showStatus("Abrindo WhatsApp...", "success");
            form.reset();
        } else {
            showStatus("Permita pop-ups para abrir o WhatsApp.", "error");
        }
    });
}

renderProjects();
observeRevealItems();
setupActiveNavigation();
