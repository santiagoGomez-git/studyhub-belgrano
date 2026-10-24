class Vista {
    constructor() {
        this.pantallas = {
            'pantalla-home': document.getElementById('pantalla-home'),
            'pantalla-apuntes': document.getElementById('pantalla-apuntes'),
            'pantalla-calendario': document.getElementById('pantalla-calendario')
        };
        this.botonesNav = document.querySelectorAll('.nav-btn, .nav-trigger');
        this.contenedorApuntes = document.getElementById('contenedor-apuntes');
        this.contadorApuntes = document.getElementById('contador-apuntes');
        
        // NUEVO: Capturar contenedores
        this.contenedorFiltros = document.getElementById('contenedor-filtros');
        this.contenedorCalendario = document.getElementById('contenedor-calendario');
    }

    // Métodos existentes (cambiarPantalla, renderizarApuntes, actualizarContadorApuntes, bindNavegacion)...

    // NUEVO: Renderizar filtros
    renderizarFiltros(categorias) {
        this.contenedorFiltros.innerHTML = categorias.map((cat, index) => `
            <button data-id="${cat.id}" class="btn-filtro px-4 py-1.5 ${index === 0 ? 'bg-blue-600 text-white shadow-sm font-semibold' : 'bg-white text-slate-600 border border-slate-200 font-medium hover:bg-slate-50'} text-xs rounded-full whitespace-nowrap snap-inner transition-all">
                ${cat.label}
            </button>
        `).join('');
    }

    // NUEVO: Renderizar calendario
    renderizarCalendario(eventos) {
        this.contenedorCalendario.innerHTML = eventos.map(evento => `
            <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                <div class="flex gap-4">
                    <div class="text-center min-w-[60px]">
                        <p class="text-xs text-slate-500 uppercase">${evento.mesStr}</p>
                        <p class="text-3xl font-bold text-slate-900">${evento.dia}</p>
                    </div>
                    <div class="flex-1">
                        <span class="inline-block bg-${evento.color}-100 text-${evento.color}-600 text-[10px] font-bold uppercase px-2 py-1 rounded-full mb-2">${evento.tipo}</span>
                        <h3 class="font-semibold text-slate-900">${evento.materia}</h3>
                        <p class="mt-1 text-xs text-slate-500">${evento.detalle}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // NUEVO: Escuchar clics en los filtros
    bindFiltros(handler) {
        const botonesFiltro = document.querySelectorAll('.btn-filtro');
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', (e) => {
                // Actualizar estilos visuales del botón activo
                botonesFiltro.forEach(b => {
                    b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm', 'font-semibold');
                    b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200', 'font-medium', 'hover:bg-slate-50');
                });
                const btnActivo = e.currentTarget;
                btnActivo.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200', 'font-medium', 'hover:bg-slate-50');
                btnActivo.classList.add('bg-blue-600', 'text-white', 'shadow-sm', 'font-semibold');

                // Enviar el ID al controlador
                handler(btnActivo.dataset.id);
            });
        });
    }
}