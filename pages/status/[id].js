import Avatar from "components/Avatar";
import Devit from "components/Devit";
import Nav from "components/Nav";
import useUser, { USER_STATES } from "hooks/useUser";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "services/firebase/admin";
import styles from "styles/pages/DevitPage.module.css";
useRouter

export default function DevitPage(devit) {

    const user = useUser(USER_STATES.NOT_KNOWN);
    const router = useRouter();
    //const [devit, setDevit] = useState(null);

    /* useEffect(() => {
        fetch(`http://localhost:3000/api/devits/${id}`)
            .then((res) => {
                setDevit(res);
            })
            .catch(err => console.log(err));
    }, []) */
    
    if (router.isFallback) {
        return <p>Loading...</p>
    }

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
                {devit &&
                    <Devit
                        key={devit.id}
                        userName={devit.userName}
                        avatar={devit.avatar}
                        content={devit.content}
                        id={devit.id}
                        createdAt={devit.createdAt}
                        img={devit.img} />
                }
            </section>
            <Nav />

        </main>
    );
}

//siempre realiza la consulta desde servidor y devuelve html
/* export const getServerSideProps = async (context) => {

    //params, req, res, query
    const { params, res } = context;

    const apiResponse = await fetch(`http://localhost:3000/api/devits/${params.id}`);
    if (apiResponse.ok) {
        const props = await apiResponse.json();
        return { props: props };
    }
    if(res){
        res.writeHead(301, { Location: "home"}).end();
    }
} */


export const getStaticProps = async (context) => {

    const { params } = context;
    const { id } = params;
    const devitRef = db.collection('devists');

    return devitRef.doc(id).get().then((doc) => {
        const data = doc.data();

        if (data) {

            const id = doc.id;
            const { createdAt } = data;

            const props = {
                ...data,
                id,
                createdAt: +createdAt.toDate()
            }
            return { props };
        }

    }).catch(err => {
        return { props: {} };
    });

}


export const getStaticPaths = async () => {

    return {
        //paths: [{ params: { id: '0C6orF4mG1RDEdvcjgPW' } }],
        paths: [],
        fallback: true
    }

}


