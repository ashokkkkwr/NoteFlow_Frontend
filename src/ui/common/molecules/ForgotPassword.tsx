import React from 'react'
import Logo from './Logo'

export default function ForgotPassword() {
  return (
    <div>
        <div>
        <Logo />
        </div>
        <div>
            <p>
                Enter the email address associated with your account<br>
                and we will send you a verification OPT to your email.
                </br>
            </p>
        </div>
        <div>
            <p>Email</p>
        </div>
        <div>
            <input placeholder='Enter your email'>
            </input>
        </div>
        <div>
            <button>
                Continue
            </button>
        </div>
        


    </div>
  )
}
