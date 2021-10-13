import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap'

function ImageModal({imgTitle, imgLink, toggle, setToggle}) {

    return (
        <Modal centered toggle={() => setToggle(!toggle)} isOpen={toggle}>
            <ModalHeader>
                {imgTitle}
            </ModalHeader>
            <ModalBody className="justify-content-center">
                <div style={{width: '100%', textAlign:'center'}}>
                    <img src={imgLink} />
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ImageModal
