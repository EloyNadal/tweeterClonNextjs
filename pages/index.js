import { useEffect } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import useUser, { USER_STATES} from 'hooks/useUser';

import { loginWithGitHub } from 'services/firebase/client';

import Button from 'components/Buttton'
import GitHub from 'components/Icons/GitHub'

import styles from 'styles/Home.module.css'

export default function Home() {

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    user && router.replace('/home');
  }, [user]);

  const handleClick = () => {
    loginWithGitHub()
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <>
     
      <main>
        <section className={styles.homeSection}>
          <Image src={'/vercel.svg'} width={120} height={60} alt='logo' />
          <h1 className={styles.title}>
            My App
          </h1>
          <h2 className={styles.subtitle}>Talk about development <br /> with developers <span>&#128590; &#129333;</span></h2>
          <div className={styles.btnWrapper}>

            {
              
              user === USER_STATES.NOT_LOGGED &&
              <Button onClick={handleClick}>
                <GitHub fill='#fff' width={24} height={24} />
                Login with GitHub
              </Button>
            } 
            {
              user === USER_STATES.NOT_KNOWN && <Image src={'/spinner.gif'} alt='loading' width={100} height={100} />
            }

          </div>
        </section>

      </main>
    </>
  )
}
