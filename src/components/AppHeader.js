import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CButton,
  CBadge,
  CNav,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
import { logout } from '../store' // Import logout action
import headerLogo from '../assets/images/Aahaas_Primary_logo.png'
import './AppHeader.css'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [shake, setShake] = useState(false)

  //shake
  useEffect(() => {
    const interval = setInterval(() => {
      setShake(true)
      setTimeout(() => {
        setShake(false)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Get user info from Redux state
  const userName = useSelector((state) => state.app.userName)
  const role = useSelector((state) => state.app.role)
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const notificationCount = useSelector((state) => state.app.notificationCount)
  // console.log('notificationCount', role) ;

  const dispatch = useDispatch()

  useEffect(() => {
    document.addEventListener('scroll', () => {
      headerRef.current &&
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
    })
  }, [])
  const navigate = useNavigate()
  // Handle Logout
  function handleLogout() {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        {/* <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler> */}
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              <img src={headerLogo} alt="Aahaas" style={{ height: '50px' }} />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink>
              <p
                className="h-100 d-flex justify-content-center align-items-center mt-2"
                style={{ fontWeight: 'bold', fontSize: '22px' }}
              >
                {String(role.designation).toUpperCase()}
              </p>
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto">
          <CNavItem>
            {/* navigate to "/notifications" */}
            <CNav
              item
              className="d-md-down-none"
              as={NavLink}
              to="/notifications"
              style={{ position: 'relative', display: 'inline-block', marginRight: '1rem' }}
            >
              <CIcon
                icon={cilBell}
                size="xl"
                style={{ marginTop: '8px' }}
                className={shake ? 'shake' : ''}
              />
              <CBadge
                shape="pill"
                color="danger"
                className="ms-2"
                style={{ position: 'absolute', top: '-5px', right: '-8px' }}
              >
                {notificationCount}
              </CBadge>
            </CNav>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === 'light'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('light')}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'dark'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('dark')}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === 'auto'}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => setColorMode('auto')}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          {/* LOGOUT BUTTON */}
          {/* 
          {userName || role ? (
            <CButton onClick={handleLogout} color="danger" className="ms-3">
              Logout
            </CButton>
          ) : null} */}

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          {userName ? (
            <CNavItem>
              <p
                className="h-100 d-flex justify-content-center align-items-center"
                style={{ fontWeight: 'bold', marginLeft: '1rem', marginRight: '1rem' }}
                disabled
                href="#"
              >
                {userName.toUpperCase()}
              </p>
            </CNavItem>
          ) : null}
          {userName || role ? (
            <AppHeaderDropdown notificationCount={notificationCount} handleLogout={handleLogout} />
          ) : null}
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        {/* <AppBreadcrumb /> */}
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
