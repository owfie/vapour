'use client'

import { Button, Pane } from '@/components'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Vapour.gg</h1>
      <h3>Unleash your Steam library.</h3>
      <Button
        onClick={() => {
          console.log('test')
        }}
      >
        Test button
      </Button>
      <Pane>
        Example content
      </Pane>
    </main>
  )
}
