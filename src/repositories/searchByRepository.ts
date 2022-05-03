import { prisma } from "../database.js";

async function findByDiscipline(discipline) {
    console.log(discipline)

    const terms = await prisma.term.findMany({
        include: {
            disciplines: {
              where: {
                name: discipline
              },
              select: {
                id: true,
                name:true,
                teacherDisciplines: {
                  select: {
                    id:true, 
                    teacher: true,
                    tests: {
                      select: {
                        id:true,
                        name: true,
                        pdfUrl:true,
                        views:true,
                        category: true,
                      },
                    },
                  },
                },

              },
            },

        },
  });
   
    //    const arr = [
    //     { id: '124', name: 'qqq' },
    //     { id: '589', name: 'www' }, 
    //     { id: '45', name: 'eee' }, 
    //     { id: '567', name: 'rrr' }];
    // const result = arr.map(({name, ...rest}) => ({...rest, title: name}));

    // const termsRename = terms.map(({number, ...rest}) => ({...rest, period: number}));
    const termsRenaming  = terms.map(({ number: period, ...cat }) => ({ period, ...cat }))

    return  termsRenaming 
}


async function findByTeacher(teacherName) {
  return prisma.teacherDiscipline.findMany({
    include: {
      teacher: true,
      discipline: true,
      tests: {
        include: {
          category: true,
        },
      },
    },
    where: {
      teacher: {
        name: teacherName,
      },
    },
    orderBy: {
      teacher: {
        name: "asc",
      },
    },
  });
}

export default { findByDiscipline, findByTeacher };