import React, { useState } from 'react';
import './App.css';

function App() {
    const initialGoods = ['Jam', 'Bread', 'Milk', 'Butter', 'Cheese'];
    const [goods, setGoods] = useState(initialGoods);
    const [isReversed, setIsReversed] = useState(false);
    const [currentSort, setCurrentSort] = useState('');

    const handleSortAlphabetically = () => {
        setGoods([...initialGoods].sort());
        setCurrentSort('alphabetical');
        setIsReversed(false);
    };

    const handleSortByLength = () => {
        setGoods([...initialGoods].sort((a, b) => a.length - b.length));
        setCurrentSort('length');
        setIsReversed(false);
    };

    const handleReverse = () => {
        setGoods(prevGoods => [...prevGoods].reverse());
        setIsReversed(!isReversed);
    };

    const handleReset = () => {
        setGoods(initialGoods);
        setCurrentSort('');
        setIsReversed(false);
    };

    return (
        <div className="App">
            <h1 className="title">Goods Reordering</h1>

            <div className="buttons">
                <button
                    className={`button ${currentSort === 'alphabetical' ? '' : 'is-light'}`}
                    onClick={handleSortAlphabetically}
                >
                    Sort alphabetically
                </button>

                <button
                    className={`button ${currentSort === 'length' ? '' : 'is-light'}`}
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
                    <button className="button" onClick={handleReset}>
                        Reset
                    </button>
                ) : null}
            </div>

            <ul>
                {goods.map(good => (
                    <li key={good}>{good}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
