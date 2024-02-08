// index.js
const core = require("@actions/core");
const openai = require("openai");

async function run() {
  try {
    const releaseNotes = core.getInput("release_notes");

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes release notes in human readable format for non-technical users.",
        },
        {
          role: "user",
          content: "Summarize the following release notes: " + releaseNotes,
        },
      ],
      model: "gpt-3.5-turbo",
    });

    const humanReadableNotes = completion.choices[0];
    core.setOutput("human_readable_notes", humanReadableNotes);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
