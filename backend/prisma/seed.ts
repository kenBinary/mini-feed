import { PrismaClient } from "../generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";

import "dotenv/config";

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Start seeding...");

  await prisma.video.deleteMany();

  const baseVideos = [
    {
      file: "BigBuckBunny.mp4",
      baseTitle: "Learn Modern TypeScript",
      color: "3178c6/white",
    },
    {
      file: "ElephantsDream.mp4",
      baseTitle: "Advanced Express API",
      color: "333333/white",
    },
    {
      file: "ForBiggerBlazes.mp4",
      baseTitle: "Prisma Deep Dive",
      color: "0c344b/white",
    },
    {
      file: "ForBiggerEscapes.mp4",
      baseTitle: "Neon Serverless Postgres",
      color: "00e599/black",
    },
    {
      file: "ForBiggerFun.mp4",
      baseTitle: "Clean Architecture in Node",
      color: "1e293b/white",
    },
    {
      file: "ForBiggerJoyrides.mp4",
      baseTitle: "React Performance Tips",
      color: "20232a/61dafb",
    },
    {
      file: "ForBiggerMeltdowns.mp4",
      baseTitle: "Understanding Zod",
      color: "3068b7/white",
    },
    {
      file: "Sintel.mp4",
      baseTitle: "Deploying to AWS",
      color: "232f3e/ff9900",
    },
    {
      file: "SubaruOutbackOnStreetAndDirt.mp4",
      baseTitle: "REST vs GraphQL",
      color: "e10098/white",
    },
    {
      file: "TearsOfSteel.mp4",
      baseTitle: "Next.js Features",
      color: "000000/white",
    },
  ];

  const TOTAL_VIDEOS = 50;

  const videos = Array.from({ length: TOTAL_VIDEOS }, (_, i) => {
    const base = baseVideos[i % baseVideos.length];

    const title = `${base.baseTitle} #${i + 1}`;

    return {
      title,
      videoUrl: `https://storage.googleapis.com/gtv-videos-bucket/sample/${base.file}`,
      thumbnailUrl: `https://placehold.co/800x450/${base.color}?text=${encodeURIComponent(
        title
      )}`,
    };
  });

  await prisma.video.createMany({
    data: videos,
  });

  console.log(`Seeding finished. Inserted ${videos.length} videos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });