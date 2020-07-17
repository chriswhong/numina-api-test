import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'react-bootstrap'
import { ResponsiveLine } from '@nivo/line'
import moment from 'moment'

const Chart = (props) => {
  const {
    firstDate,
    secondDate,
    firstDateData,
    secondDateData,
    modes,
    mode,
    isLoading
  } = props

  const modeDisplayName = modes.find((d) => d.id === mode).displayName
  const firstDateFormatted = moment(firstDate).format('MMM D YYYY')
  const secondDateFormatted = moment(secondDate).format('MMM D YYYY')

  const chartTitle = (
    <div className='chart-title'>
      <span className='mode'>{modeDisplayName}</span> by Hour - <span className='first-date'>{firstDateFormatted}</span> vs. <span className='second-date'>{secondDateFormatted}</span>
    </div>
  )

  return (
    <div className='col-12 col-md-9 chart'>
      { isLoading && (
        <div className='spinner-container d-flex align-items-center'>
          <Spinner animation='border' role='status'>
            <span className='sr-only'>Loading...</span>
          </Spinner>
        </div>
      )}
      {chartTitle}
      <div style={{ height: '100%', width: '100%' }}>
        { firstDateData.length && (
          <ResponsiveLine
            data={[
              {
                id: 'firstDate',
                data: firstDateData
              },
              {
                id: 'secondDate',
                data: secondDateData
              }
            ]}
            curve='natural'
            margin={{ top: 50, right: 15, bottom: 50, left: 60 }}
            xScale={{
              type: 'time',
              format: '%H:%M',
              useUTC: false
            }}
            xFormat='time:%H:%M'
            yScale={{
              type: 'linear',
              min: 'auto',
              max: 'auto',
              stacked: false,
              reverse: false
            }}
            axisTop={null}
            axisRight={null}
            axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: `${mode} count`,
              legendOffset: -50,
              legendPosition: 'middle'
            }}
            axisBottom={{
              format: '%-H',
              tickValues: 'every hour',
              // tickRotation: -90,
              legend: 'hour',
              legendOffset: 35,
              legendPosition: 'middle'
            }}
            useMesh={true}
            enableGridX={false}
            tooltip={(d) => {
              const { serieId, data } = d.point
              const count = data.y
              const displayHour = moment(data.x).format('ha')

              let displayDate = moment(firstDate).format('MMM DD')

              if (serieId === 'secondDate') {
                displayDate = moment(secondDate).format('MMM DD')
              }

              return (
                <div className='tooltip-outer'>
                  <div className='tooltip-flex'>
                    <span className='tooltip-color' style={{ background: d.point.color }}></span>
                    <span><strong>{displayDate}@{displayHour} - {count} {modeDisplayName}</strong></span>
                  </div>
                </div>
              )
            }}
            theme={{
              axis: {
                ticks: {
                  line: {
                    stroke: '#636363'
                  },
                  text: {
                    fill: '#fff'
                  }
                },
                legend: {
                  text: {
                    fill: '#fff'
                  }
                }
              },
              grid: {
                line: {
                  stroke: '#636363',
                  strokeWidth: 1
                }
              },
              crosshair: {
                line: {
                  stroke: '#fff'
                }
              }

            }}
          />
        )}
      </div>
    </div>
  )
}

Chart.propTypes = {
  firstDate: PropTypes.instanceOf(Date),
  secondDate: PropTypes.instanceOf(Date),
  firstDateData: PropTypes.object,
  secondDateData: PropTypes.object,
  modes: PropTypes.array,
  mode: PropTypes.string,
  isLoading: PropTypes.bool
}

export default Chart
