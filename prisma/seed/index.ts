import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const run = async () => {
  if ((await prisma.favorites.count()) === 0) {
    await prisma.favorites.create({});
  } else {
    console.log('Default author already created');
  }
};

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
