import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

export const goodsFromServer = [
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

export const App = () => {
  const [sortList, setSortList] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  // 1. Sortera listan först
  const visibleGoods = [...goodsFromServer].sort((good1, good2) => {
    switch (sortList) {
      case 'Sort alphabetically':
        return good1.localeCompare(good2);
      case 'Sort by length':
        return good1.length - good2.length;
      default:
        return 0;
    }
  });

  // 2. Vänd listan om isReversed är true
  if (isReversed) {
    visibleGoods.reverse();
  }

  // 3. Kontrollera om Reset ska synas (om något skiljer sig från originalet)
  const isModified = sortList !== '' || isReversed !== false;

  return (
    <div className="section content">
      <div className="buttons">
        {['Sort alphabetically', 'Sort by length'].map(buttonText => (
          <button
            type="button"
            key={buttonText}
            className={
              buttonText === sortList
                ? 'button is-info'
                : 'button is-info is-light'
            }
            onClick={() => setSortList(buttonText)}
          >
            {buttonText}
          </button>
        ))}

        <button
          type="button"
          className={`button is-info ${isReversed ? '' : 'is-light'}`}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-info is-light"
            onClick={() => {
              setSortList('');
              setIsReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
