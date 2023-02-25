import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './EpisodeView.css';

function EpisodeView({anime}) {

    let location = useLocation();;
    let animeWatchLink = `https://www2.kickassanime.ro/api/watch/${location.state.slug}`;
   
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
      });
  
    },[]);

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
                {animeWatch.thumbnail && <img id='thumbnail' src={`https://www2.kickassanime.ro/images/thumbnail/${animeWatch.thumbnail.hq.name}.webp`} alt="poster" />}

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

          <div className='title-container'>
            <h2>{animeWatch.title}</h2>
            <h5>Episode {animeWatch.episodeNumber} - {animeWatch.name}</h5>
                
          </div>
          <div className='metadata-container'>
            <p>Genres: Action,Comedy</p>
          </div>
        </div>         
    );
};

export default EpisodeView;