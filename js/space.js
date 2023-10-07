const btnBuscar = document.getElementById("btnBuscar");

btnBuscar.addEventListener("click", () => {
  buscarImagenes();
});

async function buscarImagenes() {
  const buscar = document.getElementById("inputBuscar").value;

  try {
    const response = await fetch(
      `https://images-api.nasa.gov/search?q=${buscar}`
    );

    if (response.status === 200) {
      const data = await response.json();
      const items = data.collection.items;

      const promesasFetch = items
        .filter(
          (item) => item.data && item.data[0] && item.links && item.links[0]
        )
        .map((item) => {
          const titulo = item.data[0].title.split(" ").slice(0, 2).join(" ");
          const fecha = new Date(item.data[0].date_created);
          const descripcion = item.data[0].description;
          const imagen = item.links[0].href;

          return `<div class="card">
                    <img src="${imagen}" class="card-img-top" alt="${titulo}">
                    <div class="card-body">
                      <h5 class="card-title">${titulo}</h5>
                      <p class="card-text overflow-auto">${descripcion}</p>
                      <p class="card-text"><small class="text-body-secondary">Date created: ${fecha.getUTCDay()}/${fecha.getUTCMonth()}/${fecha.getUTCFullYear()}</small></p>
                    </div>
                  </div>`;
        });

      Promise.all(promesasFetch).then((resultadosHTML) => {
        const HTMLfinal = resultadosHTML.join("");
        document.querySelector("#contenedor").innerHTML = HTMLfinal;
      });
    } else {
      alert("Error al obtener los objetos.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
