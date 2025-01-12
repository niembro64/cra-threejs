// /src/routes/Wudi2025W.jsx

import React from 'react';

const Wudi2025W = () => {
  // Here’s the data as a JS array of objects.
  // Each object has the player's name and their image URL (if any).
  const players = [
    {
      name: 'Aidan Di Salvo',
      image: 'https://wudi.org/live3/media/profile_pictures/03bbce127c_IMG_3378.JPG',
    },
    {
      name: "Alex 'Alex' Solomon",
      image: 'https://wudi.org/live3/media/profile_pictures/b41bf094d4_Screen_Shot_2021-04-15_at_10.37.57_AM.png',
    },
    {
      name: 'Alex Bellows',
      image: 'https://wudi.org/live3/media/profile_pictures/52594db7b1_thumbnail.jpg',
    },
    {
      name: 'Alex Kosakowski',
      image: '',
    },
    {
      name: "Alexander 'Alex' Popov",
      image: 'https://wudi.org/live3/media/profile_pictures/df62bb6b88_Alex_Popov.jpg',
    },
    // ... continue filling in the rest of the list ...
    // (Truncated for brevity; copy/paste everyone’s name & image)
    {
      name: "Zachary Tecun",
      image: 'https://wudi.org/live3/media/profile_pictures/c8de51a9e9_120288969_10158032380449132_275494478457774236_n.jpg',
    },
    {
      name: 'Zing Gee',
      image: 'https://wudi.org/live3/media/profile_pictures/bc5f4a2088_Gees.JPEG',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-6 text-4xl font-bold">WUDI 2025 Winter League</h1>

        {players.map((player, idx) => (
          <div
            key={idx}
            className="mb-4 flex items-center border-b border-gray-700 pb-2"
          >
            {player.image ? (
              <img
                src={player.image}
                alt={player.name}
                className="mr-4 h-20 w-auto object-cover"
              />
            ) : (
              <div className="mr-4 flex h-20 w-20 items-center justify-center bg-gray-800">
                <span className="text-xs text-gray-500">No Image</span>
              </div>
            )}
            <span className="text-lg font-semibold">{player.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wudi2025W;
