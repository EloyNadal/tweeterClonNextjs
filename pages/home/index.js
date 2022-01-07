
import { useEffect, useState } from 'react';
import Devit from 'components/Devit';
import useUser from 'hooks/useUser';
import { fetchLatestDevits } from 'services/firebase/client';
import Layout from 'components/Layout';

export default function HomePage() {

    const [timeline, setTimline] = useState([]);
    const user = useUser();

    useEffect(() => {
        user &&
            fetchLatestDevits()
                .then(setTimline)
    }, [user])

    return (

        <Layout>
            {timeline.map(devit => <Devit
                key={devit.id}
                userName={devit.userName}
                avatar={devit.avatar}
                content={devit.content}
                id={devit.id}
                createdAt={devit.createdAt}
                img={devit.img} />
            )}
        </Layout>

    )
}