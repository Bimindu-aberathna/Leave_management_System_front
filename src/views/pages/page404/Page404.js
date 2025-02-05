//404Page
import React from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMagnifyingGlass } from '@coreui/icons'
import './Page404.css'
const Page404 = () => {
  return (
    <div>
      <section class="page_404">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 ">
              <div class="col-sm-10 col-sm-offset-1 w-100  text-center">
                <div class="four_zero_four_bg">
                  <h1
                    class="text-center "
                    style={{
                      position: 'absolute',
                      top: '5%',
                      fontSize: '80px',
                      color: '#ed4242',
                      fontWeight: '700',
                      textShadow: '2px 2px 4px #000',
                      display: 'flex',
                      flexDirection: 'row',
                    }}
                  >
                    404 Error!
                  </h1>
                  <br />
                </div>

                <div class="contant_box_404">
                 
                <h3 style={{ color: '#ed4242', fontWeight: '700', textShadow: '2px 2px 4px #000', position: 'absolute', bottom: '10%' }}>
                    <strong>Oops! Page not found</strong>
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page404
