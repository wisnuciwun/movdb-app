import React from 'react'
import { Alert, UncontrolledAlert } from 'reactstrap'

export default function CustomAlert({message = '', icon= '', color = 'warning'}) {
    return (
        <Alert className="mt-3 text-center" style={{minWidth: '300px'}} color={color}>{icon}&nbsp;&nbsp;{message}</Alert>
    )
}