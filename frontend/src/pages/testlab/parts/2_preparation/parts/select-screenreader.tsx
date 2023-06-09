import { useEffect, useState } from "react";
import Alert from "../../../../../shared/components/alert";

type SelectScreenreaderProps = {
  chosenScreenreader: string | undefined;
  setChosenScreenreader: Function;
};

const SelectScreenreader = ({
  chosenScreenreader,
  setChosenScreenreader,
}: SelectScreenreaderProps) => {
  const [recoveredScreenreader, setRecoveredScreenreader] = useState(false);

  useEffect(() => {
    if (!chosenScreenreader) {
      const savedScreenreader = localStorage.getItem("screenreader-setting");
      if (savedScreenreader) {
        setChosenScreenreader(savedScreenreader);
        setRecoveredScreenreader(true);
      }
    }
  }, [chosenScreenreader, setChosenScreenreader]);

  const changeScreenreader = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newScreenreader = event.target.value;
    setChosenScreenreader(newScreenreader);
    localStorage.setItem("screenreader-setting", newScreenreader);
  };

  return (
    <label className='select-screenreader'>
      What screenreader are you using? {!recoveredScreenreader && "(required)"}
      <select
        required
        name='screenreader'
        id=''
        value={chosenScreenreader}
        onChange={changeScreenreader}
      >
        <option value='' hidden>
          Choose one...
        </option>
        <option value='NVDA'>NVDA</option>
        <option value='JAWS'>JAWS</option>
        <option value='VoiceOver'>VoiceOver</option>
        <option value='Narrator'>Narrator</option>
      </select>
      {recoveredScreenreader && (
        <Alert
          type='success'
          message='Your previously selected Screenreader was restored.'
        />
      )}
    </label>
  );
};

export default SelectScreenreader;
