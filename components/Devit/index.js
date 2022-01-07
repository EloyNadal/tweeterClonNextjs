import Avatar from "components/Avatar";
import useTimeAgo from "hooks/useTimeAgo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Devit.module.css"

export default function Devit({ userName, avatar, content, createdAt, id, img }) {

    const timeago = useTimeAgo(createdAt);
    const router = useRouter();

    const handleArticleClick = (e) => {
        e.preventDefault();
        router.push(`/status/${id}`)
    }

    return (
        <article className={styles.article} onClick={handleArticleClick}>
            <div>
                <Avatar src={avatar} alt={userName} />
            </div>

            <section>
                <header>
                    <strong>{userName}</strong>
                    <span className={styles.separator}>{' · '}</span>
                    <Link href={`/status/${id}`}>
                        <a>
                            <time className={styles.timeago}>{timeago}</time>
                        </a>
                    </Link>
                    <p>{content}</p>
                    {img && <Image className={styles.img} src={img} width={750} height={422} alt={userName} />}
                </header>
            </section>
        </article>
    )
}