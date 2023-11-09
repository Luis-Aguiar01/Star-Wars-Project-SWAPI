const starshipNames = document.querySelectorAll("#list-characters-container ul li a");
const starshipNameTitle = document.querySelector(".card-content .person-name");
const starshipImg = document.querySelector(".card-content .image-card");
const starshipName = document.querySelector(".card-content .nome span");
const starshipModel = document.querySelector(".card-content .modelo span");
const starshipFabricante = document.querySelector(".card-content .fabricante span");
const starshipCusto = document.querySelector(".card-content .custo span");
const starshipTamanho = document.querySelector(".card-content .tamanho span");
const starshipVelocidade = document.querySelector(".card-content .velocidade span");
const starshipTripulacao = document.querySelector(".card-content .tripulacao span");
const starshipPassageiros = document.querySelector(".card-content .passageiros span");
const starshipCapacidade = document.querySelector(".card-content .capacidade span");
const starshipConsumiveis = document.querySelector(".card-content .consumiveis span");
const starshipClasse = document.querySelector(".card-content .classe span");


// Funções

async function getStarshipData(name) {

    let url = "https://swapi.dev/api/starships/?search=" + name;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        showStarshipData(jsonUser.results[0]);
    }   
    else {
        console.log("ERRO API");
    }
}

function cleanCard() {
    starshipNameTitle.textContent = "";
    starshipImg.setAttribute("src", ``);
    starshipName.textContent = "";
    starshipModel.textContent = "";
    starshipFabricante.textContent = "";
    starshipCusto.textContent = "";
    starshipTamanho.textContent = "";
    starshipVelocidade.textContent = "";
    starshipTripulacao.textContent = "";
    starshipPassageiros.textContent = "";
    starshipCapacidade.textContent = "";
    starshipConsumiveis.textContent = "";
    starshipClasse.textContent = "";
}

function showStarshipData(starship) {
    starshipNameTitle.textContent = starship.name;
    starshipImg.setAttribute("src", `assets/starships/${starship.name}.jpg`);
    starshipName.textContent = starship.name;
    starshipModel.textContent = starship.model;
    starshipFabricante.textContent = starship.manufacturer;
    starshipCusto.textContent = formatNumberWithCommas(starship.cost_in_credits);
    starshipTamanho.textContent = formatNumberWithCommas(starship.length);
    starshipVelocidade.textContent = formatNumberWithCommas(starship.max_atmosphering_speed);
    starshipTripulacao.textContent = starship.crew;
    starshipPassageiros.textContent = formatNumberWithCommas(starship.passengers);
    starshipCapacidade.textContent = formatNumberWithCommas(starship.cargo_capacity);
    starshipConsumiveis.textContent = starship.consumables;
    starshipClasse.textContent = starship.starship_class;
}

function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Eventos

starshipNames.forEach((names) => {
    names.addEventListener("click", (e) => {
        e.preventDefault();
        cleanCard();
        getStarshipData(names.innerText);
    });
});


// Barra de pesquisa


const pageMapping = {
    "A-wing": "A-wing",
    "AA-9 Coruscant freighter": "AA-9 Coruscant freighter",
    "B-wing": "B-wing",
    "Banking clan frigte": "Banking clan frigte",
    "Belbullab-22 starfighter": "Belbullab-22 starfighter",
    "CR90 corvette": "CR90 corvette",
    "Calamari Cruiser": "Calamari Cruiser",
    "Death Star": "Death Star",
    "Droid control ship": "Droid control ship",
    "EF76 Nebulon-B escort frigate": "EF76 Nebulon-B escort frigate",
    "Executor": "Executor",
    "H-type Nubian yacht": "H-type Nubian yacht",
    "Imperial shuttle": "Imperial shuttle",
    "J-type diplomatic barge": "J-type diplomatic barge",
    "Jedi Interceptor": "Jedi Interceptor",
    "Jedi starfighter": "Jedi starfighter",
    "Millennium Falcon": "Millennium Falcon",
    "Naboo Royal Starship": "Naboo Royal Starship",
    "Naboo fighter": "Naboo fighter",
    "Naboo star skiff": "Naboo star skiff",
    "Rebel transport": "Rebel transport",
    "Republic Assault ship": "Republic Assault ship",
    "Republic Cruiser": "Republic Cruiser",
    "Republic attack cruiser": "Republic attack cruiser",
    "Sentinel-class landing craft": "Sentinel-class landing craft",
    "Slave 1": "Slave 1",
    "Solar Sailer": "Solar Sailer",
    "Star Destroyer": "Star Destroyer",
    "TIE Advanced x1": "TIE Advanced x1",
    "Theta-class T-2c shuttle": "Theta-class T-2c shuttle",
    "Trade Federation cruiser": "Trade Federation cruiser",
    "V-wing": "V-wing",
    "X-wing": "X-wing",
    "Y-wing": "Y-wing",
    "arc-170": "arc-170",
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