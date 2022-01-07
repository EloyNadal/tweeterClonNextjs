import Devit from "components/Devit";
import Layout from "components/Layout";
import useUser, { USER_STATES } from "hooks/useUser";
import { useRouter } from "next/router";
import { db } from "services/firebase/admin";

export default function DevitPage(devit) {

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
        <Layout>
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
        </Layout>
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


