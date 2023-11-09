const planetsNames = document.querySelectorAll("#list-characters-container ul li a");
const planetNameTitle = document.querySelector(".card-content .planet-name");
const planetImg = document.querySelector(".card-content .image-card");
const planetName = document.querySelector(".nome span");
const planetRotacao = document.querySelector(".rotacao span");
const planetOrbita = document.querySelector(".orbita span");
const planetDiametro = document.querySelector(".diametro span");
const planetClima = document.querySelector(".clima span");
const planetGravidade = document.querySelector(".gravidade span");
const planetTerreno = document.querySelector(".terreno span");
const planetAgua = document.querySelector(".agua span");
const planetPopulacao = document.querySelector(".populacao span");


// Funções

async function getPlanetData(name) {

    let url = "https://swapi.dev/api/planets/?search=" + name;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        showPlanetData(jsonUser.results[0]);
    }   
    else {
        console.log("ERRO API");
    }
}

function cleanCard() {
    planetNameTitle.textContent = "";
    planetImg.setAttribute("src", ``);
    planetName.textContent = "";
    planetRotacao.textContent = "";
    planetOrbita.textContent = "";
    planetDiametro.textContent = "";
    planetClima.textContent = "";
    planetGravidade.textContent = "";
    planetTerreno.textContent = "";
    planetAgua.textContent = "";
    planetPopulacao.textContent = "";
}

function showPlanetData(planet) {

    planetNameTitle.textContent = planet.name;
    planetImg.setAttribute("src", `assets/planetas/${planet.name}.jpg`);
    planetName.textContent = planet.name;
    planetRotacao.textContent = planet.rotation_period;
    planetOrbita.textContent = planet.orbital_period;
    planetDiametro.textContent = planet.diameter;
    planetClima.textContent = planet.climate;
    planetGravidade.textContent = planet.gravity;
    planetTerreno.textContent = planet.terrain;
    planetAgua.textContent = planet.surface_water;

    let populacao = planet.population;
    planetPopulacao.textContent = formatNumberWithCommas(populacao);
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}


// Eventos

planetsNames.forEach((names) => {
    names.addEventListener("click", (e) => {
        e.preventDefault();
        cleanCard();
        getPlanetData(names.innerText);
    });
});


// Barra de pesquisa

const pageMapping = {
    "Alderaan": "Alderaan",
    "Aleen Minor": "Aleen Minor",
    "Bespin": "Bespin",
    "Bestine IV": "Bestine IV",
    "Cato Neimoidia": "Cato Neimoidia",
    "Cerea": "Cerea",
    "Champala": "Champala",
    "Chandrila": "Chandrila",
    "Concord Dawn": "Concord Dawn",
    "Corellia": "Corellia",
    "Coruscant": "Coruscant",
    "Dagobah": "Dagobah",
    "Dantooine": "Dantooine",
    "Dathomir": "Dathomir",
    "Dorin": "Dorin",
    "Endor": "Endor",
    "Eriadu": "Eriadu",
    "Felucia": "Felucia",
    "Geonosis": "Geonosis",
    "Glee Anselm": "Glee Anselm",
    "Haruun Kal": "Haruun Kal",
    "Hoth": "Hoth",
    "Iktotch": "Iktotch",
    "Iridonia": "Iridonia",
    "Kalee": "Kalee",
    "Kamino": "Kamino",
    "Kashyyyk": "Kashyyyk",
    "Malastare": "Malastare",
    "Mirial": "Mirial",
    "Mon Cala": "Mon Cala",
    "Mustafar": "Mustafar",
    "Muunilinst": "Muunilinst",
    "Naboo": "Naboo",
    "Nal Hutta": "Nal Hutta",
    "Ojom": "Ojom",
    "Ord Mantell": "Ord Mantell",
    "Polis Massa": "Polis Massa",
    "Quermia": "Quermia",
    "Rodia": "Rodia",
    "Ryloth": "Ryloth",
    "Saleucami": "Saleucami",
    "Serenno": "Serenno",
    "Shili": "Shili",
    "Skako": "Skako",
    "Socorro": "Socorro",
    "Stewjon": "Stewjon",
    "Sullust": "Sullust",
    "Tatooine": "Tatooine",
    "Tholoth": "Tholoth",
    "Toydaria": "Toydaria",
    "Trandosha": "Trandosha",
    "Troiken": "Troiken",
    "Tund": "Tund",
    "Umbara": "Umbara",
    "Utapau": "Utapau",
    "Vulpter": "Vulpter",
    "Yavin IV": "Yavin IV",
    "Zolan": "Zolan",
};


document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário

    // Obtém o valor do campo de pesquisa e converte para letras minúsculas
    const searchTerm = this.querySelector('input[type="search"]').value.toLowerCase();
    let count = 0;
    const notFoundModal = new bootstrap.Modal(document.getElementById('notFoundModal'));

    for (const name in pageMapping) {
        // Converte o nome do personagem para letras minúsculas
        const lowerCaseName = name.toLowerCase();

        if (searchTerm === lowerCaseName) {
            // Obtém o ID do elemento a ser rolado
            const elementId = pageMapping[name];
            const targetElement = document.getElementById(elementId);
            count++;

            if (targetElement) {
                // Adiciona a classe de fundo temporário ao elemento de texto
                const textElement = document.getElementById(elementId); // Substitua 'character-text' pelo ID real do elemento de texto
                textElement.classList.add('background-temp');

                // Rola até o elemento
                targetElement.scrollIntoView({ behavior: 'smooth' });

                // Remove a classe de fundo temporário após 1 segundo
                setTimeout(() => {
                    textElement.classList.remove('background-temp');
                }, 1000); // 1000 milissegundos = 1 segundo
                return; // Sai do loop se a correspondência for encontrada
            }
        }  
    }

    if(count == 0) {
        notFoundModal.show();
    }
});