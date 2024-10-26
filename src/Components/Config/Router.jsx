import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Details from '../Details'
import Home from '../Home'
import Notfound from '../Notfound'
import Password from '../Password'
import Login from '../Login'
import Customer from '../Customer'
import PrivateRoutes from '../PrivateRoutes'

function Router() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Password />} />
                    <Route path='/details' element={<Details />} />
                    <Route path='/customer' element={<Customer />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/:id' element={<Notfound />} />
                    <Route element={<PrivateRoutes/>}>
                        <Route path='/home' element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Router