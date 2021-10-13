import React from 'react'
import { Button, ListGroupItem } from 'reactstrap'
import CustomButton from './CustomButton'

function MovieList({value, changeImgLink, props}) {

    const changePage = () => {
        props.history.push('/detail', value.Title)
    }

    const title = value.Title.split('', 40).reduce((a, b) => a.length === 40 ? `${a}${b}...` : `${a}${b}` , '')

    return (
        <ListGroupItem className="custom-list-group-item">
            <p style={{height: '60px'}}><b>{ title }</b></p>
            <span>
            <img alt="" src={value.Poster != "N/A" ? value.Poster : 'https://i.pinimg.com/originals/13/9a/19/139a190b930b8efdecfdd5445cae7754.png'} onClick={() => changeImgLink({poster: value.Poster, title: value.Title})} className="custom-poster" /><br/>
                <div style={{textAlign: 'left', fontSize: '10pt'}}>
                    Production year : {value.Year}<br/>
                    IMDB ID : {value.imdbID}<br/>
                    Type : {value.Type}<br/>
                </div>
            </span>
            <CustomButton width='100%' color='dark' icon={<i class="fas fa-info-circle"></i>} title="Detail" onClick={() => changePage()} />
        </ListGroupItem>
    )
}

export default MovieList
