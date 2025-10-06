import { useState, useMemo } from 'react';
import 'bulma/css/bulma.css';

const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const sortGoods = (goods, type) => {
  const goodsCopy = [...goods];

  switch (type) {
    case 'alpha':
      return goodsCopy.sort((a, b) => a.localeCompare(b));
    case 'length':
      return goodsCopy.sort((a, b) => a.length - b.length);
    default:
      return goodsCopy;
  }
};

const App = () => {
  const [sortType, setSortType] = useState('initial');
  const [isReversed, setIsReversed] = useState(false);

  const sortedGoods = useMemo(() => {
    let currentGoods = goodsFromServer;

    if (sortType !== 'initial') {
      currentGoods = sortGoods(goodsFromServer, sortType);
    }

    if (isReversed) {
      return [...currentGoods].reverse();
    }

    return currentGoods;
  }, [sortType, isReversed]);

  const isOriginalOrder = sortType === 'initial' && !isReversed;

  const handleSortAlphabetically = () => setSortType('alpha');
  const handleSortByLength = () => setSortType('length');
  const handleReverse = () => setIsReversed(prev => !prev);
  const handleReset = () => {
    setSortType('initial');
    setIsReversed(false);
  };

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">Goods sorting</h1>

        <div className="buttons">
          <button
            type="button"
            className={`button ${sortType === 'alpha' ? 'is-info' : 'is-light'}`}
            onClick={handleSortAlphabetically}
          >
            Sort alphabetically
          </button>

          <button
            type="button"
            className={`button ${sortType === 'length' ? 'is-success' : 'is-light'}`}
            onClick={handleSortByLength}
          >
            Sort by length
          </button>

          <button
            type="button"
            className={`button ${isReversed ? 'is-warning' : 'is-light'}`}
            onClick={handleReverse}
          >
            Reverse
          </button>

          {!isOriginalOrder && (
            <button
              type="button"
              className="button is-danger"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>

        <ul>
          {sortedGoods.map(good => (
            <li key={good} data-cy="Good">
              {good}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default App;
