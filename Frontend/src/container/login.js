import React, { useState } from 'react'

import Login from '../components/login/login'

export const LoginContainer = () => {
    const [formData, setformData] = useState({})
    const [errors, setErrors] = useState({})

    const onChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault()
            .then((res) => {
                console.log('res')
            }).catch(error => {
                const errors = error.response.data
                const errorLst = {}
                errors.map(item => errorLst[item.path[0]] = item.message)
                setErrors(errorLst)
            })
    }
    return (
        <>
            <Login onChange={onChange} handleSubmit={handleSubmit} errors={errors} />
        </>
    )
}