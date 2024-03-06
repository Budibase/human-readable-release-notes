import * as core from "@actions/core";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: core.getInput("openai_api_key") });

async function run() {
  try {
    const releaseNotesb64 = core.getInput("release_notes");
    const releaseNotes = Buffer.from(releaseNotesb64, "base64").toString(
      "utf-8",
    );

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes release notes in layman terms for non-technical users and formats the summary in Markdown.",
        },
        {
          role: "user",
          content: `Please summarize the following release notes in Markdown: ${releaseNotes}`,
        },
      ],
    });

    const response = completion.choices[0].message.content;

    const markdownResponse = `### Summary\n\n${response}`;

    core.setOutput("human_readable_notes", markdownResponse);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
