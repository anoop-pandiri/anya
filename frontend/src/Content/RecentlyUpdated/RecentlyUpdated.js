import React, {useState,useEffect} from 'react';
import { Card, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RecentlyUpdated.css';

const RecentlyUpdated = () => {

  const [recentAnime, setRecentAnime] = useState([
    {"isSimulcast":false,
    "isSubbed":false,
    "isDubbed":false,
    "year":0,
    "slug":"",
    "episodeNumber":0,
    "title":"",
    "poster":{"sm":{"name":"anime-sm",
                    "formats":["jpeg","webp"],
                    "width":480,
                    "height":720
                    },
              "hq":{"name":"anime-hq",
                    "formats":["jpeg","webp"],
                    "width":1024,
                    "height":1536
                    }
            },
    "lastUpdate":"",
    "updatedString":""
    }
  ]);
  var recentlyUpdatedLink = 'https://www2.kickassanime.ro/api/recent_update?episodeType=all&page=0&perPage=18';

  useEffect(() => {
    
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(recentlyUpdatedLink)}&nocache=${Date.now()}`)
    .then(response => {
	   if (response.ok) {
      return response.json()
    }
	    throw new Error('Network response was not ok.')
    })
    .then(data => {
      var finalData = JSON.parse(data.contents);
      setRecentAnime(finalData);
    });

  }, []);

  const navigate = useNavigate();
  const handleEpisodeView = (anime) => {
    navigate(`/watch/${anime.slug}`);
  };


  return (
    <div className="recently-updated">

        <h1>Recently Updated</h1>

        <div className="recently-updated-list">
          <Row>
          
          {recentAnime.map((anime, idx) => (
            <Col xs={6} sm={4} md={3} lg={2} key={idx}>
              <Card onClick={()=>handleEpisodeView(anime)}>
                <Card.Img variant="top" src={anime.poster.hq.name!=="anime-hq"?`https://www2.kickassanime.ro/images/poster/${anime.poster.hq.name}.${anime.poster.hq.formats[1]}`:""} />
                <Card.Body style={{padding:"0.5em"}}>
                  <Card.Title>{anime.title}</Card.Title>
                  <Card.Text>
                  <span>
                    {anime.episodeNumber===0?"":"Episode " + anime.episodeNumber}
                  </span>
                  <span>
                    {anime.updatedString}
                  </span>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            ))
          }
          </Row>
        </div>
    </div>
  );
};

export default RecentlyUpdated;