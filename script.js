document.addEventListener("DOMContentLoaded", () => {
    // Obtém referências para os elementos do DOM
    const tripForm = document.getElementById('trip-form'); // Formulário da viagem
    const passengerList = document.getElementById('passenger-list'); // Lista de passageiros visual
    const printPassengerList = document.getElementById('print-passenger-list'); // Lista de passageiros para impressão
    const tripDetails = document.getElementById('trip-details'); // Detalhes da viagem (exibição)
    const printTripDetails = document.getElementById('print-trip-details'); // Detalhes da viagem para impressão
    const printButton = document.getElementById('print-button'); // Botão de imprimir
    const printArea = document.getElementById('print-area'); // Área de impressão
    let totalPassageiro = 0; // Contador total de passageiros

    // Arrays para armazenar os nomes dos passageiros e suas localizações
    const passengers = [];
    const location_array = [];

    // Evento de clique no botão "Adicionar Passageiro"
    document.getElementById('add-passenger').addEventListener('click', () => {
        const passengerName = document.getElementById('passenger-name').value; // Nome do passageiro
        const locations = document.getElementById("location").value; // Localização do passageiro

        // Se há nome ou localização, procede com a adição
        if (passengerName || locations) {
            // Adiciona nome do passageiro e localização aos arrays
            passengers.push(passengerName.toUpperCase());
            location_array.push(locations.toUpperCase());

            // Cria um item de lista (<li>) para o passageiro
            const listItem = document.createElement('li');

            // Cria um span para exibir a localização
            const localizador = document.createElement("span");
            localizador.textContent = locations.toUpperCase();
            localizador.classList.add("localizador-passenger"); // Adiciona classe para estilo

            // Define o nome do passageiro no item de lista
            listItem.textContent = passengerName.toUpperCase();

            // Cria botão de exclusão de passageiro
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Excluir'; // Texto do botão
            deleteButton.classList.add('delete-passenger'); // Classe CSS para o botão

            // Evento de clique para excluir o passageiro
            deleteButton.addEventListener('click', () => {
                const index = passengers.indexOf(passengerName.toUpperCase()); // Encontra o índice do passageiro
                if (index !== -1) {
                    // Remove passageiro e localização dos arrays
                    passengers.splice(index, 1);
                    location_array.splice(index, 1);
                    listItem.remove(); // Remove o item da lista visual
                    updatePassengerList(); // Atualiza a lista visual
                    totalPassageiro -= 1; // Diminui o total de passageiros
                }
            });

            // Adiciona o localizador e o botão de exclusão ao item de lista
            listItem.appendChild(localizador);
            listItem.appendChild(deleteButton);

            // Adiciona o item à lista de passageiros visual
            passengerList.appendChild(listItem);

            // Incrementa o total de passageiros
            totalPassageiro += 1;

            // Limpa os campos de entrada de nome e localização
            document.getElementById('passenger-name').value = '';
            document.getElementById("location").value = '';
        }
    });

    // Função para atualizar a lista de passageiros na tela
    function updatePassengerList() {
        // Limpa a lista visual
        passengerList.innerHTML = '';
    
        // Atualiza o contador total de passageiros
        totalPassageiro = passengers.length; // Atualiza o total de passageiros para refletir o tamanho atual do array
        
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
                passengers.splice(index, 1);
                location_array.splice(index, 1);
                updatePassengerList(); // Re-atualiza a lista visual
                displayTripDetails({ // Atualiza os detalhes da viagem
                    driverName: document.getElementById('driver-name').value,
                    plate: document.getElementById('plate').value,
                    phone: document.getElementById('phone').value,
                    departureDate: document.getElementById('departure-date').value,
                    departureTime: document.getElementById('departure-time').value,
                    arrivalTime: document.getElementById('arrival-time').value,
                    destination: document.getElementById('destination').value,
                    passengers: passengers
                });
            });
    
            listItem.appendChild(localizador);
            listItem.appendChild(deleteButton);
            passengerList.appendChild(listItem);
        });
    }

    // Evento de submissão do formulário de viagem
    tripForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        // Captura os dados da viagem
        const tripData = {
            driverName: document.getElementById('driver-name').value,
            plate: document.getElementById('plate').value,
            phone: document.getElementById('phone').value,
            departureDate: document.getElementById('departure-date').value,
            departureTime: document.getElementById('departure-time').value,
            arrivalTime: document.getElementById('arrival-time').value,
            destination: document.getElementById('destination').value,
            passengers: passengers // Lista de passageiros
        };

        // Exibe os detalhes da viagem
        displayTripDetails(tripData);
    });

    // Evento de clique no botão de imprimir
    printButton.addEventListener('click', () => {
        // Copia a lista de passageiros para a área de impressão
        printPassengerList.innerHTML = ''; // Limpa a área de impressão

        // Adiciona cada passageiro e sua localização à área de impressão
        passengers.forEach((passenger, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${passenger}  [${location_array[index]}]`;
            printPassengerList.appendChild(listItem);
        });

        // Copia os detalhes da viagem para a área de impressão
        printTripDetails.textContent = tripDetails.textContent;
        
        // Exibe a área de impressão
        printArea.style.display = 'block';
        // Chama a função de impressão
        window.print();
    });

    // Função para exibir os detalhes da viagem na tela
    function displayTripDetails(tripData) {
        tripDetails.textContent = `
        Nome do Motorista: ${tripData.driverName.toUpperCase()}\n 
        Placa: ${tripData.plate.toUpperCase()}\n
        Telefone: ${tripData.phone}\n
        Data de Saída: ${tripData.departureDate}\n
        Horário de Saída: ${tripData.departureTime}\n
        Horário de Chegada: ${tripData.arrivalTime}\n
        Destino: ${tripData.destination.toUpperCase()}\n
        Passageiros Embarcados: ${totalPassageiro}\n   `;
    }

    // Evento de clique para reiniciar a página
    document.getElementById("restart").addEventListener("click", () => {
        location.reload(); // Recarrega a página
    });
});
