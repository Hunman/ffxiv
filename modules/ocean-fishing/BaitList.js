import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import BaitGroup from './BaitGroup'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  baitGroups: {
    listStyleType: 'none',
    margin: '0',
    paddingLeft: '0',
    '& > li:not(:last-child)': {
      paddingBottom: theme.spacing(1)
    }
  }
}))

export default function BaitList (props) {
  const { baitGroups } = props
  const classes = useStyles()

  return (
    <ul className={classes.baitGroups}>
      {baitGroups.map(({ header, baitGroup }, index) =>
        <li key={index}>
          <Typography variant='body2'>{header}</Typography>
          {baitGroup}
        </li>
      )}
    </ul>
  )
}

BaitList.propTypes = {
  baitGroups: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.node.isRequired,
      baitGroup: PropTypes.shape(BaitGroup.propTypes).isRequired
    }).isRequired
  ).isRequired
}