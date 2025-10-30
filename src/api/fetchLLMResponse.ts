import { systemPrompts } from "../prompts/systemPrompt";
import type { SystemPromptRole } from "../prompts/systemPrompt";

export async function fetchLLMResponse(message: string, selectedRole: SystemPromptRole): Promise<string | null> {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const systemPrompt = systemPrompts[selectedRole];

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "minimax/minimax-m2:free", 
      messages: [
        systemPrompt,
        { role: "user", content: message }
      ],
    }),
  });

  if (!response.ok) {
    console.error("LLM API Error:", await response.text());
    return null;
  }

  const json = await response.json();
  return json.choices?.[0]?.message?.content ?? null;
}
