document.addEventListener("DOMContentLoaded", () => {
    const tripForm = document.getElementById('trip-form');
    const passengerList = document.getElementById('passenger-list');
    const printPassengerList = document.getElementById('print-passenger-list');
    const tripDetails = document.getElementById('trip-details');
    const printButton = document.getElementById('print-button');
    const printArea = document.getElementById('print-area');
    const printTripDetails = document.getElementById('print-trip-details');

    const passengers = [];
    const location_array = [];

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
                updatePassengerList();
                displayTripDetails();
            });

            listItem.appendChild(localizador);
            listItem.appendChild(deleteButton);
            passengerList.appendChild(listItem);
        });
    }

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

        tripDetails.textContent = `Nome do Motorista: ${tripData.driverName.toUpperCase()}
Placa: ${tripData.plate.toUpperCase()}
Telefone: ${tripData.phone}
Data de Saída: ${tripData.departureDate}
Horário de Saída: ${tripData.departureTime}
Horário de Chegada: ${tripData.arrivalTime}
Destino: ${tripData.destination.toUpperCase()}
Passageiros Embarcados: ${passengers.length}`;
    }

    document.getElementById('add-passenger').addEventListener('click', () => {
        const passengerName = document.getElementById('passenger-name').value;
        const locations = document.getElementById("location").value;

        if (passengerName || locations) {
            passengers.push(passengerName.toUpperCase());
            location_array.push(locations.toUpperCase());

            updatePassengerList();
            displayTripDetails();

            document.getElementById('passenger-name').value = '';
            document.getElementById("location").value = '';
        }
    });

    tripForm.addEventListener('submit', (e) => {
        e.preventDefault();
        displayTripDetails();
    });

    printButton.addEventListener('click', () => {
        printPassengerList.innerHTML = '';
        passengers.forEach((passenger, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${passenger} [${location_array[index]}]`;
            printPassengerList.appendChild(listItem);
        });

        printTripDetails.textContent = tripDetails.textContent;

        printArea.style.display = 'none';

        // Garantir que o conteúdo é carregado antes de imprimir
        setTimeout(() => {
            window.print();
            printArea.style.display = 'block';
        }, 1000);
       
    });

    //Reinicia a página
    document.getElementById("restart").addEventListener("click", () => {
        location.reload();
    });
});


