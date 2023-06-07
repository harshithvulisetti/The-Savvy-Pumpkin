let currentPlayer = 'X';
        let board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];

        function makeMove(row, col) {
            if (board[row][col] === '') {
                board[row][col] = currentPlayer;
                document.getElementsByClassName('cell')[row * 3 + col].textContent = currentPlayer;
                document.getElementsByClassName('cell')[row * 3 + col].classList.add('disabled');
                checkWin();
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }

        function checkWin() {
            const winningCombinations = [
                [[0, 0], [0, 1], [0, 2]],
                [[1, 0], [1, 1], [1, 2]],
                [[2, 0], [2, 1], [2, 2]],
                [[0, 0], [1, 0], [2, 0]],
                [[0, 1], [1, 1], [2, 1]],
                [[0, 2], [1, 2], [2, 2]],
                [[0, 0], [1, 1], [2, 2]],
                [[0, 2], [1, 1], [2, 0]]
            ];

            for (let combination of winningCombinations) {
                let [a, b, c] = combination;
                let symbolA = board[a[0]][a[1]];
                let symbolB = board[b[0]][b[1]];
                let symbolC = board[c[0]][c[1]];

                if (symbolA !== '' && symbolA === symbolB && symbolA === symbolC) {
                    document.getElementsByClassName('cell')[a[0] * 3 + a[1]].classList.add('win');
                    document.getElementsByClassName('cell')[b[0] * 3 + b[1]].classList.add('win');
                    document.getElementsByClassName('cell')[c[0] * 3 + c[1]].classList.add('win');
                    setTimeout(() => {
                        alert(`Player ${symbolA} wins!`);
                        resetBoard();
                    }, 500);
                    return;
                }
            }

            if (board.flat().every(cell => cell !== '')) {
                setTimeout(() => {
                    alert("It's a tie!");
                    resetBoard();
                }, 500);
            }
        }

        function resetBoard() {
            board = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            currentPlayer = 'X';
            Array.from(document.getElementsByClassName('cell')).forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('disabled', 'win');
            });
        }