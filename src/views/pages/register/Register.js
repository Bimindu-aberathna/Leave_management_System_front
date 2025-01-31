import React, { use, useEffect } from 'react'
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
import { cibAuth0, cibBuysellads, cilCalendar, cilLockLocked, cilUser } from '@coreui/icons'
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
  const [managerEmail, setManagerEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [managers, setManagers] = React.useState([])
  const [selectedManager, setSelectedManager] = React.useState('')
  const [joiningDate, setJoiningDate] = React.useState('')

  useEffect(() => {
    getManagers();
    const todate = new Date()
    const dd = String(todate.getDate()).padStart(2, '0')
    const mm = String(todate.getMonth() + 1).padStart(2, '0')
    const yyyy = todate.getFullYear()

    setJoiningDate(`${yyyy}-${mm}-${dd}`)
  },[])

  const getManagers = async () => {
    try {
      await axios.get('/managers').then((response) => {
        setManagers(response.data.manager_details)
        console.log(response.data)
      })
    } catch (error) {
      toast.error('Failed to fetch managers')
      console.error(error)
    }
  }

  const handleManagerChange = (e) => {
    // Convert the string value to boolean
    setIsManager(e.target.value === 'true')
  }

  const handleManagerSelect = (e) => {
    setSelectedManager(e.target.value)
  }

  const handleRegister = () => {
    if (!email || !password || !confirmPassword || !name || !joiningDate) {
      toast.error('Please fill in all fields')
      return
    }else if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }//check whethet email ends with aahaas.com
    else if (!email.endsWith('aahaas.com')) {
      toast.error('Please use an Aahaas email')
      return
    }else if (isManager && !selectedManager) {
      toast.error('Please select a manager')
      return
    }else if (isManager && selectedManager === email) {
      toast.error('You cannot be your own manager')
      return
    }else if (isManager && !managerEmail) {
      toast.error('Please enter your manager email')
      return
    }else {
      axios.post('/register', {
        name,
        email,
        password,
        isManager,
        managerEmail,
        selectedManager,
        joiningDate,
      }).then((response) => {
        console.log(response)
        Swal.fire({
          title: "Good job!",
          text: "Wait until your account is approved by the manager",
          icon: "success",
          confirmButtonColor: "#ed4242",
        });
      }).catch((error) => {
        console.error(error)
        toast.error('Failed to create account')
      });
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
                  {!isManager && (
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormSelect
                        onChange={handleManagerSelect}
                        value={selectedManager}
                        aria-label="Select manager"
                        options={[
                          { label: 'Select manager', value: '' },
                          ...(Array.isArray(managers) ? managers.map((manager) => ({
                            label: manager.name,
                            value: manager.id,
                          })) : []),
                        ]}
                      />
                    </CInputGroup>
                  )}

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
                  <Link to="/login" className="text-center mt-3" style={{ color: '#0066CC',textAlign: 'center',width: '100%',display: 'block' }}>
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
