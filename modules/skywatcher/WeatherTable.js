import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import cn from 'classnames'
import PropTypes from 'prop-types'
import * as REGIONS from './regions'
import getEorzeanTime from './get-eorzean-time'
import calculateWeathers from './calculate-weathers'
import { paddedZero } from '../utils'
import Typography from '@material-ui/core/Typography'
import NoSsr from '@material-ui/core/NoSsr'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import WeatherIcon from './WeatherIcon'

const REGIONS_LIST = [
  REGIONS.LA_NOSCEA,
  REGIONS.THE_BLACK_SHROUD,
  REGIONS.THANALAN,
  REGIONS.ISHGARD_AND_SURROUNDING_AREAS,
  REGIONS.GYR_ABANIA,
  REGIONS.THE_FAR_EAST,
  REGIONS.NORVRANDT,
  REGIONS.EUREKA,
  REGIONS.OTHERS
]
const ZONES_LIST = REGIONS_LIST.map(region => region.zones).flat()
const WEATHER_THUNDERSTORM = 'Thunder' + String.fromCharCode(173) + 'storms'

const useStyles = makeStyles((theme) => ({
  selectRegion: {
    marginBottom: theme.spacing(2)
  },
  weatherTable: {
    marginBottom: theme.spacing(4)
  },
  weatherTime: {
    textAlign: 'center',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5)
  },
  weatherCell: {
    width: '100px',
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5),
    textAlign: 'center',
    verticalAlign: 'top'
  },
  current: {
    backgroundColor: theme.palette.action.hover,
    'th&': {
      fontWeight: 'bold'
    }
  }
}))

export default function WeatherTable (props) {
  const { now } = props
  const [filter, setFilter] = useState(null)
  const classes = useStyles()
  const router = useRouter()
  const firstRender = useRef(false)
  const theme = useTheme()
  const sm = useMediaQuery(theme.breakpoints.up('sm'))
  const md = useMediaQuery(theme.breakpoints.up('md'))
  const lg = useMediaQuery(theme.breakpoints.up('lg'))

  useEffect(() => {
    const queryFilter =
      REGIONS_LIST.find((region) => region.query === router.query.filter) ? router.query.filter : 'none'
    if ((!firstRender.current && now) || filter !== queryFilter) {
      firstRender.current = true
      setFilter(queryFilter)
    }
  })

  const handleSelectFilter = (event) => {
    const filter = event.target.value
    router.push({
      pathname: router.pathname,
      query: filter === 'none' ? null : { filter }
    })
  }

  if (now) {
    const weathersCount = lg ? 8 : md ? 6 : sm ? 3 : 1
    const weathers = calculateWeathers(ZONES_LIST, weathersCount, now)
    const eorzeanTime = getEorzeanTime(now)
    const timeChunk = Math.floor(eorzeanTime.getUTCHours() / 8) * 8
    const filteredRegion = filter && filter !== 'none' &&
      REGIONS_LIST.find((region) => region.query === filter)

    return (
      <section>
        <FormControl variant='filled' fullWidth margin='dense' className={classes.selectRegion}>
          <InputLabel>Select a region</InputLabel>
          <Select onChange={handleSelectFilter} value={filter || 'none'}>
            <MenuItem value='none'>Show all regions</MenuItem>
            {REGIONS_LIST.map(region =>
              <MenuItem key={region.query} value={region.query}>{region.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <NoSsr>
          {(filteredRegion ? [filteredRegion] : REGIONS_LIST).map((region) =>
            <React.Fragment key={region.name}>
              <Typography variant='h5' gutterBottom>{region.name}</Typography>
              <Table size='small' className={classes.weatherTable}>
                <TableHead>
                  <TableRow>
                    <TableCell />
                    {Array(weathersCount + 1).fill().map((_, index) =>
                      <TableCell key={index} className={cn(classes.weatherTime, index === 1 && classes.current)}>
                        {paddedZero((24 + timeChunk + 8 * (index - 1)) % 24) + ':00'}
                      </TableCell>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {region.zones.map(zone =>
                    <TableRow key={zone} hover>
                      <TableCell component='th' scope='row'>{weathers[zone].zoneName}</TableCell>
                      {weathers[zone].zoneWeathers.map((weather, index) =>
                        <TableCell key={index} className={cn(classes.weatherCell, index === 1 && classes.current)}>
                          <WeatherIcon name={weather} />
                          <br />
                          <Typography variant='caption'>
                            {weather === 'Thunderstorms' ? WEATHER_THUNDERSTORM : weather}
                          </Typography>
                        </TableCell>
                      )}
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </React.Fragment>)}
        </NoSsr>
      </section>
    )
  } else {
    return (
      <section>
        <FormControl variant='filled' fullWidth>
          <InputLabel>Select a region</InputLabel>
          <Select onChange={handleSelectFilter} value={filter || 'none'}>
            <MenuItem value='none'>Show all regions</MenuItem>
            {REGIONS_LIST.map(region =>
              <MenuItem key={region.query} value={region.query}>{region.name}</MenuItem>
            )}
          </Select>
        </FormControl>
        <NoSsr />
      </section>
    )
  }
}

WeatherTable.propTypes = {
  now: PropTypes.object
}