// Serverless API: POST /api/verify-password
// Validates the secret password on the server and releases the love letter only on success
import { getLevelsConfig } from './_lib/levelData.js';
import { sendSubmissionEmail } from './_lib/emailService.js';

function normalizeDateOrText(str) {
  let s = String(str || '').trim().toLowerCase().replace(/^["']|["']$/g, '');
  // Remove ordinals like 1st, 2nd, 3rd, 4th, 5th, 13th, 15th, 21st
  s = s.replace(/\b(\d+)(st|nd|rd|th)\b/g, '$1');
  // Normalize slashes and dashes
  s = s.replace(/[-/]/g, ' ');
  // Collapse multiple spaces
  s = s.replace(/\s+/g, ' ').trim();
  return s;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (e) {
        return res.status(400).json({ error: 'Invalid JSON payload' });
      }
    }

    const { levelId, password, personalAnswer } = body || {};

    if (!levelId || password === undefined || password === null) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both the level ID and your password guess.',
      });
    }

    const numericLevelId = Number(levelId);
    const levels = getLevelsConfig();
    const currentLevel = levels.find((lvl) => lvl.id === numericLevelId);

    if (!currentLevel) {
      return res.status(404).json({
        success: false,
        error: 'Level not found.',
      });
    }

    const cleanInput = String(password).trim().toLowerCase().replace(/^["']|["']$/g, '');
    const normalizedInput = normalizeDateOrText(password);
    const digitsOnlyInput = cleanInput.replace(/\D/g, '');

    const isMatch = currentLevel.passwords.some((validPassword) => {
      const cleanValid = String(validPassword).trim().toLowerCase();
      const normalizedValid = normalizeDateOrText(validPassword);
      const digitsOnlyValid = cleanValid.replace(/\D/g, '');

      return (
        cleanInput === cleanValid ||
        normalizedInput === normalizedValid ||
        cleanInput === normalizedValid ||
        normalizedInput === cleanValid ||
        (digitsOnlyInput && digitsOnlyValid && digitsOnlyInput === digitsOnlyValid)
      );
    });

    if (!isMatch) {
      // Send email alert for incorrect attempt
      const emailResult = await sendSubmissionEmail({
        type: 'password_incorrect',
        levelId: currentLevel.id,
        levelTitle: currentLevel.title,
        question: currentLevel.passwordQuestion,
        submittedContent: `Attempted password: "${password}"`,
        unlocked: false,
        timestamp: new Date().toISOString(),
      });

      return res.status(200).json({
        success: false,
        message: 'Not quite, birthday boy! ❤️ Try again—your love letter is waiting.',
        emailSent: Boolean(emailResult.sent),
      });
    }

    // CORRECT PASSWORD!
    // Send email alert for correct unlock
    const emailResult = await sendSubmissionEmail({
      type: 'password_correct',
      levelId: currentLevel.id,
      levelTitle: currentLevel.title,
      question: currentLevel.passwordQuestion,
      submittedContent: `Correct password entered: "${password}"\n(Personal answer previously given: "${personalAnswer || 'Submitted'}")`,
      unlocked: true,
      timestamp: new Date().toISOString(),
    });

    return res.status(200).json({
      success: true,
      message: 'You unlocked my heart! Here is your love letter... 💌',
      loveLetter: currentLevel.loveLetter,
      nextLevel: currentLevel.id < 6 ? currentLevel.id + 1 : null,
      isFinalLevel: currentLevel.id === 6,
      emailSent: Boolean(emailResult.sent),
    });
  } catch (err) {
    console.error('Error verifying password:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred during verification.',
    });
  }
}
