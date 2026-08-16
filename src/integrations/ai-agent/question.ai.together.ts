import Together from 'together-ai';

import { z } from 'zod';
export async function QuestionTogetherAi<T extends z.Schema>(question: string, choiceSchema: T,systemContent:string) : Promise<z.infer<T> | null> {
  const together = new Together();


  const jsonSchema = z.toJSONSchema(choiceSchema);
  const extract = await together.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `${systemContent}, Only answer in JSON and follow this schema ${JSON.stringify(choiceSchema)}.`,
        },
        {
          role: "user",
          content: question,
        },
      ],
      model: "Qwen/Qwen3.5-9B",
      reasoning: { enabled: false },
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "answer",
          schema: jsonSchema,
        },
      },
    });

  if (extract?.choices?.[0]?.message?.content) {
    return JSON.parse(extract.choices[0].message.content);
  } else {
    return null;
  }

}
