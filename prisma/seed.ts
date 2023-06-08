import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { groupedOptions } from "../src/utils/categories";

const mappedCourses = groupedOptions.map((data) => {
  return {
    name: data.label,
    sigle: data.value,
    subcategories: data.options.map((sub) => {
      return {
        name: sub.label,
        sigle: sub.value,
      };
    }),
  };
});

async function main() {
  let categories = [] as any;

  for (let i = 0; i < mappedCourses.length; i++) {
    const element = mappedCourses[i];
    const category = await prisma.category.create({
      data: {
        name: element.name,
        sigle: element.sigle,
        subCategories: {
          createMany: {
            data: element.subcategories,
          },
        },
      },
    });
    categories.push(category);
  }
  return categories;
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
