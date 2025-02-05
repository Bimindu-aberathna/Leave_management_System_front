import React from 'react'
import classNames from 'classnames'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
  cilTruck,
} from '@coreui/icons'

import WidgetsBrand from '../widgets/WidgetsBrand'
import MainChart from './MainChart'

const WidgetDataSample = [
  { department: 'Sales', onLeave: 2, halfDay: 1 },
  { department: 'User Experience', onLeave: 0, halfDay: 0 },
  { department: 'Accounting', onLeave: 1, halfDay: 0 },
  { department: 'Customer Support', onLeave: 0, halfDay: 0 },
  { department: 'IT', onLeave: 0, halfDay: 0 },
]

const leaveHistory = [
  {
    department: 'Sales',
    history: [
      1, 5, 2, 5, 3, 4, 5, 6, 7, 8, 6, 7, 3, 4, 6, 2, 1, 0, 0, 4, 5, 6, 7, 8, 9, 5, 4, 3, 2, 1,
    ],
  },
  {
    department: 'User Experience',
    history: [
      2, 5, 3, 4, 5, 6, 7, 8, 9, 5, 4, 3, 2, 1, 0, 0, 4, 5, 6, 7, 8, 9, 5, 4, 3, 2, 1, 0, 0, 4,
    ],
  },
  {
    department: 'Accounting',
    history: [
      3, 4, 5, 6, 7, 8, 9, 5, 4, 3, 2, 1, 0, 0, 4, 5, 6, 7, 8, 9, 5, 4, 3, 2, 1, 0, 0, 4, 5, 6, 7,
    ],
  },
  {
    department: 'Customer Support',
    history: [
      4, 5, 6, 7, 8, 9, 5, 4, 3, 2, 1, 0, 0, 4, 5, 6, 7, 8, 9, 5, 4, 3, 2, 1, 0, 0, 4, 5, 6, 7, 8,
    ],
  },
  {
    department: 'IT',
    history: [
      5, 6, 7, 8, 9, 5, 4, 3, 2, 1, 0, 0, 4, 5, 6, 7, 8, 9, 5, 4, 3, 2, 1, 0, 0, 4, 5, 6, 7, 8, 9,
    ],
  },
]

