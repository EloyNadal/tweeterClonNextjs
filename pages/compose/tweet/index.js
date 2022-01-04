import Button from 'components/Buttton'
import useUser from 'hooks/useUser';
import styles from 'styles/pages/ComposeTweet.module.css'

export default function ComposeTweet() {

    const user = useUser();

    return (
        <main>

            <header className={styles.header}>
                <h2>{'<-'} Volver</h2>
            </header>
            <section className={styles.section}>
                <form>
                    <textarea placeholder='¿Qué esta pasando?'></textarea>
                    <div>
                        <Button>Devitear</Button>
                    </div>

                </form>
            </section>
            <nav className={styles.nav}>

            </nav>


        </main>
    )

}