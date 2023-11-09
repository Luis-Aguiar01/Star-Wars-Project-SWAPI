const characterName = document.querySelectorAll("#list-characters-container a");
const personName = document.querySelector(".card-content .person-name");
const personImage = document.querySelector(".card-content .image-card");
const personNameCard = document.querySelector(".card-content .nome span");
const personAltura = document.querySelector(".card-content .altura span");
const personPeso = document.querySelector(".card-content .peso span");
const personCabelo = document.querySelector(".card-content .cabelo span");
const personAniversario = document.querySelector(".card-content .aniversario span");
const personGenero = document.querySelector(".card-content .genero span");
const personPlanetaNatal = document.querySelector(".card-content .planeta-natal span");
const personFilmes = document.querySelector(".card-content .filmes span");
const personEspecie = document.querySelector(".card-content .especie span");
const personVeiculos = document.querySelector(".card-content .veiculos span");
const personStarship = document.querySelector(".card-content .starship span");

async function getUserData(name) {

    let url = "https://swapi.dev/api/people/?search=" + name;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        showUserData(jsonUser.results[0]);
    }   
    else {
        console.log("ERRO API");
    }
}

async function getHomeWorld(homeWorld) {

    let url = homeWorld;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        return jsonUser.name;
    }   
    else {
        console.log("ERRO API");
    }
}

async function getMovies(filmes) {

    let url = filmes;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        return jsonUser.title;
    }   
    else {
        console.log("ERRO API");
    }
}

async function getSpecies(species) {

    let url = species;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        return jsonUser.name; 
    }   
    else {
        console.log("ERRO API");
    }
}

async function getVeiculos(veiculos) {

    let url = veiculos;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        return jsonUser.name; 
    }   
    else {
        console.log("ERRO API");
    }
}

async function getStarship(starship) {

    let url = starship;

    let response = await fetch(url);

    if(response.ok) {
        let jsonUser = await response.json();
        return jsonUser.name; 
    }   
    else {
        console.log("ERRO API");
    }
}

function limparCard() {
    personName.textContent = ""; 
    personImage.setAttribute("src", ""); 
    personNameCard.textContent = "";
    personAltura.textContent = "";
    personPeso.textContent = "";
    personCabelo.textContent = "";
    personAniversario.textContent = "";
    personGenero.textContent = "";
    personPlanetaNatal.textContent = ""; 
    personFilmes.textContent = "";
    personEspecie.textContent = ""; 
    personVeiculos.textContent = ""; 
    personStarship.textContent = ""; 
}

characterName.forEach((name) => {
    name.addEventListener("click", (e) => {
        e.preventDefault();
        limparCard();
        getUserData(name.innerText)
    });
});

async function showUserData(personagem) {

    personName.innerHTML = `${personagem.name}`;
    personNameCard.innerHTML = `${personagem.name}`;
    personAltura.innerHTML = `${personagem.height.slice(0, -2)}, ${personagem.height.slice(-2)}`;
    personPeso.textContent = `${personagem.mass}`;
    personCabelo.textContent = `${personagem.hair_color}`;
    personAniversario.textContent = `${personagem.birth_year}`;
    personGenero.textContent = `${personagem.gender}`;
    personImage.setAttribute("src",`assets/personagens/${personagem.name}.jpg`);
    
    const nomeDoPlaneta = await getHomeWorld(personagem.homeworld);
    personPlanetaNatal.textContent = nomeDoPlaneta;
    
    let nomeDosFilmes;
    let counter = 1;
    let tamanho = personagem.films.length;

    personagem.films.forEach( async(filmes) => {
        nomeDosFilmes = await getMovies(filmes);
        personFilmes.textContent += nomeDosFilmes + ((counter === tamanho) ? "" : ", ");
        counter++;
    });

    if(personagem.species.length == 0) {
        personEspecie.textContent = "Desconhecido";
    }
    else {
        personagem.species.forEach( async(especie) => {
            let nomeDaEspecie = await getSpecies(especie);
            personEspecie.textContent += nomeDaEspecie;      
        });
    }

    let contadorVeiculos = 1;
    let tamanhoVeiculos = personagem.vehicles.length;
    
    if(tamanhoVeiculos == 0) {
        personVeiculos.textContent = "Nenhum";
    }
    else {
        personagem.vehicles.forEach( async(veiculo) => {
            let nomeDoVeiculo = await getVeiculos(veiculo);
            personVeiculos.textContent += nomeDoVeiculo + ((contadorVeiculos === tamanhoVeiculos) ? "" : ",  ");  
            contadorVeiculos++;    
        });
    }

    let contadorStarships = 1;
    let tamanhoStarships = personagem.starships.length;
    
    if(tamanhoStarships == 0) {
        personStarship.textContent = "Nenhum";
    }
    else {
        personagem.starships.forEach( async(starship) => {
            let nameStarship = await getStarship(starship);
            personStarship.textContent += nameStarship + ((contadorStarships === tamanhoStarships) ? "" : ",  ");  
            contadorStarships++;    
        });
    }
}

