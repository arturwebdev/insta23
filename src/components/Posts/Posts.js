import React, { useEffect, useMemo } from 'react'
import IMAGES from '../../images'
import Post from '../Post/Post'
import { useDispatch, useSelector } from 'react-redux'
import { selectPosts } from '../../store/slices/posts/postsSlice'
import { fetchPosts } from '../../store/slices/posts/postsAPI'
import Spiner from '../Spiner/Spiner'
import { selectSearch } from '../../store/slices/search/searchSlice'

function Posts() {
    const dispatch = useDispatch()
    const {data: posts, isLoading} = useSelector(selectPosts)
    const search = useSelector(selectSearch)
    useEffect(() => {
        if (!posts.length) {
            dispatch(fetchPosts())
        }
    }, [])


    const filteredPosts = useMemo(() => {
        return [
            ...posts.filter(post => post.name.includes(search))
        ].sort((a, b) => a.name.indexOf(search) - b.name.indexOf(search))
    }, [search, posts])
    
  return (
    <>
        {
            isLoading ? <Spiner /> :
            filteredPosts.map(el => <Post key={el.id} comments={el.comments} id={el.id} img={el.img} name={el.name} likesCount={el.likesCount} postText={el.postText} timeAgo={el.timeAgo} />)
        }
    </>
  )
}

export default Posts