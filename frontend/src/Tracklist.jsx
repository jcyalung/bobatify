// displays tracks of playlist
const TRACK_URL = 'https://open.spotify.com/track/';
const Tracklist = ({playlist}) => {
    return(<nav>
        <ul>
          {playlist.tracks.map((track) => (
            <a href={TRACK_URL + track.id} target='_blank' rel="noreferrer"><li><span>{track.name}</span></li></a>))}
        </ul>
      </nav>
    )
}
export default Tracklist;