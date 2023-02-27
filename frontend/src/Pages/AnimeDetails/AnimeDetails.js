import './AnimeDetails.css';
import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function AnimeDetails() {

    let perPage=18;
    const [pageValue, setPageValue] = useState(1);
    const [length, setLength] = useState(0);
  
    const [allAnime, setAllAnime] = useState([
        {"cr_id":"",
        "episode_count":0,
        "poster":{"sm":{"name":"anime-sm","formats":["jpeg","webp"],"width":480,"height":720},
                    "hq":{"name":"anime-hq","formats":["jpeg","webp"],"width":1024,"height":1536}
                },
        "season_count":0,
        "series_launch_year":0,
        "title":"",
        "isSubbed":false,
        "isDubbed":false,
        "isSimulcast":false,
        "maturityRatings":[""],
        "slug":""}
    ]);

    var allAnimeLink = `https://www2.kickassanime.ro/api/anime?page=${pageValue}&perPage=${perPage}`;
  
    useEffect(() => {
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(allAnimeLink)}&nocache=${Date.now()}`)
      .then(response => {
         if (response.ok) {
        return response.json()
      }
          throw new Error('Network response was not ok.')
      })
      .then(data => {
        var finalData = JSON.parse(data.contents);
        setAllAnime(finalData);
        setLength(finalData.length);
      });
  
    }, [pageValue]);
  
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
  


return (
    <div className="anime-details">

        <div style={{display:'flex', justifyContent:'space-between'}}>
          <h1>All Anime</h1>
          
          <div className="arrow" style={{marginRight: "7%"}}>
            { length===perPage?
              <>
                <span className="next" onClick={next}></span>
                <span className="nextFixed" onClick={next}></span>
              </>
              :""
            }
            { pageValue!==1?
              <>
                <span className="prevFixed" onClick={prev}></span>
                <span className="prev" onClick={prev}></span>
              </>
              :""
            }       
          </div>
        </div>


        <div className="recently-updated-list">
          <Row>
          {allAnime.map((anime, idx) => (
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
                <Card.Img  variant="top" src={anime.poster.sm.name!=="anime-sm"?`https://www2.kickassanime.ro/images/poster/${anime.poster.sm.name}.${anime.poster.sm.formats[1]}`:""} />
                <Card.Title>{anime.title}</Card.Title>
                <Card.Body style={{padding:"0.5em 0"}}>                 
                  <Card.Text>
                    {/* <span>
                      {anime.episodeNumber===0?"":"Episode " + anime.episodeNumber}
                    </span> */}
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
            { pageValue!==1?
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

  export default AnimeDetails;