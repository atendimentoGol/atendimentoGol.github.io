document.addEventListener("DOMContentLoaded", () => {
    const tripForm = document.getElementById('trip-form');
    const passengerList = document.getElementById('passenger-list');
    const printPassengerList = document.getElementById('print-passenger-list');
    const tripDetails = document.getElementById('trip-details');
    const printButton = document.getElementById('print-button');
    const printArea = document.getElementById('print-area');
    const printTripDetails = document.getElementById('print-trip-details');

    // Array para armazenar os nomes dos passageiros
    const passengers = [];
    const location_array = [];

    // Função para atualizar a lista de passageiros na tela
    function updatePassengerList() {
        // Limpa a lista visual
        passengerList.innerHTML = '';

        // Recria a lista de passageiros
        passengers.forEach((passenger, index) => {
            const listItem = document.createElement('li');
            const localizador = document.createElement('span');
            localizador.textContent = location_array[index];
            localizador.classList.add('localizador-passenger');

            listItem.textContent = passenger;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir';
            deleteButton.classList.add('delete-passenger');
            deleteButton.addEventListener('click', () => {
                // Remove o passageiro e a localização correspondente
                passengers.splice(index, 1);
                location_array.splice(index, 1);
                updatePassengerList(); // Re-atualiza a lista de passageiros
                displayTripDetails(); // Atualiza os detalhes da viagem
            });

            listItem.appendChild(localizador);
            listItem.appendChild(deleteButton);
            passengerList.appendChild(listItem);
        });
    }

    // Função para exibir os detalhes da viagem, incluindo o total de passageiros
    function displayTripDetails() {
        const tripData = {
            driverName: document.getElementById('driver-name').value,
            plate: document.getElementById('plate').value,
            phone: document.getElementById('phone').value,
            departureDate: document.getElementById('departure-date').value,
            departureTime: document.getElementById('departure-time').value,
            arrivalTime: document.getElementById('arrival-time').value,
            destination: document.getElementById('destination').value,
            passengers: passengers
        };

        tripDetails.textContent = `
        Nome do Motorista: ${tripData.driverName.toUpperCase()}\n
        Placa: ${tripData.plate.toUpperCase()}\n
        Telefone: ${tripData.phone}\n
        Data de Saída: ${tripData.departureDate}\n
        Horário de Saída: ${tripData.departureTime}\n
        Horário de Chegada: ${tripData.arrivalTime}\n
        Destino: ${tripData.destination.toUpperCase()}\n
        Passageiros Embarcados: ${passengers.length}\n`; // Aqui, usamos passengers.length para contar corretamente
    }

    // Adiciona um evento de clique ao botão "Adicionar Passageiro"
    document.getElementById('add-passenger').addEventListener('click', () => {
        const passengerName = document.getElementById('passenger-name').value;
        const locations = document.getElementById("location").value;

        if (passengerName || locations) {
            // Adiciona o nome do passageiro e a localização ao array
            passengers.push(passengerName.toUpperCase());
            location_array.push(locations.toUpperCase());

            updatePassengerList(); // Atualiza a lista de passageiros
            displayTripDetails();  // Atualiza os detalhes da viagem

            // Limpa os campos de entrada
            document.getElementById('passenger-name').value = '';
            document.getElementById("location").value = '';
        }
    });

    // Adiciona um evento de submissão ao formulário de viagem
    tripForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previne o comportamento padrão de submissão do formulário
        displayTripDetails(); // Exibe os detalhes da viagem ao submeter o formulário
    });

    // Adiciona um evento de clique ao botão "Imprimir Passageiros"
    printButton.addEventListener('click', () => {
        // Limpa a área de impressão dos passageiros
        printPassengerList.innerHTML = '';
       
        // Adiciona cada passageiro à lista de impressão
        passengers.forEach((passenger, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${passenger}  [${location_array[index]}]`;
            printPassengerList.appendChild(listItem);
        });

        // Copia os detalhes da viagem para a área de impressão
        printTripDetails.textContent = tripDetails.textContent;

        // Mostra a área de impressão
        printArea.style.display = 'block';

        // Aguarda um pouco para garantir que o conteúdo esteja visível
        setTimeout(() => {
            // Chama a função de impressão
            window.print();

            // Esconde a área de impressão após a impressão
            printArea.style.display = 'none';
        }, 100); // Aguarda 100ms para garantir que o conteúdo esteja visível
    });

    // Botão para reiniciar a página
    document.getElementById("restart").addEventListener("click", () => {
        location.reload();
    });
});
