
import { z } from 'zod';
import { QuestionTogetherAi } from './question.ai.together';
import fs from 'fs/promises';

export const choiceSchema = z.object({
  choices: z.array(
    z.object({
      correct: z.boolean(),
      choice: z.string().describe('multiple choice answer. Do not use emojis or links.'),
    }),
  ),
});




  export const marpThemeContentSchema = z.object({
  files: z.array(
    z.object({
      marpThemeFileType: z.enum(['css', 'htmltemplate']),
      content: z.string().describe('css or html template content'),
    }),
  ),
});
export async function QuizQuestion(question: string) {
  return QuestionTogetherAi(question, choiceSchema, "The following is quiz question, give back 3 wrong answers and 1 correct answer");
}
export async function CreateMarpTheme(question: string) {
  // read marptheme.md
  const marpThemeContent = await fs.readFile('src/integrations/ai-agent/marp-theme.md', 'utf8');
  const systemContent = "You are a marp theme creator. You are given a question and should return a marp theme that fits the question. you will retrieve html and css variables, these are the docs of a marp theme for reference:" + marpThemeContent;
  return QuestionTogetherAi(question, marpThemeContentSchema, systemContent);
}
