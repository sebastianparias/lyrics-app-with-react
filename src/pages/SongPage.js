import { useParams } from 'react-router-dom';
import SongDetails from '../components/SongDetails'

const SongPage = ({mySongs}) => {
  const {id} = useParams()
  const {search, lyrics} = mySongs[id]

  return ( 
    <SongDetails search={search} lyrics={lyrics} />
   );
}
 
export default SongPage;