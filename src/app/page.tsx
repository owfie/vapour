'use client'

import { Button, Pane, TextField } from '@/components'
import styles from './page.module.scss'
import Spinner from '@/assets/icons/Spinner.svg'
import Arrow from '@/assets/icons/Arrow.svg'
import { useEffect, useState } from 'react'
import { VapourPlayer, extractSteamId } from '@/utils/SteamMethods'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirError = searchParams.get('error')
  router.replace('/')

  const [value, setValue] = useState('')
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(redirError ? 'Something went wrong. Try another user?' : '')
  const [vapourUser, setVapourUser] = useState<VapourPlayer | null>(null)

  const handleInputChange = (s: string) => {
    setValue(s)
  }

  useEffect(() => {
    if (!value && !!error) return

    let timeoutId: NodeJS.Timeout | undefined = undefined
    setIsFetching(false)
    setError('')
    setVapourUser(null)

    if (value !== '' && !timeoutId) {
      timeoutId = setTimeout(async () => {
        try {
          setIsFetching(true)
          const response = await fetch('/api/players?id=' + value)
          const data = await response.json()
          setVapourUser(data)
        } catch (error) {
          console.error(error)
          setError('No account associated with this username')
        } finally {
          setIsFetching(false)
          timeoutId = undefined
        }
      }, 1000)

    return () => {
      clearTimeout(timeoutId)
    }}
  }, [value, error])

  return (
    <main className={styles.main}>
      <div>
        <h1>Vapour.gg</h1>
        <h3><span className={styles.Prominent}>Unleash</span> your Steam library.</h3>
      </div>
      <Pane
        className={styles.box}
      >
        <TextField
          id="username"
          value={value}
          onChange={handleInputChange}
          hint={!!error ? error : isFetching && (
            <>
              <Spinner className={styles.Spinner}/> Checking names
            </>
          )}
        />
        <Button
          stretch
          disabled={!vapourUser}
          handleClick={() => {
            if (!vapourUser) return
            router.push(`/${extractSteamId(vapourUser.profileUrl)}`)
          }}
        >
          { vapourUser && <Image className={styles.btnIcon} width={32} height={32} src={vapourUser.avatarSmall} alt={`${vapourUser.username}'s profile picture`}/>}
          { vapourUser ? vapourUser.username : 'Search user' }
          <Arrow className={styles.Arrow}/>
        </Button>
      </Pane>
    </main>
  )
}
