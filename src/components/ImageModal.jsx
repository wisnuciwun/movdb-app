import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'
import ImageDownloader from '../helpers/ImageDownloader'
import CustomButton from './CustomButton'

function ImageModal({imgTitle, imgLink, toggle, setToggle}) {
    return (
        <Modal centered toggle={() => setToggle(!toggle)} isOpen={toggle}>
            <ModalHeader>
                {imgTitle}
            </ModalHeader>
            <ModalBody className="justify-content-center">
                <div className="modal-body">
                    <img className="custom-poster" style={{height: '400px', objectFit: 'contain'}} src={imgLink} />
                </div>
                <CustomButton title="Download" width='275px' color='dark' icon={<i class="fas fa-download"></i>} onClick={() => ImageDownloader({url: imgLink, filename: imgTitle})} />
            </ModalBody>
        </Modal>
    )
}

export default ImageModal
