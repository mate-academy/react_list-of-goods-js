import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';
import classNames from 'classnames';

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
  const [sortedGoods, setSortedGoods] = useState(goodsFromServer);
  const [fieldName, setFieldName] = useState('');

  function sortBy(field) {
    let updateGoodsArr = [...goodsFromServer];

    switch (field) {
      case 'Sort alphabetically':
        updateGoodsArr.sort((a, b) => a.localeCompare(b));
        break;
      case 'Sort by length':
        updateGoodsArr.sort((a, b) => a.length - b.length);
        break;

      case 'Reverse':
        updateGoodsArr.reverse();
        break;

      case 'Reset':
        updateGoodsArr = [...goodsFromServer];
        break;

      default:
        break;
    }

    setSortedGoods(updateGoodsArr);
  }

  return (
    <div className="section content">
      <div className="buttons">
        {['Sort alphabetically', 'Sort by length', 'Reverse', 'Reset'].map(
          field => (
            <button
              key={field}
              type="button"
              className={classNames('button', 'is-info', {
                'is-light': fieldName !== field,
                'no-light': fieldName === field,
              })}
              onClick={() => {
                sortBy(field);
                setFieldName(field);
              }}
            >
              {field}
            </button>
          ),
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
