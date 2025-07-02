import styles from "./Die.module.css"

export default function Die(props) {
    return(
        <div className={styles.Die}>
            <h1>{props.number}</h1>
        </div>
    )
}