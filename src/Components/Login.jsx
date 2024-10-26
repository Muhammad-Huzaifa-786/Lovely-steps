import React from 'react'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
function Login() {
    let navi = useNavigate()
    let [pass, setPass] = useState('')
    function password() {
        if (pass == 'LSLovelySteps') {
            localStorage.setItem('isAdmin', 'true')
            navi(`/customer`)
        }
        else {
            alert('Incorrect Password!\nPlease try again')

        }
    }
    return (
        <div>
            <input placeholder='Password' onChange={(e) => { setPass(e.target.value) }} type="text" />
            <button onClick={password}>Login</button>
        </div>
    )
}

export default Login
/*
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Password() {
    let navi = useNavigate()
    let [pass, setPass] = useState('')
    function password() {
        if (pass == 'abcd') {
            navi(`/home`)
        }
        else {
            alert('Password is incorrect!\nPlease try again')
        }
    }
    return (
        <div>
            <input onChange={(e) => { setPass(e.target.value) }} type="text" />
            <button onClick={password}>Go</button>
        </div>
    )
}

export default Password*/