interface Announcement {
  id: string;
  title: string;
  description: string | null;
  image: string | null;
  person_id: string;
  validated: boolean;
  person: Person
  gallery: AnnouncementImage | null
}

interface AnnouncementImage {
  id: string;
  url: string;
  announcement_id: string;
}