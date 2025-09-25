import React, { useState } from "react";

const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", year: 2010, desc: "A mind-bending thriller.", rating: 0 },
  { id: 2, title: "Titanic", genre: "Romance", year: 1997, desc: "A tragic love story.", rating: 0 },
  { id: 3, title: "Avengers", genre: "Action", year: 2012, desc: "Superheroes unite.", rating: 0 },
];

const genres = ["All", ...new Set(movies.map(m => m.genre))];

function StarRating({ rating, onRate }) {
  return (
    <div>
      {[1,2,3,4,5].map(star => (
        <span
          key={star}
          style={{ cursor: "pointer", color: star <= rating ? "gold" : "gray" }}
          onClick={() => onRate(star)}
        >★</span>
      ))}
    </div>
  );
}

function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [selected, setSelected] = useState(null);
  const [ratings, setRatings] = useState({});

  const filtered = movies.filter(
    m =>
      (genre === "All" || m.genre === genre) &&
      m.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleRate = (id, rate) => {
    setRatings({ ...ratings, [id]: rate });
  };

  return (
    <div style={{ fontFamily: "sans-serif", maxWidth: 500, margin: "auto" }}>
      <h2>Movie Review</h2>
      <input
        placeholder="Search movies..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "60%" }}
      />
      <select value={genre} onChange={e => setGenre(e.target.value)}>
        {genres.map(g => <option key={g}>{g}</option>)}
      </select>
      <ul>
        {filtered.map(m => (
          <li key={m.id} style={{ margin: "10px 0", cursor: "pointer" }} onClick={() => setSelected(m)}>
            {m.title} ({m.year}) - {m.genre}
            <StarRating rating={ratings[m.id] || 0} onRate={r => handleRate(m.id, r)} />
          </li>
        ))}
      </ul>
      {selected && (
        <div style={{ border: "1px solid #ccc", padding: 10 }}>
          <h3>{selected.title}</h3>
          <p>{selected.desc}</p>
          <StarRating rating={ratings[selected.id] || 0} onRate={r => handleRate(selected.id, r)} />
          <button onClick={() => setSelected(null)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;