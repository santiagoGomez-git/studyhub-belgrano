class Modelo {
    constructor() {
        this.apuntes = [
            { id: 1, categoria: 'interfaces', badge: 'Interfaces', titulo: 'Patrones de Diseño UI y UX Móvil', profesor: 'Prof. M. Belgrano', color: 'blue' },
            { id: 2, categoria: 'bd', badge: 'Base de Datos', titulo: 'Normalización y Reglas de Negocio', profesor: 'Ing. G. Villaro', color: 'emerald' },
            { id: 3, categoria: 'ingles', badge: 'Inglés', titulo: 'Technical English for SysAdmins', profesor: 'Lic. J. Gómez', color: 'amber' }
        ];

        // NUEVO: Array de categorías para los filtros
        this.categorias = [
            { id: 'todos', label: 'Todos' },
            { id: 'interfaces', label: 'Interfaces' },
            { id: 'bd', label: 'Base de Datos' },
            { id: 'ingles', label: 'Inglés' }
        ];

        // NUEVO: Array de eventos para el calendario
        this.eventos = [
            { id: 1, mesStr: 'Jun', dia: '16', tipo: 'Parcial', materia: 'Arquitectura y Diseño de Interfaces', detalle: '🕘 09:00 hs • Sala de Computacion', color: 'red' },
            { id: 2, mesStr: 'Jun', dia: '23', tipo: 'TP', materia: 'Entrega Proyecto Integrador', detalle: '🕘 23:59 hs • Campus Virtual', color: 'orange' },
            { id: 3, mesStr: 'Jul', dia: '03', tipo: 'Final', materia: 'Inglés Técnico', detalle: '🕘 18:30 hs • Aula 3', color: 'emerald' },
            { id: 4, mesStr: 'Jul', dia: '11', tipo: 'Parcial', materia: 'Base de Datos', detalle: '🕘 10:00 hs • Aula 3', color: 'red' }
        ];
    }

    // Métodos existentes...
    obtenerTodosLosApuntes() { return this.apuntes; }
    obtenerApuntesPorCategoria(categoria) {
        if (categoria === 'todos') return this.apuntes;
        return this.apuntes.filter(apunte => apunte.categoria === categoria);
    }
    obtenerCantidadApuntes() { return this.apuntes.length; }

    // NUEVOS MÉTODOS:
    obtenerCategorias() { return this.categorias; }
    obtenerEventos() { return this.eventos; }
}