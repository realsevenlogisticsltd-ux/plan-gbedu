import {
  GraduationCap,
  Heart,
  Star,
  HeartHandshake,
  type LucideIcon,
} from "lucide-react";

export const celebrant = {
  name: "Ms. Mena Sekinatu Sani",
  shortName: "Mena",
  title: "Founder & Proprietress, Smity Hills School, Ogombo, Ajah",
  epithet: "A Woman of Purpose",
  bio: [
    "Born in Lagos State, Mena Sekinatu Sani is a daughter of grace, a teacher of children, a founder of dreams, and a mother whose heart holds a whole community. A true child of her city, she speaks Yoruba, Igbo and English with equal fluency — languages through which she has taught, comforted and connected with every family she serves. For fifteen years she has stood at the chalkboard of purpose — first as a teacher shaping young minds, and for the past five years as the founder and proprietress of Smity Hills School in Ogombo, Ajah, Lagos.",
    "Five years ago, in one breathtaking season, God entrusted her with two miracles at once: the founding of her school and the birth of her son. She has carried both with the same gentle hands — lesson plans in one, lullabies in the other — a living testimony that purpose and motherhood flourish side by side.",
    "Those who work beside her know her well: dedicated to the very last detail, honest to a fault, and kind to every fellow human who crosses her path. Soft-spoken and amiable, she leads not with noise but with warmth — a character that makes classrooms and corridors alike feel like home.",
    "Now at forty, she enters her Ruby Jubilee — a decade of elegance, resilience and unshakable faith. This evening we celebrate the woman, the mother, the educator, and the friend.",
  ],
  milestones: [
    { years: 15, label: "Years of Teaching" },
    { years: 5, label: "Years of Legacy" },
    { years: 5, label: "Years of Motherhood" },
    { years: 40, label: "Years of Grace" },
  ],
};

export const eventInfo = {
  title: "40 & Flourishing",
  subtitle: "Celebrating a Woman of Purpose",
  dateLabel: "Wednesday, April 14, 2027",
  dateTime: "2027-04-14T17:00:00",
  venue: "Diva Event Centre, Ajah",
  dressCode: "Burgundy, Cream & Violet",
  guestCount: 50,
};

export type Pillar = {
  name: string;
  icon: LucideIcon;
  color: string;
  description: string;
};

export const pillars: Pillar[] = [
  {
    name: "The Educator",
    icon: GraduationCap,
    color: "emerald",
    description: "Fifteen years shaping young minds with wisdom and patience.",
  },
  {
    name: "The Mother",
    icon: Heart,
    color: "ruby",
    description: "Five years of motherhood — the gentlest of her many callings.",
  },
  {
    name: "The Visionary",
    icon: Star,
    color: "gold",
    description: "The founder whose dream became a school — and a family.",
  },
  {
    name: "The Friend",
    icon: HeartHandshake,
    color: "rose",
    description: "The steady heart her people lean on, laugh with, and love.",
  },
];

export const timeline = [
  {
    chapter: "Chapter One",
    period: "2011 — 2021",
    title: "The Calling",
    subtitle: "15 Years in Education",
    body: "A young teacher walked into her first classroom and found her altar. For fifteen years she poured herself into every child — not as a job, but as a calling written in heaven.",
    icon: "book",
  },
  {
    chapter: "Chapter Two",
    period: "2021",
    title: "The Dual Miracle",
    subtitle: "A School & A Son, Born Together",
    body: "In one sacred season, God gave her two babies at once: Smity Hills School, and her son. Same year, same hands, same love — a legacy and a lullaby arriving side by side.",
    icon: "sparkles",
  },
  {
    chapter: "Chapter Three",
    period: "2021 — 2024",
    title: "The Ruby Furnace",
    subtitle: "Elegance Through Adversity & Faith",
    body: "Every school has its furnace years — and she walked through hers refined, not broken. Faith was her fire escape; elegance was her answer. She emerged shining, like rubies are made.",
    icon: "flame",
  },
  {
    chapter: "Chapter Four",
    period: "2024 →",
    title: "Flourishing Forward",
    subtitle: "Prophetic Blessings for the Next Decade",
    body: "Forty is not a summit; it is a launchpad. The next decade carries a school that grows, a son who flourishes, and a woman whose best chapters are still being written.",
    icon: "sun",
  },
];

export type Playlist = {
  genre: string;
  era: string;
  description: string;
  tracks: { title: string; artist: string; href: string }[];
};

