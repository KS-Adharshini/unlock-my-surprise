# Unlock My Surprise — A Journey Through Us ❤️
### An Interactive Romantic 21st Birthday Website for My Favorite Person

A romantic, emotional, and magical interactive website crafted especially for celebrating a boyfriend's **21st Birthday**. Built with **React, Vite, CSS, and Vercel Serverless Functions**.

![Theme](https://img.shields.io/badge/Theme-Romantic%20Black%2C%20Red%20%26%20Pink-ff2a6d)
![Backend](https://img.shields.io/badge/Backend-Vercel%20Serverless%20Functions-black)
![Email](https://img.shields.io/badge/Notifications-Resend%20API-d90429)
![Milestone](https://img.shields.io/badge/Milestone-21st%20Birthday-ffd166)

---

## ✨ Highlights & Features

### 1. 💌 3D Paper & Scrapbook Aesthetics
- **Theme**: Romantic black, crimson red, rose pink, and warm gold foil accents.
- **3D Pop-Outs**: Folded paper corners, layered paper hearts, washi tape strips, realistic wax seals, and polaroid photo cards.
- **Floating Balloons**: Continuous floating 3D heart balloons with gentle string physics and ambient sparkles.
- **Animated Opening Envelope**: A sealed 3D envelope with an embossed wax seal, calligraphic handwritten note, and an interactive "Open Your Surprise" unfold animation.
- **Atmospheric Music**: Built-in synthesized romantic harp melodies and sound effects via the Web Audio API with a floating music player toggle (zero external audio dependency issues).

### 2. 🔐 Two-Step Question System for Every Level
Every level contains two distinct steps:
1. **Step 1 — Personal Question**:
   - Emotional, relationship-related question (e.g., *"What do you like most about me?"*).
   - He writes his answer in his own words and clicks **"Submit My Answer"**.
   - Answer is immediately dispatched to your email address via **Resend** and safely saved.
   - Submitting Step 1 reveals Step 2, but **never** unlocks the love letter or next level on its own.
2. **Step 2 — Secret Password Question**:
   - Clue and prompt for a secret keyword or nickname.
   - Password verification is performed **strictly on the server** (never exposed in client JavaScript).
   - **Incorrect Password**: Cute shake animation + sweet message: *"Not quite, birthday boy! ❤️ Try again—your love letter is waiting."* (Unlimited retries without wiping his personal answer; triggers email alert).
   - **Correct Password**: Triggers celebratory heart confetti, celestial chimes, and reveals the level's love letter with an animated **typewriter effect** and wax seal.

---

## 🗺️ The Six Romantic Levels & Passwords

| Level | Title | Personal Question | Secret Password Clue | Default Server Password |
|---|---|---|---|---|
| **1** | **The Spark** | *“What do you like most about me?”* | 7 letters, love without end (`forever`) | `forever` |
| **2** | **Our Favourite Memory** | *“What is one memory with me that always makes you smile?”* | Two souls destined for each other (`soulmate`) | `soulmate` |
| **3** | **Our Magical First Kiss** | *“What do you remember most about our first kiss?”* | 13th of which month and year (`13072025`) | `13072025` |
| **4** | **Us, Together** | *“What is your favourite thing we have done together?”* | Little word for a love that never ends (`always`) | `always` |
| **5** | **A Dream for Two** | *“What is one thing you hope we get to experience together?”* | Our anniversary month (`august` - 15 August 2025) | `august` |
| **6** | **One Last Little Promise** | *“What is one thing you want me to always remember about your love?”* | What milestone birthday are we celebrating? (`21`) | `21` |

> [!TIP]
> All passwords can be customized by simply setting environment variables in `.env` or on Vercel without changing any code!

---

## 🎂 Grand 21st Birthday Finale

Once all six levels are unlocked, the grand celebration screen opens with:
- **Hero Celebration**: Heading *“Happy 21st Birthday, My Favorite Person! ❤️”* with continuous celebratory confetti fireworks.
- **Heartfelt 21st Birthday Letter**: A deeply emotional parchment letter celebrating his birth (*8 November 2005*), her birth (*1 May 2006*), their first text (*23 August 2023*), and his 21st milestone. Includes a live **"Personalize Letter"** mode so you can adjust the words anytime directly in the browser!
- **Polaroid Scrapbook Wall**: 6 Polaroid photo cards with washi tape and authentic captions.
- **Our Love Journey Timeline**: Interactive milestone roadmap connecting their special moments.
- **Certificate of Eternal Love**: *"Officially the Owner of My Heart"* framed award with a **"Print / Save Certificate"** button.

---

## 🚀 Quick Start & Local Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Installation
Clone or navigate to the project directory:
```bash
npm install
```

### 2. Configure Environment Variables
Copy the example file to `.env`:
```bash
cp .env.example .env
```

Open `.env` in any text editor and fill in your details:
```env
# Get a free API key at https://resend.com
RESEND_API_KEY=re_your_api_key_here

# Your email where you want to receive his answers and alerts:
NOTIFICATION_EMAIL=your-email@example.com

# Verified sender (Resend free tier default is onboarding@resend.dev):
FROM_EMAIL=Unlock My Heart <onboarding@resend.dev>

# Optional Custom Passwords:
LEVEL_1_PASSWORD=forever
LEVEL_2_PASSWORD=soulmate
LEVEL_3_PASSWORD=home
LEVEL_4_PASSWORD=always
LEVEL_5_PASSWORD=august
LEVEL_6_PASSWORD=21
```

> [!NOTE]
> If you run the app locally without setting a `RESEND_API_KEY`, the app runs in **Development Mode**: his answers are logged cleanly in the local terminal console, so you can test everything immediately without needing an API key right away!

### 3. Run Locally
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser!

---

## 🌐 Deploying to Vercel (Free)

This application is built for 100% native serverless deployment on **Vercel**:

1. Push your repository to **GitHub** (or import the folder directly on Vercel).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository.
4. In the **Environment Variables** section, add:
   - `RESEND_API_KEY` = your Resend API key
   - `NOTIFICATION_EMAIL` = your email address
   - `FROM_EMAIL` = `Unlock My Heart <onboarding@resend.dev>`
   - (Optional) `LEVEL_1_PASSWORD` through `LEVEL_6_PASSWORD`
5. Click **Deploy**!
6. Vercel will provide a live URL (e.g., `https://unlock-my-heart.vercel.app`) that you can send to your boyfriend on his birthday!

---

## 📁 Project Structure

```
├── api/                           # Vercel Serverless Functions
│   ├── _lib/
│   │   ├── emailService.js        # Resend email notification dispatcher with HTML templates
│   │   └── levelData.js           # Server-side levels config, questions, clues & letters
│   ├── levels-meta.js             # GET public level metadata (no passwords/letters exposed)
│   ├── submit-answer.js           # POST Step 1 personal answer submission & email
│   └── verify-password.js         # POST Step 2 password validation & letter reveal
├── src/
│   ├── components/
│   │   ├── AmbientMusicPlayer.jsx # Web Audio romantic background harp player
│   │   ├── FloatingBalloons.jsx   # 3D heart balloons with floating animation
│   │   ├── LevelCard.jsx          # Two-step question form & unlock coordinator
│   │   ├── OpeningEnvelope.jsx    # 3D sealed envelope with wax seal & unfold effect
│   │   ├── ProgressBar.jsx        # Chapter progress bar & step navigation
│   │   ├── TypewriterLetter.jsx   # Love letter parchment with typewriter reveal
│   │   └── finale/
│   │       ├── CertificateOfLove.jsx # Printable "Owner of My Heart" certificate
│   │       ├── FinalCelebration.jsx  # Grand 21st celebration layout & tabs
│   │       ├── GrandLetter.jsx       # 21st birthday letter with live editor
│   │       ├── LoveTimeline.jsx      # Relationship milestone timeline
│   │       ├── PolaroidWall.jsx      # Scrapbook polaroids with image upload
│   │       └── SecretCapsule.jsx     # Final hidden surprise heart capsule
│   ├── data/
│   │   └── timelineData.js        # Couple's personal relationship milestones
│   ├── styles/
│   │   ├── animations.css         # Keyframe animations (shake, float, glow, pulse)
│   │   ├── components.css         # UI control styling and form layouts
│   │   ├── finale.css             # Grand celebration and certificate styling
│   │   ├── paper3d.css            # 3D paper cutouts, wax seals, washi tape, polaroids
│   │   └── variables.css          # Color palette tokens, fonts, and shadows
│   ├── utils/
│   │   ├── confettiBurst.js       # Romantic heart confetti & firework explosions
│   │   └── soundSynth.js          # Synthesized Web Audio harp chords & SFX
│   ├── App.jsx                    # Root React component
│   └── index.css                  # Core CSS & page atmospheric glows
├── .env.example                   # Template configuration file
├── vercel.json                    # Vercel deployment configuration
└── package.json                   # Project scripts and dependencies
```

---

## 🔒 Security & Privacy Highlights

- **Server-Side Validation**: Passwords and love letters are kept strictly on the backend (`api/_lib/levelData.js`).
- **No Leaked Secrets**: The client only receives a level's love letter after the server verifies the correct password.
- **Private Credentials**: Resend API keys and email configurations are managed via server-side environment variables and are never bundled into client JavaScript.
- **Fail-Safe Operation**: If email delivery ever encounters an issue, the user is notified honestly without exposing sensitive server stack traces or crashing the website.
