document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#game-setup-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        // Haal gegevens op uit het formulier
        const player1Name = document.querySelector('#player1-name').value.trim();
        const player2Name = document.querySelector('#player2-name').value.trim();
        const sets = parseInt(document.querySelector('#sets').value, 10);
        const legs = parseInt(document.querySelector('#legs').value, 10);
        const startScore = parseInt(document.querySelector('input[name="start-score"]:checked').value, 10);

        // Controleer of alle velden zijn ingevuld
        if (!player1Name || !player2Name || isNaN(sets) || isNaN(legs) || isNaN(startScore)) {
            alert('Vul alle velden correct in!');
            return;
        }

        // Sla de gegevens op in localStorage
        localStorage.setItem('player1Name', player1Name);
        localStorage.setItem('player2Name', player2Name);
        localStorage.setItem('sets', sets);
        localStorage.setItem('legs', legs);
        localStorage.setItem('startScore', startScore);

        // Verwijs naar de scorepagina
        window.location.href = 'score.html';
    });
});
