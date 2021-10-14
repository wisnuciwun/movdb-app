import React from 'react'
import Swal from 'sweetalert2'

export function SuccessAlert(msg = 'Request succesfully proceed', confirmButton = false) {
    Swal.fire({
        titleText: "Success",
        icon: "success",
        text: msg,
        showConfirmButton: confirmButton,
        timer: 2000
    })
}

export function ErrorAlert(msg = 'Failed to process request') {
    Swal.fire({
        titleText: "Something wrong",
        text: msg,
        icon: "error",
        showConfirmButton: true
    })
}

export function WarningAlert(msg = '') {
    Swal.fire({
        titleText: "Oops..",
        text: msg,
        icon: "error",
        showConfirmButton: true
    })
}