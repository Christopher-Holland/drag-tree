import {
  treeModes,
  type TreeMode,
} from "../../config/treeModes";

type TreeModeSelectProps = {
  value: TreeMode;
  onChange: (mode: TreeMode) => void;
  disabled?: boolean;
};

function TreeModeSelect({
  value,
  onChange,
  disabled = false,
}: TreeModeSelectProps) {
  const selected = treeModes[value];

  return (
    <aside className="tree-mode-panel">
      <p className="tree-mode-label">Tree Mode</p>

      <div
        className="tree-mode-options"
        role="radiogroup"
        aria-label="Tree mode"
      >
        {(
          Object.values(treeModes) as Array<
            (typeof treeModes)[TreeMode]
          >
        ).map((mode) => {
          const isSelected = mode.id === value;

          return (
            <button
              key={mode.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`tree-mode-option ${
                isSelected ? "selected" : ""
              }`}
              disabled={disabled}
              onClick={() => onChange(mode.id)}
            >
              <span
                className={`tree-mode-bulb ${
                  isSelected ? "lit" : ""
                }`}
                aria-hidden="true"
              />
              <span className="tree-mode-option-name">
                {mode.name}
              </span>
            </button>
          );
        })}
      </div>

      <p className="tree-mode-description">
        {selected.description}
      </p>
    </aside>
  );
}

export default TreeModeSelect;
