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

const CONDITION_LENGTH = 'length';
const CONDITION_ALPHABET = 'alphabet';

function prepareGoods(condition, reversed) {
  const preparedGoods = [...goodsFromServer];

  if (condition === CONDITION_ALPHABET) {
    preparedGoods.sort((good1, good2) => good1.localeCompare(good2));
  }

  if (condition === CONDITION_LENGTH) {
    preparedGoods.sort((good1, good2) => good1.length - good2.length);
  }

  if (reversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [condition, setCondition] = useState('');
  const [reversed, setReversed] = useState(false);
  const goods = prepareGoods(condition, reversed);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': condition !== CONDITION_ALPHABET,
          })}
          onClick={() => {
            setCondition(CONDITION_ALPHABET);
          }}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': condition !== CONDITION_LENGTH,
          })}
          onClick={() => {
            setCondition(CONDITION_LENGTH);
          }}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !reversed })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {condition || reversed ? (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setCondition('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        ) : (
          ''
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
