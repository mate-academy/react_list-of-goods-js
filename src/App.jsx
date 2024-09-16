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


const SORT_BY_ALPHABET = 'alph';
const SORT_BY_LENGTH = 'len';

function sortGoods(array, objOfRules) {
  const result = [...array];

  switch (objOfRules.sortField) {
    case SORT_BY_ALPHABET:
      result.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_BY_LENGTH:
      result.sort((a, b) => a.length - b.length);
      break;
    default:
      break;
  }

  if (objOfRules.isReversed) {
    result.reverse();
  }

  return result;
}

export const App = () => {
  const [objOfRules, setObjOfRules] = useState({
    sortField: '',
    isReversed: false,
  });
  let goods = [...goodsFromServer];

  goods = sortGoods(goods, objOfRules);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={
          cn({
            button: true,
            'is-info': true,
            'is-light': objOfRules.sortField !== SORT_BY_ALPHABET,
          })}
          onClick={() => setObjOfRules({
            ...objOfRules,
            sortField: SORT_BY_ALPHABET,
          })}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={
            cn({
              button: true,
              'is-success': true,
              'is-light': objOfRules.sortField !== SORT_BY_LENGTH,
            })}
          onClick={() => setObjOfRules({
            ...objOfRules,
            sortField: SORT_BY_LENGTH,
          })}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={
            cn({
              button: true,
              'is-warning': true,
              'is-light': !objOfRules.isReversed,
            })}
          onClick={() => (objOfRules.isReversed
            ? setObjOfRules({
              ...objOfRules,
              isReversed: false,
            }) : setObjOfRules({
              ...objOfRules,
              isReversed: true,
            }))}
        >
          Reverse
        </button>
        {(objOfRules.sortField || objOfRules.isReversed) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => setObjOfRules({
              sortField: '',
              isReversed: false,
            })}
          >
            Reset
          </button>
        )}

      </div>

      <ul>
        {goods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
