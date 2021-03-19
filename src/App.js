import React,{useState, useEffect} from 'react'
import axios from 'axios'
import Item from './item'
import moment from 'moment'


const App = () => {
    const [data, setData] = useState([]);
    const [pageToken, setPageToken] = useState(1);
    const [height, setheight] = useState(document.body.scrollHeight);
   
    const date = moment().subtract(30, 'days').format('YYYY-MM-DD');
  
    useEffect(() => {
        getRepos()
        
    },[pageToken])

    const getRepos = async() => {
        const response = await axios.get(`https://api.github.com/search/repositories?q=created:>${date}&sort=stars&order=desc&page=${pageToken}`)
        setData( [...data, ...response.data.items])
        console.log(response.data.items)
       
        setheight(document.body.scrollHeight)
    }
    window.onscroll = function (e) {
        if (window.scrollY + window.innerHeight >= height ) {
                let x=window.scrollX;
                let y=window.scrollY;
                window.onscroll=function(){window.scrollTo(x, y);};
            
            setPageToken(pageToken+1)
            window.onscroll=function(){};
            
        }
        
    }
    return (
        <div className="ui container">
        <div className="ui celled list" style={{marginTop:'15px'}}>
            {data && data.map(repo => (
                
                    <Item
                        key={repo.id}
                        avatar={repo.owner.avatar_url}
                        name={repo.name}
                        description={repo.description}
                        issues={repo.open_issues_count}
                        stars={repo.stargazers_count}
                        user={repo.owner.login}
                        date={repo.created_at}
                    />
               
            ))}
        </div>
        </div>
    )
}

export default App

