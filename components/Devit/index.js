import Avatar from "components/Avatar";
import useTimeAgo from "hooks/useTimeAgo";
import Image from "next/image";
import styles from "./Devit.module.css"

export default function Devit({ userName, avatar, content, createdAt, id, img }) {

    const timeago = useTimeAgo(createdAt);

    return (
        <article className={styles.article}>
            <div>
                <Avatar src={avatar} alt={userName} />
            </div>

            <section>
                <header>
                    <strong>{userName}</strong>
                    <span className={styles.separator}>{' · '}</span>
                    <span className={styles.timeago}>{timeago}</span>
                    <p>{content}</p>
                    {img && <Image className={styles.img} src={img} width={750} height={422} alt={userName}/>}
                </header>
            </section>
        </article>
    )
}