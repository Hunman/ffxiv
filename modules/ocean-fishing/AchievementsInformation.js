import React from 'react'
import PropTypes from 'prop-types'
import { DEST_MAP, TIME_MAP, ACHIEVEMENTS_MAP } from './maps'
import BAIT_GROUPS from './bait-groups'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Highlight from '../../src/Highlight.js'
import RouteCardContainer from './RouteCardContainer'
import RouteCard from './RouteCard'
import BaitList from './BaitList'
import OceanFishIcon from './OceanFishIcon'
import Tug from './Tug'
import jellyfishMacro from './macros/jellyfish.ffmacro'
import seadragonsMacro from './macros/seadragons.ffmacro'
import octopodesMacro from './macros/octopodes.ffmacro'

const useStyles = makeStyles((theme) => ({
  achievementInfo: {
    marginBottom: theme.spacing(2)
  },
  achievementIcon: {
    marginTop: '0',
    marginBottom: '0',
    fontSize: '0.65em',
    verticalAlign: 'sub'
  }
}))

export default function AchievementsInformation (props) {
  const { selectedRoute } = props
  const achievement = selectedRoute && ACHIEVEMENTS_MAP[selectedRoute]
  if (!achievement) {
    return null
  }
  const classes = useStyles()

  switch (achievement) {
    case 'What Did Jellyfish Do to You?':
      return (
        <section>
          <Typography variant='h5' gutterBottom>
            Jellyfish Route <OceanFishIcon name={achievement} className={classes.achievementIcon} />
          </Typography>
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP.G} {TIME_MAP.D}</Typography>}
                disableTypography
              />
              <CardContent>
                <Typography paragraph variant='body2'>
                  No jellyfish here.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP.S} {TIME_MAP.S}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'DH <5s',
                    baitGroup: BAIT_GROUPS['La Noscean Jelly']
                  }, {
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Sea Nettle']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph variant='body2'>
                  Blind DH all <Tug.Light /> before 5s, and recast after 5s. IC is not necessary.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph variant='body2'>
                  While spectral is not recommended, it won’t kill your run.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP.R} {TIME_MAP.N}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Floating Saucer']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph variant='body2'>
                  Nothing to say about this.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
          <Typography paragraph>
            Sample jellyfish macro
          </Typography>
          <Highlight language='plaintext'>
            {jellyfishMacro}
          </Highlight>
        </section>
      )
    case 'What Did Seadragons Do to You?':
      return (
        <section>
          <Typography variant='h5' gutterBottom>
            Seadragons Route <OceanFishIcon name={achievement} className={classes.achievementIcon} />
          </Typography>
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP.S} {TIME_MAP.N}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH at 10-18s',
                    baitGroup: BAIT_GROUPS['Shaggy Seadragon']
                  }, {
                    header: 'No buffs',
                    baitGroup: BAIT_GROUPS['Aetheric Seadragon']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph variant='body2'>
                  There’s possibly a blind DH at 14-17s.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph variant='body2'>
                  Spectral is bad. Sit on IC if you have it going into spectral, instead of catching Aetheric Seadragons.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP.G} {TIME_MAP.D}</Typography>}
                disableTypography
              />
              <CardContent>
                <Typography paragraph variant='body2'>
                  No seadragons here.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP.N} {TIME_MAP.S}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Coral Seadragon']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph variant='body2'>
                  Nothing to say about this.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
          <Typography paragraph>
            Sample seadragons macro
          </Typography>
          <Highlight language='plaintext'>
            {seadragonsMacro}
          </Highlight>
        </section>
      )
    case 'What Did Sharks Do to You?':
      return (
        <section>
          <Typography variant='h5' gutterBottom>
            Sharks Route <OceanFishIcon name={achievement} className={classes.achievementIcon} />
          </Typography>
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP.G} {TIME_MAP.S}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC; DH–IC–DH post-spectral',
                    baitGroup: BAIT_GROUPS['Tarnished Shark']
                  }, {
                    header: 'IC–DH',
                    baitGroup: BAIT_GROUPS['Ghost Shark']
                  }, {
                    header: 'No buffs',
                    baitGroup: BAIT_GROUPS['Quicksilver Blade']
                  }, {
                    header: 'DH–IC–DH',
                    baitGroup: BAIT_GROUPS['Funnel Shark']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Pre-spectral</Typography>
                <Typography paragraph variant='body2'>
                  Save GP when possible; IC if capped.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph variant='body2'>
                  Hook any <Tug.Medium /> and <Tug.Heavy />. IC–DH if you catch a Ghost Shark; <Tug.Heavy /> is a blind DH–IC–DH.
                </Typography>
                <Typography variant='overline'>Post-spectral</Typography>
                <Typography paragraph variant='body2'>
                  Spend all remaining GP with blind DH–IC–DH Tarnished Sharks.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP.S} {TIME_MAP.N}</Typography>}
                disableTypography
              />
              <CardContent>
                <Typography paragraph variant='body2'>
                  No sharks here.
                </Typography>
                <Typography paragraph variant='body2'>
                  Try for Coral Manta?<br />(but save GP)
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP.R} {TIME_MAP.D}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH; DH–IC–DH post-spectral',
                    baitGroup: BAIT_GROUPS['Chrome Hammerhead']
                  }, {
                    header: 'No buffs',
                    baitGroup: BAIT_GROUPS.Sweeper
                  }, {
                    header: 'DH–IC–DH',
                    baitGroup: BAIT_GROUPS.Executioner
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Pre-spectral</Typography>
                <Typography paragraph variant='body2'>
                  Can’t blind DH Chrome Hammerheads.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph variant='body2'>
                  Hook <Tug.Medium /> and <Tug.Heavy />. If you catch a Sweeper, can use IC if high on GP. <Tug.Heavy /> is a blind DH.
                </Typography>
                <Typography variant='overline'>Post-spectral</Typography>
                <Typography paragraph variant='body2'>
                  Can blind DH Chrome Hammerheads.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
        </section>
      )
    case 'What Did Octopodes Do to You?':
      return (
        <section>
          <Typography variant='h5' gutterBottom>
            Octopodes Route <OceanFishIcon name={achievement} className={classes.achievementIcon} />
          </Typography>
          <RouteCardContainer className={classes.achievementInfo}>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>1. {DEST_MAP.S} {TIME_MAP.D}</Typography>}
                disableTypography
              />
              <CardContent>
                <Typography paragraph variant='body2'>
                  No octopodes here.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>2. {DEST_MAP.G} {TIME_MAP.S}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'IC–DH at 16-28s',
                    baitGroup: BAIT_GROUPS['Cyan Octopus']
                  }, {
                    header: 'DH–IC–DH at <3s',
                    baitGroup: BAIT_GROUPS['Merman’s Mane']
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Non-spectral</Typography>
                <Typography paragraph variant='body2'>
                  Can blind DH the Cyan Octopodes at 25s, or at 19s with a SS’d Jasperhead.
                </Typography>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph variant='body2'>
                  Only the instant <Tug.Medium /> is Merman’s Mane; any later is not.
                </Typography>
              </CardContent>
            </RouteCard>
            <RouteCard>
              <CardHeader
                title={<Typography variant='h6'>3. {DEST_MAP.R} {TIME_MAP.D}</Typography>}
                disableTypography
              />
              <CardContent>
                <BaitList
                  baitGroups={[{
                    header: 'DH–IC–DH at 4s',
                    baitGroup: BAIT_GROUPS.Mopbeard
                  }]}
                />
              </CardContent>
              <CardContent>
                <Typography variant='overline'>Spectral</Typography>
                <Typography paragraph variant='body2'>
                  The earlier <Tug.Medium /> is Coccosteus.
                </Typography>
              </CardContent>
            </RouteCard>
          </RouteCardContainer>
          <Typography paragraph>
            Sample octopodes macro
          </Typography>
          <Highlight language='plaintext'>
            {octopodesMacro}
          </Highlight>
        </section>
      )
  }
}

AchievementsInformation.propTypes = {
  selectedRoute: PropTypes.oneOf(['ND', 'NS', 'NN', 'RD', 'RS', 'RN'])
}