import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
  CNav,
  CNavLink,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cibAuth0,
  cibBuysellads,
  cilCalendar,
  cilFingerprint,
  cilLockLocked,
  cilUser,
} from '@coreui/icons'
import icon from '../../../assets/images/Aahaas_Primary_logo.png'
import { toast } from 'react-toastify'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

const Register = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const [isManager, setIsManager] = React.useState(false)
  const [finger_printid, setFinger_printid] = React.useState('')
  const [name, setName] = React.useState('')
  const [selectedDepartment, setSelectedDepartment] = React.useState('')
  const [joiningDate, setJoiningDate] = React.useState('')
  const [departments, setDepartments] = useState([
    { id: 1, name: 'HR' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'IT' },
    { id: 4, name: 'Travel Experience' },
    { id: 5, name: 'Marketing' },
  ])

  useEffect(() => {
    const todate = new Date()
    const dd = String(todate.getDate()).padStart(2, '0')
    const mm = String(todate.getMonth() + 1).padStart(2, '0')
    const yyyy = todate.getFullYear()

    setJoiningDate(`${yyyy}-${mm}-${dd}`)
  }, [])

  const getManagers = async () => {
    try {
      await axios.get('/departments').then((response) => {
        setDepartments(response.data.departments)
        console.log(response.data)
      })
    } catch (error) {
      toast.error('Failed to fetch departments')
      console.error(error)
    }
  }

  const handleManagerChange = (e) => {
    // Convert the string value to boolean
    setIsManager(e.target.value === 'true')
  }

  const handleDepartmentSelect = (e) => {
    setSelectedDepartment(e.target.value)
  }

  const handleRegister = () => {
    if (!email || !password || !confirmPassword || !name || !joiningDate) {
      toast.error('Please fill in all fields')
      return
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    } //check whethet email ends with aahaas.com
    else if (!email.endsWith('aahaas.com')) {
      toast.error('Please use an Aahaas email')
      return
    } else if (!selectedDepartment) {
      toast.error('Please select a department')
      return
    } //check if the joining date is a valid date type
    else if (isNaN(Date.parse(joiningDate))) {
      toast.error('Please enter a valid joining date')
      return
    } else if (password.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    } else if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    } else {
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('isManager', isManager)
      formData.append('departmentId', selectedDepartment)
      formData.append('joinned_date', joiningDate)
      formData.append('role_id', 3)
      formData.append('finger_printid', finger_printid)

      axios
        .post('/register', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response)
          Swal.fire({
            title: 'Good job!',
            text: 'Wait until your account is approved by the manager',
            icon: 'success',
            confirmButtonColor: '#ed4242',
          })
        })
        .catch((error) => {
          console.error(error)
          toast.error('Failed to create account')
        })
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <div id="logoContainer" style={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={icon} alt="logo" style={{ width: '300px' }} />
                  </div>

                  <p className="text-body-secondary text-center">
                    Leave management system for AAHAAS employees
                  </p>
                  <p className="" style={{ color: '#ffd00f' }}>
                    In order to access the leave management system, you need an Aahaas email
                  </p>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cibBuysellads} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      autoComplete="name"
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cibAuth0} />
                    </CInputGroupText>
                    <CFormSelect
                      onChange={handleManagerChange}
                      value={String(isManager)}
                      aria-label="Select role"
                      options={[
                        { label: 'I am not a manager', value: 'false' },
                        { label: 'I am a manager', value: 'true' },
                      ]}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormSelect
                      onChange={handleDepartmentSelect}
                      value={selectedDepartment}
                      aria-label="Select department"
                      options={[
                        { label: 'Select department', value: '' },
                        ...departments.map((department) => ({
                          label: department.name,
                          value: department.id,
                        })),
                      ]}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilFingerprint} />
                    </CInputGroupText>
                    <CFormInput
                      onChange={(e) => setFinger_printid(e.target.value)}
                      placeholder="Finger print id"
                      autoComplete="Finger print id"
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilCalendar} />
                    </CInputGroupText>
                    <CFormInput
                      type="date"
                      placeholder="Joining date"
                      autoComplete="new-password"
                      value={joiningDate}
                      onChange={(e) => setJoiningDate(e.target.value)}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" onClick={() => handleRegister()}>
                      Create Account
                    </CButton>
                  </div>
                  <Link
                    to="/login"
                    className="text-center mt-3"
                    style={{
                      color: '#0066CC',
                      textAlign: 'center',
                      width: '100%',
                      display: 'block',
                    }}
                  >
                    Already have an account? Login
                  </Link>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
