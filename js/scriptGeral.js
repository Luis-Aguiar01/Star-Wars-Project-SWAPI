document.addEventListener("DOMContentLoaded", function () {
    
    const textElements = document.querySelectorAll(".text");
    const listCharactersContainer = document.querySelector("#list-characters-container");

    function checkScroll() {
        textElements.forEach((element) => {
            if (isElementInViewport(element) && !element.classList.contains("active")) {
                element.classList.add("active");
            }
        });

        if (isElementInViewport2(listCharactersContainer) && !listCharactersContainer.classList.contains("active")) {
            listCharactersContainer.classList.add("active");
        }
        
    }

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }

    function isElementInViewport2(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom > 0
        );
    }

    window.addEventListener("scroll", checkScroll);

    // Chamar checkScroll uma vez para elementos que já estão visíveis na página inicial
    checkScroll();
});