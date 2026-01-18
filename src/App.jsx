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
    const [reversed, setReversed] = useState(false);
    let visibleGoods = [...goodsFromServer].sort((good1, good2) => {
      switch (sortField) {
        case 'name':
          return good1.localeCompare(good2);
        case 'length':
          return good1.length - good2.length;
        default:
          return 0;
      }
    })
    if (reversed) {
      visibleGoods = visibleGoods.toReversed();
    }
return(
  <div className="section content">
    <div className="buttons">
      <button type="button"
       onClick={() => setSortField('name')}
      className={classNames(
        'button',
        'is-info',
        {'is-light': sortField !== 'name'}
      )}
      >
        Sort alphabetically
      </button>

      <button type="button"
      onClick={() => setSortField('length')}
      className={classNames(
        'button',
        'is-success',
        { 'is-light': sortField !== 'length'}
  )}>
        Sort by length
      </button>

      <button type="button"
       onClick={() => setReversed(!reversed)}
      className={classNames(
      'button',
      'is-warning',
      { 'is-light': !reversed}
      )
    }>
        Reverse
      </button>

{(sortField !== '' || reversed) && (
  <button type="button"
      onClick={()=>{
         setSortField('');
        setReversed(false);
      }}
      className="button is-danger is-light">
        Reset
      </button>
)}

    </div>

    <ul>

      {visibleGoods.map((good)=> {
        return (
            <li data-cy="Good" key={good}>{good}</li>
        )
      })}
    </ul>
  </div>
)
}
