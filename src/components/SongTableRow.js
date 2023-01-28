import { useNavigate } from "react-router-dom";

const SongTableRow = ({id, el, handleDeleteSong}) => {
const {search} = el 
  const navigate = useNavigate()
  return (
     <tr>
      <td>{search.artist}</td>
      <td>{search.song}</td>
      <td>
        <button onClick={() => navigate(`/songs/${id}`)}>View</button>
        <button onClick={() => handleDeleteSong(id)}>Delete</button>
      </td>
     </tr>
      );
}
 
export default SongTableRow;