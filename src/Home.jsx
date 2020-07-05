import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import routes from './routes'
import lulu from './lulu.svg'
import zf from './foundation.scss'
import styles from './Home.scss'

function createTitle (route) {
  return (
    <h3><Link to={routes[route].path}>{routes[route].title}</Link></h3>
  )
}

class Home extends Component {
  componentDidMount () {
    document.title = 'Lulu’s FFXIV Tools'
  }

  render () {
    return (
      <>
        <div className={cn(styles.splash, zf.gridX, zf.gridPaddingX)}>
          <div className={cn(zf.cell, zf.mediumShrink)}>
            <div className={styles.lulu}>
              <img src={lulu} />
            </div>
          </div>
          <div className={cn(styles.info, zf.cell, zf.auto)}>
            <div>
              <h1>Lulu Pillow</h1>
              <p>A bunch of FFXIV-related stuff I try making.</p>
              <p>Message Lulu Pillow@Adamantoise or Pillowfication#0538 with questions or comments.</p>
            </div>
          </div>
        </div>

        {createTitle('highOrLow')}

        {createTitle('miniCactpot')}

        {createTitle('oceanFishing')}
      </>
    )
  }
}

export default Home
