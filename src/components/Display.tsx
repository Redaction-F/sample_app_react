import { useEffect, useState } from "react";

type Operator = "+" | "-" | "×" | "÷" | "=";
type OperetorOrNull = Operator | null;

const operator_list: Operator[] = ["+", "-", "×", "÷", "="];
let numberSecond: number = 0;
let secondCheck: boolean = false;
let operator: OperetorOrNull = null;
let equalCheck: boolean = false;
let operatorCheck: boolean = false;
let point: number = 0;

const Display = () => {
  const [number, setNumber] = useState<number>(0);

  useEffect(() => {
    if (secondCheck) {
      numberSecond = number;
      secondCheck = false;
    };
  }, [number]);

  const ButtonNumber = (props: {number: number}) => {
    const onClickNumber = () => {
      if (equalCheck) {
        numberSecond = 0;
        secondCheck = false;
        operator = null;
        equalCheck = false;
        operatorCheck = false;
        setNumber(props.number);
      } else if (operatorCheck) {
        setNumber(props.number);
        operatorCheck = false;
      } else {
        if (point === 0) {
          setNumber(number! * 10 + props.number);
        } else {
          setNumber(number! + props.number * (10 ** point));
        };
      };
    };
    return(
      <button className="btn" onClick={onClickNumber}>{props.number}</button>
    );
  };

  const ButtonClear = () => {
    const onClickClear = () => {
      setNumber(0);
      numberSecond = 0;
      secondCheck = false;
      operator = null;
      equalCheck = false;
      operatorCheck = false;
      point = 0;
    };
    return(
      <button className="btn" onClick={onClickClear}>C</button>
    );
  };

  const ButtonOperator = (props: {operator: Operator}) => {
    const onClickOperator = () => {
      if (!operatorCheck) {
        secondCheck = true;
        if (operator === operator_list[0]) {
          setNumber(numberSecond! + number!);
        } else if (operator === operator_list[1]) {
          setNumber(numberSecond! - number!);
        } else if (operator === operator_list[2]) {
          setNumber(numberSecond! * number!);
        } else if (operator === operator_list[3]) {
          setNumber(numberSecond! / number!);
        } else {
          numberSecond = number;
          secondCheck = false;
        };
        if (props.operator === operator_list[4]) {
          equalCheck = true;
        } else {
          equalCheck = false;
        };
        operatorCheck = true;
        operator = props.operator;
      } else {
        if (props.operator === operator_list[4]) {
          equalCheck = true;
        } else {
          equalCheck = false;
        };
        operator = props.operator;
        point = 0;
      };
    };
    return(
      <button className="btn" onClick={onClickOperator}>{props.operator}</button>
    );
  };

  const ButtonPoint = () => {
    const onClickPoint = () => {
      if (point === 0) {
        point = -1
      };
    };
    return(
      <button className="btn" onClick={onClickPoint}>.</button>
    );
  };
  
  const Buttons = () => {
    return(
      <div className='btn-wrappar'>
        <div className="btn-dummy"></div>
        <ButtonNumber number={7} />
        <ButtonNumber number={8} />
        <ButtonNumber number={9} />
        <ButtonOperator operator={operator_list[3]}/>
        <div className="btn-dummy"></div>
        <ButtonNumber number={4} />
        <ButtonNumber number={5} />
        <ButtonNumber number={6} />
        <ButtonOperator operator={operator_list[2]}/>
        <div className="btn-dummy"></div>
        <ButtonNumber number={1} />
        <ButtonNumber number={2} />
        <ButtonNumber number={3} />
        <ButtonOperator operator={operator_list[1]}/>
        <ButtonClear />
        <ButtonNumber number={0} />
        <ButtonPoint />
        <ButtonOperator operator={operator_list[4]} />
        <ButtonOperator operator={operator_list[0]} />
      </div>
    )
  }

  return (
    <>
      <div id="display">{number}</div>
      <Buttons />
    </>
  )
};

export default Display;