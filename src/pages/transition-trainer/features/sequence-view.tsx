import React, { useEffect } from 'react'
import { Button } from 'antd'

import styles from './sequence-view.module.css'

const SequenceView: React.FC = () => {
  const mockData = [
    'Toque Do Pai', 'Saia De Longue', 'Abrir', 'Sangra', 'Ho Pai', 'Do Makeup', 'Eskova', 'Canastra',
    'Bantu', 'Debe Que Debe', 'Fechar', 'Gruwa'
  ]

  const [currentIndex, setCurrentIndex] = React.useState(0)

  const getCurrentWindow = () => {
    const currentWindow = []
    for (let i = currentIndex - 1; i <= currentIndex + 1; i++) {
      if (i >= 0 && i < mockData.length) {
        currentWindow.push(mockData[i])
      }
    }
    return currentWindow
  }

  const currentWindow = getCurrentWindow()

  const handleNext = () => {
    if (currentIndex + 1 < mockData.length) setCurrentIndex(index => index + 1) 
    else setCurrentIndex(0)
  }
  
  const handlePrev = () => {
    if (currentIndex - 1 >= 0) setCurrentIndex(index => index - 1)
    else setCurrentIndex(mockData.length - 1)
  }

  const getMainIndex = () => {
    if (currentIndex === 0) return 0
    if (currentIndex === mockData.length - 1) return 2
    return 1
  }
  const mainIndex = getMainIndex()

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      }
    }
    document.addEventListener('keydown', handleKeyUp)
    return () => {
      document.removeEventListener('keydown', handleKeyUp)
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.sequenceContainer}>
        {currentWindow.map((item, index) => (
          <div className={`${styles.item} ${index === mainIndex ? styles.currentMove : styles.secondaryMove}`} key={index}>
            {item}
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <Button type='default' onClick={handlePrev}>Previous</Button>
        <Button type='default' onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
}

export default SequenceView
