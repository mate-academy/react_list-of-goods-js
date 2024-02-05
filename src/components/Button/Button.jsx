import 'bulma/css/bulma.css';
import cn from 'classnames';

const ACTION_FIELD_REVERSE = 'Reverse';
const ACTION_FIELD_RESET = 'Reset';

export const Button = ({ btn, searchField, clearStrSearchField,
  setSearchField, goodsRender, isReversed, setIsReversed,
  setGoodsRender }) => {
  const setFieldFunc = () => {
    switch (btn) {
      case ACTION_FIELD_REVERSE:
        setIsReversed(prev => !prev);
        break;
      case ACTION_FIELD_RESET:
        setIsReversed(false);
        setSearchField('');
        break;
      default:
        setIsReversed(false);
        setSearchField(btn + Math.round(Math.random() * 100));
        break;
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
        'is-light': (btn !== clearStrSearchField && btn !== 'Reverse')
        || (btn === 'Reverse' && !isReversed),
      })}
      onClick={setFieldFunc}
    >
      { btn }
    </button>
  );
};
