const apiKey = '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'; // Reemplaza con tu clave de API
//const prompt = 'Escribe aquí tu prompt';
const maxTokens = 50;

async function generateResponse(prompt) {
  // Hacer una solicitud POST a la API de OpenAI
  const response = await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt,
      max_tokens: maxTokens,
    })
  });

  // Analizar la respuesta JSON y obtener la respuesta generada por GPT-3
  const data = await response.json();
  const generatedText = data.choices[0].text;

  // Hacer algo con la respuesta generada
  console.log(generatedText);
}

// Llamar a la función para generar la respuesta
generateResponse("Enviamos la consulta");