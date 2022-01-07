import Avatar from 'components/Avatar';
import Nav from 'components/Nav';
import useUser from 'hooks/useUser';
import styles from './Layout.module.css';

export default function Layout({ children }) {

    const user = useUser();

    return (
        <main>

            <header className={styles.header}>
                {
                    user && user.avatar &&
                    <Avatar src={user.avatar} alt={user.userName} sizeW={40} sizeH={40} />
                }
                <h2>Inicio</h2>
            </header>
            <section className={styles.section}>
                {children}
            </section>
            <Nav />

        </main>
    );
}