import React, { useRef } from 'react';

interface Props {
  setCurrentContentState: React.Dispatch<React.SetStateAction<string>>;
}

function Navi({ setCurrentContentState }: Props) {
  const aButton = useRef<HTMLButtonElement>(null);
  const bButton = useRef<HTMLButtonElement>(null);

  const contentHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCurrentContentState(e.currentTarget.name);
    if (e.currentTarget.name === 'a' && aButton.current !== null && bButton.current !== null) {
      aButton.current.className = 'css-314frj e15gmwmn0';
      bButton.current.className = 'css-1dbdrbw e15gmwmn0';
    } else if (e.currentTarget.name === 'b' && aButton.current !== null && bButton.current !== null) {
      aButton.current.className = 'css-1dbdrbw e15gmwmn0';
      bButton.current.className = 'css-314frj e15gmwmn0';
    }
  };

  return (
    <section>
      <header className="css-1gg6c52">
        <button name="a" ref={aButton} type="button" className="css-314frj e15gmwmn0" onClick={contentHandler}>
          A Posts
        </button>
        <button name="b" ref={bButton} type="button" className="css-1dbdrbw e15gmwmn0" onClick={contentHandler}>
          B Posts
        </button>
      </header>
    </section>
  );
}
export default Navi;
