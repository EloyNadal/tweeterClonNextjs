// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, Timestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { getAuth, GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getStorage, getDownloadURL } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

// Initialize Firebase
//solo si no se ha iniciado antes
const app = !getApps().length && initializeApp(firebaseConfig);
const db = getFirestore();

const mapUserFromFirebaseAuth = (user) => {

    const { reloadUserInfo, uid } = user;
    //console.log({reloadUserInfo});
    const { screenName, photoUrl, displayName } = reloadUserInfo;
    const gitHubUrl = 'https://github.com/';

    return {
        avatar: photoUrl,
        blog: `${gitHubUrl}${screenName}`,
        userName: displayName,
        uid
    };
}

export const currentUser = () => {

    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        return mapUserFromFirebaseAuth(user);
    } else {
        return null;
    }
}

export const authStateListener = (onChange) => {

    const auth = getAuth();
    return onAuthStateChanged(auth, (user) => {
        if (user) {
            onChange(mapUserFromFirebaseAuth(user))
        } else {
            onChange(null);
        }
    });

}

export const loginWithGitHub = () => {

    const auth = getAuth();
    const porvider = new GithubAuthProvider();

    //return signInWithPopup(auth, porvider);
    return signInWithPopup(auth, porvider)
        .then((result) => {

            const credentials = GithubAuthProvider.credentialFromResult(result);
            const token = credentials.accessToken;

            const user = result.user;
            return mapUserFromFirebaseAuth(user);

        }).catch((error) => {
            const { code, message, email } = error;

            console.log({ code, message, email });

            const credentials = GithubAuthProvider.credentialFromError(error);
            console.log(credentials);

        });
}

export const addDevit = async ({ avatar, content, userId, userName, img }) => {

    try {
        const docRef = await addDoc(collection(db, 'devists'), {
            avatar,
            content,
            userId,
            userName,
            img,
            createdAt: Timestamp.fromDate(new Date()),
            likesCount: 0,
            sharesCount: 0
        });
        return docRef.id;
    } catch (error) {
        console.log(error);
    }
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
    const data = doc.data();
    const id = doc.id;

    const { createdAt } = data;

    //fecha formateada dd/mm/yyyy
    /* const intl = new Intl.DateTimeFormat('es-ES');
    const normalizedCreatedAt = intl.format(new Date(createdAt.toDate())); */

    return {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
    };
}


/**
 * @todo hacer que reciba un callback y se actualice el 
 * listado cuando se actualice la bse de datos
 * @returns 
 */
/* export const listenLatestDevits = async () => {
    try {
        const devitRef = collection(db, "devists");
        const q = query(devitRef, orderBy('createdAt', 'desc'))
        //const querySnapshot = await getDocs(q);
        const querySnapshot = await onSnapshot(q);

        return querySnapshot.docs.map(mapDevitFromFirebaseToDevitObject)
    } catch (error) {
        console.log(error);
    }
} */

export const fetchLatestDevits = async () => {

    try {
        const devitRef = collection(db, "devists");
        const q = query(devitRef, orderBy('createdAt', 'desc'))
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(mapDevitFromFirebaseToDevitObject)
    } catch (error) {
        console.log(error);
    }
}

export const uploadImage = (file, onUpload) => {

    const storage = getStorage(getApps()[0]);
    const storageRef = ref(storage, `/images/${file.name}`);

    const uploadTask = uploadBytes(storageRef, file);

    uploadTask.then((status) => {
        getDownloadURL(storageRef)
            .then((url) => {
                console.log({ url })
                onUpload(url)
            })
            .catch((error) => {
                console.log(error);
            });
    })
        .catch((error) => {
            console.log(error);
        })

    /* uploadTask.on(
        "state_changed",
        (snapshot) => {
            const progress =
                Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 1000) / 10;

            console.log(progress);
        },
        (error) => {
            console.log(error);
        },
        () => {
            getDownloadURL(storageRef)
                .then((url) => {
                    onUpload(url)
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    ); */
}

/* export const uploadImage = (file) => {
    const ref = firebase.storage().ref(`images/${file.name}`)
    const task = ref.put(file)
    return task
} */