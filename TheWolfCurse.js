$(document).ready(function() {
    var interval = null;
    var gameStarted = false;
    var highlightedCellIndex = null;

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
        amount += change;
        $('#yourMoney').text(`Your Money: ${amount}`);
    }
    
    function startGame() {
        if (!gameStarted) {
            var amount = parseInt($('#amountInput').val());
            if (amount >= 10) {
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
        $('#resultat').text(cell.text());

        $('#startButton').prop('disabled', false);
        $('#stopButton').prop('disabled', true);
        gameStarted = false;
    }

    // Button click events
    $('#startButton').on('click', function() {
        startGame();
    });

    $('#stopButton').on('click', function() {
        stopGame();
    });
});
