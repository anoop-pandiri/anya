
import RecentlyUpdated from 'Content/RecentlyUpdated/RecentlyUpdated';
import EpisodeView from 'Pages/EpisodeView/EpisodeView';
import './Home.css';
function Home() {
    return (
        <div className='home'>
        {/* <RecentlyUpdated/> */}
        <EpisodeView/>
        </div>
    );
};

export default Home;