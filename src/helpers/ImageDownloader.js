import axios from 'axios'
import React from 'react'

function ImageDownloader({url, filename = 'image'}) {
        axios({
            url: url,
            method: "GET",
            responseType: 'blob'
        }).then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `${filename}.jpg`)
            document.body.appendChild(link)
            link.click()
        })        
}

export default ImageDownloader
