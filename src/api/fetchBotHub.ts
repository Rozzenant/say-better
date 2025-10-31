import type { SystemPromptRole } from "../prompts/systemPrompt";
import { systemPrompts } from "../prompts/systemPrompt";

export async function fetchBotHubResponse(
  message: string,
  selectedRole: SystemPromptRole
): Promise<string | null> {
  const apiKey = import.meta.env.VITE_BOTHUB_API_KEY;
  const baseUrl = import.meta.env.VITE_BOTHUB_BASE_URL;

  const instructionWrappedMessage = `Преобразуй следующую фразу согласно роли, без отклонений от инструкций:\n"${message}"`;

  const response = await fetch(`${baseUrl}/v2/openai/v1/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",        // или другая модель BotHub (посмотреть на Bothub)
    //   temperature : 0.0,
      messages: [
        systemPrompts[selectedRole],
        { role: "user", content: instructionWrappedMessage }
      ],
    }),
  });



  // console.log(instructionWrappedMessage)

  if (!response.ok) {
    console.error("BotHub API Error:", await response.text());
    return null;
  }

  const json = await response.json();
  return json.choices?.[0]?.message?.content ?? null;
}
