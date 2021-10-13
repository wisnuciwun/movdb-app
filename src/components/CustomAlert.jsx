import React from 'react'
import { Alert, UncontrolledAlert } from 'reactstrap'

export default function CustomAlert({message = '', icon= '', color = 'warning'}) {
    return (
        <Alert color={color}>{icon}&nbsp;&nbsp;{message}</Alert>
    )
}