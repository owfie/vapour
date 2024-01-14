'use client'

import { Button, Pane, TextField } from '@/components'
import styles from './page.module.scss'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Home() {
  const [value, setValue] = useState('')
  const [isFetching, setIsFetching] = useState(false)

  const handleInputChange = (s: string) => {
    setValue(s)
  }

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined = undefined
    setIsFetching(false)

    if (value !== '' && !timeoutId) {
      timeoutId = setTimeout(async () => {
        try {
          console.log('Fetching data...')
          setIsFetching(true)
        } catch (error) {
          console.error('Error fetching data:', error)
        } finally {
          timeoutId = undefined
        }
      }, 2000)

    return () => {
      clearTimeout(timeoutId)
    }}
  }, [value])

  return (
    <main className={styles.main}>
      <div>
        <h1>Vapour.gg</h1>
        <h3>Unleash your Steam library.</h3>
      </div>
      <Pane
        className={styles.box}
      >
        <TextField
          id="username"
          value={value}
          onChange={handleInputChange}
        />
        <Button
          variant='secondary'
          stretch
          onClick={() => {
            console.log('test')
          }}
        >
          Test button
        </Button>
        {isFetching && 'fetching'}
      </Pane>
    </main>
  )
}
