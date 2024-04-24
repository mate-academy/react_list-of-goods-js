import { useState } from 'react';
import cn from 'classnames';

import 'bulma/css/bulma.css';
import './App.scss';

import { CONDITION } from './constants';
import { prepareGoods } from './utils/prepareGoods';

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
  const [condition, setCondition] = useState('');
  const [reversed, setReversed] = useState(false);

  const goods = prepareGoods(goodsFromServer, condition, reversed);

  const isAlphabetSelected = condition === CONDITION.ALPHABET;
  const isLengthSelected = condition === CONDITION.LENGTH;
  const isAnythingSelected = condition || reversed;

  const handleResetClick = () => {
    setCondition('');
    setReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': !isAlphabetSelected,
          })}
          onClick={() => setCondition(CONDITION.ALPHABET)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': !isLengthSelected,
          })}
          onClick={() => setCondition(CONDITION.LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={() => setReversed(!reversed)}
        >
          Reverse
        </button>

        {isAnythingSelected && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={handleResetClick}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
