import React, { useState } from 'react';
import './App.scss';

function App() {
    const initialGoods = ['Jam', 'Bread', 'Milk', 'Butter', 'Cheese'];

    const [goods, setGoods] = useState(initialGoods);
    const [currentSort, setCurrentSort] = useState('');
    const [isReversed, setIsReversed] = useState(false);

    const handleSortAlphabetically = () => {
        const sortedGoods = [...initialGoods].sort();
        setGoods(sortedGoods);
        setCurrentSort('alphabetical');
        setIsReversed(false);
    };

    const handleSortByLength = () => {
        const sortedGoods = [...initialGoods].sort((a, b) => a.length - b.length);
        setGoods(sortedGoods);
        setCurrentSort('length');
        setIsReversed(false);
    };

    const handleReverse = () => {
        const reversedGoods = [...goods].reverse();
        setGoods(reversedGoods);
        setIsReversed(!isReversed);
    };

    const handleReset = () => {
        setGoods(initialGoods);
        setCurrentSort('');
        setIsReversed(false);
    };

    return (
        <div className="App">
            <h1 className="title">Goods List</h1>

            <div className="buttons">
                <button
                    className={`button ${currentSort === 'alphabetical' && !isReversed ? '' : 'is-light'}`}
                    onClick={handleSortAlphabetically}
                >
                    Sort alphabetically
                </button>

                <button
                    className={`button ${currentSort === 'length' && !isReversed ? '' : 'is-light'}`}
                    onClick={handleSortByLength}
                >
                    Sort by length
                </button>

                <button
                    className={`button ${isReversed ? '' : 'is-light'}`}
                    onClick={handleReverse}
                >
                    Reverse
                </button>

                {currentSort || isReversed ? (
                    <button
                        className="button"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                ) : null}
            </div>

            <ul>
                {goods.map((good, index) => (
                    <li key={index}>{good}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
