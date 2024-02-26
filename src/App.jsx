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
  let result;

  switch (objOfRules.sortField) {
    case SORT_BY_ALPHABET:
      result = array.sort((a, b) => a.localeCompare(b));
      break;
    case SORT_BY_LENGTH:
      result = array.sort((a, b) => a.length - b.length);
      break;
    default:
      result = array;
      break;
  }

  if (objOfRules.isReversed) {
    return result.reverse();
  }

  return result;
}

export const App = () => {
  const [objOfRules, setObjOfRules] = useState({
    sortField: '',
    isReversed: false,
  });
  const goods = [...goodsFromServer];

  sortGoods(goods, objOfRules);

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
            sortField: SORT_BY_ALPHABET,
            isReversed: objOfRules.isReversed,
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
            sortField: SORT_BY_LENGTH,
            isReversed: objOfRules.isReversed,
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
              sortField: objOfRules.sortField,
              isReversed: false,
            }) : setObjOfRules({
              sortField: objOfRules.sortField,
              isReversed: true,
            }))}
        >
          Reverse
        </button>
        {
          objOfRules.sortField || objOfRules.isReversed ? (
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
          ) : ''
        }

      </div>

      <ul>
        {goods.map(good => (<li data-cy="Good" key={good}>{good}</li>))}
      </ul>
    </div>
  );
};
