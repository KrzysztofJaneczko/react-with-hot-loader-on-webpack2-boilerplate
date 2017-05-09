import React from 'react'
import styles from './Wrapper.css'

class Wrapper extends React.Component {
  render() {
    console.log('Oh hai')
    return (
      <div className={styles.someBox}>Hello world</div>
    )
  }
}

export default Wrapper
