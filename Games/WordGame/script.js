var currentPlayer = 1;
var player1Score = 0;
var player2Score = 0;
var grid = [];
var dictionary = [];
var table = document.getElementById("grid");

// Preload the dictionary file
var xhr = new XMLHttpRequest();
xhr.open("GET", "dictionary.txt", true);
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        dictionary = xhr.responseText.split("\n");
    }
};
xhr.send();

// Initialize the grid
for (var i = 0; i < 10; i++) {
    var row = [];
    for (var j = 0; j < 10; j++) {
        row.push("");
    }
    grid.push(row);
}

// Create the grid table
for (var i = 0; i < 10; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 10; j++) {
        var cell = document.createElement("td");
        cell.dataset.row = i;
        cell.dataset.col = j;
        row.appendChild(cell);
    }
    table.appendChild(row);
}

// Attach event listeners to grid cells
var cells = document.querySelectorAll("#grid td");
cells.forEach(function(cell) {
    cell.addEventListener("click", makeMove);
});

// Handle a move by a player
function makeMove(event) {
    var cell = event.target;
    var row = parseInt(cell.dataset.row);
    var col = parseInt(cell.dataset.col);

    // Check if the cell is empty
    if (grid[row][col] === "") {
        // Create an inline editable element
        var input = document.createElement("input");
        input.type = "text";
        input.maxLength = 1;
        input.style.width = "100%";
        input.style.height = "100%";
        input.style.border = "none";
        input.style.textAlign = "center";
        input.style.fontFamily = "Arial, sans-serif";
        input.style.fontSize = "16px";
        input.style.backgroundColor = "transparent";
        input.style.outline = "none";
        input.style.cursor = "auto";

        // Focus on the input element
        input.focus();

        // Set up event listener for input element
        input.addEventListener("keydown", function(e) {
            // Check if the entered key is a letter
            if (/[a-zA-Z]/.test(e.key)) {
                var letter = e.key.toUpperCase();

                // Update the cell with the letter
                cell.textContent = letter;
                grid[row][col] = letter;

                // Check if a word is formed
                var word = checkWord(row, col);
                if (word !== "") {
                    // Check if the word exists in the dictionary
                    if (dictionary.includes(word)) {
                        // Increment the score for the current player
                        if (currentPlayer === 1) {
                            player1Score++;
                            document.getElementById("player1Score").textContent = player1Score;
                        } else {
                            player2Score++;
                            document.getElementById("player2Score").textContent = player2Score;
                        }

                        // Display the formed word
                        var wordElement = document.createElement("div");
                        wordElement.textContent = "Player " + currentPlayer + " formed the word: " + word;
                        wordElement.className = "word-found";
                        document.body.appendChild(wordElement);
                        setTimeout(function() {
                            document.body.removeChild(wordElement);
                        }, 2000);
                    } 
                }

                // Apply animation to the cell
                cell.classList.add("animate-scale");

                // Switch to the next player
                currentPlayer = currentPlayer === 1 ? 2 : 1;

                // Update the current player indicator
                var currentPlayerIndicator = document.getElementById("currentPlayerIndicator");
                currentPlayerIndicator.textContent = "Current Player: Player " + currentPlayer;
                currentPlayerIndicator.className = "player" + currentPlayer;

                // Remove the input element and show the letter in the cell
                cell.removeChild(input);
            }
        });

        // Append the input element to the cell
        cell.appendChild(input);
    } else {
        alert("Cell already occupied!");
    }
}

// Check if a word is formed horizontally or vertically
function checkWord(row, col) {
    var word = "";

    // Check horizontally
    for (var i = col; i >= 0; i--) {
        if (grid[row][i] === "") {
            break;
        }
        word = grid[row][i] + word;
    }
    for (var i = col + 1; i < 10; i++) {
        if (grid[row][i] === "") {
            break;
        }
        word += grid[row][i];
    }
    if (word.length > 1) {
        return word;
    }

    // Check vertically
    word = "";
    for (var i = row; i >= 0; i--) {
        if (grid[i][col] === "") {
            break;
        }
        word = grid[i][col] + word;
    }
    for (var i = row + 1; i < 10; i++) {
        if (grid[i][col] === "") {
            break;
        }
        word += grid[i][col];
    }
    if (word.length > 1) {
        return word;
    }

    return "";
}