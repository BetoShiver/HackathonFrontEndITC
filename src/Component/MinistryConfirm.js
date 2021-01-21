import React from 'react'
import './MinistryConfirm.css';
import { useState } from "react";

export default function MinistryConfirm(props) {
    const [pass, setPass] = useState('')
    const handleChange =(e) => {
      setPass(e.target.value)
    }

    const confirmAccess = () => {
        if (pass == 123) {
            props.confirm()
        } else {
            props.deny();
        }
    }
    return (
        <div className='py-5'>
            <div className='box rounded my-4 p-4'>
                Please enter the access code:
                 <input onChange={handleChange} type='password' className='ml-2 rounded' />
                <button onClick={confirmAccess} className="ml-2 rounded button" >Enter</button>
            </div>
        </div>
    )
}
