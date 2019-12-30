import classnames from 'classnames';
import React, { useEffect } from 'react';
import { observer, useLocalStore } from "mobx-react-lite";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const useStyles = makeStyles(theme => ({
  calendarDiv: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}));

export default observer(function Playground(props) {
  const store = useLocalStore(
    source => ({
    }),
    props
  )

  useEffect(() => {
  }, [])

  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <div className={classes.calendarDiv}>
        <FullCalendar 
          defaultView="dayGridMonth" 
          plugins={[ dayGridPlugin ]} 
          defaultView="dayGridMonth"
          events={[
            { title: 'event 1', date: '2019-12-01' },
            { title: 'event 2', date: '2019-12-02' }
          ]} 
        />
      </div>
    </Container>
  );
})
