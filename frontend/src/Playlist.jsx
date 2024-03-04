// spotify playlist display
const Playlist = ({playlist}) => {
    <div className="playlist">
        <div>
            <p>{playlist.name}</p>
        </div>
        <div>
            <img src={playlist.image} alt='playlist' />
        </div>
    </div>
}
export default Playlist;