import * as core from "@actions/core";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: core.getInput("openai_api_key") });

async function run() {
  try {
    const releaseNotesb64 = core.getInput("release_notes");
    const releaseNotes = atob(releaseNotesb64);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes release notes in layman terms for non-technical users.",
        },
        {
          role: "user",
          content: `Summarize the following release notes: ${releaseNotes}`,
        },
      ],
    });

    const response = completion.choices[0].message.content;
    core.setOutput("human_readable_notes", response);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
