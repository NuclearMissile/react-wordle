import {useCallback, useEffect, useState} from 'react';
import WORD_LIST from "./WordList.js";

const Wordle = () => {
    const [targetWord, setTargetWord] = useState('');
    const [currentGuess, setCurrentGuess] = useState('');
    const [guesses, setGuesses] = useState([]);
    const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'
    const [currentRow, setCurrentRow] = useState(0);
    const [shakeRow, setShakeRow] = useState(-1);

    // Initialize game
    useEffect(() => {
        const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
        setTargetWord(randomWord);
    }, []);

    const resetGame = () => {
        const randomWord = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
        setTargetWord(randomWord);
        setCurrentGuess('');
        setGuesses([]);
        setGameStatus('playing');
        setCurrentRow(0);
        setShakeRow(-1);
    };

    const getLetterStatus = (letter, position) => {
        if (targetWord[position] === letter) {
            return 'correct';
        } else if (targetWord.includes(letter)) {
            return 'present';
        } else {
            return 'absent';
        }
    };

    const submitGuess = useCallback(() => {
        if (currentGuess.length !== 5 || !WORD_LIST.includes(currentGuess.toUpperCase())) {
            setShakeRow(currentRow);
            setTimeout(() => setShakeRow(-1), 1000);
            return;
        }

        const newGuess = currentGuess.toUpperCase();
        const newGuesses = [...guesses, newGuess];
        setGuesses(newGuesses);

        if (newGuess === targetWord) {
            setGameStatus('won');
        } else if (newGuesses.length >= 6) {
            setGameStatus('lost');
        }

        setCurrentGuess('');
        setCurrentRow(prev => prev + 1);
    }, [currentGuess, guesses, targetWord, currentRow]);

    const handleKeyPress = useCallback((e) => {
        if (gameStatus !== 'playing') return;

        if (e.key === 'Enter') {
            submitGuess();
        } else if (e.key === 'Backspace') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else if (e.key.match(/^[a-zA-Z]$/) && currentGuess.length < 5) {
            setCurrentGuess(prev => prev + e.key.toUpperCase());
        }
    }, [currentGuess, gameStatus, submitGuess]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [handleKeyPress]);

    const handleVirtualKeyPress = (key) => {
        if (gameStatus !== 'playing') return;

        if (key === 'EN') {
            submitGuess();
        } else if (key === 'CL') {
            setCurrentGuess('');
        } else if (key === '⌫') {
            setCurrentGuess(prev => prev.slice(0, -1));
        } else if (currentGuess.length < 5) {
            setCurrentGuess(prev => prev + key);
        }
    };

    const getKeyStatus = (key) => {
        let status = 'unused';
        for (const guess of guesses) {
            for (let i = 0; i < guess.length; i++) {
                if (guess[i] === key) {
                    const letterStatus = getLetterStatus(key, i);
                    if (letterStatus === 'correct') return 'correct';
                    if (letterStatus === 'present' && status !== 'correct') status = 'present';
                    if (letterStatus === 'absent' && status === 'unused') status = 'absent';
                }
            }
        }
        return status;
    };

    const renderGrid = () => {
        const grid = [];
        for (let row = 0; row < 6; row++) {
            const cells = [];
            for (let col = 0; col < 5; col++) {
                let letter = '';
                let status = '';

                if (row < guesses.length) {
                    // Completed guess
                    letter = guesses[row][col];
                    status = getLetterStatus(letter, col);
                } else if (row === currentRow && col < currentGuess.length) {
                    // Current guess
                    letter = currentGuess[col];
                    status = 'current';
                }

                cells.push(
                    <div
                        key={`${row}-${col}`}
                        className={`
              w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold
              ${status === 'correct' ? 'bg-green-500 border-green-500 text-white' :
                            status === 'present' ? 'bg-yellow-500 border-yellow-500 text-white' :
                                status === 'absent' ? 'bg-gray-500 border-gray-500 text-white' :
                                    status === 'current' ? 'border-gray-500' : 'border-gray-300'}
              transition-all duration-200
            `}
                    >
                        {letter}
                    </div>
                );
            }
            grid.push(
                <div
                    key={row}
                    className={`flex gap-1 ${shakeRow === row ? 'animate-shake-fast' : ''}`}
                >
                    {cells}
                </div>
            );
        }
        return grid;
    };

    const keyboard = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', '⌫'],
        ['EN', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'CL']
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-8">
            <div className="text-center mb-4">
                <a href='https://github.com/NuclearMissile/react-wordle' target='_blank' rel='noopener noreferrer'>
                    <h1 className="text-4xl font-bold mb-2">Wordle</h1>
                </a>
            </div>

            {/* Game Status */}
            {gameStatus === 'playing' && (
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-blue-600 mb-2">How to play</h2>
                    <p className="text-gray-600">Try to guess the word in 6 tries.</p>
                </div>
            )}

            {gameStatus === 'won' && (
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-green-600 mb-2">Congratulations</h2>
                    <p className="text-gray-600">You guessed the word in {guesses.length} tries!</p>
                </div>
            )}

            {gameStatus === 'lost' && (
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Game Over</h2>
                    <p className="text-gray-600">The word is: <span className="font-bold">{targetWord}</span></p>
                </div>
            )}

            {/* Game Grid */}
            <div className="flex flex-col gap-1 mb-8">
                {renderGrid()}
            </div>

            {/* Keyboard */}
            <div className="flex flex-col gap-1 mb-6 px-2 w-full max-w-lg">
                {keyboard.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1 justify-center">
                        {row.map((key) => {
                            const status = key.length === 1 ? getKeyStatus(key) : 'special';
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleVirtualKeyPress(key)}
                                    className={`
                    px-1 py-4 rounded font-bold text-xs sm:text-sm font-mono 
                    min-w-[28px] sm:min-w-[36px] flex-1 max-w-[64px]
                    ${status === 'correct' ? 'bg-green-500 text-white' :
                                        status === 'present' ? 'bg-yellow-500 text-white' :
                                            status === 'absent' ? 'bg-gray-500 text-white' :
                                                'bg-gray-200 text-black hover:bg-gray-300'}
                    transition-colors duration-150
                  `}
                                    disabled={gameStatus !== 'playing'}
                                >
                                    {key}
                                </button>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Reset Button */}
            <button
                onClick={resetGame}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors duration-150"
            >
                RESET
            </button>
        </div>
    );
};

export default Wordle;