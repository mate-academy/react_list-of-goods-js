export const Buttons = ({ goods }) => (
  <div className="buttons">
    <button
      type="button"
      className="button is-info is-light"
    >
      Sort alphabetically
    </button>

    <button
      type="button"
      className="button is-success is-light"
    >
      Sort by length
    </button>

    <button
      type="button"
      className="button is-warning is-light"
    >
      Reverse
    </button>

    <button
      type="button"
      className="button is-danger is-light"
    >
      Reset
    </button>
  </div>
);
