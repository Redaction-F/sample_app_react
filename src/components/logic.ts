type Operator = "+" | "-" | "×" | "÷" | "=";
export type OperetorOrNull = Operator | null;

export type ButtonNumberProps = {
  buttonNumber: number, 
  number: number
  setNumber: (number: number) => void
};

export type ButtonCommonProps = {
  setNumber: (number: number) => void
};

export type ButtonOperatorProps = {
  operator: Operator, 
  number: number, 
  setNumber: (number: number) => void
};

export type ButtonsProps = {
  number: number,
  setNumber: (number: number) => void
}

const operator_list: Operator[] = ["+", "-", "×", "÷", "="];

class DisplayCondiiton {
  secondNumber: number; 
  checkSecond: boolean; 
  previousOperator: OperetorOrNull; 
  checkOperator: boolean; 
  checkEqual: boolean; 
  point: number;

  constructor() {
    this.secondNumber = 0;
    this.checkSecond = false;
    this.previousOperator = null;
    this.checkOperator = false;
    this.checkEqual = false;
    this.point = 0;
  };

  clear() {
    this.secondNumber = 0;
    this.checkSecond = false;
    this.previousOperator = null;
    this.checkOperator = false;
    this.checkEqual = false;
    this.point = 0;
  };
};

let condition: DisplayCondiiton = new DisplayCondiiton;

const onClickNumber = (buttonNumber: number, number: number, setNumber: (number: number) => void) => {
  if (condition.checkEqual) {
    condition.clear();
    setNumber(buttonNumber);
  } else if (condition.checkOperator) {
    condition.point = 0;
    condition.checkOperator = false;
    setNumber(buttonNumber);
  } else {
    if (condition.point === 0) {
      setNumber(number! * 10 + buttonNumber);
    } else {
      setNumber(number! + buttonNumber * (10 ** condition.point));
      condition.point -= 1;
    };
  };
};

const onClickClear = (setNumber: (number: number) => void) => {
  condition.clear();
  setNumber(0);
};


const onClickOperator = (operator: Operator, number: number, setNumber: (number: number) => void) => {
  if (!condition.checkOperator) {
    condition.checkSecond = true;
    if (condition.previousOperator === operator_list[0]) {
      setNumber(condition.secondNumber + number);
    } else if (condition.previousOperator === operator_list[1]) {
      setNumber(condition.secondNumber - number);
    } else if (condition.previousOperator === operator_list[2]) {
      setNumber(condition.secondNumber * number);
    } else if (condition.previousOperator === operator_list[3]) {
      setNumber(condition.secondNumber / number);
    } else {
      condition.secondNumber = number;
      condition.checkSecond = false;
    };
  };
  if (operator === operator_list[4]) {
    condition.checkEqual = true;
  } else {
    condition.checkEqual = false;
  };
  condition.checkOperator = true;
  condition.previousOperator = operator;
};

const onClickPoint = () => {
  if (condition.point === 0) {
    condition.point = -1
  };
};

export {onClickNumber, onClickOperator, onClickClear, onClickPoint, operator_list, condition};