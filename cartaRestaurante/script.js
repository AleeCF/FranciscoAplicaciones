document.addEventListener("DOMContentLoaded", function (event) {

    let template = document.querySelector("#plantilla-carta")
    let platos = document.querySelector("section#platos div")

    const url = 'https://63cff7c8e52f587829a90675.mockapi.io/api/v1/carta'

    fetch(url)
        .then((result) => {
            if (result.ok)
                return result.json()
        })
        .then((output) => {

            output.forEach(function (plato) {

                let el = template.content.cloneNode(true);

                let div = el.querySelector('.plato')

                div.setAttribute('data-veganos', plato.veganos)
                div.setAttribute('data-celiacos', plato.celiacos)
                div.setAttribute('data-intolerantes', plato.intolerantes)

                el.querySelector("h4").textContent = plato.nombrePlato
                el.querySelector("img").setAttribute("src", plato.imagen)
                el.querySelector("p.ingredientes").textContent = plato.ingredientes
                el.querySelector("p.precio").textContent = plato.precio

                platos.appendChild(el)

            })

        }).catch(err => console.error(err))

    // Se cogen todos los botones li recorriéndolos y se les mete el evento click.
    document.querySelectorAll('li[data-filtro]').forEach( li => li.addEventListener('click', function (){ mostrarPlatos(this.getAttribute('data-filtro'))}))

    function mostrarPlatos(tipoPlato) {

        if (tipoPlato == "") {

            mostrarTodoPlatos();

        } else {

            ocultarTodoPlatos();

            document.querySelectorAll('[data-' + tipoPlato + '=true]').forEach(plato => plato.classList.remove('hide'));

        }
    }

    function ocultarTodoPlatos() {

        document.querySelectorAll('.plato').forEach(pl => pl.classList.add('hide')) 

    }

    function mostrarTodoPlatos() {

        document.querySelectorAll('.plato').forEach(pl => pl.classList.remove('hide')) 

    }

    let orden = 'desc';

    document.querySelector('#ordenar').addEventListener('click',function () {
    
        if (orden === 'desc') {

            orden = 'asc';

        } else {

            orden = 'desc';

        }

        let carta = document.querySelector("section#platos div");
        let items = Array.from(carta.children);
        
        items.sort(function(a,b) {
            
            let aPrecio = parseFloat(a.querySelector('p.precio').textContent);
            let bPrecio = parseFloat(b.querySelector('p.precio').textContent);

            if (orden === 'asc') {

                return aPrecio - bPrecio;

            } else {

                return bPrecio - aPrecio;

            }
        
        });

        carta.innerHTML = '';
        carta.append(...items);

    })

})