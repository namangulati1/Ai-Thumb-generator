require('dotenv').config();
async function test() {
  const apiKey = process.env.AGENTROUTER_API_KEY;
  console.log("Key prefix:", apiKey.substring(0, 5));
  const response = await fetch('https://agentrouter.org/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "dall-e-3",
      prompt: "test",
    })
  });
  console.log("Status:", response.status);
  const text = await response.text();
  console.log("Response:", text.substring(0, 100));
}
test();
