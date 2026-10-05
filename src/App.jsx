import 'bulma/css/bulma.css';
import { useState } from 'react';

import './App.scss';

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
  const [goods, setGoods] = useState(goodsFromServer);
  const [isAlphabetical, setIsAlphabetical] = useState(false);
  const [isByLength, setIsByLength] = useState(false);
  const [reversed, setReversed] = useState(false);

  const sortAlphabetically = () => {
    setGoods(currentGoods => [...currentGoods].sort());
    setIsAlphabetical(true);
    setIsByLength(false);
  };

  const sortByLength = () => {
    setGoods(currentGoods =>
      [...currentGoods].sort((good1, good2) => good1.length - good2.length),);

    setIsByLength(true);
    setIsAlphabetical(false);
  };

  const resetGoods = () => {
    setGoods(goodsFromServer);
    setIsAlphabetical(false);
    setIsByLength(false);
    setReversed(false);
  };

  const hasChanges = isAlphabetical || isByLength || reversed;

  let visibleGoods = [...goods];

  if (reversed) {
    visibleGoods = visibleGoods.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info${isAlphabetical ? '' : ' is-light'}`}
          onClick={sortAlphabetically}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success${isByLength ? '' : ' is-light'}`}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning${reversed ? '' : ' is-light'}`}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {hasChanges && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={resetGoods}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
