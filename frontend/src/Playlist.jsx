
import BobaIcon from './boba.svg';
// spotify playlist display
const Playlist = ({playlist}) => {
    return(
        <div className='playlist'>
            <div>
                <p>{playlist.name}</p>
            </div>
            <div>
                <img src={playlist.image} alt='playlist'/>
            </div>
            <div>
            </div>
        </div>)
}
export default Playlist;