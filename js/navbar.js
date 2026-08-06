document.addEventListener("DOMContentLoaded", () => {

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav-link").forEach(link => {

        const href = link.getAttribute("href");

        link.classList.remove("active");

        if (href === currentPage) {
            link.classList.add("active");
        }

    });

});