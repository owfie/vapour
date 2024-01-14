import { AnimatePresence, motion } from "framer-motion"
import styles from './TextField.module.scss'
import { useState } from "react"

interface ITextField {
  id: string
  value?: string
  onChange?: (value: string) => void
  hint?: React.ReactNode
}

export const TextField: React.FC<ITextField> = (props) => {
  const { id, onChange, value, hint } = props

  const [isFocused, setIsFocused] = useState(false)

  return <motion.div
    className={styles.Input}
  >
    { (isFocused || !!value) && (
      <motion.label
        className={styles.mini}
        layoutId={id}
        htmlFor={id}
      >
      Steam ID or username
      </motion.label>
    )}
    <motion.input
      type="text"
      onChange={(e) => {
        onChange?.(e.target.value)
      }}
      value={value}
      id={id}
      onFocus={() => {
        setIsFocused(true)
      }}
      onBlur={() => {
        setIsFocused(false)
      }}
    />
    {
      (!isFocused && !value) && (
        <motion.label
          className={styles.full}
          layoutId={id}
          htmlFor={id}
        >
          Steam ID or username
        </motion.label>
      )
    }
    <AnimatePresence>
    {
      hint && (
        <motion.div
          className={styles.hint}
          initial={{
            opacity: 0,
            y: 5
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: -5
          }}
          transition={{
            duration: 0.4
          }}
        >
          {hint}
        </motion.div>
      )
    }
    </AnimatePresence>
  </motion.div>
}
