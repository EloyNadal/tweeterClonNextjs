
import styles from 'styles/pages/Home.module.css';
import { useEffect, useState } from 'react';
import Devit from 'components/Devit';
import Avatar from 'components/Avatar';
import useUser from 'hooks/useUser';

export default function HomePage() {

    const [timeline, setTimline] = useState([]);
    const user = useUser();

    useEffect(() => {
        user && 
        fetch('http://localhost:3000/api/statuses/home_timeline')
            .then(res => res.json())
            .then(setTimline)
    }, [user])

    return (

        <main>

            <header className={styles.header}>
            {
              user && user.avatar &&
                <Avatar src={user.avatar} alt={user.userName} sizeW={40} sizeH={40}/>
            }
                <h2>Inicio</h2>
            </header>
            <section className={styles.section}>
                {timeline.map(devit => <Devit 
                   key={devit.id}
                   username={devit.username}
                   avatar={devit.avatar}
                   message={devit.message} />
                )}
            </section>
            <nav className={styles.nav}>

            </nav>


        </main>

    )
}