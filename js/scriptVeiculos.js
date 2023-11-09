const veiculosNomes = document.querySelectorAll("#list-characters-container ul li a");
const veiculoNomeTitulo = document.querySelector(".card-content .person-name");
const veiculoImg = document.querySelector(".card-content .image-card");
const veiculoNome = document.querySelector(".card-content .nome span");
const veiculoModelo = document.querySelector(".card-content .modelo span");
const veiculoFabricante = document.querySelector(".card-content .fabricante span");
const veiculoCusto = document.querySelector(".card-content .custo span");
const veiculoTamanho = document.querySelector(".card-content .tamanho span");
const veiculoVelocidade = document.querySelector(".card-content .velocidade span");
const veiculoEquipe = document.querySelector(".card-content .equipe span");
const veiculoCapacidade = document.querySelector(".card-content .capacidade span");
const veiculoConsumiveis = document.querySelector(".card-content .consumiveis span");
const veiculoClasse = document.querySelector(".card-content .classe span");



// Funções 

async function getVehicleData(name) {

    let url = "https://swapi.dev/api/vehicles/?search=" + name;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        showVehicleData(jsonUser.results[0]);
    }   
    else {
        console.log("ERRO API");
    }
}

function cleanCard() {
    veiculoNomeTitulo.textContent = "";
    veiculoImg.setAttribute("src", ``);
    veiculoNome.textContent = "";
    veiculoModelo.textContent = "";
    veiculoFabricante.textContent = "";
    veiculoCusto.textContent = "";
    veiculoTamanho.textContent = "";
    veiculoVelocidade.textContent = "";
    veiculoEquipe.textContent = "";
    veiculoCapacidade.textContent = "";
    veiculoConsumiveis.textContent = "";
    veiculoClasse.textContent = "";
}

function showVehicleData(veiculo) {
    veiculoNomeTitulo.textContent = veiculo.name;

    if(veiculo.name == "LAAT/c") {
        veiculoImg.setAttribute("src", `assets/veiculos/LAATc.jpg`);
    }
    else if(veiculo.name == "LAAT/i") {
        veiculoImg.setAttribute("src", `assets/veiculos/LAATi.jpg`);
    }
    else if(veiculo.name == "TIE/IN interceptor") {
        veiculoImg.setAttribute("src", `assets/veiculos/TIEIN interceptor.jpg`);
    }
    else if(veiculo.name == "TIE/LN starfighter") {
        veiculoImg.setAttribute("src", `assets/veiculos/TIELN starfighter.jpg`);
    }
    else {
        veiculoImg.setAttribute("src", `assets/veiculos/${veiculo.name}.jpg`);
    }

    veiculoNome.textContent = veiculo.name;
    veiculoModelo.textContent = veiculo.model;
    veiculoFabricante.textContent = veiculo.manufacturer;
    veiculoCusto.textContent = veiculo.cost_in_credits;
    veiculoTamanho.textContent = veiculo.length;
    veiculoVelocidade.textContent = veiculo.max_atmosphering_speed;
    veiculoEquipe.textContent = veiculo.crew;
    veiculoCapacidade.textContent = veiculo.passengers;
    veiculoConsumiveis.textContent = veiculo.consumables;
    veiculoClasse.textContent = veiculo.vehicle_class;
}

// Eventos

veiculosNomes.forEach((name) => {
    name.addEventListener("click", (e) => {
        e.preventDefault();
        cleanCard();
        getVehicleData(name.innerText);
    });
});


// Barra de pesquisa

const pageMapping = {
    "AT-AT": "AT-AT",
    "AT-RT": "AT-RT",
    "AT-ST": "AT-ST",
    "AT-TE": "AT-TE",
    "Armored Assault Tank": "Armored Assault Tank",
    "Bantha-II cargo skiff": "Bantha-II cargo skiff",
    "C-9979 landing craft": "C-9979 landing craft",
    "Clone turbo tank": "Clone turbo tank",
    "Corporate Alliance tank droid": "Corporate Alliance tank droid",
    "Droid gunship": "Droid gunship",
    "Droid tri-fighter": "Droid tri-fighter",
    "Emergency Firespeeder": "Emergency Firespeeder",
    "Flitknot speeder": "Flitknot speeder",
    "Geonosian starfighter": "Geonosian starfighter",
    "Imperial Speeder Bike": "Imperial Speeder Bike",
    "Koro-2 Exodrive airspeeder": "Koro-2 Exodrive airspeeder",
    "LAAT/c": "LAAT/c",
    "LAAT/i": "LAAT/i",
    "Multi-Troop Transport": "Multi-Troop Transport",
    "Neimoidian shuttle": "Neimoidian shuttle",
    "Oevvaor jet catamaran": "Oevvaor jet catamaran",
    "Raddaugh Gnasp fluttercraft": "Raddaugh Gnasp fluttercraft",
    "SPHA": "SPHA",
    "Sail barge": "Sail barge",
    "Sand Crawler": "Sand Crawler",
    "Single Trooper Aerial Platform": "Single Trooper Aerial Platform",
    "Sith speeder": "Sith speeder",
    "Snowspeeder": "Snowspeeder",
    "Storm IV Twin-Pod cloud car": "Storm IV Twin-Pod cloud car",
    "T-16 skyhopper": "T-16 skyhopper",
    "TIE bomber": "TIE bomber",
    "TIE/IN interceptor": "TIE/IN interceptor",
    "TIE/LN starfighter": "TIE/LN starfighter",
    "Tribubble bongo": "Tribubble bongo",
    "Tsmeu-6 personal wheel bike": "Tsmeu-6 personal wheel bike",
    "Vulture Droid": "Vulture Droid",
    "X-34 landspeeder": "X-34 landspeeder",
    "XJ-6 airspeeder": "XJ-6 airspeeder",
    "Zephyr-G swoop bike": "Zephyr-G swoop bike",
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
