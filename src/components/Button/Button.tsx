import { HTMLAttributes } from "react"
import styles from './Button.module.scss'

interface IButton extends HTMLAttributes<HTMLButtonElement>{
  type?: 'primary' | 'secondary'
}

export const Button = (props) => {
  const {
    type = 'primary',
    children
  } = props

  return (
    <button className={styles.Button} {...props}>
      <ButtonEdge />
      <div className={styles.content}>
        {children}
      </div>
      <ButtonEdge />
    </button>
  )
}

const ButtonEdge = () => <svg viewBox="0 0 36 56" width="36" height="56"><path d="M25.7531 1.92595C27.203 0.683138 29.0497 0 30.9594 0L36 0V56H28H0V27.6795C0 25.3441 1.0205 23.1253 2.79367 21.6054L25.7531 1.92595Z" fill="currentColor"></path></svg>
