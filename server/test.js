import axios from "axios";

const text = `Artificial Intelligence is transforming industries by enabling automation, improving decision making, and enhancing user experiences.`;

const run = async () => {
  const res = await axios.post("http://localhost:5000/summarize", {
    text
  });

  console.log("\n=== RESULT ===\n");
  console.log("Summary:", res.data.summary);
  console.log("\nKey Points:");
  res.data.keyPoints.forEach((p, i) =>
    console.log(`${i + 1}. ${p}`)
  );
  console.log("\nSentiment:", res.data.sentiment);
};

run();