'use client'

import { Button, Pane, TextField } from '@/components'
import styles from './page.module.scss'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { VapourPlayer } from '@/utils/SteamMethods'

export default function Home() {
  const [value, setValue] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [vapourUser, setVapourUser] = useState<VapourPlayer | null>(null)

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
          const response = await fetch('/api/players?id=' + value)
          const data = await response.json()
          setVapourUser(data)
        } catch (error) {
          console.error('Error fetching data:', error)
          setVapourUser(null)
        } finally {
          setIsFetching(false)
          timeoutId = undefined
        }
      }, 1000)

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
        {vapourUser ? vapourUser.username : 'no user'}
      </Pane>
    </main>
  )
}
