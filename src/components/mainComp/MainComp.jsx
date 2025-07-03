import { useEffect, useRef, useState } from "react";
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
    const [newGame, setNewGame] = useState(false);
    const buttonText = useRef()

    useEffect(()=>{
        const allHeld = dicesRandomNumber.every(die => die.isHeld === true);
        if(allHeld){
            const firstValue = dicesRandomNumber[0]?.value;
            const allSameValue = dicesRandomNumber.every(die => die.value === firstValue);
            setNewGame(true);

            if(allSameValue){
                buttonText.current.textContent = "New Game"
            }else{
                buttonText.current.textContent = "Not All Same Selected New Game"
            }
        }
    },[dicesRandomNumber])

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
        setNewGame(false);
    }

    return(
        <main>
            <div className={styles.dieWrapper}>
                    {dicesRandomNumber.map((dice)=>(
                        <Die    key={dice.id} 
                                dice={dice}
                                setFunction={changeOnHeld}/>
                    ))}
            </div>
            <button 
                ref={buttonText}
                onClick={newGame ? ()=>startNewGame() : ()=>buttonHandler()}>
                Roll the Dice
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