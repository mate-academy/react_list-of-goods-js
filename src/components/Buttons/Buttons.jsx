import { CONST } from '../const';
import { Button } from '../Button/Button';

export const Buttons = ({
  sortField,
  setSortField,
  reverseField,
  setReverseField,
}) => {
  const checkResetField = sortField !== CONST.SORT_FIELD_RESET;
  const checkReverseField = sortField === CONST.REVERSE_FIELD;

  return (
    <div className="buttons">
      <Button
        text="Sort alphabetically"
        name={CONST.SORT_FIELD_NAME}
        colorName="is-info"
        colorNameCondition={sortField !== CONST.SORT_FIELD_NAME}
        sortField={sortField}
        setSortField={setSortField}
      />

      <Button
        text="Sort by length"
        name={CONST.SORT_FIELD_LENGTH}
        colorName="is-success"
        colorNameCondition={sortField !== CONST.SORT_FIELD_LENGTH}
        sortField={sortField}
        setSortField={setSortField}
      />

      <Button
        text="Reverse"
        name={CONST.REVERSE_FIELD}
        colorName="is-warning"
        colorNameCondition={reverseField !== CONST.REVERSE_FIELD}
        sortField={reverseField}
        setSortField={setReverseField}
      />

      {((sortField && checkResetField) || reverseField) && (
        <Button
          text="Reset"
          name={CONST.SORT_FIELD_RESET}
          colorName="is-danger"
          colorNameCondition={checkResetField || checkReverseField}
          sortField={sortField}
          setSortField={setSortField}
          setReverseField={setReverseField}
        />
      )}
    </div>
  );
};
