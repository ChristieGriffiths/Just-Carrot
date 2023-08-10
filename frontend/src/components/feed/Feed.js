import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import ChallengeCreateForm from '../ChallengeCreateForm/ChallengeCreateForm';
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));


  useEffect(() => {
    if(token) {
      fetch("/posts", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(async data => {
          window.localStorage.setItem("token", data.token)
          setToken(window.localStorage.getItem("token"))
          setPosts(data.posts);
        })
    }
  }, [])
    
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

    if(token) {
      return(
        <>
          <h2 id='targets' >Targets</h2>
          <ChallengeCreateForm token={token} setToken={setToken} />
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div>
            <button classform="logout-button" onClick={logout}>
              Logout
            </button>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;