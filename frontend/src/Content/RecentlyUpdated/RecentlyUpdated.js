import React, {useState,useEffect} from 'react';
import { Card, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './RecentlyUpdated.css';

const RecentlyUpdated = () => {

  let perPage=18;
  const [pageValue, setPageValue] = useState(0);
  const [length, setLength] = useState(0);
  const [episodeType, setEpisodeType] = useState("all");

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
  var recentlyUpdatedLink = `https://www2.kickassanime.ro/api/recent_update?episodeType=${episodeType}&page=${pageValue}&perPage=${perPage}`;

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
      setLength(finalData.length);
    });

  }, [pageValue, episodeType]);

  const navigate = useNavigate();
  const handleEpisodeView = (anime) => {
    navigate(`/watch/${anime.slug}`);
  };

  const prev = () => {
    setPageValue(pageValue-1);
  };

  const next = () => {
    setPageValue(pageValue+1);
  };

  const videoType = (type) => {
    setEpisodeType(type);
    setPageValue(0);
  };

  return (
    <div className="recently-updated">

        <div style={{display:'flex', justifyContent:'space-between'}}>
          <h1>Recently Updated</h1>
          
          <div className="arrow" style={{marginRight: "7%"}}>
            { length===perPage?
              <>
                <span className="next" onClick={next}></span>
                <span className="nextFixed" onClick={next}></span>
              </>
              :""
            }
            { pageValue!==0?
              <>
                <span className="prevFixed" onClick={prev}></span>
                <span className="prev" onClick={prev}></span>
              </>
              :""
            }       
          </div>
        </div>

        <div className="multi-button">
          <button className="btn__text" onClick={()=>videoType("all")}><span>All</span></button>
          <button className="btn__text" onClick={()=>videoType("sub")}><span>Sub</span></button>
          <button className="btn__text" onClick={()=>videoType("dub")}><span>Dub</span></button>
        </div>

        <div className="recently-updated-list">
          <Row>
          {recentAnime.map((anime, idx) => (
            <Col xs={6} sm={4} md={3} lg={2} key={idx}>
              { anime.isSubbed?
                <span className="videoType" style={{zIndex:1, position:'absolute'}}>Sub</span>
                :""
              }
              { anime.isDubbed?
                <span className="videoType" style={{zIndex:1, position:'absolute'}}>Dub</span>
                :""
              }

              <Card onClick={()=>handleEpisodeView(anime)}>
                <Card.Img  variant="top" src={anime.poster.hq.name!=="anime-hq"?`https://www2.kickassanime.ro/images/poster/${anime.poster.sm.name}.${anime.poster.sm.formats[1]}`:""} />
                <Card.Title>{anime.title}</Card.Title>
                <Card.Body style={{padding:"0.5em 0"}}>                 
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
        <div style={{display:'flex', justifyContent:'center', padding:'20px 0 20px 0'}}>
          <div className="arrow">
            { length===perPage?
              <>
                <span className="next" onClick={next}></span>
                <span className="nextFixed" onClick={next}></span>
              </>
              :""
            }
            { pageValue!==0?
              <>
                <span className="prevFixed" onClick={prev}></span>
                <span className="prev" onClick={prev}></span>
              </>
              :""
            }       
          </div>
        </div>
    </div>
    
  );
};

export default RecentlyUpdated;