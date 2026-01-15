// import { prisma } from "@/lib/prisma"

// async function main() {
//   const user = await prisma.user.create({
//     data: {
//       name: 'Alice',
//       email: 'alice@prisma.io',
//     },
//   })
//   console.log(user)
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

 import "dotenv/config";
  import { prisma } from "@/lib/prisma"




async function main() {
  const demoUserId = "d3e8431f-8751-4604-8f85-7a70179511ff";

  await prisma.product.createMany({
    data: Array.from({ length: 25 }).map((_, i) => ({
      userId: demoUserId,
      name: `Product ${i + 1}`,
      // price:(Math.random()*90+10).toFixed(2),
      price: Number((Math.random() * 90 + 10).toFixed(2)),
      quantity: Math.floor(Math.random() * 20),
      lowStock: 5,
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * (i * 5)),
    })),
  });
  console.log("Seed data created successfully!");
  console.log(`Created 25 products for user with ID: ${demoUserId}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
