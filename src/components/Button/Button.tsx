'use client'

import { HTMLAttributes } from "react"
import styles from './Button.module.scss'
import { motion } from "framer-motion"

interface IButton extends HTMLAttributes<HTMLButtonElement>{
  variant?: 'primary' | 'secondary'
  onClick: () => void
  stretch?: boolean
  disabled?: boolean
}

export const Button: React.FC<IButton> = (props) => {
  const {
    variant = 'primary',
    children,
    onClick,
    stretch = false,
    disabled = false
  } = props

  const buttonClasses = `
    ${styles.Button}
    ${styles[variant]}
    ${stretch ? styles.stretch : ''}
    ${disabled ? styles.disabled : ''}
  `

  return (
    <motion.button
      className={buttonClasses}
      disabled={disabled}
      onClick={!disabled ? onClick : undefined}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      <ButtonEdge />
      <div className={styles.content}>
        {children}
      </div>
      <ButtonEdge />
    </motion.button>
  )
}

const ButtonEdge = () => <svg viewBox="0 0 36 56" width="36" height="56"><path d="M25.7531 1.92595C27.203 0.683138 29.0497 0 30.9594 0L36 0V56H28H0V27.6795C0 25.3441 1.0205 23.1253 2.79367 21.6054L25.7531 1.92595Z" fill="currentColor"></path></svg>
