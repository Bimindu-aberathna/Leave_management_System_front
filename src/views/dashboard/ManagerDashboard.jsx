import React, { useState } from 'react'
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
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import MainChart from './MainChart'
import axios from 'axios'

const leaveHistory = [
  {department: 'IT', history: [1,5,2,5,3,4,5,6,7,8,6,7,3,4,6,2,1,0,0,4,5,6,7,8,9,5,4,3,2,1]},
]

const ManagerDashboard = () => {
  const [progressGroupExample1, setProgressGroupExample1] = useState([
    { title: 'Monday', leave: 34, halfDay: 78 },
    { title: 'Tuesday', leave: 56, halfDay: 94 },
    { title: 'Wednesday', leave: 12, halfDay: 67 },
    { title: 'Thursday', leave: 43, halfDay: 91 },
    { title: 'Friday', leave: 22, halfDay: 73 },
    { title: 'Saturday', leave: 53, halfDay: 82 },
    { title: 'Sunday', leave: 9, halfDay: 69 },
  ])

  const [tableExample, setTableExample] = useState([
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
  ])

  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Leave Analytics
              </h4>
              <div className="small text-body-secondary"></div>
            </CCol>
            {/* <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end">
                <CIcon icon={cilCloudDownload} />
              </CButton>
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol> */}
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

      {/* <WidgetsBrand className="mb-4" withCharts /> */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>This week's analysis</CCardHeader>
            <CCardBody>
              <CRow style={{ padding: '0 1rem' }}>
                <CRow>
                  <CCol xs={6}>
                    <div className="border-start border-start-4 border-start-info py-1 px-3">
                      <div className="text-body-secondary text-truncate small">This Week</div>
                      <div className="fs-5 fw-semibold">On Leave</div>
                    </div>
                  </CCol>
                  <CCol xs={6}>
                    <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                      <div className="text-body-secondary text-truncate small">This Week</div>
                      <div className="fs-5 fw-semibold">Half Day</div>
                    </div>
                  </CCol>
                </CRow>
                <hr className="mt-0" />
                {progressGroupExample1.map((item, index) => (
                  <div className="progress-group mb-4" key={index}>
                    <div className="progress-group-header d-flex justify-content-between align-items-center mb-1">
                      <span className="text-body-secondary small">{item.title}</span>
                      <div>
                        <span className="text-info me-2">{item.leave}%</span>
                        <span className="me-3"></span>
                        <span className="text-danger">{item.halfDay}%</span>
                      </div>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress thin color="info" value={item.leave} className="mb-1" />
                      <CProgress thin color="danger" value={item.halfDay} />
                    </div>
                  </div>
                ))}
              </CRow>

              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead className="text-nowrap">
                  <CTableRow>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Name
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Type
                    </CTableHeaderCell>
                    <CTableHeaderCell className="bg-body-tertiary text-center">
                      Approved By
                    </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {tableExample.map((item, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell className="text-center">
                        <div>
                          {item.name}
                        </div>
                       
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {item.type}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {item.approvedBy}
                      </CTableDataCell>
                      
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

export default ManagerDashboard
