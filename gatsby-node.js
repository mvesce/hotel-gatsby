exports.createPages = async ({ actions, graphql, reporter }) => {

  const { createPage } = actions;
  const resultado = await graphql(`
    query {
      allDatoCmsHabitacion {
        nodes {
          slug
        }
      }
    }
  `);

  if(resultado.errors) {
    reporter.panic('No hubo resultados ', resultado.errors);
  }

  //Si hay páginas crear archivos
  const habitaciones = resultado.data.allDatoCmsHabitacion.nodes;

  habitaciones.forEach(habitacion => {
    createPage({
      path: habitacion.slug,
      component: require.resolve("./src/components/habitaciones.js"),
      context: {
        slug: habitacion.slug
      },
      defer: true,
    });
  });
}
