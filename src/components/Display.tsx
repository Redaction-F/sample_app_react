import { useEffect, useState } from "react";
import Buttons from "./Button";
import { OperetorOrNull, condition } from "./logic";

const Display = () => {
  const [number, setNumber] = useState<number>(0);

  const setNumberTmp = (number: number) => {
    setNumber(number)
  };

  useEffect(() => {
    if (condition.checkSecond) {
      condition.secondNumber = number;
      condition.checkSecond = false;
    };
  }, [number]);

  return (
    <>
      <div id="display">{number}</div>
      <Buttons number={number} setNumber={setNumberTmp}/>
    </>
  )
};

export default Display;