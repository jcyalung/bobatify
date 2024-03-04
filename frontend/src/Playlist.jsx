// spotify playlist display
const Playlist = ({playlist}) => {
    console.log(playlist);
    return(
    <div className="playlist">
        <div>
            <p>{playlist.name}</p>
        </div>
        <div>
            <img src={playlist.image} alt='playlist' />
        </div>
    </div>)
}
export default Playlist;