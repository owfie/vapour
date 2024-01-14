import { Button, Pane } from '@/components'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
    <Button>
      Test button
    </Button>
    <Pane>
      Example content
    </Pane>
    </main>
  )
}
