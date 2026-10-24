class Controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.iniciarApp();
        this.vista.bindNavegacion(this.manejarNavegacion.bind(this));
    }

    iniciarApp() {
        const apuntes = this.modelo.obtenerTodosLosApuntes();
        const cantidad = this.modelo.obtenerCantidadApuntes();
        // NUEVO: Obtener datos adicionales
        const categorias = this.modelo.obtenerCategorias();
        const eventos = this.modelo.obtenerEventos();
        
        this.vista.renderizarApuntes(apuntes);
        this.vista.actualizarContadorApuntes(cantidad);
        
        // NUEVO: Enviar a la vista
        this.vista.renderizarFiltros(categorias);
        this.vista.renderizarCalendario(eventos);
        
        // NUEVO: Activar el escuchador de eventos de los filtros
        this.vista.bindFiltros(this.manejarFiltro.bind(this));
    }

    manejarNavegacion(idPantalla) {
        this.vista.cambiarPantalla(idPantalla);
    }

    // NUEVO: Función para actualizar las tarjetas cuando se filtra
    manejarFiltro(categoriaId) {
        const apuntesFiltrados = this.modelo.obtenerApuntesPorCategoria(categoriaId);
        this.vista.renderizarApuntes(apuntesFiltrados);
    }
}