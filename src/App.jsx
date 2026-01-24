import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
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
  function getPrepareGoods(goods, sortField, reverseField) {
    // скопіював посилання на масив
    const prepareGoods = [...goods];

    // `Sort alphabetically`
    if (sortField === 'alphabet') {
      prepareGoods.sort((a, b) => a.localeCompare(b));
    }

    // `Sort by length`
    if (sortField === 'length') {
      prepareGoods.sort((a, b) => a.length - b.length);
    }

    // reverse
    if (reverseField === true) {
      prepareGoods.reverse();
    }

    return prepareGoods;
  }

  const [sortField, setSortField] = useState('');
  const [reverseField, setReverseField] = useState(false);

  const finilazedGood = getPrepareGoods(
    goodsFromServer,
    sortField,
    reverseField,
  );
  const isChanged = sortField || reverseField;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          onClick={() => setSortField('alphabet')}
          type="button"
          className={cn('button', 'is-info', {
            'is-light': sortField !== 'alphabet',
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField('length')}
          type="button"
          className={cn('button', 'is-success', {
            'is-light': sortField !== 'length',
          })}
        >
          Sort by length
        </button>

        <button
          onClick={() => setReverseField(prev => !prev)}
          type="button"
          className={cn('button', 'is-warning', { 'is-light': !reverseField })}
        >
          Reverse
        </button>

        {isChanged && (
          <button
            onClick={() => {
              setSortField('');
              setReverseField(false);
            }}
            type="button"
            className="button is-danger is-light"
          >
            Reset
          </button>
        )}
      </div>

      {/* методом .map() витягую з масиву visibleGoods усі значення */}

      <ul>
        {finilazedGood.map((good) => {
          return <li data-cy="Good">{good}</li>;
        })}
      </ul>
    </div>
  );
};
