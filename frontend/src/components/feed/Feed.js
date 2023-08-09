import React, { useEffect, useState } from 'react';
import Post from '../post/Post'
import './Feed.css';

const Feed = ({ navigate }) => {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [challenge, setChallenge] = useState("");
  const [completeDate, setCompleteDate] = useState("");
  const [incentiveAmount, setIncentiveAmount] = useState("");
  const [chosenCharity, setChosenCharity] = useState("");

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch('/posts', {
      method: 'post',
    
    })
  }

  const handleChallengeChange = (event) => {
    setChallenge(event.target.value)
  }

  const handleCompleteDate = (event) => {
    setCompleteDate(event.target.value)
  }

  const handleIncentiveAmount = (event) => {
    setIncentiveAmount(event.target.value)
  }

  const handleChosenCharity = (event) => {
    setChosenCharity(event.target.value)
  }
  
    if(token) {
      return(
        <>
          <h2 id='targets' >Targets</h2>
          <div id='feed' role="feed">
              {posts.map(
                (post) => ( <Post post={ post } key={ post._id } /> )
              )}
          </div>
          <div>
            <form onSubmit= {handleSubmit} id='form' >
              <input placeholder="Create challenge" id="challenge-type" type='text' value={challenge} onChange={handleChallengeChange}/>
              <input placeholder="Complete by" id="complete-date" type='text' value={completeDate} onChange={handleCompleteDate}/> 
              <span>  Or I'll donate  </span>
              <input placeholder="£" id="incentive-amount" type='text' value ={incentiveAmount} onChange={handleIncentiveAmount}/>
              <span>  To  </span>
              <input placeholder="To Charity" id="chose-charity" type='text' value={chosenCharity} onChange={handleChosenCharity}/>
            <input id='submit' type="submit" value="Submit" />
          </form> 
        </div>
            <button class="logout-button" onClick={logout}>
              Logout
            </button>
        </>
      )
    } else {
      navigate('/signin')
    }
}

export default Feed;