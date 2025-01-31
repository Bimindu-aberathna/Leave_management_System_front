import React, { useEffect, useRef, useState } from 'react'
import {
  CButton,
  CFormSwitch,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import './Apply_leave.css'
import CIcon from '@coreui/icons-react'
import { cilSend } from '@coreui/icons'

export const Apply_leave = () => {
  const [visible, setVisible] = useState(false)
  const [cc, setcc] = useState(false)
  const [halfDate, setHalfDate] = useState(false)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [message, setMessage] = useState('')
  const [managerName, setManagerName] = useState('rtbuytuytut')
  const today = new Date().toISOString().split('T')[0]
  const textareaRef = useRef(null)

  // Move useEffect to component level
  useEffect(() => {
    const jiggleBtn = document.querySelector('.ALOpenBtn')

    const handleClick = () => {
      jiggleBtn.classList.add('jiggle')
      setTimeout(() => {
        jiggleBtn.classList.remove('jiggle')
      }, 500)
    }

    jiggleBtn?.addEventListener('click', handleClick)

    return () => {
      jiggleBtn?.removeEventListener('click', handleClick)
    }
  }, [])

  const toggleHalfDate = () => {
    setHalfDate(!halfDate)
    // Reset end date when switching to half day
    if (!halfDate) {
      setEndDate(startDate)
    }
  }

  const handleStartDate = (e) => {
    const newStartDate = e.target.value
    setStartDate(newStartDate)
    // Update end date if it's before new start date or if half day
    if (halfDate || endDate < newStartDate) {
      setEndDate(newStartDate)
    }
  }

  const handleEndDate = (e) => {
    const newEndDate = e.target.value
    // Only allow end dates after or equal to start date
    if (newEndDate >= startDate) {
      setEndDate(newEndDate)
    }
  }

  const handleInput = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Get form data
    const formData = {
      managerName,
      startDate,
      endDate,
      message,
      cc,
      halfDate,
    }

    // Log form data to the console
    console.log(formData)

    // Reset form fields
    setStartDate('')
    setEndDate('')
    setMessage('')
    setcc(false)
    setVisible(false)
    isHalfDate(false)
  }

  return (
    <div className="ALContainer">
      <CButton className="ALOpenBtn" color="primary" onClick={() => setVisible(!visible)}>
        Apply Leave
      </CButton>
      <CModal
        alignment="center"
        scrollable
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LeaveApplicationModal"
        size="xl"
      >
        <CModalHeader>
          <CModalTitle id="LeaveApplicationModal">Leave Application Form</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="employeeName" className="form-label">
                Manager Name
              </label>
              <input
                type="text"
                className="form-control"
                id="employeeName"
                placeholder="Enter your name"
                value={managerName}
                onChange={(e) => setManagerName(e.target.value)}
                disabled
              />
            </div>
            <div className="mb-3" id="halfDaySwitch">
              <CFormSwitch
                label="Apply for Half Day"
                id="formSwitchCheckDefault"
                checked={halfDate}
                onChange={toggleHalfDate}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="startDate" className="form-label">
                Start Date
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                required
                onChange={handleStartDate}
                min={today}
              />
            </div>
            {!halfDate && (
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={endDate}
                  required
                  onChange={handleEndDate}
                  min={startDate || today}
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message (Provide a legitimate reason)
              </label>
              <textarea
                ref={textareaRef}
                className="form-control"
                id="message"
                rows="1"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Add any additional information"
                onInput={handleInput}
                style={{
                  overflow: 'hidden',
                  resize: 'none',
                  transition: 'height 0.2s ease-out',
                }}
              />
            </div>
            <CModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <CFormSwitch
                  label="CC Higher Management"
                  id="formSwitchCheckDefault"
                  checked={cc}
                  onChange={() => setcc(!cc)}
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <CButton color="secondary" onClick={() => setVisible(false)}>
                  Close
                </CButton>
                <CButton type="submit" color="primary">
                  Submit <CIcon icon={cilSend} />
                </CButton>
              </div>
            </CModalFooter>
          </form>
        </CModalBody>
      </CModal>
    </div>
  )
}