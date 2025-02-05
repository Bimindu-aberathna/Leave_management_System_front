//Forbidden Access Page 
import React, { useState } from 'react' 
import { useSpring, animated } from 'react-spring' // For animations 
import { useNavigate } from 'react-router-dom' // For navigation 
import './ForbiddenAccessPage.css' 
 
const ForbiddenAccessPage = () => { 
  const navigate = useNavigate() 
 
  // Floating animation for the icon 
  const iconAnimation = useSpring({ 
    from: { transform: 'translateY(0px)' }, 
    to: async (next) => { 
      while (1) { 
        await next({ transform: 'translateY(-20px)' }) 
        await next({ transform: 'translateY(0px)' }) 
      } 
    }, 
    config: { duration: 2000 }, 
  }) 
 
  // Fade-in animation for the text 
  const textAnimation = useSpring({ 
    from: { opacity: 0, transform: 'translateY(20px)' }, 
    to: { opacity: 1, transform: 'translateY(0)' }, 
    delay: 500, 
  }) 
 
  // Glowing button animation 
  const buttonAnimation = useSpring({ 
    from: { opacity: 0, transform: 'translateY(20px)' }, 
    to: { opacity: 1, transform: 'translateY(0)' }, 
    delay: 700, 
  }) 
 
 
 
  return ( 
    <> 
      <div class="cage403"></div> 
      <h1 className='h1403'> 
        <span className='span403'>403</span> 
      </h1> 
      <h2 className='h2403'> 
        <p>Forbidden Access</p> 
      </h2> 
    </> 
  ) 
} 
 
export default ForbiddenAccessPage