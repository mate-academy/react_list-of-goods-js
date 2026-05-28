import { useState } from 'react';
import cn from 'classnames';
import goodsFromServer from './goods.json';

import 'bulma/css/bulma.css';
import './App.scss';
import { GoodList } from './components/GoodList/GoodList';

const SORT_FIELD_ALPH = 'alpha';
const SORT_FIELD_LENGTH = 'length';

function getPreparedGoods(goods, { sortField, isReversed }) {
  const preparedGoods = [...goods];

  if (sortField) {
    preparedGoods.sort((good1, good2) => {
      switch (sortField) {
        case SORT_FIELD_ALPH:
          return good1.name.localeCompare(good2.name);
        case SORT_FIELD_LENGTH: {
          const tamanho1 = good1.name.replaceAll(' ', '').length;
          const tamanho2 = good2.name.replaceAll(' ', '').length;
          return tamanho1 - tamanho2;
        }
        default:
          return 0;
      }
    });
  }

  if (isReversed) {
    preparedGoods.reverse();
  }

  return preparedGoods;
}

export const App = () => {
  const [sortField, setSortField] = useState('');
  const [isReversed, setIsReversed] = useState(false);

  const copyVisibleGoods = getPreparedGoods(goodsFromServer, {
    sortField,
    isReversed,
  });

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          onClick={() => setSortField(SORT_FIELD_ALPH)}
          className={cn('button is-info', {
            'is-light': sortField !== SORT_FIELD_ALPH,
          })}
        >
          Sort alphabetically
        </button>

        <button
          onClick={() => setSortField(SORT_FIELD_LENGTH)}
          type="button"
          className={cn('button is-success', {
            'is-light': sortField !== SORT_FIELD_LENGTH,
          })}
        >
          Sort by length
        </button>

        {/* vice-versa */}
        <button
          onClick={() => setIsReversed(!isReversed)}
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
        >
          Reverse
        </button>

        {/* so deve ter botão reset se algum outro tiver sido selecionado */}
        {(sortField || isReversed) && (
          <button
            onClick={() => {setSortField(''); setIsReversed(false);}}
            type="button"
            className={cn('button is-danger is-light', {
              iframe: !sortField && !isReversed,
            })}
          >
            Reset
          </button>
        )}
      </div>

      <GoodList goods={copyVisibleGoods} />
    </div>
  );
};
