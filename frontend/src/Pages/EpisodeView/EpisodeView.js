import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EpisodeView.css';
import Form from 'react-bootstrap/Form';
import { Card, Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function EpisodeView({anime}) {

    let {slug}= useParams();

    let animeWatchLink = `https://www2.kickassanime.ro/api/watch/${slug}`;
   
    const [animeWatch, setAnimeWatch] = useState([
      {"anime_id":"",
      "name":"",
      "title":"",
      "description":"",
      "seasonId":"",
      "seasonNumber":0,
      "episodeNumber":0,
      "banner":{"sm":{"name":"anime-sm","formats":["jpeg","webp"],"width":853,"height":480},
                "hq":{"name":"anime-hq","formats":["jpeg","webp"],"width":1820,"height":1024}
              },
      "poster":{"sm":{"name":"anime-sm","formats":["jpeg","webp"],"width":480,"height":720},
                "hq":{"name":"anime-hq","formats":["jpeg","webp"],"width":1024,"height":1536}
              },
      "thumbnail":{"sm":{"name":"anime-sm","formats":["jpeg","webp"],"width":853,"height":480},
                    "hq":{"name":"anime-hq","formats":["jpeg","webp"],"width":1820,"height":1024}
                  },
      "lang":"",
      "genres":[""],
      "year":0,
      "maturityRatings":[""],
      "isDubbed":false,
      "isSubbed":false,
      "isMature":false,
      "duration":"00:00",
      "slug":"",
      "premiered":"",
      "episodeNavigation":{"prev":"","next":""},
      "servers":[""]
      }
      
    ]);


    const languageNames = new Intl.DisplayNames(['en'], {
      type: 'language'
    });

    const [seasons, setSeasons] = useState([{
      "id":"",
      "number":0,
      "title":"",
      "languages":["","",""]
    }]);

    const [seasonId, setSeasonId] = useState('');

    const [selectedSeason, setSelectedSeason] = useState([
      {"id":"",
      "number":0,
      "title":"",
      "languages":["","",""]
      }
    ]);

    const selectSeason = (value) => {
      setSeasonId(value);
      for(let season of seasons){
        if(season.id===value){
          setSelectedSeason(season);
        }
      }
    };


    const [languageId, setLanguageId] = useState('');
    const selectLanguage = (value) => {
      setLanguageId(value);
    };

    const [limit, setLimit] = useState(1);
    const [limitCount, setLimitCount] = useState(1);


    const [seasonEpisodes, setSeasonEpisodes] = useState([
      {"limit":1,
      "result":[
        {"episodeNumber":8,
        "slug":"by-the-grace-of-the-gods-2-ep8-ryoma-and-the-traveling-entertainer",
        "thumbnail": {"sm":{"name":"anime-sm",
                          "formats":["jpeg","webp"],
                          "width":853,
                          "height":480
                        },
                    "hq":{"name":"anime-hq",
                          "formats":["jpeg","webp"],
                          "width":1820,
                          "height":1024
                        }
                    }
        }
       ]
      }
    ]);


    let seasonEpisodesList = `https://www2.kickassanime.ro/api/episodes/${seasonId}?lh=${languageId}&page=${limitCount}}`;

    
    useEffect(() => {
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(animeWatchLink)}&nocache=${Date.now()}`)
      .then(response => {
       if (response.ok) {
        return response.json();
      }
        throw new Error('Network response was not ok.')
      })
      .then(data => {
        var finalData = JSON.parse(data.contents);
        setAnimeWatch(finalData);
        return finalData;
      })
      .then((finalData) => {
        let seasonsLink = `https://www2.kickassanime.ro/api/season/${finalData.anime_id}`;
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(seasonsLink)}&nocache=${Date.now()}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
            throw new Error('Network response was not ok.')
        })
        .then(data => {
            var seasonData = JSON.parse(data.contents);
            setSeasons(seasonData);
            return seasonData;
        })
        .then((seasonData) => {
          setSeasonId(finalData.seasonId);
          for(let season of seasonData){
            if(season.id===finalData.seasonId){
              setSelectedSeason(season);
            }
          }
        });
        setLanguageId(finalData.lang);
      });
    },[]);



    useEffect(() => {
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(seasonEpisodesList)}&nocache=${Date.now()}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
          throw new Error('Network response was not ok.')
      })
      .then(data => {
        var seasonEpisodesData = JSON.parse(data.contents);
        setSeasonEpisodes(seasonEpisodesData);
        setLimit(seasonEpisodesData.limit);
      });
    },[seasonId, languageId, limitCount]);


    function ambientMode() {
      var btn = document.getElementById("btnAmbient");
      var video = document.getElementById("player");
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
     
      canvas.style.width = video.clientWidth + "px";
      canvas.style.height = video.clientHeight + "px";
  
      if (btn.innerHTML==="Ambient Mode : OFF"){
        btn.innerHTML = "Ambient Mode : BLUE";
        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      else if (btn.innerHTML==="Ambient Mode : BLUE"){
        btn.innerHTML = "Ambient Mode : RED";
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      else{
        btn.innerHTML = "Ambient Mode : OFF";
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
        
    }
    
    const navigate = useNavigate();
    const handleSeasonEpisode = (slug) => {
      navigate(`/watch/${slug}`);
      window.location.reload(true);
    };

    const prevLimit = () => {
      setLimitCount(limitCount-1);
    };
  
    const nextLimit = () => {
      setLimitCount(limitCount+1);
    };
    
    return (
        <div id='container'>
          <div className='episode-container'>

            <div className='video-container'>
                {animeWatch.thumbnail && <img id='thumbnail' src={`https://www2.kickassanime.ro/images/thumbnail/${animeWatch.thumbnail.hq.name}.webp`} alt="" />}

                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>

                <canvas id="canvas">
                </canvas>
                <iframe id='player' title="episode" allowFullScreen src={animeWatch.name!==""?animeWatch.servers:""} >
                </iframe>
                
            </div>
            <div className='toolbar'style={{display:'flex', justifyContent:"space-around", marginTop:"2%"}}>

              { animeWatch.episodeNavigation &&       
                animeWatch.episodeNavigation.next!==undefined ? <button class="button-75" onClick={()=>handleSeasonEpisode(animeWatch.episodeNavigation.next)}><span class="text">Next</span></button>:
                ""
              } 
              
              <button class="button-75" id="btnAmbient" onClick={ambientMode} ><span class="text">Ambient Mode : OFF</span></button>
                
              { animeWatch.episodeNavigation &&
                animeWatch.episodeNavigation.prev!==undefined ? <button class="button-75" onClick={()=>handleSeasonEpisode(animeWatch.episodeNavigation.prev)}><span class="text">Prev</span></button>:
                ""
              }
            </div>
          </div>
     


          <div>
            <div className='episodes-container' style={{display:'flex', justifyContent:'space-around', flexShrink:'1'}}>
              <div className='season'>
                <Form.Select className='seasonSelect' onChange={e=>selectSeason(e.target.value)} value={seasonId}>
                  { 
                    seasons.map((season,idx) => {
                      return <option key={idx} className='seasonOption' style={{backgroundColor:'transparent'}} value={season.id}>[S{season.number}]{season.title}</option>
                    })
                  }
                </Form.Select>
              </div>
              <div className='language'>
                <Form.Select className='languageSelect' onChange={e=>selectLanguage(e.target.value)} value={languageId}>
                  { selectedSeason.languages &&
                    selectedSeason.languages.map((language,idx) => {
                      return <option key={idx} className='languageOption' value={language}>{languageNames.of(language)}</option>
                    })
                  }
                </Form.Select>
              </div>
            </div>
            <h3 style={{color:'rgb(249, 201, 58)', position:'absolute' }}>Episodes</h3>
            
            <div style={{display:'flex', justifyContent:'center', paddingTop:'1%'}}>
              <div className="arrow">
                { limitCount<limit?
                    <span className="nextFixed" onClick={nextLimit}></span>
                  :""
                }
                { limitCount>1?
                    <span className="prevFixed" onClick={prevLimit}></span>
                  :""
                }       
              </div>
            </div>

            <div className='episodesList'>
                  <Row>
                    { seasonEpisodes.result &&
                      seasonEpisodes.result.map((episode, idx) => (

                      <Col xs={6} sm={4} md={3} lg={2} key={idx}>
                        {episode.episodeNumber===animeWatch.episodeNumber ? 
                          <p className='playingNow' style={{position:'absolute',zIndex:1}}>
                            Playing Now
                          </p> 
                          : ""
                        }
                        <Card onClick={()=>handleSeasonEpisode(episode.slug)}>
                          <Card.Img  variant="top" src={episode.thumbnail && episode.thumbnail.sm.name!=="anime-sm"?`https://www2.kickassanime.ro/images/thumbnail/${episode.thumbnail.sm.name}.webp`:""} />
                          <Card.Title>EP.{episode.episodeNumber}</Card.Title>
                          <Card.Body style={{padding:"0.5em 0"}}>                 
                            <Card.Text>
                          
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      
                     ))
                    }
                  </Row>
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'center', marginBottom:'1%'}}>
              <div className="arrow">
                { limitCount<limit?
                    <span className="nextFixed" onClick={nextLimit}></span>
                  :""
                }
                { limitCount>1?
                    <span className="prevFixed" onClick={prevLimit}></span>
                  :""
                }       
              </div>
            </div>

          <div className='title-container'>
            <h2>{animeWatch.title} (Episode {animeWatch.episodeNumber} - {animeWatch.name})</h2>
          </div>
          <div id='details'>
            <div>
              {animeWatch.poster && <img id='poster' src={`https://www2.kickassanime.ro/images/poster/${animeWatch.poster.hq.name}.webp`} alt="poster"/>}
            </div>

            <div className='metadata-container'>
              <div id='synopsis'><h4>Synopsis :</h4> <p>{animeWatch.description}</p></div>
              <div id='generalInfo'><h4>General Information</h4> </div>
              <div className='grid-container'>
                <div className='mbox'><div className='mkey'>Duration</div><div className='mval'> {animeWatch.duration}</div></div>
                <div className='mbox'><div className='mkey'>Year</div><div className='mval'>{animeWatch.year}</div></div>
                <div className='mbox'><div className='mkey'>Premiered</div><div className='mval'>{animeWatch.premiered}</div></div>
                <div className='mbox'><div className='mkey'>Genre</div><div className='mval'>{animeWatch.genres}</div></div>
                <div className='mbox'><div className='mkey'>Rating</div><div className='mval'>{animeWatch.maturityRatings}</div></div>
              </div>
            </div>
          </div>
        </div>        
    );
};


export default EpisodeView;