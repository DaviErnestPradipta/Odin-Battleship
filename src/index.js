function createBoard(containerSelector) {
    const board = document.querySelector(containerSelector);
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        board.appendChild(cell);
    }
}

createBoard('.human.board');
createBoard('.computer.board');