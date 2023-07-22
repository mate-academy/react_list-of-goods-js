import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

const SORT_FIELD_ALPHABET = 'alphabet';
const SORT_FIELD_LENGTH = 'length';

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
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [sortField, setSortField] = useState('');
  const [reversed, setReversed] = useState('');

  const sortByAlphabet = () => {
    setVisibleGoods([...goodsFromServer]
      .sort((good1, good2) => good1.localeCompare(good2)));
    setSortField(SORT_FIELD_ALPHABET);
    setReversed('');
  };

  const sortByLength = () => {
    setVisibleGoods([...goodsFromServer]
      .sort((good1, good2) => good1.length - good2.length));
    setSortField(SORT_FIELD_LENGTH);
    setReversed('');
  };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
    setReversed('');
  };

  const reverse = () => {
    setVisibleGoods([...visibleGoods].reverse());
    const rev = reversed ? '' : 'yes';

    setReversed(rev);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames(
            'button',
            'is-info',
            { 'is-light': sortField !== SORT_FIELD_ALPHABET },
          )}
          onClick={sortByAlphabet}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-success',
            { 'is-light': sortField !== SORT_FIELD_LENGTH },
          )}
          onClick={sortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames(
            'button',
            'is-warning',
            { 'is-light': reversed !== 'yes' },
          )}
          onClick={reverse}
        >
          Reverse
        </button>

        <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li
            data-cy="Good"
            key={good}
          >
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
