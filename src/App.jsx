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

const SORT_FIELD_NAME = 'name';
const SORT_FIELD_LENGTH = 'length';

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState([...goodsFromServer]);
  const [reversed, setReversed] = useState(false);
  const [sortField, setSortField] = useState('');

  let visibleGoodsCopy = [...visibleGoods];

  // const sortByName = () => {
  //   setVisibleGoods(visibleGoodsCopy.toSorted((a, b) => a.localeCompare(b)));
  //   setSortField(SORT_FIELD_NAME);
  // };

  // const sortByLength = () => {
  //   setVisibleGoods(visibleGoodsCopy.toSorted((a, b) => a.length - b.length));
  //   setSortField(SORT_FIELD_LENGTH);
  // };

  const reset = () => {
    setVisibleGoods(goodsFromServer);
    setSortField('');
    setReversed(false);
  };

  const showResetButton = sortField || reversed;

  // eslint-disable-next-line default-case
  switch (sortField) {
    case SORT_FIELD_NAME:
      visibleGoodsCopy.sort((a, b) => a.localeCompare(b));
      break;

    case SORT_FIELD_LENGTH:
      visibleGoodsCopy.sort((a, b) => a.length - b.length);
      break;
  }

  if (reversed) {
    visibleGoodsCopy = visibleGoodsCopy.toReversed();
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_NAME,
          })}
          // onClick={sortByName}
          onClick={() => setSortField(SORT_FIELD_NAME)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
          // onClick={sortByLength}
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          onClick={() => setReversed(!reversed)}
          className={cn('button is-info', {
            'is-light': !reversed,
          })}
        >
          Reverse
        </button>

        {showResetButton && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={reset}
          >
            Reset
          </button>
        )}
        {/* <button
          type="button"
          className="button is-danger is-light"
          onClick={reset}
        >
          Reset
        </button> */}
      </div>

      <ul>
        {visibleGoodsCopy.map(good => (
          <li className="good" data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
