import React from 'react'
import { Alert, UncontrolledAlert } from 'reactstrap'

export default function CustomAlert({message = '', icon= '', color = 'warning'}) {
    return (
        <Alert className="mt-3" color={color}>{icon}&nbsp;&nbsp;{message}</Alert>
    )
}