export const playlists: Playlist[] = [
  {
    genre: "The Evening's Selection",
    era: "Curated for Mena",
    description:
      "The songs she picked for her night — the soundtrack of the celebration.",
    tracks: [
      { title: "Eleda Mi", artist: "Olamide", href: "https://www.youtube.com/results?search_query=olamide+eleda+mi" },
      { title: "Bumper to Bumper", artist: "Wande Coal", href: "https://www.youtube.com/results?search_query=wande+coal+bumper+to+bumper" },
      { title: "Tease Me", artist: "Wizkid", href: "https://www.youtube.com/results?search_query=wizkid+tease+me" },
    ],
  },
  {
    genre: "Ruby Celebration Classics",
    era: "Great Songs for a Great Night",
    description:
      "The timeless anthems of joy — songs made for toasts, dancing and golden moments.",
    tracks: [
      { title: "Celebration", artist: "Kool & The Gang", href: "https://www.youtube.com/results?search_query=kool+and+the+gang+celebration" },
      { title: "Happy", artist: "Pharrell Williams", href: "https://www.youtube.com/results?search_query=pharrell+williams+happy" },
      { title: "Ain't No Mountain High Enough", artist: "Marvin Gaye & Tammi Terrell", href: "https://www.youtube.com/results?search_query=ain%27t+no+mountain+high+enough" },
      { title: "I'm Every Woman", artist: "Whitney Houston", href: "https://www.youtube.com/results?search_query=whitney+houston+i%27m+every+woman" },
      { title: "Dancing Queen", artist: "ABBA", href: "https://www.youtube.com/results?search_query=abba+dancing+queen" },
      { title: "Uptown Funk", artist: "Mark Ronson ft. Bruno Mars", href: "https://www.youtube.com/results?search_query=uptown+funk" },
      { title: "Signed, Sealed, Delivered", artist: "Stevie Wonder", href: "https://www.youtube.com/results?search_query=stevie+wonder+signed+sealed+delivered" },
    ],
  },
  {
    genre: "Teen Era Nostalgia",
    era: "Late 90s / 00s",
    description:
      "The songs that played on her radio through school corridors and Sunday evenings.",
    tracks: [
      { title: "Yeah!", artist: "Usher", href: "https://www.youtube.com/results?search_query=usher+yeah" },
      { title: "7 Days", artist: "Craig David", href: "https://www.youtube.com/results?search_query=craig+david+7+days" },
      { title: "Dilemma", artist: "Nelly ft. Kelly Rowland", href: "https://www.youtube.com/results?search_query=nelly+dilemma" },
      { title: "Umbrella", artist: "Rihanna", href: "https://www.youtube.com/results?search_query=rihanna+umbrella" },
      { title: "Empire State of Mind", artist: "Jay-Z & Alicia Keys", href: "https://www.youtube.com/results?search_query=empire+state+of+mind" },
      { title: "Crazy", artist: "Gnarls Barkley", href: "https://www.youtube.com/results?search_query=gnarls+barkley+crazy" },
    ],
  },
  {
    genre: "Afrobeat Soul",
    era: "The Sound of Home",
    description:
      "The rhythms that move her hips and her heart — Africa's soul, front and center.",
    tracks: [
      { title: "African Queen", artist: "2Baba", href: "https://www.youtube.com/results?search_query=2baba+african+queen" },
      { title: "Pakurumo", artist: "Wizkid", href: "https://www.youtube.com/results?search_query=wizkid+pakurumo" },
      { title: "Jailer", artist: "Asa", href: "https://www.youtube.com/results?search_query=asa+jailer" },
      { title: "Aye", artist: "Davido", href: "https://www.youtube.com/results?search_query=davido+aye" },
      { title: "On the Low", artist: "Burna Boy", href: "https://www.youtube.com/results?search_query=burna+boy+on+the+low" },
      { title: "Million Pound Girl", artist: "Wande Coal", href: "https://www.youtube.com/results?search_query=wande+coal+million+pound+girl" },
    ],
  },
  {
    genre: "R&B Soul",
    era: "Late Night & Lovely",
    description:
      "Smooth and soulful — the love songs that hold the room still.",
    tracks: [
      { title: "End of the Road", artist: "Boyz II Men", href: "https://www.youtube.com/results?search_query=boyz+ii+men+end+of+the+road" },
      { title: "U Got It Bad", artist: "Usher", href: "https://www.youtube.com/results?search_query=usher+u+got+it+bad" },
      { title: "Let Me Love You", artist: "Mario", href: "https://www.youtube.com/results?search_query=mario+let+me+love+you" },
      { title: "If I Ain't Got You", artist: "Alicia Keys", href: "https://www.youtube.com/results?search_query=alicia+keys+if+i+ain%27t+got+you" },
      { title: "No One", artist: "Alicia Keys", href: "https://www.youtube.com/results?search_query=alicia+keys+no+one" },
      { title: "Crazy in Love", artist: "Beyoncé ft. Jay-Z", href: "https://www.youtube.com/results?search_query=beyonce+crazy+in+love" },
    ],
  },
  {
    genre: "Soft Rock Classics",
    era: "Timeless & Golden",
    description:
      "Candlelight favourites — the ballads that make the hall go quiet and warm.",
    tracks: [
      { title: "Wonderful Tonight", artist: "Eric Clapton", href: "https://www.youtube.com/results?search_query=eric+clapton+wonderful+tonight" },
      { title: "Your Song", artist: "Elton John", href: "https://www.youtube.com/results?search_query=elton+john+your+song" },
      { title: "Fields of Gold", artist: "Sting", href: "https://www.youtube.com/results?search_query=sting+fields+of+gold" },
      { title: "Sailing", artist: "Christopher Cross", href: "https://www.youtube.com/results?search_query=christopher+cross+sailing" },
      { title: "Just the Way You Are", artist: "Billy Joel", href: "https://www.youtube.com/results?search_query=billy+joel+just+the+way+you+are" },
      { title: "Hotel California", artist: "Eagles", href: "https://www.youtube.com/results?search_query=eagles+hotel+california" },
    ],
  },
];

export const relationships = [
  "Family",
  "Staff",
  "Parent",
  "Friend",
  "Student",
  "Other",
] as const;

export type Relationship = (typeof relationships)[number];

export const closing = {
  eyebrow: "The Final Word",
  title: "A Blessing for the Road Ahead",
  lead: "Forty years have been written in grace. The next forty are yours to author.",
  blessing: [
    "May the school you founded grow far beyond its walls, and every child who ever sat in your classroom rise up and call you blessed.",
    "May the son you carried carry your kindness into the world — and may he always know how fiercely he is loved.",
    "And may you meet the coming decade the way you have met every season: soft-spoken, steady, and shining — like rubies are made.",
  ],
  signoff: "Happy Ruby Jubilee, Mena. Flourish.",
};