const pageMapping = {
    'Ackbar': 'Ackbar',
    'Adi Gallia': 'Adi Gallia',
    'Anakin Skywalker': 'Anakin Skywalker',
    'Arvel Crynyd': 'Arvel Crynyd',
    'Ayla Secura': 'Ayla Secura',
    'Bail Prestor Organa': 'Bail Prestor Organa',
    'Barriss Offee': 'Barriss Offee',
    'Ben Quadinaros': 'Ben Quadinaros',
    'Beru Whitesun lars': 'Beru Whitesun lars',
    'Bib Fortuna': 'Bib Fortuna',
    'Biggs Darklighter': 'Biggs Darklighter',
    'Boba Fett': 'Boba Fett',
    'Bossk': 'Bossk',
    'C-3PO': 'C-3PO',
    'Chewbacca': 'Chewbacca',
    'Cliegg Lars': 'Cliegg Lars',
    'Darth Maul': 'Darth Maul',
    'Darth Vader': 'Darth Vader',
    'Dexter Jettster': 'Dexter Jettster',
    'Dooku': 'Dooku',
    'Dormé': 'Dormé',
    'Dud Bolt': 'Dud Bolt',
    'Eeth Koth': 'Eeth Koth',
    'Finis Valorum': 'Finis Valorum',
    'Gasgano': 'Gasgano',
    'Greedo': 'Greedo',
    'Gregar Typho': 'Gregar Typho',
    'Grievous': 'Grievous',
    'Han Solo': 'Han Solo',
    'IG-88': 'IG-88',
    'Jabba Desilijic Tiure': 'Jabba Desilijic Tiure',
    'Jango Fett': 'Jango Fett',
    'Jar Jar Binks': 'Jar Jar Binks',
    'Jek Tono Porkins': 'Jek Tono Porkins',
    'Jocasta Nu': 'Jocasta Nu',
    'Ki-Adi-Mundi': 'Ki-Adi-Mundi',
    'Kit Fisto': 'Kit Fisto',
    'Lama Su': 'Lama Su',
    'Lando Calrissian': 'Lando Calrissian',
    'Leia Organa': 'Leia Organa',
    'Lobot': 'Lobot',
    'Luke Skywalker': 'Luke Skywalker',
    'Luminara Unduli': 'Luminara Unduli',
    'Mace Windu': 'Mace Windu',
    'Mas Amedda': 'Mas Amedda',
    'Mon Mothma': 'Mon Mothma',
    'Nien Nunb': 'Nien Nunb',
    'Nute Gunray': 'Nute Gunray',
    'Obi-Wan Kenobi': 'Obi-Wan Kenobi',
    'Owen Lars': 'Owen Lars',
    'Padmé Amidala': 'Padmé Amidala',
    'Palpatine': 'Palpatine',
    'Plo Koon': 'Plo Koon',
    'Poggle the Lesser': 'Poggle the Lesser',
    'Quarsh Panaka': 'Quarsh Panaka',
    'Qui-Gon Jinn': 'Qui-Gon Jinn',
    'R2-D2': 'R2-D2',
    'R4-P17': 'R4-P17',
    'R5-D4': 'R5-D4',
    'Ratts Tyerel': 'Ratts Tyerel',
    'Raymus Antilles': 'Raymus Antilles',
    'Ric Olié': 'Ric Olié',
    'Roos Tarpals': 'Roos Tarpals',
    'Rugor Nass': 'Rugor Nass',
    'Saesee Tiin': 'Saesee Tiin',
    'San Hill': 'San Hill',
    'Sebulba': 'Sebulba',
    'Shaak Ti': 'Shaak Ti',
    'Shmi Skywalker': 'Shmi Skywalker',
    'Sly Moore': 'Sly Moore',
    'Tarfful': 'Tarfful',
    'Taun We': 'Taun We',
    'Tion Medon': 'Tion Medon',
    'Wat Tambor': 'Wat Tambor',
    'Watto': 'Watto',
    'Wedge Antilles': 'Wedge Antilles',
    'Wicket Systri Warrick': 'Wicket Systri Warrick',
    'Wilhuff Tarkin': 'Wilhuff Tarkin',
    'Yarael Poof': 'Yarael Poof',
    'Yoda': 'Yoda',
    'Zam Wesell': 'Zam Wesell',
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