import React from 'react'
import { Button } from 'reactstrap'

export default function CustomButton({onClick = {}, color = 'light', title, icon, width = '100px', fontSize = '10pt'}) {
    return (
        <div>
            <Button style={{fontSize: fontSize, width: width}} onClick={onClick} color={color}>{icon}&nbsp;&nbsp;{title}</Button>
        </div>
    )
}
