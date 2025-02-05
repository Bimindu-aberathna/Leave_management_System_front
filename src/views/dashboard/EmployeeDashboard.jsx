import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import {
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
import { Apply_leave } from './Apply_leave'
import { toast } from 'react-toastify'
import axios from 'axios'

const EmployeeDashboard = () => {
  const [employeeLeaveData, setEmployeeLeaveData] = useState({
    remaining_leaves: 10,
    totalPrecent: 0,
    more_casual_leaves: 0,
    more_annual_leaves: 0,
    no_pay_count: 0,
    annual_leaves: 0,
    casual_leaves: 0,
  })

  useEffect(() => {
    fetchEmployeeLeaveData()
  }, [])

  const fetchEmployeeLeaveData = async () => {
    // Fetch employee leave data
    axios
      .get('/leave-details/user')
      .then((response) => {
        //console.log('+++++++++++++++++++++++++++++', response.data.data.leave_details)
        setEmployeeLeaveData(response.data.data.leave_details)
      })
      .catch((error) => {
        console.error(error)
        toast.error('Oops! Failed to fetch employee leave data')
      })
  }

  const progressExample = [
    {
      title: 'Total Paid Remaining',
      value: employeeLeaveData.remaining_leaves,
      percent:
        (employeeLeaveData.remaining_leaves /
          (employeeLeaveData.annual_leaves + employeeLeaveData.casual_leaves)) *
        100,
      color: 'success',
    },
    {
      title: 'Casual Remaining',
      value: employeeLeaveData.more_casual_leaves,
      percent: ((employeeLeaveData.more_casual_leaves / employeeLeaveData.casual_leaves) * 100),
      color: 'info',
    },
    {
      title: 'Annual Remaining',
      value: employeeLeaveData.more_annual_leaves,
      percent: ((employeeLeaveData.more_annual_leaves / employeeLeaveData.annual_leaves) * 100),
      color: 'warning',
    },
    {
      title: 'Unpaid Leaves',
      value: employeeLeaveData.no_pay_count,
      percent: 0,
      color: 'danger',
    },
  ]

  const tableExample = [
    {
      appliedOn: '2021-06-01',
      isHalfDay: false,
      startDate: '2021-06-01',
      endDate: '2021-06-01',
      status: 'Approved',
      approvedBy: 'Manager 1',
      type: 'Casual', // Added missing type
    },
    {
      appliedOn: '2021-06-01',
      isHalfDay: false,
      startDate: '2021-06-01',
      endDate: '2021-06-01',
      status: 'Approved',
      approvedBy: 'Manager 1',
      type: 'Annual',
    },
    {
      appliedOn: '2021-06-01',
      isHalfDay: false,
      startDate: '2021-06-01',
      endDate: '2021-06-01',
      status: 'Approved',
      approvedBy: 'Manager 1',
      type: 'Casual',
    },
    {
      appliedOn: '2021-06-01',
      isHalfDay: true,
      startDate: '2021-06-01',
      endDate: '2021-06-01',
      status: 'Approved',
      approvedBy: 'Manager 1',
      type: 'Annual',
    },
  ]

  // Format date function for consistency
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Leave Summary
              </h4>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CRow
            xs={{ cols: 1, gutter: 4 }}
            sm={{ cols: 2 }}
            lg={{ cols: 4 }}
            xl={{ cols: 5 }}
            className="mb-2 text-center d-flex justify-content-sm-between"
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
                  {item.value} {item.percent > 0 && `(${item.percent.toFixed(2)}%)`}
                </div>
                <CProgress thin className="mt-2" color={item.color} value={item.percent || 0} />
              </CCol>
            ))}
          </CRow>
        </CCardFooter>
      </CCard>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Leave History</CCardHeader>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead className="text-nowrap">
                <CTableRow>
                  <CTableHeaderCell className="bg-body-tertiary text-center">Type</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">From</CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Until
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Manager
                  </CTableHeaderCell>
                  <CTableHeaderCell className="bg-body-tertiary text-center">
                    Status
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {tableExample.map((item, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">
                      <div>
                        {item.type} - {item.isHalfDay ? 'Half Day' : 'Full Day'}
                      </div>
                      <div className="small text-body-secondary text-nowrap">
                        Applied: {formatDate(item.appliedOn)}
                      </div>
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {formatDate(item.startDate)}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {formatDate(item.endDate)}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">{item.approvedBy}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      <div
                        className={`text-${item.status.toLowerCase() === 'approved' ? 'success' : 'warning'}`}
                      >
                        {item.status}
                      </div>
                      <div className="small text-body-secondary text-nowrap">
                        Approved By: {item.approvedBy}
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCard>
        </CCol>
      </CRow>
      <Apply_leave />
    </>
  )
}

export default EmployeeDashboard
