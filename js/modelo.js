class Modelo {
    constructor() {
        this.apuntes = [
        { id: 1, categoria: 'interfaces', badge: 'Interfaces', titulo: 'Patrones de Diseño UI y UX Móvil', profesor: 'Prof. M. Belgrano', color: 'blue' },
        { id: 2, categoria: 'bd', badge: 'Base de Datos', titulo: 'Normalización y Reglas de Negocio', profesor: 'Ing. G. Villaro', color: 'emerald' },
        { id: 3, categoria: 'ingles', badge: 'Inglés', titulo: 'Technical English for SysAdmins', profesor: 'Lic. J. Gómez', color: 'amber' },
        { id: 4, categoria: 'interfaces', badge: 'Interfaces', titulo: 'Heurísticas de Nielsen', profesor: 'Prof. M. Belgrano', color: 'blue' },
        { id: 5, categoria: 'bd', badge: 'Base de Datos', titulo: 'Consultas SQL Avanzadas', profesor: 'Ing. G. Villaro', color: 'emerald' },
        { id: 6, categoria: 'ingles', badge: 'Inglés', titulo: 'Tech Vocabulary Glossary', profesor: 'Lic. J. Gómez', color: 'amber' }
    ];

        this.categorias = [
            { id: 'todos', label: 'Todos' },
            { id: 'favoritos', label: '⭐ Favoritos' },
            { id: 'interfaces', label: 'Interfaces' },
            { id: 'bd', label: 'Base de Datos' },
            { id: 'ingles', label: 'Inglés' }
        ];

        // REEMPLAZO: Lógica con LocalStorage y fechas reales para el calendario
        const eventosGuardados = JSON.parse(localStorage.getItem('studyhub_eventos'));
        if (eventosGuardados && eventosGuardados.length > 0) {
            this.eventos = eventosGuardados;
        } else {
            this.eventos = [
                { id: 1, fecha: '2026-10-29', mesStr: 'Oct', dia: '29', tipo: 'Parcial', materia: 'Arq. y Diseño de Interfaces', detalle: 'Examen Parcial Nro 2', color: 'red' }
            ];
            localStorage.setItem('studyhub_eventos', JSON.stringify(this.eventos));
        }

        this.favoritos = JSON.parse(localStorage.getItem('studyhub_favoritos')) || [];
    }

    obtenerTodosLosApuntes() { return this.apuntes; }
    obtenerApuntesPorCategoria(categoria) {
        if (categoria === 'todos') return this.apuntes;
        if (categoria === 'favoritos') return this.apuntes.filter(apunte => this.favoritos.includes(apunte.id));
        return this.apuntes.filter(apunte => apunte.categoria === categoria);
    }
    obtenerCantidadApuntes() { return this.apuntes.length; }

    obtenerCategorias() { return this.categorias; }
    obtenerEventos() { return this.eventos; }

    obtenerFavoritos() {
        return this.favoritos;
    }

    toggleFavorito(id) {
        const index = this.favoritos.indexOf(id);
        if (index === -1) {
            this.favoritos.push(id); // (Create)
        } else {
            this.favoritos.splice(index, 1); // (Delete)
        }
        // Persistir en memoria (Update)
        localStorage.setItem('studyhub_favoritos', JSON.stringify(this.favoritos));
    }

    // NUEVO MÉTODO PARA EL CRUD DEL CALENDARIO:
    agregarEvento(nuevoEvento) {
        nuevoEvento.id = Date.now();
        this.eventos.push(nuevoEvento);
        localStorage.setItem('studyhub_eventos', JSON.stringify(this.eventos));
    }

    eliminarEvento(id) {
        this.eventos = this.eventos.filter(e => e.id !== id);
        localStorage.setItem('studyhub_eventos', JSON.stringify(this.eventos));
    }
}