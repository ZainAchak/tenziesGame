import {useState } from "react";
import Die from "../Die/Die";
import styles from "./MainComp.module.css"

function generateDiceRolls() {
  const diceRolls = [];
  for (let i = 0; i < 10; i++) {
    const roll = Math.floor(Math.random() * 6) + 1;
    diceRolls.push({id:crypto.randomUUID(),
                    value:roll, 
                    isHeld:false});
  }
  return diceRolls;
}

function getaRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
}


export default function MainComp() {

    const [dicesRandomNumber,setDicesRandomNumber] = useState(generateDiceRolls());
    // const [newGame, setNewGame] = useState(false);
    let buttonText = "Roll the Dice"

    const allHeld = dicesRandomNumber.every(die => die.isHeld === true)
    const firstValue = dicesRandomNumber[0]?.value
    const allSameValue = allHeld && dicesRandomNumber.every(die => die.value === firstValue)


    // if(allHeld) setNewGame(true)
    buttonText = allHeld ? (allSameValue ? "New Game" : "Wrong Sequence") : "Roll the Dice"

    // useEffect(()=>{
    //     const allHeld = dicesRandomNumber.every(die => die.isHeld === true);
    //     if(allHeld){
    //         const firstValue = dicesRandomNumber[0]?.value;
    //         const allSameValue = dicesRandomNumber.every(die => die.value === firstValue);
    //         setNewGame(true);

    //         if(allSameValue){
    //             buttonText.current.textContent = "New Game"
    //         }else{
    //             buttonText.current.textContent = "Not All Same Selected New Game"
    //         }
    //     }
    // },[dicesRandomNumber])

    function changeOnHeld(id) {
        setDicesRandomNumber(prev => 
            prev.map((item)=>{
                if (item.id === id) {
                    return{...item, isHeld : !item.isHeld}
                }
                return item;
            }
        ))
    }

    function buttonHandler() {
        setDicesRandomNumber(prev => prev.map((item)=>{
            if (item.isHeld === false){
                return {...item,value:getaRandomDice()}
            }
            return item;
        }))
    }

    function startNewGame() {
        setDicesRandomNumber(generateDiceRolls())
        buttonText.current.textContent = "Roll the Dice"
    }

    return(
        <main>
            <h1 className={styles.title}>Tenzies</h1>
            <p className={styles.instructions}>Roll until all dice are same. Click each die to freeze it at its current value between rolls.</p>
            <div className={styles.dieWrapper}>
                    {dicesRandomNumber.map((dice)=>(
                        <Die    key={dice.id} 
                                dice={dice}
                                setFunction={changeOnHeld}/>
                    ))}
            </div>
            <button 
                onClick={allHeld ? ()=>startNewGame() : ()=>buttonHandler()}>
                {buttonText}
            </button>
        </main>
    )
}


{/* {showDieMap} */}
                {/* <Die number={1}/>
                <Die number={2}/>
                <Die number={3}/>
                <Die number={4}/>
                <Die number={4}/>
                <Die number={5}/>
                <Die number={1}/>
                <Die number={2}/>
                <Die number={6}/>
                <Die number={6}/> */}