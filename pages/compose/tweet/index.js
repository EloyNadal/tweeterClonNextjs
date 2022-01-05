import Avatar from 'components/Avatar';
import Button from 'components/Buttton'
import useUser from 'hooks/useUser';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { addDevit, uploadImage } from 'services/firebase/client';
import styles from 'styles/pages/ComposeTweet.module.css'

const COMPOSE_STATES = {
    USER_NOT_KNOWN: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: -1
};

const DRAG_IMAGE_STATES = {
    ERROR: -1,
    NONE: 0,
    DRAG_OVER: 1,
    UPLOADING: 2,
    COMPLETE: 3
}

export default function ComposeTweet() {

    const user = useUser();
    const router = useRouter();
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN);

    const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE);
    const [imgURL, setImgURL] = useState(null);

    const handleChange = (event) => {
        const { value } = event.target;
        setMessage(value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setStatus(COMPOSE_STATES.LOADING);

        addDevit({
            avatar: user.avatar,
            content: message,
            userId: user.uid,
            userName: user.userName,
            img: imgURL,
        }).then(() => {
            router.push('/home');
        }).catch(e => {
            console.log({ e })
        })
    }

    const handleDragEnter = e => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
    }
    const handleDragLeave = e => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.NONE)
    }
    const handleDrop = e => {
        e.preventDefault();
        setDrag(DRAG_IMAGE_STATES.NONE)

        const file = e.dataTransfer.files[0];
        uploadImage(file, setImgURL);
    }

    const isButtonDisabled = message.length < 5 || status === COMPOSE_STATES.LOADING;

    const styleTextArea = drag === DRAG_IMAGE_STATES.DRAG_OVER ? styles.over : styles.none;

    return (
        <main>
            <header className={styles.header}>
                <h2>{'<-'} Volver</h2>
            </header>
            <section className={styles.section}>
                {
                    user && user.avatar && <Avatar src={user.avatar} />
                }
                <form onSubmit={handleSubmit}>
                    <textarea
                        className={styleTextArea}
                        placeholder='¿Qué esta pasando?'
                        onChange={handleChange}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                    </textarea>
                    {imgURL && (
                        <section className={styles.removeimg}>
                            <button onClick={() => setImgURL(null)}>x</button>
                            <Image src={imgURL} width={500} height={300} alt='image'/>
                        </section>
                    )}
                    <div>
                        <Button disabled={isButtonDisabled} >Devitear</Button>
                    </div>
                </form>
            </section>
            <nav className={styles.nav}>

            </nav>


        </main>
    )

}