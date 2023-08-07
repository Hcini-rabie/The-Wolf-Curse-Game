$(document).ready(function() {
    var interval = null;
    var gameStarted = false;
    var highlightedCellIndex = null;
    var amount = 0; 

    function highlightCell(index) {
        $('.cell').eq(index).addClass('highlighted');
        $('.cell.spinnable').eq(index).addClass('spinning');
    }

    function unhighlightCell(index) {
        $('.cell').eq(index).removeClass('highlighted spinning');
    }

    function enlargeCell(index) {
        $('.cell').eq(index).css({
            'background-color': 'yellow',
            'transform': 'scale(1.2)',
            'transition': 'all 0.2s linear'
        });
    }

    function shrinkCell(index) {
        $('.cell').eq(index).css({
            'background-color': '#f0f0f0',
            'transform': 'none',
            'transition': 'none'
        });
    }

    function getRandomCellIndex() {
        return Math.floor(Math.random() * 9);
    }

    function updateAmount(change) {
        amount = change;
        $('#yourMoney').text('Your Current Ammount: ' + amount + ' $');
    }

    function startGame() {
        if (!gameStarted) {
            var enteredAmount = parseInt($('#amountInput').val());
            if (enteredAmount >= 10) {
                amount = enteredAmount;
                gameStarted = true;
                highlightedCellIndex = getRandomCellIndex();
                interval = setInterval(function() {
                    unhighlightCell(highlightedCellIndex);
                    shrinkCell(highlightedCellIndex);
                    highlightedCellIndex = getRandomCellIndex();
                    highlightCell(highlightedCellIndex);
                    enlargeCell(highlightedCellIndex);
                }, 200);

                $('#startButton').prop('disabled', true);
                $('#stopButton').prop('disabled', false);
                $('#yourMoney').text('Your Current Ammount: ' + amount + ' $');
            } else {
                alert('Please enter an amount equal to or greater than 10 to start the game.');
            }
        }
    }

    function stopGame() {
        clearInterval(interval);
        unhighlightCell(highlightedCellIndex);
        enlargeCell(highlightedCellIndex);
        var cell = $('.cell').eq(highlightedCellIndex);
        var lastBoxImg = cell.find('img').attr('src');

        if (lastBoxImg === 'TWC images/2.jpg') {
            updateAmount(amount * 2);
        } else if (lastBoxImg === 'TWC images/téléchargement (1).jpg') {
            updateAmount(amount / 2);
        } else if (lastBoxImg === 'TWC images/5.jpg') {
            updateAmount(amount * 5);
        } else if (lastBoxImg === 'TWC images/téléchargement (1).jpg') {
            updateAmount(amount / 2);
        } else if (lastBoxImg === 'TWC images/logo.jpeg') {
            amount = 0;
            $('#resultat').text("You were cursed hahah");
            $('#yourMoney').text('Your Current Ammount: ' + amount + ' $');
        } else if (lastBoxImg === 'TWC images/5.jpeg') {
            updateAmount(amount - 5);
        } else if (lastBoxImg === 'TWC images/10.png') {
            updateAmount(amount * 10);
        }

        $('#startButton').prop('disabled', false);
        $('#stopButton').prop('disabled', true);
        gameStarted = false;
    }

    $('#startButton').on('click', function() {
        startGame();
    });

    $('#stopButton').on('click', function() {
        stopGame();
    });
});
