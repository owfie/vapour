import { Variants, motion } from 'framer-motion'
import styles from './Pane.module.scss'
import { HTMLAttributes } from 'react'

interface IPane extends HTMLAttributes<HTMLDivElement>{
  children: React.ReactNode
  variants?: Variants
}

export const Pane: React.FC<IPane> = (props) => {
  const { children, className, variants } = props
  return <motion.div variants={variants} className={`${styles.Pane} ${className ? className : ''}`}>{children}</motion.div>
}
