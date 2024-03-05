// list of artists
const ARTIST_URL = 'https://open.spotify.com/artist/';
const ArtistList = ({artists}) => {
    return(<nav>
        <ul>
          {artists.map((artist) => (
            <a href={ARTIST_URL + artist.id} target='_blank' rel="noreferrer"><li><span>{artist.name}</span></li></a>))}
        </ul>
      </nav>
    )
}
export default ArtistList;