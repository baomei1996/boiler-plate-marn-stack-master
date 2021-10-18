import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

function Favorite(props) {
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime

  const [FavoriteNumber, setFavoriteNumber] = useState(0)
  const [Favorited, setFavorited] = useState(false)

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime
  }
  useEffect(() => {
   Axios.post(`/api/favorite/favoriteNumber`, variables)
          .then(res => {
            if(res.data.success) {
              setFavoriteNumber(res.data.favoriteNumber)
            } else {
              alert('숫자 정보를 가져오는데 실패했습니다. ')
            }
          })
   Axios.post(`/api/favorite/favorited`, variables)
          .then(res => {
            if(res.data.success) {
              setFavorited(res.data.favorited)
            } else {
              alert('정보를 가져오는데 실패했습니다. ')
            }
          })
  }, [])


  const onClickFavorite = () => {
    if(Favorited) {
      Axios.post('/api/favorite/removeFromFavorite', variables)
           .then(res => {
             console.log(res.data);
             if(res.data.success) {
               setFavoriteNumber(FavoriteNumber - 1)
               setFavorited(!Favorited)

             } else {
               alert('Favorite 리스트에서 삭제를 실패했습니다. ')
             }
           })

    } else {
      Axios.post('/api/favorite/addToFavorite', variables)
         .then(res => {
            if(res.data.success) {
              setFavoriteNumber(FavoriteNumber + 1)
              setFavorited(!Favorited)

           } else {
             alert('Favorite 리스트에서 추가를 실패했습니다. ')
           }
         })
    }
  }
  return (
    <div>
      <Button onClick={onClickFavorite}>{Favorited ? "Not Favorite" : "Add to Favorite"} { FavoriteNumber }</Button>
    </div>
  )
}

export default Favorite
