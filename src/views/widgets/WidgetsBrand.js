import React from 'react'
import PropTypes from 'prop-types'
import { CWidgetStatsD, CRow, CCol } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibFacebook,
  cibLinkedin,
  cibTripadvisor,
  cibTwitter,
  cilAirplaneMode,
  cilCalculator,
  cilCalendar,
  cilExcerpt,
  cilExposure,
  cilLaptop,
  cilTransfer,
  cilTruck,
  cilTv,
} from '@coreui/icons'
import { CChart } from '@coreui/react-chartjs'

const WidgetsBrand = (props) => {
  const chartOptions = {
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  }
  const colors = [
    '#ed4242',
    '#f4c613',
    '#4dbd74',
    '#20a8d8',
    '#6610f2',
    '#f86c6b',
    '#51cf66',
    '#0d6efd',
    '#6f42c1',
    '#fd7e14',
    '#20c997',
    '#343a40',
    '#adb5bd',
    '#ced4da',
    '#dee2e6',
    '#e9ecef',
    '#f8f9fa',
  ]
  return (
    <CRow className={props.className} xs={{ gutter: 4 }}>
      {props.data.map((item, index) => (
        <CCol sm={6} xl={4} xxl={3}>
          <CWidgetStatsD
            {...(props.withCharts && {
              chart: (
                <CChart
                  className="position-absolute w-100 h-100"
                  type="line"
                  data={{
                    labels: [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday',
                      'Sunday',
                    ],
                    datasets: [
                      {
                        backgroundColor: 'rgba(255,255,255,.1)',
                        borderColor: 'rgba(255,255,255,.55)',
                        pointHoverBackgroundColor: '#fff',
                        borderWidth: 2,
                        data: [6, 5, 8, 6, 3, 1, 0],
                        fill: true,
                      },
                    ],
                  }}
                  options={chartOptions}
                />
              ),
            })}
            icon={
              <div
                style={{
                  fontSize: '24px',
                  color: '#fff',
                  paddingBottom: '10px',
                  paddingTop: '10px',
                  borderRadius: '50%',
                }}
              >
                <h3>{item.department}</h3>
              </div>
            }
            values={[
              { title: 'On Leave', value: item.onLeave },
              { title: 'Half Day', value: item.halfDay },
            ]}
            style={{
              '--cui-card-cap-bg': colors[index],
            }}
          />
        </CCol>
      ))}
    </CRow>
  )
}

WidgetsBrand.propTypes = {
  className: PropTypes.string,
  withCharts: PropTypes.bool,
}

export default WidgetsBrand
