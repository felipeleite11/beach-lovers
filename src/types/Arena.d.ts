interface Arena {
  id: string;
  name: string;
  address: string;
  image_url: string | null;
  map_link: string | null;
  latitude: number | null;
  longitude: number | null;
  business_time: string | null;
  contacts: string | null;
  day_use: string | null;
  region_id: string | null;
  gallery: ArenaImage[] | null;

  region: Region | null;
  teachers: Teacher[];
  tournaments: Tournament[];
  gallery: ArenaImage[];
  matches: Match[];
}

interface ArenaImage {
  id: string;
  url: string;
  arena_id: string;
  description: string;
}
