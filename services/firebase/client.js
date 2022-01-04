// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMMBaIlt6PxBkeOX_aOyELhTMcha9qVgU",
    authDomain: "next-dev-522e4.firebaseapp.com",
    projectId: "next-dev-522e4",
    storageBucket: "next-dev-522e4.appspot.com",
    messagingSenderId: "556990071506",
    appId: "1:556990071506:web:57913f04ab59098d38a30b"
};

// Initialize Firebase
//solo si no se ha iniciado antes
const app = !getApps().length && initializeApp(firebaseConfig);

const mapUserFromFirebaseAuth = (user) => {
    const { reloadUserInfo } = user;
    //console.log({reloadUserInfo});
    const { screenName, photoUrl, displayName } = reloadUserInfo;
    const gitHubUrl = 'https://github.com/';

    return {
        avatar: photoUrl,
        blog: `${gitHubUrl}${screenName}`,
        userName: displayName,
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