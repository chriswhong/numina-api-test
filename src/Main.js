import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWalking, faBicycle, faCar, faBus, faTruck, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import GLMap from './GLMap'
import Chart from './Chart'

import { fetchDateData } from './actions'

import 'react-datepicker/dist/react-datepicker.css'

// lookup array for the 5 modes available
const modes = [
  {
    id: 'pedestrian',
    displayName: 'pedestrians',
    icon: faWalking
  },
  {
    id: 'bicycle',
    displayName: 'bicycles',
    icon: faBicycle
  },
  {
    id: 'car',
    displayName: 'cars',
    icon: faCar
  },
  {
    id: 'bus',
    displayName: 'buses',
    icon: faBus
  },
  {
    id: 'truck',
    displayName: 'trucks',
    icon: faTruck
  }
]

// create an array of dates from start and end dates
// for use in providing `includeDates` to react-datepicker
const getDateRangeArray = ([start, end]) => {
  var datesArray = []
  const currentDate = new Date(start)

  while (currentDate <= new Date(end)) {
    datesArray.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return datesArray
}

const Main = ({ setToken }) => {
  // app state
  const [firstDate, setFirstDate] = useState(new Date('2019-01-09T00:00'))
  const [secondDate, setSecondDate] = useState(new Date('2019-01-10T00:00'))
  const [mode, setMode] = useState('pedestrian')
  const [firstDateData, setFirstDateData] = useState([])
  const [secondDateData, setSecondDateData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const triggerFetch = () => {
    const fetchData = async () => {
      // fetch analytics data for the two selected dates
      const [firstDateResponse, secondDateResponse] = await Promise.all([
        fetchDateData(firstDate, mode),
        fetchDateData(secondDate, mode)
      ])

      setFirstDateData(firstDateResponse)
      setSecondDateData(secondDateResponse)
      setIsLoading(false)
    }
    setIsLoading(true)
    fetchData()
  }

  // useEffect to fetch data on first load
  useEffect(triggerFetch, [])

  // useEffect to fetch data when dates or mode are changed
  useEffect(triggerFetch, [firstDate, secondDate, mode])

  const includeDates = getDateRangeArray(['2019-01-09T00:00', '2019-01-20T00:00'])

  // to logout, clear localstorage and call setToken() on the parent component
  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }

  return (
    <div className='Main'>
      <div className='logout' onClick={handleLogout}>
        Log Out <FontAwesomeIcon icon={faSignOutAlt} />
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-12 pt-5 pb-3 main-header'>
            <h1>Numina Daily Traffic Comparison</h1>
            <p>Choose any two dates to quickly compare the hour-by-hour difference in traffic spotted by this numina sensor.</p>
          </div>
        </div>
        <div className='border rounded sensor-information'>
          <div className='container'>
            <div className='row'>
              <div className='col-12 col-md-4 d-flex flex-column'>
                <div className='title'>Sensor Information</div>
                <div className='flex-grow-1 d-flex flex-column justify-content-center'>
                  <div className='key-value'>Location: <span className='value'>Fulton St & Hanover Pl mid-block</span></div>
                  <div className='key-value'>Neighborhood: <span className='value'>Downtown Brooklyn</span></div>
                  <div className='key-value'>City: <span className='value'>Brooklyn, NYC</span></div>
                  <div className='key-value'>Serial Number: <span className='value'>SANDBOX</span></div>
                </div>

              </div>
              <div className='col-12 col-md-4'>
                <div className='title'>Location</div>
                <GLMap />
              </div>

              <div className='col-12 col-md-4'>
                <div className='title'>Field of View</div>
                <img src='https://s3.amazonaws.com/numina-branding-assets/sample-data/default-images/SANDBOX.png' alt='numina sandbox camera view'/>
              </div>
            </div>
          </div>
        </div>
        <div className='row py-5'>
          <div className='col-12 text-center col-md-3' style={{ padding: '0 15px' }}>
            <div className='btn-group special btn-group-toggle mb-2' role='group' aria-label='First group'>
              {modes.map(({ id, displayName, icon }) => (
                <button key={id} type='button' title={displayName} onClick={() => { setMode(id) }} className={`btn btn-secondary ${mode === id && 'active'}`}>
                  <FontAwesomeIcon icon={icon} />
                </button>
              ))}
            </div>
            <DatePicker
              key='one'
              calendarClassName='first-date-picker'
              selected={firstDate}
              monthsShown={1}
              includeDates={includeDates}
              excludeDates={[secondDate]}
              inline
              onChange={(date) => { setFirstDate(date) }}
              openToDate={firstDate}
              disabledKeyboardNavigation
            />
            <DatePicker
              key='two'
              calendarClassName='second-date-picker'
              selected={secondDate}
              monthsShown={1}
              includeDates={includeDates}
              excludeDates={[firstDate]}
              inline
              onChange={(date) => { setSecondDate(date) }}
              openToDate={firstDate}
              disabledKeyboardNavigation
            />
          </div>
          <Chart
            firstDate={firstDate}
            secondDate={secondDate}
            firstDateData={firstDateData}
            secondDateData={secondDateData}
            modes={modes}
            mode={mode}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

Main.propTypes = {
  setToken: PropTypes.func
}

export default Main
