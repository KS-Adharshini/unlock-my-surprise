// Serverless API: POST /api/submit-answer
// Handles Step 1 personal question submission and sends email notification
import { getLevelsConfig } from './_lib/levelData.js';
import { sendSubmissionEmail } from './_lib/emailService.js';

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

    const { levelId, personalAnswer } = body || {};

    if (!levelId || !personalAnswer || typeof personalAnswer !== 'string' || !personalAnswer.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please provide both the level ID and your personal answer.',
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

    // Send email notification for personal answer
    const emailResult = await sendSubmissionEmail({
      type: 'personal_answer',
      levelId: currentLevel.id,
      levelTitle: currentLevel.title,
      question: currentLevel.personalQuestion,
      submittedContent: personalAnswer.trim(),
      unlocked: false,
      timestamp: new Date().toISOString(),
    });

    let emailFeedback = null;
    if (emailResult.sent) {
      emailFeedback = 'Email notification sent to her inbox! 💌';
    } else if (emailResult.devMode) {
      emailFeedback = 'Saved! (Email logged to local server console)';
    } else {
      emailFeedback = 'Answer saved! (Email notification could not be delivered: ' + (emailResult.error || 'delivery error') + ')';
    }

    return res.status(200).json({
      success: true,
      emailSent: Boolean(emailResult.sent),
      emailFeedback,
      message: 'Your personal answer was received with all my love! Now, can you solve the secret password to unlock your love letter?',
    });
  } catch (err) {
    console.error('Error submitting personal answer:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected server error occurred while processing your answer.',
    });
  }
}
