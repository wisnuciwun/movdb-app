import React from 'react'
import Line from './Line'
import TextDecoration from './TextDecoration'
import ErrorImage from '../public/assets/images/err_img.png'

function MovieDescription({movieDetail, showDetails}) {
    return (
        <div className="fadeIn-screen">
            <h3><TextDecoration />{movieDetail.Title}</h3><br />
            <div className="d-flex justify-content-start">
                <img src={movieDetail.Poster != 'N/A' ? movieDetail.Poster : ErrorImage} className="detailpage-image margin-right" />
                <div style={{marginLeft: '50px'}}>
                    <table>
                        <b><TextDecoration />Descriptions :</b><br />
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            {showDetails}
                        </tr>
                    </table>
                    <Line />
                    <p>
                        <b><TextDecoration />Ratings :</b><br />
                        {
                            movieDetail ?
                                movieDetail.Ratings.map(x => {
                                    return (<span style={{ fontSize: '10pt' }}>{`${x.Source} (Ratings: ${x.Value})`}<br /></span>)
                                })
                                :
                                null
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MovieDescription