const CEODashboard = () => {
  const [selectedTab, setSelectedTab] = React.useState(0)
  const tableExample = [
    {
      department: 'Sales',
      leaveData: [
        {
          name: 'John Doe',
          type: 'Half Day',
          approvedBy: 'Jane Doe',
        },
        {
          name: 'Jane Doe',
          type: 'Full Day',
          approvedBy: 'John Doe',
        },
        {
          name: 'Alice',
          type: 'Half Day',
          approvedBy: 'Bob',
        },
        {
          name: 'Bob',
          type: 'Full Day',
          approvedBy: 'Alice',
        },
      ],
    },
    {
      department: 'User Experience',
      leaveData: [
        {
          name: 'Bob Doe',
          type: 'Half Day',
          approvedBy: 'Jane Doe',
        },
        {
          name: 'Bob Doe',
          type: 'Full Day',
          approvedBy: 'John Doe',
        },
        {
          name: 'Alice',
          type: 'Half Day',
          approvedBy: 'Bob',
        },
        {
          name: 'Bob',
          type: 'Full Day',
          approvedBy: 'Alice',
        },
      ],
    },
    {
      department: 'Accounting',
      leaveData: [
        {
          name: 'Peter Doe',
          type: 'Half Day',
          approvedBy: 'Jane Doe',
        },
        {
          name: 'Peter Doe',
          type: 'Full Day',
          approvedBy: 'John Doe',
        },
        {
          name: 'Alice',
          type: 'Half Day',
          approvedBy: 'Bob',
        },
        {
          name: 'Bob',
          type: 'Full Day',
          approvedBy: 'Alice',
        },
      ],
    },
    {
      department: 'IT',
      leaveData: [
        {
          name: 'John Doe',
          type: 'Half Day',
          approvedBy: 'Jane Doe',
        },
        {
          name: 'Jane Doe',
          type: 'Full Day',
          approvedBy: 'John Doe',
        },
        {
          name: 'Alice',
          type: 'Half Day',
          approvedBy: 'Bob',
        },
        {
          name: 'Bob',
          type: 'Full Day',
          approvedBy: 'Alice',
        },
      ],
    },
  ]

  return (
    <>
      {/* <CEOWidgetsDropdown className="mb-4" /> */}

      <WidgetsBrand data={WidgetDataSample} className="mb-4" withCharts />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Leave History
              </h4>
            </CCol>
            <CCol sm={7} className="d-none d-md-block"></CCol>
          </CRow>
          <MainChart exampleData={leaveHistory} />
        </CCardBody>
        {/* <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center"
          >
            {progressExample.map((item, index, items) => (
              <CCol
                className={classNames({
                  'd-none d-xl-block': index + 1 === items.length,
                })}
                key={index}
              >
                <div className="text-body-secondary">{item.title}</div>
                <div className="fw-semibold text-truncate">
                  {item.value} ({item.percent}%)
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter> */}
      </CCard>
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Today Absentees</CCardHeader>
            <CCardBody>
              <CRow>
                {/* <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">New Clients</div>
                        <div className="fs-5 fw-semibold">9,123</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">
                          Recurring Clients
                        </div>
                        <div className="fs-5 fw-semibold">22,643</div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                  {progressGroupExample1.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-prepend">
                        <span className="text-body-secondary small">{item.title}</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="info" value={item.value1} />
                        <CProgress thin color="danger" value={item.value2} />
                      </div>
                    </div>
                  ))}
                </CCol> */}
                {/* <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-warning py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Pageviews</div>
                        <div className="fs-5 fw-semibold">78,623</div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">Organic</div>
                        <div className="fs-5 fw-semibold">49,123</div>
                      </div>
                    </CCol>
                  </CRow>

                  <hr className="mt-0" />

                  {progressGroupExample2.map((item, index) => (
                    <div className="progress-group mb-4" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">{item.value}%</span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="warning" value={item.value} />
                      </div>
                    </div>
                  ))}

                  <div className="mb-5"></div>

                  {progressGroupExample3.map((item, index) => (
                    <div className="progress-group" key={index}>
                      <div className="progress-group-header">
                        <CIcon className="me-2" icon={item.icon} size="lg" />
                        <span>{item.title}</span>
                        <span className="ms-auto fw-semibold">
                          {item.value}{' '}
                          <span className="text-body-secondary small">({item.percent}%)</span>
                        </span>
                      </div>
                      <div className="progress-group-bars">
                        <CProgress thin color="success" value={item.percent} />
                      </div>
                    </div>
                  ))}
                </CCol> */}
              </CRow>

              <br />
              {tableExample.map((item, index) => (
                <div className="form-check" key={index} style={{display: 'inline-block', marginRight: '1rem',marginBottom: '1rem'}}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id={`flexRadioDefault${index}`}
                    onChange={() => setSelectedTab(index)} // Use onChange instead of onSelect
                    checked={selectedTab === index} // Ensure the correct radio button is checked
                  />
                  <label className="form-check-label" htmlFor={`flexRadioDefault${index}`}>
                    {item.department}
                  </label>
                </div>
              ))}

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      <CIcon icon={cilPeople} />
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Name</CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Is Manager
                    </CTableHeaderCell>
                    {/* <CTableHeaderCell className="bg-body-tertiary">Usage</CTableHeaderCell> */}
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Type
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary">Approved By</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample[selectedTab].leaveData.map((leave, idx) => (
                    <CTableRow key={idx}>
                      <CTableDataCell className="text-center">
                        <CAvatar size="md" status="success" /> {/* Add avatar or placeholder */}
                      </CTableDataCell>
                      <CTableDataCell>{leave.name}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {leave.type.includes('Manager') ? 'Yes' : 'No'}{' '}
                        {/* Example logic for "Is Manager" */}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">{leave.type}</CTableDataCell>
                      <CTableDataCell>{leave.approvedBy}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default CEODashboard
