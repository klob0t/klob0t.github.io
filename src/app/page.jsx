'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Scrambled from '@/app/utils/textScramble'
import Cursor from '@/app/utils/mouseTrail'
import Tilt from '@/app/utils/tilt'
import Link from 'next/link'


export default function Home() {
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  return (
    <main>
    <Cursor />
    <Tilt />
    <div className={styles.noise}></div>
    <div className={styles.gradient}>
      <div id={styles.gradient1}></div>
      <div id={styles.gradient2}></div>
      <div id={styles.gradient3}></div>
    </div>
    <div className={styles.bento} id='bento'>
      <div className={styles.engineeringCard} data-type='look'>
        <h1>Engineering&#8859;</h1>
      </div>
      <div className={styles.productDesignCard} data-type='look'>
        <h1>Product Design&#8859;</h1>
      </div>
      <div className={styles.profileCard} data-type='star'>
        <h1>Hello, <br />i'm <Scrambled />&#8859;</h1>
        <p>hi, i'm a guy who are deeeeeeply<br />interested in design, engineering,<br /> aaand sometimes enjoy and/or do art.<br />welcome to my page&#x3063;&#x02d8;&#x06a1;&#x02d8;&#x03c2;</p>
      </div>
      <div className={styles.mbtiCard} data-type='read'>
        <h1>Logician</h1>
        <h2>INTP-T</h2>
        <Image
          src='/images/logician.svg'
          width={250}
          height={250}
          alt='Sir Isaac Newton'
         />
        <p>...by the way, Sir Isaac Newton<br />is an INTP too</p>
        <Link href='https://16personalities.com'><i>16personalities.com</i></Link>
      </div>
      <div className={styles.curriculumVitaeCard} data-type='look'>
        <h1>Curriculum Vitae&#8277;</h1>
      </div>
      <div className={styles.codingJourneyCard} data-type='read'>
        <h1>&gt;coding journey<span className={styles.blink}>_</span></h1>
      </div>
      <div className={styles.artCard} data-type='look'>
        <h1>Art&#8859;</h1>
      </div>
      <div className={styles.instagram} id='footer'>
        <Link href='https://instagram.com/airlanggga' target='blank'><i className='fa-brands fa-instagram fa-2x' /></Link>
      </div>
      <div className={styles.linkedin} id='footer'>
        <Link href='https://linkedin.com/in/airlanggakb' target='blank'><i className='fa-brands fa-linkedin-in fa-2x' /></Link>
      </div>
      <div className={styles.youtube} id='footer'>
        <Link href='https://youtube.com/@klob0t' target='blank'><i className='fa-brands fa-youtube fa-2x' /></Link>
      </div>
      <div className={styles.twitter} id='footer'>
        <Link href='https://x.com/klob0t' target='blank'><i className='fa-brands fa-x-twitter fa-2x' /></Link>
      </div>
      <div className={styles.footer} id='footer'>
        <Image 
          src='/images/logo-fav.svg'
          width={50}
          height={50}
          alt='klob0t'
        />
      </div>
    </div>
    </main>
  );
}
