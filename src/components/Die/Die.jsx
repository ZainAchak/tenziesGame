import styles from "./Die.module.css"

export default function Die(props) {
    const isHeld = props.dice.isHeld;
    const value = props.dice.value;
    const id = props.dice.id;
    // isHeld ? ()=>{} : 

    return(
        <div onClick={()=>props.setFunction(id)} 
             className={isHeld ? styles.DieHeld : styles.Die  }>
             <h1>{value}</h1>
        </div>
    )
}