import 'bulma/css/bulma.css';
import cn from 'classnames';

const ACTION_FIELD_ALPHABET = 'Sort alphabetically';
const ACTION_FIELD_LENGTH = 'Sort by length';
const ACTION_FIELD_REVERSE = 'Reverse';
const ACTION_FIELD_RESET = 'Reset';

function getGoodsToRend(goods, field) {
  const goodsToRend = [...goods];

  if (field) {
    goodsToRend.sort((good1, good2) => {
      switch (field) {
        case ACTION_FIELD_ALPHABET:

          return good1.name.localeCompare(good2.name);
        case ACTION_FIELD_LENGTH:

          return good1.name.length - good2.name.length;
        default:
          return 0;
      }
    });
  }

  return goodsToRend;
}

export const Button = ({ btn, searchField, setSearchField, goodsRender,
  setGoodsRender, goodsFromServerModObj }) => {
  const goodsToSet = getGoodsToRend(goodsFromServerModObj, btn);
  const setFieldFunc = () => {
    if (btn !== ACTION_FIELD_RESET) {
      setSearchField(btn);
    } else {
      setSearchField('');
    }

    setGoodsRender(goodsToSet);

    if (btn === ACTION_FIELD_REVERSE) {
      setGoodsRender([...goodsRender].reverse());
    }
  };

  return (
    <button
      type="button"
      className={cn('button', {
        'is-info': btn === 'Sort alphabetically',
        'is-success': btn === 'Sort by length',
        'is-warning': btn === 'Reverse',
        'is-danger': btn === 'Reset',
        'is-hidden': btn === 'Reset' && searchField === '',
        'is-light': searchField !== btn,
      })}
      onClick={setFieldFunc}
    >
      { btn }
    </button>
  );
};
