import React, { Suspense, useEffect, useState } from 'react'
import { ListGroup, Table } from 'reactstrap'
import CustomAlert from './CustomAlert.jsx'
import ImageModal from './ImageModal.jsx'
import './index.scss'
import Loading from './Loading.jsx'

function InfiniteHome({ props, end }) {
    const [modals, setmodals] = useState({})
    const [Toggle, setToggle] = useState(false)

    const MovieList = React.lazy(() => import('./MovieList'))
    
    return (
        <div>
            <div className="flex-images justify-content-center">
                <Suspense fallback={<Loading/>}>
                    {props.movies != undefined ?
                        props.movies.map(x => {
                            return (<td><MovieList props={props} value={x} changeImgLink={(val) => (setmodals({ title: val.title, link: val.poster }), setToggle(!Toggle))} /></td>)
                        })
                        :
                        <CustomAlert message='Sorry, movies not found' color='danger' icon={<i class="fas fa-heart-broken"></i>} />
                    }
                </Suspense>
                
                <ImageModal toggle={Toggle} setToggle={setToggle} imgTitle={modals.title} imgLink={modals.link} />
            </div>
            {end ? <CustomAlert message='Page reaches end of result' color='success' icon={<i class="fas fa-flag-checkered"></i>} /> : null}
        </div>
    )
}

export default InfiniteHome
