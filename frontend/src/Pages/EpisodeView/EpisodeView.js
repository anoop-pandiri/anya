import './EpisodeView.css';

function EpisodeView() {
  
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
            <canvas id="canvas"></canvas>
                {/* <video id="player" width="400" height="200" controls src=""> Browser not supported </video> */}
                <iframe id='player' title="episode" src="https://kaast1.com/sapphire-duck/player.php?src=MWJkODExMTJkZGI3OTRlY2I5MDgwYjVkYmY0ZWRmNzI6MDFmMDY1ODM5NWI4NDkyYzgwYmI5NmMzNTZlYTVmNWVkZTJhNzNjNGY2ZmIzZTMwNDkzOGRjMTdkZjBiNDQxZmM1MGY0MzZiNWU3YmM4ODdmMGJhNTA0ZmVmM2U4MTc0" ></iframe>
                {/* width="864" height="486" */}
            </div>
        </div>
        <div className='toolbar'>
            <button type="button" id="btnAmbient" onClick={ambientMode} style={{padding:"1%", align:'center'}}>Ambient Mode : OFF</button>
        </div>

        <div className='title-container'>
        <h2>SPY x FAMILY</h2>
        <h5>Episode 1 - OPERATION STRIX (MISSION: 1)</h5>
                
        </div>
        <div className='metadata-container'>
        <p>Genres: Action,Comedy</p>
        </div>
        </div>         
    );
};

export default EpisodeView;