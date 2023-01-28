import Lyrics from "./SongLyrics";

const Details = ({search, lyrics}) => {
  if (!lyrics) return null
  return ( 
    <div>
      <h2>{search.song} ({search.artist}) lyrics:</h2>
      <Lyrics lyrics={lyrics} />
    </div>
   );
}
 
export default Details;