import cn from 'classnames';

const SORT_FIELD_LENGTH = 'length';
const SORT_FIELD_RESET = 'reset';
const SORT_FIELD_NAME = 'name';
const REVERSE_FIELD = 'reverse';

export const Buttons = ({
  checkField,
  sortField,
  setSortField,
  reverseField,
  setReverseField,
}) => {
  return (
    <div className="buttons">
      <button
        onClick={() => {
          checkField(SORT_FIELD_NAME, sortField, setSortField);
        }}
        type="button"
        className={cn('button is-info ', {
          'is-light': sortField !== SORT_FIELD_NAME,
        })}
      >
        Sort alphabetically
      </button>

      <button
        onClick={() => {
          return checkField(SORT_FIELD_LENGTH, sortField, setSortField);
        }}
        type="button"
        className={cn('button is-success', {
          'is-light': sortField !== SORT_FIELD_LENGTH,
        })}
      >
        Sort by length
      </button>

      <button
        onClick={() => {
          return checkField(REVERSE_FIELD, reverseField, setReverseField);
        }}
        type="button"
        className={cn('button is-warning', {
          'is-light': reverseField !== REVERSE_FIELD,
        })}
      >
        Reverse
      </button>

      {(sortField || reverseField) && (
        <button
          onClick={() => {
            return (
              setReverseField(''),
              checkField(SORT_FIELD_RESET, sortField, setSortField)
            );
          }}
          type="button"
          className={cn('button is-danger', {
            'is-light':
              sortField !== SORT_FIELD_RESET || reverseField === REVERSE_FIELD,
          })}
        >
          Reset
        </button>
      )}
    </div>
  );
};
