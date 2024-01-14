import { motion } from 'framer-motion'
import styles from './Pane.module.scss'
import { HTMLAttributes } from 'react'

interface IPane extends HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode
}

export const Pane: React.FC<IPane> = (props) => {
  const { children, className } = props
  return <motion.div className={`${styles.Pane} ${className ? className : ''}`}>{children}</motion.div>
}
