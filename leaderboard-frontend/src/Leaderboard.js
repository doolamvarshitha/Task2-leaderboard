import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
   const [players, setPlayers] = useState([]);
   const [name, setName] = useState('');
   const [points, setPoints] = useState(0);

   useEffect(() => {
      fetchLeaderboard();
   }, []);

   // Fetch leaderboard data
   const fetchLeaderboard = async () => {
      const res = await axios.get('https://your-backend.vercel.app/api/leaderboard');
      setPlayers(res.data);
   };

   // Add new player
   const addPlayer = async () => {
      await axios.post('https://your-backend.vercel.app/api/leaderboard', { name, points });
      fetchLeaderboard(); // Refresh leaderboard
   };

   return (
      <div>
         <h1>Leaderboard</h1>
         <ul>
            {players.map(player => (
               <li key={player._id}>{player.name} - {player.points} points</li>
            ))}
         </ul>

         <h2>Add Player</h2>
         <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
         <input type="number" placeholder="Points" value={points} onChange={e => setPoints(e.target.value)} />
         <button onClick={addPlayer}>Add Player</button>
      </div>
   );
};

export default Leaderboard;
