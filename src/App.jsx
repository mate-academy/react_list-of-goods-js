import 'bulma/css/bulma.css';
import './App.scss';
import classes from 'classnames';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_ALPHABETICALLY = 'alphabetically';

const getPreparedGoods = (goods, { sortParam, isReversed }) => {
  const prepareGoods = [...goods];

  if (sortParam) {
    prepareGoods.sort((good1, good2) => {
      switch (sortParam) {
        case SORT_FIELD_ALPHABETICALLY:
          return good1.localeCompare(good2);

        case SORT_FIELD_LENGTH:
          return good1.length - good2.length;

        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    prepareGoods.reverse();
  }

  return prepareGoods;
};

export const App = () => {
  const [sortParam, setSortParam] = useState(null);
  const [isReversed, setIsReversed] = useState(false);
  const reparedGoods = getPreparedGoods(
    goodsFromServer,
    { sortParam, isReversed },
  );

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classes(
            'button',
            'is-info',
            { 'is-light': sortParam !== SORT_FIELD_ALPHABETICALLY },
          )}
          onClick={() => setSortParam(SORT_FIELD_ALPHABETICALLY)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classes(
            'button',
            'is-success',
            { 'is-light': sortParam !== SORT_FIELD_LENGTH },
          )}
          onClick={() => setSortParam(SORT_FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classes(
            'button',
            'is-warning',
            { 'is-light': !isReversed },
          )}
          onClick={() => setIsReversed(!isReversed)}
        >
          Reverse
        </button>

        {(sortParam || isReversed)
          && (
            <button
              type="button"
              className="button is-danger is-light"
              onClick={() => {
                setIsReversed(false);
                setSortParam(null);
              }
              }
            >
              Reset
            </button>
          )
        }
      </div>

      <ul>
        {reparedGoods.map(good => (
          <li data-cy="Good" key={uuidv4()}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
