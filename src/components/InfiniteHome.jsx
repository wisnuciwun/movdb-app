import React, { useState } from 'react'
import CustomAlert from './CustomAlert.jsx'
import ImageModal from './ImageModal.jsx'
import './index.scss'

import MovieList from './MovieList'
function InfiniteHome({ props, end }) {
    const [modals, setmodals] = useState({})
    const [Toggle, setToggle] = useState(false)

    return (
        <div>
            <div className="flex-images justify-content-center">
                    {props.movies != undefined ?
                        props.movies.map(x => {
                            return (<td><MovieList props={props} value={x} changeImgLink={(val) => (setmodals({ title: val.title, link: val.poster }), setToggle(!Toggle))} /></td>)
                        })
                        :
                        <CustomAlert message='Sorry, movies not found' color='danger' icon={<i class="fas fa-heart-broken"></i>} />
                    }                
                <ImageModal toggle={Toggle} setToggle={setToggle} imgTitle={modals.title} imgLink={modals.link} />
            </div>
            {end ? <CustomAlert message='Page reaches end of result' color='success' icon={<i class="fas fa-flag-checkered"></i>} /> : null}
        </div>
    )
}

export default InfiniteHome
