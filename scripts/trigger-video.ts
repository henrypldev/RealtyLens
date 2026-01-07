import { triggerVideoGeneration } from "@/lib/actions/video";

const videoProjectId = process.argv[2];

if (!videoProjectId) {
  console.error("Usage: tsx scripts/trigger-video.ts <videoProjectId>");
  process.exit(1);
}

async function main() {
  try {
    console.log(`Triggering video generation for project: ${videoProjectId}`);
    const result = await triggerVideoGeneration(videoProjectId);
    console.log("✅ Success:", result);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

main();
