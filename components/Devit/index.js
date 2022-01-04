import Avatar from "components/Avatar";
import styles from "./Devit.module.css"

export default function Devit({ username, avatar, message }) {
    return (
        <article className={styles.article}>
            <div>
            <Avatar src={avatar} alt={username} />
            </div>
            
            <section>
                <strong>{username}</strong>
                <p>{message}</p>
            </section>
        </article>
    )
}