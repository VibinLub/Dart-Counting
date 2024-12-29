document.addEventListener('DOMContentLoaded', () => {
    const player1Card = document.querySelector('#player1');
    const player2Card = document.querySelector('#player2');
    const switchTurnButton = document.querySelector('#switch-turn');

    let currentPlayer = 1;

    // Functie om de actieve speler visueel aan te geven
    const updateActivePlayer = () => {
        if (currentPlayer === 1) {
            player1Card.style.backgroundColor = '#f00'; // Rood voor actieve speler
            player2Card.style.backgroundColor = '#222'; // Reset andere speler
        } else {
            player2Card.style.backgroundColor = '#f00';
            player1Card.style.backgroundColor = '#222';
        }
    };

    // Initialiseer met speler 1 als actief
    updateActivePlayer();

    // Eventlistener om de beurt te wisselen
    switchTurnButton.addEventListener('click', () => {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateActivePlayer();
    });
});