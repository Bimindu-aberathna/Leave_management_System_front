import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../../store'
import { toast } from 'react-toastify'
import logo from '../../../assets/images/aahaas_roundLogo.png'
import './login.css'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  

  // Helper function to get dashboard route based on role ID
  const getDashboardRoute = (roleId) => {
    switch (roleId) {
      case 1:
        return '/dashboard/employee'  // Fixed typo
      case 2:
        return '/dashboard/manager'
      case 3:
        return '/dashboard/ceo'
      default:
        return '/dashboard/employee'
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post('/login', {
        email,
        password
      })
      console.log("********************************************************",response.data.user.role.id) 
      const { user } = response.data

      // Dispatch all auth data at once
      dispatch(setCredentials({
        userName: user.name,
        role: user.role,
        token: user.token
      }))

      // Navigate based on role ID
      const dashboardRoute = getDashboardRoute(user.role.id)
      navigate(dashboardRoute)

      toast.success(`Welcome back, ${user.name}!`)
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.'
      toast.error(errorMessage)
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <img 
        src={logo} 
        alt="logo" 
        className="position-absolute" 
        style={{
          width:"50%",
          opacity:"0.3", 
          left:"95%", 
          top:"90%", 
          transform:"translate(-50%, -50%)"
        }}
      />
      <CContainer>
        <CRow className="justify-content-center">
          <h2 className='title-login'>AAHAAS Leave Management System</h2>
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton 
                          id='loginBtn' 
                          className="px-4" 
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? 'Logging in...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white py-5"
                style={{ width: '44%', backgroundColor: '#ed4242' }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <div className="text-body-secondary d-flex flex-column justify-content-start align-items-start ms-5">
                      <p>Don't have an account?</p>
                      <p>Register as an AAHAAS employee!</p>
                    </div>

                    <Link to="/register">
                      <CButton id='regBtn' className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login