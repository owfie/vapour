'use client'

import { Button, Pane } from "@/components"
import { VapourPlayer, VapourSummary } from "@/utils/SteamMethods"
import { useRouter } from "next/navigation"
import Image from 'next/image'
import styles from './Profile.module.scss'
import { motion } from "framer-motion"
import Arrow from '@/assets/icons/Arrow.svg'

const containerVariants = {
  hidden: {
  },
  visible: {
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0
  }
}


export const Profile = ({ profile, games }: {
  profile: VapourPlayer,
  games: VapourSummary
}) => {
  const router = useRouter()
  return <>
    <nav>
      <Button handleClick={() => {
        router.push('/')
      }}>
        <Arrow style={{rotate: '180deg'}}/>
        Back
      </Button>
    </nav>
    <main className={styles.Profile}>
      <div className={styles.header}>
        <Image priority className={styles.avatar} width={128} height={128} alt={`${profile.username}'s avatar`} src={profile.avatar}/>
        <Heading>{profile.username}</Heading>
        <div className={styles.subheading}>
          <span className={styles.subtle}>vapour.gg/{profile.username}</span>
          <Button handleClick={() => {
            navigator.clipboard.writeText(`vapour.gg/${profile.username}`)
          }}>
            Copy link
          </Button>
        </div>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <Heading>{games.totalGames}</Heading>
          <b>Games owned</b>
        </div>
        <div className={styles.stat}>
          <Heading>{Math.floor(games.totalPlaytime / 60)}</Heading>
          <b>Total hours of playtime</b>
        </div>
      </div>
      <motion.div className={styles.content} variants={containerVariants} initial="hidden" animate="visible">
        {games.games?.slice(0, 10)
          .map((game, i) => {
            return <Pane variants={itemVariants} className={`${styles.game} ${game.id === games.favouriteGame ? styles.favourite : ''}`} key={`game-${i}`}>
            <Image priority className={styles.gameImage} width={64} height={64} alt={`${game.name}'s avatar`} src={game.icon}/>
            <div className={styles.gameInfo}>
              <b>{game.name}</b>
              <span className={styles.subtle}>{Math.floor(game.playtime / 60)} hours</span>
            </div>
          </Pane>
        })}
      </motion.div>
    </main>
  </>
}

export const Heading = ({ children }: { children: React.ReactNode }) => {
  return <b className={styles.Heading}>{children}</b>
}
