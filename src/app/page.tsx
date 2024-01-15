'use client'

import { Button, Pane, TextField } from '@/components'
import styles from './page.module.scss'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { VapourPlayer, extractSteamId } from '@/utils/SteamMethods'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Home() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirError = searchParams.get('error')
  // window.history.replaceState(null, '', '/')

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
          hint={!!error ? error : isFetching && (
            <>
              <Spinner /> Checking names
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
          <Arrow />
        </Button>
      </Pane>
    </main>
  )
}

const Spinner = () => <motion.svg className={styles.Spinner} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.17764 0.505188C5.99679 0.505188 7.4715 1.9799 7.4715 3.79904C7.4715 5.61819 5.99679 7.0929 4.17764 7.0929C2.3585 7.0929 0.883789 5.61819 0.883789 3.79904" stroke="currentColor" strokeOpacity="0.8"/>
</motion.svg>

const Arrow = () => <svg className={styles.Arrow} width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.7" d="M4.69718 7.35689L4.05797 6.72479L6.27743 4.50533H0.702148V3.58203H6.27743L4.05797 1.36612L4.69718 0.730469L8.01039 4.04368L4.69718 7.35689Z" fill="currentColor"/>
</svg>
