document.addEventListener('DOMContentLoaded', () => {
    const player1ScoreEl = document.querySelector('#score1');
    const player2ScoreEl = document.querySelector('#score2');
    const avg1El = document.querySelector('#avg1');
    const avg2El = document.querySelector('#avg2');
    const throws1El = document.querySelector('#throws1');
    const throws2El = document.querySelector('#throws2');
    const scoreInput = document.querySelector('#score-input');
    const submitScoreButton = document.querySelector('#submit-score');
    const undoScoreButton = document.querySelector('#undo-score');

    let player1Score = 501, player2Score = 501;
    let player1Throws = 0, player2Throws = 0;
    let player1TotalScore = 0, player2TotalScore = 0;
    let currentPlayer = 1;
    let lastScores = []; // Houdt de laatste scores per speler bij

    const updateActivePlayer = () => {
        // Update de kleur van de actieve speler
        document.querySelector('#player1').style.backgroundColor = currentPlayer === 1 ? '#f00' : '#222';
        document.querySelector('#player2').style.backgroundColor = currentPlayer === 2 ? '#f00' : '#222';
    };

    const updateScores = (inputScore) => {
        const isNegative = inputScore.startsWith('-');
        const score = Math.abs(parseInt(inputScore, 10));

        if (isNaN(score) || score > 180) {
            alert('Enter a valid score (0-180).');
            return;
        }

        // Actieve speler ophalen
        const activePlayer = currentPlayer === 1 ? {
            score: player1Score,
            throws: player1Throws,
            total: player1TotalScore,
            elements: { scoreEl: player1ScoreEl, throwsEl: throws1El, avgEl: avg1El }
        } : {
            score: player2Score,
            throws: player2Throws,
            total: player2TotalScore,
            elements: { scoreEl: player2ScoreEl, throwsEl: throws2El, avgEl: avg2El }
        };

        if (isNegative) {
            // Verwijder score van de actieve speler
            if (score > activePlayer.score) {
                alert("Je kunt niet meer aftrekken dan de huidige score!");
                return;
            }
            activePlayer.score -= score;
        } else {
            // Voeg positieve score toe
            if (score > activePlayer.score) {
                alert("Score is te hoog! Controleer je invoer.");
                return;
            }
            activePlayer.score -= score;
            activePlayer.throws++;
            activePlayer.total += score;
        }

        // Update UI
        activePlayer.elements.scoreEl.textContent = activePlayer.score;
        activePlayer.elements.throwsEl.textContent = activePlayer.throws;
        activePlayer.elements.avgEl.textContent = activePlayer.throws > 0
            ? (activePlayer.total / activePlayer.throws).toFixed(2)
            : 0;

        lastScores.push({ player: currentPlayer, score: isNegative ? -score : score });

        if (activePlayer.score === 0) {
            alert(`Speler ${currentPlayer} wint deze leg!`);
            resetGame();
            return;
        }

        // Wissel van speler
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        updateActivePlayer();
    };

    const undoScore = () => {
        if (lastScores.length === 0) {
            alert('No score to undo!');
            return;
        }

        const lastMove = lastScores.pop();
        const activePlayer = lastMove.player === 1 ? {
            score: player1Score,
            throws: player1Throws,
            total: player1TotalScore,
            elements: { scoreEl: player1ScoreEl, throwsEl: throws1El, avgEl: avg1El }
        } : {
            score: player2Score,
            throws: player2Throws,
            total: player2TotalScore,
            elements: { scoreEl: player2ScoreEl, throwsEl: throws2El, avgEl: avg2El }
        };

        activePlayer.score += lastMove.score;
        if (lastMove.score > 0) {
            activePlayer.throws--;
            activePlayer.total -= lastMove.score;
        }

        activePlayer.elements.scoreEl.textContent = activePlayer.score;
        activePlayer.elements.throwsEl.textContent = activePlayer.throws;
        activePlayer.elements.avgEl.textContent = activePlayer.throws > 0
            ? (activePlayer.total / activePlayer.throws).toFixed(2)
            : 0;

        currentPlayer = lastMove.player;
        updateActivePlayer();
    };

    const resetGame = () => {
        player1Score = 501;
        player2Score = 501;
        player1Throws = 0;
        player2Throws = 0;
        player1TotalScore = 0;
        player2TotalScore = 0;
        currentPlayer = 1;
        lastScores = [];
        updateActivePlayer();
        updateScoresUI();
    };

    const updateScoresUI = () => {
        player1ScoreEl.textContent = player1Score;
        player2ScoreEl.textContent = player2Score;
        throws1El.textContent = player1Throws;
        throws2El.textContent = player2Throws;
        avg1El.textContent = 0;
        avg2El.textContent = 0;
    };

    submitScoreButton.addEventListener('click', () => {
        const score = scoreInput.value.trim();
        updateScores(score);
        scoreInput.value = '';
    });

    undoScoreButton.addEventListener('click', undoScore);

    updateActivePlayer();
});
