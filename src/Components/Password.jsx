import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Password() {
    let navi = useNavigate()
    let [pass, setPass] = useState('')
    function password() {
        if (pass == 'abcd') {
            navi(`/customer`)
        }
        else {
            alert('Password is incorrect!\nPlease try again')
        }
    }
    return (
        <div>
            <input placeholder='Password' onChange={(e) => { setPass(e.target.value) }} type="text" />
            <button onClick={password}>Go to Home Page</button>
        </div>
    )
}

export default Password