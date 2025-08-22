const { useState, useEffect } = React;

// Initialize Supabase
const supabase = supabase.createClient(
  "https://fylzmzizavzhunrpxlvb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
);

function App() {
  const [user, setUser] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [races, setRaces] = useState([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });
  }, []);

  useEffect(() => {
    async function fetchTracks() {
      const { data, error } = await supabase.from("tracks").select("*").order("name");
      if (error) console.error(error);
      else setTracks(data);
    }
    fetchTracks();
  }, []);

  useEffect(() => {
    if (!selectedTrack) return;
    async function fetchRaces() {
      const { data, error } = await supabase
        .from("races")
        .select("*")
        .eq("track_id", selectedTrack.id)
        .order("race_date", { ascending: true });
      if (error) console.error(error);
      else setRaces(data);
    }
    fetchRaces();
  }, [selectedTrack]);

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
    if (error) console.error(error);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error(error);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>RC Tracks & Races</h1>

      {!user ? (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      ) : (
        <div>
          <p>
            Logged in as {user.email} <button onClick={signOut}>Sign Out</button>
          </p>

          <h2>Tracks</h2>
          <ul>
            {tracks.map(track => (
              <li key={track.id}>
                <button onClick={() => setSelectedTrack(track)}>
                  {track.name} - {track.city}, {track.state}
                </button>
              </li>
            ))}
          </ul>

          {selectedTrack && (
            <div>
              <h3>Races at {selectedTrack.name}</h3>
              <ul>
                {races.map(race => (
                  <li key={race.id}>
                    {new Date(race.race_date).toLocaleDateString()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Mount React App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
