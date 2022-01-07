
import styles from 'styles/pages/Home.module.css';
import { useEffect, useState } from 'react';
import Devit from 'components/Devit';
import Avatar from 'components/Avatar';
import useUser from 'hooks/useUser';
import { fetchLatestDevits } from 'services/firebase/client';
import Link from 'next/link';
import Create from 'components/Icons/Create';
import Home from 'components/Icons/Home';
import Search from 'components/Icons/Search';
import Nav from 'components/Nav';

export default function HomePage() {

    const [timeline, setTimline] = useState([]);
    const user = useUser();

    useEffect(() => {
        user && 
        fetchLatestDevits()
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
                   userName={devit.userName}
                   avatar={devit.avatar}
                   content={devit.content} 
                   id={devit.id}
                   createdAt={devit.createdAt}
                   img={devit.img}/>
                )}
            </section>
            <Nav />

        </main>

    )
}