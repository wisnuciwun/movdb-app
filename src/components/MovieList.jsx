import React from 'react'
import { Button, ListGroupItem } from 'reactstrap'
import CustomButton from './CustomButton'
import Line from './Line'
import ErrorImage from '../public/assets/images/err_img.png'

function MovieList({value, changeImgLink, props}) {

    const changePage = () => {
        props.history.push('/detail', value.Title)
    }

    const title = value.Title.split('', 40).reduce((a, b) => a.length === 40 ? `${a}${b}...` : `${a}${b}` , '')

    return (
        <ListGroupItem className="custom-list-group-item">
            <p style={{height: '50px'}}><b>{ title }</b></p>
            <span>
            <img alt="" src={value.Poster != "N/A" ? value.Poster : ErrorImage} onClick={() => changeImgLink({poster: value.Poster, title: value.Title})} className="custom-poster mt-2" /><br/>
                <div className="mt-2 text-capitalize" style={{fontSize: '10pt', textAlign:'left'}}>
                    Year : {value.Year}<br/>
                    IMDB ID : {value.imdbID}<br/>
                    Type : {value.Type}<br/>
                </div>
            </span>
            <Line/>
            <CustomButton width='100%' color='dark' icon={<i class="fas fa-info-circle"></i>} title="Detail" onClick={() => changePage()} />
        </ListGroupItem>
    )
}

export default MovieList
