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
  const [sortField, setSortField] = useState('');
  const fields = ['Sort alphabetically', 'Sort by length'];
  const [reversed, setReversed] = useState(false);

  let sortedGoods = [...goodsFromServer];

  switch (sortField) {
    case 'Sort alphabetically':
      sortedGoods.sort((good1, good2) => good1.localeCompare(good2));
      break;
    case 'Sort by length':
      sortedGoods.sort((good1, good2) => good1.length - good2.length);
      break;
    case 'Reverse':
      sortedGoods.reverse();
      break;
    default:
      break;
  }

  if (reversed) {
    sortedGoods = sortedGoods.reverse();
  }

  const goodsList = sortedGoods.map(good => <li data-cy="Good">{good}</li>);

  const isButtonSelected = buttonField => buttonField === sortField;

  return (
    <div className="section content">
      <div className="buttons">
        {fields.map(field => (
          <button
            key={field}
            type="button"
            className={classNames('button', {
              'is-info': field === 'Sort alphabetically',
              'is-success': field === 'Sort by length',
              'is-light': !isButtonSelected(field),
            })}
            onClick={() => setSortField(field)}
          >
            {field}
          </button>
        ))}

        <button
          type="button"
          className={classNames('button is-warning', {
            'is-light': !reversed,
          })}
          onClick={() => {
            setReversed(!reversed);
          }}
        >
          Reverse
        </button>

        {(sortField || reversed) && (
          <button
            type="button"
            className={classNames('button is-light is-danger')}
            onClick={() => {
              setSortField('');
              setReversed(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>{goodsList}</ul>
    </div>
  );
};
