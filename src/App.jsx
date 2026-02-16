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



const SORT_FIELD_ALPHA = "alpha"
const SORT_FIELD_LEN = "length"

export const App = () => {

  const [sortField, setSortField] = useState("")
  const [sortRev, setSortRev] = useState(false);

  const handleReset = () => {
    setSortField("");
    setSortRev(false);
  }
  let arrCopy = [...goodsFromServer];

  if (sortField === SORT_FIELD_ALPHA) {
    arrCopy.sort((a, b) =>
      a.localeCompare(b))
  }
  if (sortField === SORT_FIELD_LEN) {
    arrCopy.sort((a, b) =>
      a.length - b.length)
  }
  if (sortRev) {
    arrCopy.reverse();
  }

  return (

    <div className="section content">
      <div className="buttons">
        <button onClick={() => setSortField(SORT_FIELD_ALPHA)}
          type="button"
          className={cn(
            "button is-info",
            { "is-light": sortField !== SORT_FIELD_ALPHA }
          )}
        >
          Sort alphabetically
        </button>

        <button onClick={() => setSortField(SORT_FIELD_LEN)}
          type="button"
          className={cn(
            "button is-success",
            { "is-light": sortField !== SORT_FIELD_LEN }
          )}
        >
          Sort by length
        </button>

        <button onClick={() => setSortRev(prev => !prev)}
          type="button"
          className={cn(
            "button is-warning",
            { "is-light": !sortRev }
          )}
        >
          Reverse
        </button>

        {(sortField !== "" || sortRev) && (
          <button onClick={handleReset} type="button" className=
            "button is-danger is-light"

          >
            Reset
          </button>
        )}
      </div >

      <ul> {
        arrCopy.map(good => {
          return (
            <li data-cy="Good" key={good} >{good}</li>
          )
        })
      }
      </ul>
    </div >
  )
}
