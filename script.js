document.addEventListener("DOMContentLoaded", () => {
    const { jsPDF } = window.jspdf;
    const tripForm = document.getElementById('trip-form');
    const passengerList = document.getElementById('passenger-list');
    const tripDetails = document.getElementById('trip-details');
    const printButton = document.getElementById('print-button');

    const passengers = [];
    const location_array = [];

    // Função para atualizar a lista de passageiros na tela
    function updatePassengerList() {
        passengerList.innerHTML = '';

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
                updatePassengerList(); // Re-atualiza a lista de passageiros
                displayTripDetails(); // Atualiza os detalhes da viagem
            });

            listItem.appendChild(localizador);
            listItem.appendChild(deleteButton);
            passengerList.appendChild(listItem);
        });
    }

    // Função para exibir os detalhes da viagem
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
        Passageiros Embarcados: ${passengers.length}\n`;
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

    // Adiciona um evento de clique ao botão "Gerar PDF"
    printButton.addEventListener('click', () => {
        // Cria um novo documento PDF
        const doc = new jsPDF();

        // Adiciona os detalhes da viagem
        const details = tripDetails.textContent;
        doc.text(details, 10, 10);

        // Adiciona a lista de passageiros ao PDF
        passengers.forEach((passenger, index) => {
            doc.text(`${passenger}  [${location_array[index]}]`, 10, 20 + (index * 10));
        });

        // Salva o PDF
        doc.save('trip-details.pdf');
    });

    // Botão para reiniciar a página
    document.getElementById("restart").addEventListener("click", () => {
        location.reload();
    });
});
