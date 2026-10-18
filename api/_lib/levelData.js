// Server-side level data and secrets
// Passwords and love letters are NEVER sent to the client until validated on the server!

export const getLevelsConfig = () => {
  return [
    {
      id: 1,
      title: "The Spark",
      subtitle: "Where our story began and how you stole my heart",
      personalQuestion: "What do you like most about me?",
      passwordQuestion: "What was the date of our first text?",
      passwordClue: "23rd of which month and year",
      passwords: [
        process.env.LEVEL_1_PASSWORD?.toLowerCase().trim() || "23082023",
        "23082023",
        "23/08/2023",
        "23-08-2023",
        "23 08 2023",
        "23 august 2023",
        "23 august",
        "august 23 2023",
        "23rd august 2023",
        "23 aug 2023",
        "forever",
      ],
      loveLetter: `From the moment our very first text lit up my screen on 23 August 2023, you brought warmth into my world.
The way your eyes light up when you laugh makes even ordinary days feel like pure magic.
Loving you is the easiest, sweetest thing I have ever done, my handsome boy.
You have my whole heart today, tomorrow, and for all time. ❤️`,
    },
    {
      id: 2,
      title: "Our Favourite Memory",
      subtitle: "Golden moments, late-night talks, and endless laughter",
      personalQuestion: "What is one memory with me that always makes you smile?",
      passwordQuestion: "What was the date of our first in-person meeting?",
      passwordClue: "15th of which month and year",
      passwords: [
        process.env.LEVEL_2_PASSWORD?.toLowerCase().trim() || "15092023",
        "15092023",
        "15/09/2023",
        "15-09-2023",
        "15 09 2023",
        "15 september 2023",
        "15 september",
        "september 15 2023",
        "15th september 2023",
        "15 sep 2023",
        "soulmate",
        "soulmates",
      ],
      loveLetter: `Seeing you in person for the first time on 15 September 2023 gave me butterflies that have never faded.
The screen disappeared, the world faded away, and you were even more wonderful than I ever dreamed.
You aren't just my boyfriend—you are my soulmate, my best friend, and my greatest comfort.
In a crowded room or quiet silence, you are the only person my heart ever looks for. ❤️`,
    },
    {
      id: 3,
      title: "Our Magical First Kiss",
      subtitle: "Under the summer evening sky where stars stood still",
      personalQuestion: "What do you remember most about our first kiss?",
      passwordQuestion: "What was the date of our magical first kiss?",
      passwordClue: "13th of which month and year",
      passwords: [
        process.env.LEVEL_3_PASSWORD?.toLowerCase().trim() || "13072025",
        "13072025",
        "13/07/2025",
        "13-07-2025",
        "13 07 2025",
        "13 july 2025",
        "13 july",
        "july 13 2025",
        "13th july 2025",
        "home",
      ],
      loveLetter: `13 July 2025—our magical first kiss made the stars stop and fireworks ignite in my chest.
Under that summer evening sky, with my hand in yours, time completely stood still.
In your arms, the whole world goes quiet, and I knew that every piece of my heart had finally found its true home.
That kiss wasn't just a moment; it was a promise that I choose you today, tomorrow, and forever. ❤️`,
    },
    {
      id: 4,
      title: "Us, Together",
      subtitle: "The little adventures and a love without end",
      personalQuestion: "What is your favourite thing we have done together?",
      passwordQuestion: "What was the date of our first phone call?",
      passwordClue: "16th of which month and year",
      passwords: [
        process.env.LEVEL_4_PASSWORD?.toLowerCase().trim() || "16092023",
        "16092023",
        "16/09/2023",
        "16-09-2023",
        "16 09 2023",
        "16 september 2023",
        "16 september",
        "september 16 2023",
        "16th september 2023",
        "16 sep 2023",
        "always",
        "forever",
      ],
      loveLetter: `16 September 2023—our first endless phone call made the world stop and your voice became my favorite home.
Every single day with you is my favorite adventure, filled with gentle whispers and sweet smiles.
I love the way we fit together, like two puzzle pieces finally finding their match.
I choose you today, tomorrow, and always. ❤️`,
    },
    {
      id: 5,
      title: "A Dream for Two",
      subtitle: "Looking toward all the beautiful tomorrows waiting for us",
      personalQuestion: "What is one thing you hope we get to experience together?",
      passwordQuestion: "What is the date of our official anniversary?",
      passwordClue: "15th of which month and year",
      passwords: [
        process.env.LEVEL_5_PASSWORD?.toLowerCase().trim() || "15082025",
        "15082025",
        "15/08/2025",
        "15-08-2025",
        "15 08 2025",
        "15 august 2025",
        "15 august",
        "august 15 2025",
        "15th august 2025",
        "august",
      ],
      loveLetter: `15 August 2025 is forever etched in my soul as the golden day we officially made this love ours.
Looking ahead, I can't wait for every sunrise we will watch, every trip we take, and every dream we build together.
Growing older with you isn't scary; it's the greatest journey of my life.
Our love story is just getting started, my heart. ❤️`,
    },
    {
      id: 6,
      title: "One Last Little Promise",
      subtitle: "Stepping into your 21st milestone with all my devotion",
      personalQuestion: "What is one thing you want me to always remember about your love?",
      passwordQuestion: "What is the date of your birth?",
      passwordClue: "8th of which month and year",
      passwords: [
        process.env.LEVEL_6_PASSWORD?.toLowerCase().trim() || "08112005",
        "08112005",
        "8112005",
        "08/11/2005",
        "8/11/2005",
        "08-11-2005",
        "8-11-2005",
        "08 11 2005",
        "8 11 2005",
        "8 november 2005",
        "08 november 2005",
        "8th november 2005",
        "8 november",
        "21",
        "21st",
      ],
      loveLetter: `Born on 8 November 2005, you grew into the kindest, most wonderful man I could ever dream of loving.
Here is my promise: I will hold your hand through every storm and celebrate every victory by your side.
Stepping into 21 with you is an honor, and my devotion to you will never waver.
Happy 21st Birthday, my favorite person—now unlock your grand surprise! ❤️`,
    },
  ];
};

// Returns public metadata only (no passwords, no love letters)
export const getPublicLevelsMeta = () => {
  const levels = getLevelsConfig();
  return levels.map((lvl) => ({
    id: lvl.id,
    title: lvl.title,
    subtitle: lvl.subtitle,
    personalQuestion: lvl.personalQuestion,
    passwordQuestion: lvl.passwordQuestion,
    passwordClue: lvl.passwordClue,
  }));
};
