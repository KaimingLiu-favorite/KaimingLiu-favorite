document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuButton = document.getElementById("mobileMenuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const revealItems = document.querySelectorAll(".reveal");

    const setHeaderState = () => {
        header.classList.toggle("is-scrolled", window.scrollY > 12);
    };

    setHeaderState();
    window.addEventListener("scroll", setHeaderState, { passive: true });

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            const isOpen = header.classList.toggle("menu-open");
            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute("aria-label", isOpen ? "关闭菜单" : "打开菜单");
            menuButton.querySelector("i").className = isOpen ? "fas fa-times" : "fas fa-bars";
        });

        mobileMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                header.classList.remove("menu-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.setAttribute("aria-label", "打开菜单");
                menuButton.querySelector("i").className = "fas fa-bars";
            });
        });
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.16 });

        revealItems.forEach((item) => observer.observe(item));
    } else {
        revealItems.forEach((item) => item.classList.add("is-visible"));
    }
});
