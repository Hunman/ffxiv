import React, { useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import TableContainer from '@material-ui/core/TableContainer'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import OceanFishIcon from './OceanFishIcon'
import { fishingSpots } from './ocean-fishing/data'
import { calculateVoyages, DestinationStopTime } from './ocean-fishing'
import * as maps from './maps'
import { toTimeString } from '../utils'
import { getBlueFish, timeUntil, translate, upperFirst } from './utils'
import { useTranslation } from '../i18n'

const DATE_FORMAT: Intl.DateTimeFormatOptions = { month: '2-digit', day: '2-digit' }

const useStyles = makeStyles(theme => ({
  schedule: {
    '& td': {
      height: 53,
      paddingTop: theme.spacing(0.25),
      paddingBottom: theme.spacing(0.25),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      whiteSpace: 'nowrap'
    },
    '& td:first-child': {
      paddingLeft: theme.spacing(2)
    },
    '& td:last-child': {
      paddingRight: theme.spacing(2)
    },
    '& tbody tr:hover': {
      cursor: 'pointer'
    }
  },
  hoverRow: {
    backgroundColor: theme.palette.action.hover
  },
  timeUntil: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  timeCell: {
    '& svg': {
      top: 0,
      verticalAlign: 'middle'
    }
  },
  objectivesCell: {
    '& div': {
      verticalAlign: 'middle',
      fontSize: '1rem'
    }
  }
}))

type Props = {
  now: Date,
  numRows: number,
  filter?: DestinationStopTime[],
  onSelectRoute: (route: DestinationStopTime) => void
}

const UpcomingVoyagesTable = ({ now, numRows, filter, onSelectRoute }: Props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation('ocean-fishing')
  const [hover, setHover] = useState<DestinationStopTime | null>(null)
  const upcomingVoyages = calculateVoyages(now, Math.min(Math.max(numRows, 1), 50), filter)
  const locale = i18n.language

  return (
    <TableContainer component={Paper}>
      <Table size='small' className={classes.schedule}>
        <TableHead>
          <TableRow>
            <TableCell colSpan={3} align='center'>{t('routeInfo.time')}</TableCell>
            <TableCell colSpan={2} align='center'>{t('routeInfo.route')}</TableCell>
            <TableCell align='center'>{t('routeInfo.objectives')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody onMouseOut={setHover.bind(null, null)}>
          {(() => {
            let previousDate: string
            return upcomingVoyages.map(({ time, destinationCode }) => {
              const dateString = time.toLocaleDateString(locale, DATE_FORMAT)
              const timeString = toTimeString(time, { padded: true, locale })

              return (
                <TableRow
                  key={time.getTime()}
                  hover
                  className={clsx(!filter && hover === destinationCode && classes.hoverRow)}
                  onMouseOver={setHover.bind(null, destinationCode)}
                  onClick={onSelectRoute.bind(null, destinationCode)}
                >
                  <TableCell align='right'>
                    {previousDate !== (previousDate = dateString) && <Typography>{dateString}</Typography>}
                  </TableCell>
                  <TableCell>
                    <Typography>{timeString}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography className={classes.timeUntil}>{timeUntil(now, time, { t, locale: locale })}</Typography>
                  </TableCell>
                  <TableCell align='right'>
                    <Typography>{upperFirst(translate(locale, fishingSpots[maps.STOP_MAP[destinationCode[0]]], 'place_name_sub', 'no_article'))}</Typography>
                  </TableCell>
                  <TableCell className={classes.timeCell}>
                    {maps.TIME_MAP[destinationCode[1]]}
                  </TableCell>
                  <TableCell className={classes.objectivesCell}>
                    {maps.ACHIEVEMENTS_MAP[destinationCode].map((achievement: number) =>
                      <OceanFishIcon key={achievement} type='achievement' id={achievement} />
                    )}
                    {getBlueFish(destinationCode).map((fishId?: number) =>
                      fishId && <OceanFishIcon key={fishId} type='fish' id={fishId} />
                    )}
                  </TableCell>
                </TableRow>
              )
            })
          })()}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UpcomingVoyagesTable
