import { prisma } from "../src/lib/db";

async function main() {
  await prisma.eventProgram.deleteMany();
  await prisma.tribute.deleteMany();

  const program = [
    {
      timeSlot: "5:00 PM",
      title: "Arrival & Ruby Welcome",
      description:
        "Guests are welcomed into the hall with burgundy décor, champagne greetings and soft Afrobeat soul.",
      orderIndex: 1,
    },
    {
      timeSlot: "5:15 PM",
      title: "Words of Thanksgiving",
      description:
        "An opening prayer and gratitude to God — for 40 years of grace and a life poured out.",
      orderIndex: 2,
    },
    {
      timeSlot: "5:30 PM",
      title: "The Tapestry Unfolded",
      description:
        "The story reel plays — 15 years of teaching, 5 years of legacy, 5 years of motherhood.",
      orderIndex: 3,
    },
    {
      timeSlot: "5:45 PM",
      title: "Tributes & Toasts",
      description:
        "Guests lift their voices in blessing as the live tribute wall comes alive on the projector.",
      orderIndex: 4,
    },
    {
      timeSlot: "6:15 PM",
      title: "Dinner Is Served",
      description:
        "A modest three-course celebration dinner in warm candlelight.",
      orderIndex: 5,
    },
    {
      timeSlot: "6:45 PM",
      title: "The Golden Hour",
      description:
        "A toast to the celebrant, the ruby cake, and the candle that burns bright for many more decades.",
      orderIndex: 6,
    },
    {
      timeSlot: "7:00 PM",
      title: "Music & Dance",
      description:
        "Afrobeat, teen-era nostalgia and soft rock classics take over the floor.",
      orderIndex: 7,
    },
    {
      timeSlot: "7:30 PM",
      title: "Blessings & Prophetic Prayers",
      description:
        "Elders and friends release prophetic blessings for her flourishing decade ahead.",
      orderIndex: 8,
    },
    {
      timeSlot: "8:00 PM",
      title: "Farewell & Keepsakes",
      description:
        "Farewell embraces, gift presentation, and the Ruby Keepsake Book shared with every guest.",
      orderIndex: 9,
    },
  ];

  await prisma.eventProgram.createMany({ data: program });

  const tributes = [
    {
      authorName: "Mrs. Folake Adeyemi",
      relationship: "Staff",
      rawMessage:
        "Ma, you turned our little school into a family. You know every child by name and every teacher by heart. Thank you for leading with grace.",
      polishedMessage:
        "Ma, you turned our little school into a family. You know every child by name and every teacher by heart. Thank you for leading us with such grace.",
      poeticSummary: "One school, a thousand hearts — you taught us all to rise, then stayed to mend the start.",
      category: "The Educator",
      isApproved: true,
      isFeatured: true,
    },
    {
      authorName: "Mr. & Mrs. Bello",
      relationship: "Parent",
      rawMessage:
        "Our daughter used to cry every morning. Now she runs to class singing. You gave her wings, Ma. God bless you.",
      polishedMessage:
        "Our daughter used to cry every morning. Now she runs to class singing. You gave her wings, Ma. God bless you richly.",
      poeticSummary: "Where tears once fell, now songs take flight — a child you clothed in wings of light.",
      category: "The Educator",
      isApproved: true,
      isFeatured: false,
    },
    {
      authorName: "Kemi O. (Alumna)",
      relationship: "Student",
      rawMessage:
        "I was in your first class. Today I am a lawyer. You believed in a shy girl before she believed in herself.",
      polishedMessage:
        "I was in your very first class. Today I stand as a lawyer. You believed in a shy girl long before she believed in herself.",
      poeticSummary: "First in line, first to bloom — the seed you watered fills another room.",
      category: "The Educator",
      isApproved: true,
      isFeatured: false,
    },
    {
      authorName: "Uncle Chuka",
      relationship: "Family",
      rawMessage:
        "Five years ago God gave you two babies on the same road: a school and a son. Watching you nurture both with the same gentle hands is our greatest pride.",
      polishedMessage:
        "Five years ago God gave you two miracles on the same road — a school and a son. Watching you nurture both with the same gentle hands is our greatest pride.",
      poeticSummary: "Two births in one sacred year — a legacy and a son, both held in tender care.",
      category: "The Visionary",
      isApproved: true,
      isFeatured: true,
    },
    {
      authorName: "Mrs. Bose Aluko",
      relationship: "Staff",
      rawMessage:
        "Ma built this school from nothing. I watched her pray over budgets and plan lessons like an artist. Her vision is simply unstoppable.",
      polishedMessage:
        "Ma built this school from nothing. I watched her pray over budgets and plan lessons like an artist. Her vision is simply unstoppable.",
      poeticSummary: "From nothing's dust she raised a dream, and carved a future into stone and seam.",
      category: "The Visionary",
      isApproved: true,
      isFeatured: false,
    },
    {
      authorName: "Nnenna",
      relationship: "Family",
      rawMessage:
        "I have seen my sister hold meetings in one hand and a feeding bottle in the other. She never misses a lesson or a lullaby. That is balance only grace can give.",
      polishedMessage:
        "I have seen my sister hold meetings in one hand and a feeding bottle in the other. She never misses a lesson or a lullaby. That is a balance only grace can give.",
      poeticSummary: "A boardroom in one hand, a lullaby in the other — grace made her both leader and mother.",
      category: "The Mother",
      isApproved: true,
      isFeatured: true,
    },
    {
      authorName: "Pastor Adekunle",
      relationship: "Friend",
      rawMessage:
        "Her heart for her son moves me deeply. She prays over that boy like the kingdom depends on it. And maybe it does.",
      polishedMessage:
        "Her heart for her son moves me deeply. She prays over that boy as though the kingdom depends on it. And perhaps it does.",
      poeticSummary: "She kneels each night with heaven's claim — a mother's prayer bears a kingdom's name.",
      category: "The Mother",
      isApproved: false,
      isFeatured: false,
    },
    {
      authorName: "Tola & Emeka",
      relationship: "Friend",
      rawMessage:
        "Twenty years of friendship, and Mena is still the first person we call with good news. Her laughter is medicine.",
      polishedMessage:
        "Twenty years of friendship, and Mena remains the first person we call with good news. Her laughter is the sweetest medicine.",
      poeticSummary: "First to hear our every cheer — her laughter steadies every year.",
      category: "The Friend",
      isApproved: true,
      isFeatured: false,
    },
    {
      authorName: "Grace N.",
      relationship: "Staff",
      rawMessage:
        "Ma is the reason I believe in kindness at work. She celebrates your wins louder than her own.",
      polishedMessage:
        "Ma is the reason I believe in kindness at work. She celebrates your wins louder than she celebrates her own.",
      poeticSummary: "She lifts another's crown with joy untold — a friend in every story that we hold.",
      category: "The Friend",
      isApproved: true,
      isFeatured: false,
    },
    {
      authorName: "Dele & Titi",
      relationship: "Parent",
      rawMessage:
        "Ma, thank you for teaching our son to pray and to dream. The school is a miracle and you are its heartbeat.",
      polishedMessage:
        "Ma, thank you for teaching our son to pray and to dream. The school is a miracle, and you are its heartbeat.",
      poeticSummary: "You taught two boys to pray and dream — the heartbeat of a rising stream.",
      category: "The Visionary",
      isApproved: false,
      isFeatured: false,
    },
    {
      authorName: "Auntie Ronke",
      relationship: "Family",
      rawMessage:
        "At 40 you look like you are just getting started. Mother, founder, teacher, sister — you wear every crown softly.",
      polishedMessage:
        "At forty you look like you are only just beginning. Mother, founder, teacher, sister — you wear every crown so softly.",
      poeticSummary: "Four decades young, each crown worn light — a woman aglow in morning light.",
      category: "The Friend",
      isApproved: true,
      isFeatured: false,
    },
    {
      authorName: "The Primary 5 Class",
      relationship: "Student",
      rawMessage:
        "Happy 40th birthday, Mummy Sani! Thank you for reading us stories and believing we can be anything.",
      polishedMessage:
        "Happy 40th birthday, Mummy Sani! Thank you for reading us stories and believing we can be anything at all.",
      poeticSummary: "Stories read and dreams unlocked — little voices, giant flocks.",
      category: "The Educator",
      isApproved: true,
      isFeatured: false,
    },
  ];

  for (const t of tributes) {
    await prisma.tribute.create({
      data: {
        authorName: t.authorName,
        relationship: t.relationship,
        rawMessage: t.rawMessage,
        polishedMessage: t.polishedMessage,
        poeticSummary: t.poeticSummary,
        category: t.category,
        isApproved: t.isApproved,
        isFeatured: t.isFeatured,
      },
    });
  }

  console.log(
    `Seeded ${program.length} program items and ${tributes.length} tributes.`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
