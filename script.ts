import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {

  // await prisma.user.createMany({
  //   data: [
  //     {
  //       name: 'Sally',
  //       age: 10,
  //       email: 'sally1251@gmail.com'
  //     }
  //   ]
  // })
  
  const user = await prisma.user.findMany({
   where: {
    name: "Sally",
    age: { lt: 20}
   },
   
  });

  console.log(user);
}

main()
  .catch((e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
