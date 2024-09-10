import axios from 'axios';

useEffect(() => {
  axios.get('/api/game/start')
    .then(response => {
      setGameState(response.data);
    });
}, []);
