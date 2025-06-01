import React, { useState, useEffect, useCallback } from 'react';

const WORD_LIST = [
    'ABOUT', 'ABOVE', 'ABUSE', 'ACTOR', 'ACUTE', 'ADMIT', 'ADOPT', 'ADULT', 'AFTER', 'AGAIN',
    'AGENT', 'AGREE', 'AHEAD', 'ALARM', 'ALBUM', 'ALERT', 'ALIEN', 'ALIGN', 'ALIKE', 'ALIVE',
    'ALLOW', 'ALONE', 'ALONG', 'ALTER', 'ANGEL', 'ANGER', 'ANGLE', 'ANGRY', 'APART', 'APPLE',
    'APPLY', 'ARENA', 'ARGUE', 'ARISE', 'ARMED', 'ARMOR', 'ARRAY', 'ASIDE', 'ASSET', 'AVOID',
    'AWAKE', 'AWARD', 'AWARE', 'BADLY', 'BAKER', 'BASES', 'BASIC', 'BEACH', 'BEGAN', 'BEGIN',
    'BEING', 'BELOW', 'BENCH', 'BILLY', 'BIRTH', 'BLACK', 'BLAME', 'BLANK', 'BLIND', 'BLOCK',
    'BLOOD', 'BOARD', 'BOOST', 'BOOTH', 'BOUND', 'BRAIN', 'BRAND', 'BRAVE', 'BREAD', 'BREAK',
    'BREED', 'BRIEF', 'BRING', 'BROAD', 'BROKE', 'BROWN', 'BUILD', 'BURST', 'BUYER', 'CABLE',
    'CACHE', 'CANDY', 'CARRY', 'CATCH', 'CAUSE', 'CHAIN', 'CHAIR', 'CHAOS', 'CHARM', 'CHART',
    'CHASE', 'CHEAP', 'CHECK', 'CHEST', 'CHIEF', 'CHILD', 'CHINA', 'CHOSE', 'CIVIL', 'CLAIM',
    'CLASS', 'CLEAN', 'CLEAR', 'CLICK', 'CLIMB', 'CLOCK', 'CLOSE', 'CLOUD', 'COACH', 'COAST',
    'COULD', 'COUNT', 'COURT', 'COVER', 'CRAFT', 'CRASH', 'CRAZY', 'CREAM', 'CRIME', 'CROSS',
    'CROWD', 'CROWN', 'CRUDE', 'CURVE', 'CYCLE', 'DAILY', 'DANCE', 'DATED', 'DEALT', 'DEATH',
    'DEBUG', 'DELAY', 'DEPTH', 'DOING', 'DOUBT', 'DOZEN', 'DRAFT', 'DRAMA', 'DRANK', 'DREAM',
    'DRESS', 'DRILL', 'DRINK', 'DRIVE', 'DROVE', 'DYING', 'EAGER', 'EARLY', 'EARTH', 'EIGHT',
    'ELITE', 'EMPTY', 'ENEMY', 'ENJOY', 'ENTER', 'ENTRY', 'EQUAL', 'ERROR', 'EVENT', 'EVERY',
    'EXACT', 'EXIST', 'EXTRA', 'FAITH', 'FALSE', 'FAULT', 'FIBER', 'FIELD', 'FIFTH', 'FIFTY',
    'FIGHT', 'FINAL', 'FIRST', 'FIXED', 'FLASH', 'FLEET', 'FLOOR', 'FLUID', 'FOCUS', 'FORCE',
    'FORTH', 'FORTY', 'FORUM', 'FOUND', 'FRAME', 'FRANK', 'FRAUD', 'FRESH', 'FRONT', 'FRUIT',
    'FULLY', 'FUNNY', 'GIANT', 'GIVEN', 'GLASS', 'GLOBE', 'GOING', 'GRACE', 'GRADE', 'GRAND',
    'GRANT', 'GRASS', 'GRAVE', 'GREAT', 'GREEN', 'GROSS', 'GROUP', 'GROWN', 'GUARD', 'GUESS',
    'GUEST', 'GUIDE', 'HAPPY', 'HARRY', 'HEART', 'HEAVY', 'HENCE', 'HENRY', 'HORSE', 'HOTEL',
    'HOUSE', 'HUMAN', 'IDEAL', 'IMAGE', 'INDEX', 'INNER', 'INPUT', 'ISSUE', 'JAPAN', 'JIMMY',
    'JOINT', 'JONES', 'JUDGE', 'KNOWN', 'LABEL', 'LARGE', 'LASER', 'LATER', 'LAUGH', 'LAYER',
    'LEARN', 'LEASE', 'LEAST', 'LEAVE', 'LEGAL', 'LEVEL', 'LEWIS', 'LIGHT', 'LIMIT', 'LINKS',
    'LIVES', 'LOCAL', 'LOOSE', 'LOWER', 'LUCKY', 'LUNCH', 'LYING', 'MAGIC', 'MAJOR', 'MAKER',
    'MARCH', 'MARIA', 'MATCH', 'MAYBE', 'MAYOR', 'MEANT', 'MEDIA', 'METAL', 'MIGHT', 'MINOR',
    'MINUS', 'MIXED', 'MODEL', 'MONEY', 'MONTH', 'MORAL', 'MOTOR', 'MOUNT', 'MOUSE', 'MOUTH',
    'MOVED', 'MOVIE', 'MUSIC', 'NEEDS', 'NEVER', 'NEWLY', 'NIGHT', 'NOISE', 'NORTH', 'NOTED',
    'NOVEL', 'NURSE', 'OCCUR', 'OCEAN', 'OFFER', 'OFTEN', 'ORDER', 'OTHER', 'OUGHT', 'PAINT',
    'PANEL', 'PAPER', 'PARTY', 'PEACE', 'PETER', 'PHASE', 'PHONE', 'PHOTO', 'PIANO', 'PIECE',
    'PILOT', 'PITCH', 'PLACE', 'PLAIN', 'PLANE', 'PLANT', 'PLATE', 'POINT', 'POUND', 'POWER',
    'PRESS', 'PRICE', 'PRIDE', 'PRIME', 'PRINT', 'PRIOR', 'PRIZE', 'PROOF', 'PROUD', 'PROVE',
    'QUEEN', 'QUICK', 'QUIET', 'QUITE', 'RADIO', 'RAISE', 'RANGE', 'RAPID', 'RATIO', 'REACH',
    'READY', 'REALM', 'REBEL', 'REFER', 'RELAX', 'RELAY', 'REMIX', 'REPLY', 'RIGHT', 'RIVAL',
    'RIVER', 'ROBIN', 'ROGER', 'ROMAN', 'ROUGH', 'ROUND', 'ROUTE', 'ROYAL', 'RURAL', 'SCALE',
    'SCENE', 'SCOPE', 'SCORE', 'SENSE', 'SERVE', 'SETUP', 'SEVEN', 'SHALL', 'SHAPE', 'SHARE',
    'SHARP', 'SHEET', 'SHELF', 'SHELL', 'SHIFT', 'SHINE', 'SHIRT', 'SHOCK', 'SHOOT', 'SHORT',
    'SHOWN', 'SIDED', 'SIGHT', 'SILLY', 'SINCE', 'SIXTH', 'SIXTY', 'SIZED', 'SKILL', 'SLEEP',
    'SLIDE', 'SMALL', 'SMART', 'SMILE', 'SMITH', 'SMOKE', 'SOLID', 'SOLVE', 'SORRY', 'SOUND',
    'SOUTH', 'SPACE', 'SPARE', 'SPEAK', 'SPEED', 'SPEND', 'SPENT', 'SPLIT', 'SPOKE', 'SPORT',
    'SQUAD', 'STAFF', 'STAGE', 'STAKE', 'STAND', 'START', 'STATE', 'STEAM', 'STEEL', 'STEEP',
    'STEER', 'STICK', 'STILL', 'STOCK', 'STONE', 'STOOD', 'STORE', 'STORM', 'STORY', 'STRIP',
    'STUCK', 'STUDY', 'STUFF', 'STYLE', 'SUGAR', 'SUITE', 'SUPER', 'SWEET', 'SWIFT', 'SWING',
    'SWISS', 'TABLE', 'TAKEN', 'TASTE', 'TAXES', 'TEACH', 'TEAMS', 'TEETH', 'TERRY', 'TEXAS',
    'THANK', 'THEFT', 'THEIR', 'THEME', 'THERE', 'THESE', 'THICK', 'THING', 'THINK', 'THIRD',
    'THOSE', 'THREE', 'THREW', 'THROW', 'THUMB', 'TIGER', 'TIGHT', 'TIMER', 'TIMES', 'TIRED',
    'TITLE', 'TODAY', 'TOPIC', 'TOTAL', 'TOUCH', 'TOUGH', 'TOWER', 'TRACK', 'TRADE', 'TRAIN',
    'TREAT', 'TREND', 'TRIAL', 'TRIBE', 'TRICK', 'TRIED', 'TRIES', 'TRUCK', 'TRULY', 'TRUNK',
    'TRUST', 'TRUTH', 'TWICE', 'UNCLE', 'UNCUT', 'UNDER', 'UNFED', 'UNION', 'UNITY', 'UNTIL',
    'UPPER', 'UPSET', 'URBAN', 'USAGE', 'USUAL', 'VALID', 'VALUE', 'VIDEO', 'VIRUS', 'VISIT',
    'VITAL', 'VOCAL', 'VOICE', 'WASTE', 'WATCH', 'WATER', 'WHEEL', 'WHERE', 'WHICH', 'WHILE',
    'WHITE', 'WHOLE', 'WHOSE', 'WOMAN', 'WOMEN', 'WORLD', 'WORRY', 'WORSE', 'WORST', 'WORTH',
    'WOULD', 'WRITE', 'WRONG', 'WROTE', 'YOUTH'
];

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
        if (currentGuess.length !== 5) {
            setShakeRow(currentRow);
            setTimeout(() => setShakeRow(-1), 500);
            return;
        }

        if (!WORD_LIST.includes(currentGuess.toUpperCase())) {
            setShakeRow(currentRow);
            setTimeout(() => setShakeRow(-1), 500);
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

        if (key === 'ENTER') {
            submitGuess();
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
                    // className={`flex gap-1 ${shakeRow === row ? 'animate-pulse' : ''}`}
                    className={`flex gap-1 animate-shake`}
                >
                    {cells}
                </div>
            );
        }
        return grid;
    };

    const keyboard = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
    ];

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-8">
            <div className="text-center mb-4">
                <h1 className="text-4xl font-bold mb-2">Wordle</h1>
            </div>

            {/* Game Status */}
            { gameStatus === 'playing' && (
                <div className="text-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-600 mb-2">How to play</h2>
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
            <div className="flex flex-col gap-2 mb-6">
                {keyboard.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex gap-1 justify-center">
                        {row.map((key) => {
                            const status = key.length === 1 ? getKeyStatus(key) : 'special';
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleVirtualKeyPress(key)}
                                    className={`
                    px-4 py-4 rounded font-bold text-sm font-mono
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