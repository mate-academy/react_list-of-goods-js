import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import cn from 'classnames';

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

const SORT_BUTTON_ALPHABETICALLY = 'alphabetically';
const SORT_BUTTON_LENGTH = 'length';

function getPreparingGoods(goods, sortButtonName, isReversed) {
  let prepareGoods = [...goods];

  switch (sortButtonName) {
    case SORT_BUTTON_ALPHABETICALLY: prepareGoods = prepareGoods
      .sort((good1, good2) => (
        good1.localeCompare(good2)
      ));
      break;

    case SORT_BUTTON_LENGTH: prepareGoods = prepareGoods
      .sort((good1, good2) => (
        good1.length - good2.length
      ));
      break;

    default: prepareGoods = [...goodsFromServer];
  }

  if (isReversed) {
    prepareGoods = prepareGoods.reverse();
  }

  return prepareGoods;
}

export const App = () => {
  const [sortButtonName, setSortButtonName] = useState('');
  const [isReversed, setIsReversed] = useState(false);
  const sortField = getPreparingGoods(
    goodsFromServer,
    sortButtonName,
    isReversed,
  );
  const reset = () => {
    setSortButtonName('');
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
            cn(
              'button',
              'is-info',
              { 'is-light': sortButtonName !== SORT_BUTTON_ALPHABETICALLY },
            )}
          onClick={() => setSortButtonName(SORT_BUTTON_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-success',
              { 'is-light': sortButtonName !== SORT_BUTTON_LENGTH },
            )}
          onClick={() => setSortButtonName(SORT_BUTTON_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn(
              'button',
              'is-warning',
              { 'is-light': !isReversed },
            )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(isReversed || sortButtonName) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortField.map(good => (
          <li
            key={good}
            data-cy="Good"
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
