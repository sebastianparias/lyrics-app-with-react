import SongTableRow from "./SongTableRow";

const SongTable = ({ mySongs, handleDeleteSong }) => {
  return (
    <div>
      <h3>Favorite songs</h3>
      <table>
        <thead>
          <tr>
            <th>Artist</th>
            <th>Song</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mySongs.length > 0 ? (
            mySongs.map((el, index) => (
              <SongTableRow
                key={index}
                el={el}
                handleDeleteSong={handleDeleteSong}
                id={index}
              />
            ))
          ) : (
            <tr>
              <td colSpan="3">No songs saved</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SongTable;
