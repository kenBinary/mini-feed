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

  const videos = [
    {
      title: "Learn Modern TypeScript",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnailUrl:
        "https://placehold.co/800x450/3178c6/white?text=Learn+Modern+TypeScript",
    },
    {
      title: "Advanced Express API",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnailUrl:
        "https://placehold.co/800x450/333333/white?text=Advanced+Express+API",
    },
    {
      title: "Prisma 7 Deep Dive",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnailUrl:
        "https://placehold.co/800x450/0c344b/white?text=Prisma+7+Deep+Dive",
    },
    {
      title: "Neon Serverless Postgres",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      thumbnailUrl:
        "https://placehold.co/800x450/00e599/black?text=Neon+Serverless+Postgres",
    },
    {
      title: "Clean Architecture in Node",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      thumbnailUrl:
        "https://placehold.co/800x450/1e293b/white?text=Clean+Architecture+in+Node",
    },
    {
      title: "React Performance Tips",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
      thumbnailUrl:
        "https://placehold.co/800x450/20232a/61dafb?text=React+Performance+Tips",
    },
    {
      title: "Understanding Zod",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
      thumbnailUrl:
        "https://placehold.co/800x450/3068b7/white?text=Understanding+Zod",
    },
    {
      title: "Deploying to AWS",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
      thumbnailUrl:
        "https://placehold.co/800x450/232f3e/ff9900?text=Deploying+to+AWS",
    },
    {
      title: "REST vs GraphQL",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4",
      thumbnailUrl:
        "https://placehold.co/800x450/e10098/white?text=REST+vs+GraphQL",
    },
    {
      title: "Next.js 15 Features",
      videoUrl:
        "https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
      thumbnailUrl:
        "https://placehold.co/800x450/000000/white?text=Next.js+15+Features",
    },
  ];

  for (const v of videos) {
    await prisma.video.create({
      data: v,
    });
  }
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
