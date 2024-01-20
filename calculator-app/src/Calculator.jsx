import { useRef, useState } from "react"

const Operations = Object.freeze({
    NONE: 0,
    ADD: 1, SUBTRACT: 2,
    MULTIPLY: 3, DIVIDE: 4
})

function Calculator() {
    const [prevNum, setPrevNum] = useState("0");
    const [visibleNumber, setVisibleNumber] = useState("0");
    const [operation, setOperation] = useState(Operations.NONE);
    const shouldResetNumber = useRef(true);

    // not just casting to Number and then casting back to string
    // because that doesn't work well with decimals and zeros
    function cleanNumber(numToClean) {
        let _numString = numToClean.toString();

        if (_numString.length == 1) return numToClean;

        let _cleanedNumString = _numString;
        let _hasPassedNonZeroNum = false;
        let _periodCounter = 0;

        let _firstPeriodIndex = _numString.indexOf('.');
        for (let i = 0; i < _numString.length; i++) {
            // removes any leading zeros
            // if string is just zero, doesn't do anything
            // if the string starts with 0., then the 0 isn't removed
            if (_numString.charAt(i) == '0' && !_hasPassedNonZeroNum && _cleanedNumString.length > 1
                && _firstPeriodIndex != 1) {
                _cleanedNumString = _cleanedNumString.slice(1);
            }

            else if (_numString.charAt(i) == '.') {
                _periodCounter++;

                if (_periodCounter > 1) {
                    _cleanedNumString = _cleanedNumString.slice(0, _cleanedNumString.length - 1);
                }
            }

            else _hasPassedNonZeroNum = true;
        }

        return _cleanedNumString;
    }

    return (
        <div id="calculator">
            <div id="visibleNumber">
                <p>{visibleNumber}</p>
            </div>

            <div id="historyChangeButtons">
                <div id="clearButton">
                    <button onClick={() => { setVisibleNumber("0"); shouldResetNumber.current = true; }}>Clear</button>
                </div>

                <div id="resetButton">
                    <button onClick={() => { setVisibleNumber("0"); setPrevNum("0"); shouldResetNumber.current = true; }}>Reset</button>
                </div>
            </div>
            
            <div id="calculatorButtons">
                <div id="numberButtons">
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + "1").toString()); if (shouldResetNumber.current) shouldResetNumber.current = false; }}>1</button>
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + "2").toString()); if (shouldResetNumber.current) shouldResetNumber.current = false; }}>2</button>
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + "3").toString()); if (shouldResetNumber.current) shouldResetNumber.current = false; }}>3</button>
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + "4").toString()); if (shouldResetNumber.current) shouldResetNumber.current = false; }}>4</button>
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + "5").toString()); if (shouldResetNumber.current) shouldResetNumber.current = false; }}>5</button>
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + "6").toString()); if (shouldResetNumber.current) shouldResetNumber.current = false; }}>6</button>
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + "7").toString()); if (shouldResetNumber.current) shouldResetNumber.current = false; }}>7</button>
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + "8").toString()); if (shouldResetNumber.current) shouldResetNumber.current = false; }}>8</button>
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + "9").toString()); if (shouldResetNumber.current) shouldResetNumber.current = false; }}>9</button>
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + "0").toString()); if (shouldResetNumber.current) shouldResetNumber.current = false; }}>0</button>
                    <button onClick={() => { setVisibleNumber(cleanNumber((shouldResetNumber.current ? "0" : visibleNumber) + ".")) }}>.</button>
                    <button onClick= { () => {
                                let _result = 0;
                                switch (operation) {
                                    case Operations.ADD:
                                        _result = Number(prevNum) + Number(visibleNumber);
                                        break;

                                    case Operations.SUBTRACT:
                                        _result = Number(prevNum) - Number(visibleNumber);
                                        break;

                                    case Operations.MULTIPLY:
                                        _result = Number(prevNum) * Number(visibleNumber);
                                        break;

                                    case Operations.DIVIDE:
                                        _result = Number(prevNum) / Number(visibleNumber);
                                        break;

                                    default:
                                        _result = visibleNumber;
                                        console.error("The operation has been set to an undefined operation.");
                                }

                                setPrevNum(visibleNumber);
                                setVisibleNumber(_result);

                                shouldResetNumber.current = true;
                            }
                        }>=</button>
                </div>

                <div id="operationButtons">
                    <button onClick={() => {
                        setOperation(Operations.ADD);
                        setPrevNum(visibleNumber);
                        setVisibleNumber("0");
                    }}>+</button>
                    <button onClick={() => {
                        setOperation(Operations.SUBTRACT);
                        setPrevNum(visibleNumber);
                        setVisibleNumber("0");
                    }}>-</button>
                    <button onClick={() => {
                        setOperation(Operations.DIVIDE);
                        setPrevNum(visibleNumber);
                        setVisibleNumber("0");
                    }}>/</button>
                    <button onClick={() => {
                        setOperation(Operations.MULTIPLY);
                        setPrevNum(visibleNumber);
                        setVisibleNumber("0");
                    }}>x</button>
                </div>
            </div>
        </div>
    )
}

export default Calculator