import * as core from "@actions/core";
import OpenAI from "openai";

const openai = new OpenAI();

async function run() {
  try {
    const releaseNotes = core.getInput("release_notes");

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes release notes in human readable format for non-technical users.",
        },
        {
          role: "user",
          content: `Summarize the following release notes: ${releaseNotes}`,
        },
      ],
    });

    const humanReadableNotes = completion.data.choices[0].message.content;
    core.setOutput("human_readable_notes", humanReadableNotes);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
