import React from 'react'
import Line from './Line'
import TextDecoration from './TextDecoration'

function MovieDescription({movieDetail, showDetails}) {
    return (
        <div>
            <h3><span style={{ color: 'red', fontWeight: 'bold' }}>| </span>{movieDetail.Title}</h3><br />
            <div className="d-flex justify-content-start">
                <img src={movieDetail.Poster} className="detailpage-image margin-right" />
                <div>
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
