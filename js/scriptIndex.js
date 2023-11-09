const pageMapping = {
    "Personagens": "people.html",
    "Planetas": "planets.html",
    "Espaçonaves": "starships.html",
    "Veículos": "vehicles.html",
    "Filmes": "films.html",
    "Espécies": "species.html"
};

document.querySelector('form[role="search"]').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o envio do formulário

    // Obtém o valor do campo de pesquisa
    const searchTerm = this.querySelector('input[type="search"]').value;

    // Obtém o elemento do modal "não encontrado"
    const notFoundModal = new bootstrap.Modal(document.getElementById('notFoundModal'));

    if (searchTerm in pageMapping) {
        // Redireciona o usuário para a página correspondente
        const redirectURL = pageMapping[searchTerm];
        window.location.href = redirectURL;
    } else {
        // Exibe o modal de "não encontrado"
        notFoundModal.show();
    }
});