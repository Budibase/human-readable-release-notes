// index.js
const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    const token = core.getInput('token');
    const releaseNotes = core.getInput('release_notes');

    const response = await axios.post(
      'https://api.openai.com/v4/completions',
      {
        model: "text-davinci-003",
        prompt: `Convert these release notes into a human-readable format:\n\n${releaseNotes}`,
        temperature: 0.7,
        max_tokens: 1024,
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    const humanReadableNotes = response.data.choices[0].text.trim();
    core.setOutput('human_readable_notes', humanReadableNotes);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
