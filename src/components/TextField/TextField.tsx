import { motion } from "framer-motion"
import styles from './TextField.module.scss'
import { useState } from "react"

interface ITextField {
  id: string
  value?: string
  onChange?: (value: string) => void
}

export const TextField: React.FC<ITextField> = (props) => {
  const { id, onChange, value } = props

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
  </motion.div>
}
