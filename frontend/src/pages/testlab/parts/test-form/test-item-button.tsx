type TestItemButtonProps = {
  id: string;
  title: string;
  label: string;
  choice: string;
  changeChoice: Function;
  active: boolean;
};

// this component is used by test-item.tsx
const TestItemButton = ({
  id,
  title,
  label,
  choice,
  changeChoice,
  active,
}: TestItemButtonProps) => {
  return (
    <label
      className={`button ${active && "button-selected"}`}
      onClick={() => changeChoice(choice)}
    >
      <input
        type='radio'
        name={id}
        aria-label={`${title}: Choice: ${label}.`}
        required
        id={`${id}${choice}`}
      />
      {label}
    </label>
  );
};

export default TestItemButton;
