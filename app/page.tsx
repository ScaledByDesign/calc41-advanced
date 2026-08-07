'use client'

import { useState } from 'react'
import styles from './page.module.css'

export default function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)
  const [memory, setMemory] = useState(0)

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  const clearEntry = () => {
    setDisplay('0')
  }

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)
      
      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '×':
        return firstValue * secondValue
      case '÷':
        return firstValue / secondValue
      case '^':
        return Math.pow(firstValue, secondValue)
      case 'mod':
        return firstValue % secondValue
      default:
        return secondValue
    }
  }

  const performScientific = (func: string) => {
    const value = parseFloat(display)
    let result: number

    switch (func) {
      case 'sin':
        result = Math.sin(value * Math.PI / 180)
        break
      case 'cos':
        result = Math.cos(value * Math.PI / 180)
        break
      case 'tan':
        result = Math.tan(value * Math.PI / 180)
        break
      case 'ln':
        result = Math.log(value)
        break
      case 'log':
        result = Math.log10(value)
        break
      case 'sqrt':
        result = Math.sqrt(value)
        break
      case 'x²':
        result = value * value
        break
      case '1/x':
        result = 1 / value
        break
      case 'x!':
        result = factorial(value)
        break
      case '±':
        result = value * -1
        break
      case 'π':
        setDisplay(String(Math.PI))
        return
      case 'e':
        setDisplay(String(Math.E))
        return
      default:
        return
    }

    setDisplay(String(result))
    setWaitingForOperand(true)
  }

  const factorial = (n: number): number => {
    if (n < 0) return NaN
    if (n === 0 || n === 1) return 1
    let result = 1
    for (let i = 2; i <= n; i++) {
      result *= i
    }
    return result
  }

  const memoryAdd = () => {
    setMemory(memory + parseFloat(display))
  }

  const memorySubtract = () => {
    setMemory(memory - parseFloat(display))
  }

  const memoryRecall = () => {
    setDisplay(String(memory))
    setWaitingForOperand(true)
  }

  const memoryClear = () => {
    setMemory(0)
  }

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <div className={styles.display}>
          <div className={styles.memory}>{memory !== 0 ? 'M' : ''}</div>
          <div className={styles.value}>{display}</div>
        </div>
        
        <div className={styles.keypad}>
          {/* Memory Row */}
          <button className={styles.function} onClick={memoryClear}>MC</button>
          <button className={styles.function} onClick={memoryRecall}>MR</button>
          <button className={styles.function} onClick={memoryAdd}>M+</button>
          <button className={styles.function} onClick={memorySubtract}>M-</button>

          {/* Scientific Functions Row 1 */}
          <button className={styles.scientific} onClick={() => performScientific('sin')}>sin</button>
          <button className={styles.scientific} onClick={() => performScientific('cos')}>cos</button>
          <button className={styles.scientific} onClick={() => performScientific('tan')}>tan</button>
          <button className={styles.scientific} onClick={() => performScientific('ln')}>ln</button>

          {/* Scientific Functions Row 2 */}
          <button className={styles.scientific} onClick={() => performScientific('log')}>log</button>
          <button className={styles.scientific} onClick={() => performScientific('sqrt')}>√</button>
          <button className={styles.scientific} onClick={() => performScientific('x²')}>x²</button>
          <button className={styles.scientific} onClick={() => performOperation('^')}>x^y</button>

          {/* Scientific Functions Row 3 */}
          <button className={styles.scientific} onClick={() => performScientific('1/x')}>1/x</button>
          <button className={styles.scientific} onClick={() => performScientific('x!')}>x!</button>
          <button className={styles.scientific} onClick={() => performScientific('π')}>π</button>
          <button className={styles.scientific} onClick={() => performScientific('e')}>e</button>

          {/* Basic Calculator */}
          <button className={styles.function} onClick={clear}>C</button>
          <button className={styles.function} onClick={clearEntry}>CE</button>
          <button className={styles.function} onClick={() => performOperation('mod')}>mod</button>
          <button className={styles.operator} onClick={() => performOperation('÷')}>÷</button>

          <button className={styles.digit} onClick={() => inputDigit('7')}>7</button>
          <button className={styles.digit} onClick={() => inputDigit('8')}>8</button>
          <button className={styles.digit} onClick={() => inputDigit('9')}>9</button>
          <button className={styles.operator} onClick={() => performOperation('×')}>×</button>

          <button className={styles.digit} onClick={() => inputDigit('4')}>4</button>
          <button className={styles.digit} onClick={() => inputDigit('5')}>5</button>
          <button className={styles.digit} onClick={() => inputDigit('6')}>6</button>
          <button className={styles.operator} onClick={() => performOperation('-')}>−</button>

          <button className={styles.digit} onClick={() => inputDigit('1')}>1</button>
          <button className={styles.digit} onClick={() => inputDigit('2')}>2</button>
          <button className={styles.digit} onClick={() => inputDigit('3')}>3</button>
          <button className={styles.operator} onClick={() => performOperation('+')}>+</button>

          <button className={styles.digit} onClick={() => performScientific('±')}>±</button>
          <button className={styles.digit} onClick={() => inputDigit('0')}>0</button>
          <button className={styles.digit} onClick={inputDecimal}>.</button>
          <button className={styles.equals} onClick={() => performOperation('=')}>=</button>
        </div>
      </div>
    </div>
  )
}