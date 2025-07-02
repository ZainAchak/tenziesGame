import Die from "../Die/Die";
import styles from "./MainComp.module.css"

function generateDiceRolls() {
  const diceRolls = [];
  for (let i = 0; i < 10; i++) {
    const roll = Math.floor(Math.random() * 6) + 1;
    diceRolls.push(roll);
  }
  return diceRolls;
}

export default function MainComp() {
    const dicesRandomNumber = generateDiceRolls();
    return(
        <main>
            <div className={styles.dieWrapper}>
                    {dicesRandomNumber.map((dice)=>(
                        <Die number={dice}/>
                    ))}
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
            </div>
        </main>
    )
}