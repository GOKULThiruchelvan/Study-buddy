import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBnR5nVIOZb13YA3bTzD-zStNtJsBpCJHA');

export async function generateSummary(text: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Please provide a comprehensive summary of the following text, highlighting key points and main ideas: ${text}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateStudyPlan(topic: string, duration: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Create a detailed study plan for ${topic} over ${duration}. Include:
  1. Learning objectives
  2. Daily/weekly schedule
  3. Key topics to cover
  4. Recommended resources
  5. Practice exercises
  Format as JSON with appropriate structure.`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}

export async function getAnswerWithContext(question: string, context?: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = context 
    ? `Using this context: "${context}", answer the following question: ${question}`
    : `Answer this question comprehensively: ${question}`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateQuiz(topic: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Create a quiz about ${topic} with 5 multiple-choice questions. Format as JSON array with question, options (array), and correctAnswer fields.`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}

export async function analyzeStudyMaterial(text: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Analyze this study material and provide:
  1. Key concepts
  2. Important terms and definitions
  3. Main takeaways
  4. Suggested practice questions
  Text: ${text}`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateFlashcards(topic: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Create 5 flashcards for studying ${topic}. Format as JSON array with question and answer fields.`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}

export async function getPeerRecommendations(interests: string[], level: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Suggest study group activities and collaboration strategies for a student with these interests: ${interests.join(', ')} at ${level} level.`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function getAITutorResponse(question: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `As an AI tutor, provide a detailed and educational response to: ${question}. Include examples and explanations where appropriate.`;
  
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function generateLearningPath(topic: string, currentLevel: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const prompt = `Create a personalized learning path for ${topic} starting from ${currentLevel} level. Include:
  1. Prerequisites
  2. Learning milestones
  3. Recommended resources
  4. Practice projects
  Format as JSON with appropriate structure.`;
  
  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}