class Controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.categoriaActual = 'todos';
        this.iniciarApp();
        this.vista.bindNavegacion(this.manejarNavegacion.bind(this));
    }

    iniciarApp() {
        const cantidad = this.modelo.obtenerCantidadApuntes();
        const categorias = this.modelo.obtenerCategorias();
        
        this.actualizarVistaApuntes();
        this.actualizarVistaCalendario();
        
        this.vista.actualizarContadorApuntes(cantidad);
        this.vista.renderizarFiltros(categorias);
        
        this.vista.bindFiltros(this.manejarFiltro.bind(this));
        this.vista.bindAgregarEvento(this.manejarNuevoEvento.bind(this)); 

        const selectorRol = document.getElementById('selector-rol-global');
        if(selectorRol) {
            selectorRol.addEventListener('change', (e) => {
                this.aplicarPermisosRol(e.target.value);
            });
        }
        this.aplicarPermisosRol('estudiante');
    }

    aplicarPermisosRol(rol) {
        const botonAgregar = document.querySelector('#form-evento button');
        
        if (rol === 'profesor') {
            botonAgregar.textContent = 'Publicar Parcial Oficial';
            botonAgregar.classList.remove('bg-blue-600', 'hover:bg-blue-700');
            botonAgregar.classList.add('bg-red-600', 'hover:bg-red-700');
        } else {
            botonAgregar.textContent = 'Guardar Evento Personal';
            botonAgregar.classList.remove('bg-red-600', 'hover:bg-red-700');
            botonAgregar.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }
    }

    actualizarVistaApuntes() {
        const apuntes = this.modelo.obtenerApuntesPorCategoria(this.categoriaActual);
        const favoritos = this.modelo.obtenerFavoritos();
        
        this.vista.renderizarApuntes(apuntes, favoritos);
        this.vista.bindFavoritos(this.manejarFavorito.bind(this));
    }

    actualizarVistaCalendario() {
        const eventos = this.modelo.obtenerEventos();
        this.vista.renderizarCalendario(eventos);
        this.vista.renderizarAlertas(eventos);
        this.vista.bindEliminarEvento(this.manejarEliminarEvento.bind(this));
    }

    manejarNavegacion(idPantalla) {
        this.vista.cambiarPantalla(idPantalla);
    }

    manejarFiltro(categoriaId) {
        this.categoriaActual = categoriaId;
        this.actualizarVistaApuntes();
    }

    manejarFavorito(id) {
        this.modelo.toggleFavorito(id);
        this.actualizarVistaApuntes();
    }

    manejarNuevoEvento(datosEvento) {
        this.modelo.agregarEvento(datosEvento);
        this.actualizarVistaCalendario();
    }

    manejarEliminarEvento(id) {
        this.modelo.eliminarEvento(id);
        this.actualizarVistaCalendario();
    }
}