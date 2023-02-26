import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EpisodeView.css';
import Form from 'react-bootstrap/Form';

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


    let seasonEpisodesList = `https://www2.kickassanime.ro/api/episodes/${seasonId}?lh=${languageId}&page=1`;

    
    useEffect(() => {
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(animeWatchLink)}&nocache=${Date.now()}`)
      .then(response => {
       if (response.ok) {
        return response.json()
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
            return response.json()
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
          return response.json()
        }
          throw new Error('Network response was not ok.')
      })
      .then(data => {
        var seasonEpisodesData = JSON.parse(data.contents);
        setSeasonEpisodes(seasonEpisodesData);
      });
    },[seasonId, languageId]);

    console.log(seasonEpisodes);


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
    
    
    return (
        <div id='container'>
          <div className='episode-container'>

            <div className='video-container'>
                {animeWatch.thumbnail && <img id='thumbnail' src={`https://www2.kickassanime.ro/images/thumbnail/${animeWatch.thumbnail.hq.name}.webp`} alt="thumbnail" />}

                <div className="lds-ripple">
                  <div></div>
                  <div></div>
                </div>

                <canvas id="canvas">
                </canvas>
                <iframe id='player' title="episode" allowFullScreen src={animeWatch.name!==""?animeWatch.servers:""} >
                </iframe>
                
            </div>
          </div>
     
          <div className='toolbar'>
            <button type="button" id="btnAmbient" onClick={ambientMode} style={{padding:"1%", align:'center'}}>Ambient Mode : OFF</button>
          </div>

          <div>
            <h3 style={{color:'white'}}>Episodes</h3>
            <div className='episodes-container' style={{display:'flex'}}>
              <div className='season'>
                <Form.Select onChange={e=>selectSeason(e.target.value)} value={seasonId}>
                  { 
                    seasons.map((season,idx) => {
                      return <option key={idx} value={season.id}>[S{season.number}]{season.title}</option>
                    })
                  }
                </Form.Select>
              </div>
              <div className='language'>
                <Form.Select onChange={e=>selectLanguage(e.target.value)} value={languageId}>
                  { selectedSeason.languages &&
                    selectedSeason.languages.map((language,idx) => {
                      return <option key={idx} value={language}>{languageNames.of(language)}</option>
                    })
                  }
                </Form.Select>
              </div>
            </div>
            <div className='episodesList'>

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