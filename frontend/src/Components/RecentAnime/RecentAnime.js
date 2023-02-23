import React, {useState,useEffect} from 'react';
import { Card, Row, Col} from 'react-bootstrap';
import './RecentAnime.css';

const RecentAnime = () => {

  const [recentAnime, setRecentAnime] = useState([{}]);
  var link = 'https://www2.kickassanime.ro/api/recent_update?episodeType=all&page=0&perPage=18';

  useEffect(() => {
    
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(link)}`)
    .then(response => {
	   if (response.ok) return response.json()
	    throw new Error('Network response was not ok.')
    })
    .then(data => {
      var finalData = JSON.parse(data.contents);
      setRecentAnime(finalData);
     
    });
    
    console.log(recentAnime[0].poster.hq.name);
    

  }, []);

  return (
    <div className="recent-anime">

        <h1>Recently Updated</h1>

        <div className="recent-anime-list">
          <Row>
          
          {recentAnime.map((anime, idx) => (
            <Col sm={2} key={idx}>
              <Card>
                <Card.Img variant="top" src={`https://www2.kickassanime.ro/images/poster/${anime.poster.hq.name}.${anime.poster.hq.formats[1]}`} />
                <Card.Body style={{padding:"0.5em"}}>
                  <Card.Title>{anime.title}</Card.Title>
                  <Card.Text>
                  <div>
                    Episode {anime.episodeNumber}
                  </div>
                  <div>
                    {anime.updatedString}
                  </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            ))}
          </Row>
        </div>
    </div>
  );
};

export default RecentAnime;