import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  await prisma.eventCategories.upsert({
    where: { categoryName: 'Product Launch' },
    update: {},
    create: {
      categoryName: 'Product Launch',
      status: false,
    },
  });
  await prisma.eventCategories.upsert({
    where: { categoryName: 'Seminar' },
    update: {},
    create: {
      categoryName: 'Seminar',
      status: false,
    },
  });
  await prisma.eventCategories.upsert({
    where: { categoryName: 'Web Event' },
    update: {},
    create: {
      categoryName: 'Web Event',
      status: false,
    },
  });
  await prisma.eventCategories.upsert({
    where: { categoryName: 'Conference' },
    update: {},
    create: {
      categoryName: 'Conference',
      status: false,
    },
  });

  await prisma.roles.upsert({
    where: { roleName: 'Admin' },
    update: {},
    create: { roleName: 'Admin', description: 'Manages the application.' },
  });

  await prisma.sponsors.upsert({
    where: { id: 1 },
    update: {},
    create: {
      sponsorName: 'Sponsor 1',
      sponsorLogo: '/img/sp1.jpeg',
      sponsorWebLink: 'www.sponsor.com',
    },
  });

  await prisma.venue.upsert({
    where: { id: 1 },
    update: {},
    create: {
      venueName: 'Big Field A',
      venueAddress: 'Lucky Square, Nutcracker Road A981',
      venueCity: 'City B',
      venueDesc: 'The activity will be held .',
      venueGMapsLocation: '',
      latitude: '',
      longitude: '',
    },
  });

  console.log('Database seeded.');
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
