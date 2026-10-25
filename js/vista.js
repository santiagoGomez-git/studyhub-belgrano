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
        this.contenedorFiltros = document.getElementById('contenedor-filtros');
        this.contenedorCalendario = document.getElementById('contenedor-calendario');
    }

    cambiarPantalla(idDestino) {
        Object.values(this.pantallas).forEach(pantalla => pantalla.classList.add('hidden'));
        this.pantallas[idDestino].classList.remove('hidden');

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('text-blue-600');
            btn.classList.add('text-slate-400');
            if(btn.dataset.target === idDestino) {
                btn.classList.add('text-blue-600');
                btn.classList.remove('text-slate-400');
            }
        });
        window.scrollTo(0, 0);
    }

    renderizarApuntes(apuntes, favoritos = []) {
        this.contenedorApuntes.innerHTML = apuntes.map(apunte => {
            const esFav = favoritos.includes(apunte.id);
            const iconRelleno = esFav ? 'font-variation-settings: "FILL" 1;' : 'font-variation-settings: "FILL" 0;';
            const colorBtn = esFav ? 'text-amber-500 bg-amber-50' : 'text-slate-400 bg-slate-50 hover:bg-slate-100';

            return `
            <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between gap-4">
                <div class="space-y-1 min-w-0 flex-1">
                    <span class="inline-block px-2 py-0.5 bg-${apunte.color}-50 text-${apunte.color}-600 text-[10px] font-bold uppercase rounded tracking-wide">${apunte.badge}</span>
                    <h3 class="font-semibold text-sm text-slate-800 line-clamp-1">${apunte.titulo}</h3>
                    <p class="text-xs text-slate-400 flex items-center gap-1">
                        <span class="material-symbols-outlined text-sm">person</span> ${apunte.profesor}
                    </p>
                </div>
                <div class="flex gap-2">
                    <button data-id="${apunte.id}" class="btn-favorito p-2.5 rounded-xl transition-all border border-slate-100 flex-shrink-0 ${colorBtn}" style="${iconRelleno}">
                        <span class="material-symbols-outlined text-xl">bookmark</span>
                    </button>
                    <button class="p-2.5 bg-slate-50 text-slate-700 hover:bg-${apunte.color}-50 hover:text-${apunte.color}-600 rounded-xl transition-all border border-slate-100 flex-shrink-0">
                        <span class="material-symbols-outlined text-xl">download</span>
                    </button>
                </div>
            </div>
            `;
        }).join('');
    }

    actualizarContadorApuntes(cantidad) {
        this.contadorApuntes.textContent = cantidad;
    }

    renderizarFiltros(categorias) {
        this.contenedorFiltros.innerHTML = categorias.map((cat, index) => `
            <button data-id="${cat.id}" class="btn-filtro px-4 py-1.5 ${index === 0 ? 'bg-blue-600 text-white shadow-sm font-semibold' : 'bg-white text-slate-600 border border-slate-200 font-medium hover:bg-slate-50'} text-xs rounded-full whitespace-nowrap snap-inner transition-all">
                ${cat.label}
            </button>
        `).join('');
    }

    renderizarCalendario(eventos) {
        this.contenedorCalendario.innerHTML = eventos.map(evento => `
            <div class="bg-white rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 relative group">
                <button data-id="${evento.id}" class="btn-eliminar-evento absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <span class="material-symbols-outlined">delete</span>
                </button>
                <div class="flex gap-4">
                    <div class="text-center min-w-[60px]">
                        <p class="text-xs md:text-sm text-slate-500 uppercase">${evento.mesStr}</p>
                        <p class="text-3xl md:text-5xl font-bold text-slate-900">${evento.dia}</p>
                    </div>
                    <div class="flex-1 pr-6">
                        <span class="inline-block bg-${evento.color}-100 text-${evento.color}-600 text-[10px] md:text-xs font-bold uppercase px-2 py-1 rounded-full mb-2">${evento.tipo}</span>
                        <h3 class="font-semibold text-slate-900 md:text-lg">${evento.materia}</h3>
                        <p class="mt-1 text-xs md:text-sm text-slate-500">${evento.detalle}</p>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderizarAlertas(eventos) {
        const contenedor = document.getElementById('contenedor-alertas');
        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0);

        // Filtra eventos futuros, los ordena por fecha y toma máximo 3
        const eventosFuturos = eventos
            .filter(e => new Date(e.fecha + 'T12:00:00') >= hoy)
            .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
            .slice(0, 3);

        if (eventosFuturos.length === 0) {
            contenedor.innerHTML = `<p class="text-sm md:text-base text-slate-500 italic p-2">No hay eventos próximos.</p>`;
            return;
        }

        // Dibuja cada evento con su respectivo color según urgencia
        contenedor.innerHTML = eventosFuturos.map(proximo => {
            const fechaProximo = new Date(proximo.fecha + 'T12:00:00');
            const diasRestantes = Math.ceil((fechaProximo - hoy) / (1000 * 60 * 60 * 24));

            let color = 'blue';
            if (diasRestantes <= 7) color = 'red';
            else if (diasRestantes <= 21) color = 'amber';

            let textoDias = diasRestantes === 0 ? 'Hoy' : `Faltan ${diasRestantes} días`;

            return `
                <div class="p-3 md:p-4 bg-${color}-50 border-l-4 border-${color}-500 rounded-r-xl mb-3 last:mb-0 shadow-sm transition-all hover:bg-${color}-100">
                    <p class="text-xs md:text-sm text-${color}-600 font-bold uppercase tracking-wider flex justify-between items-center">
                        <span>${textoDias} (${proximo.dia} ${proximo.mesStr})</span>
                        <span class="text-[10px] bg-${color}-200 px-2 py-0.5 rounded-full">${proximo.tipo}</span>
                    </p>
                    <p class="text-sm md:text-lg font-semibold text-slate-800 mt-1 line-clamp-1">${proximo.materia}</p>
                </div>
            `;
        }).join('');
    }

    bindNavegacion(handler) {
        this.botonesNav.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const idDestino = e.currentTarget.dataset.target;
                if (idDestino) {
                    handler(idDestino);
                }
            });
        });
    }

    bindFiltros(handler) {
        const botonesFiltro = document.querySelectorAll('.btn-filtro');
        botonesFiltro.forEach(boton => {
            boton.addEventListener('click', (e) => {
                botonesFiltro.forEach(b => {
                    b.classList.remove('bg-blue-600', 'text-white', 'shadow-sm', 'font-semibold');
                    b.classList.add('bg-white', 'text-slate-600', 'border', 'border-slate-200', 'font-medium', 'hover:bg-slate-50');
                });
                const btnActivo = e.currentTarget;
                btnActivo.classList.remove('bg-white', 'text-slate-600', 'border', 'border-slate-200', 'font-medium', 'hover:bg-slate-50');
                btnActivo.classList.add('bg-blue-600', 'text-white', 'shadow-sm', 'font-semibold');
                handler(btnActivo.dataset.id);
            });
        });
    }

    bindFavoritos(handler) {
        const botonesFav = document.querySelectorAll('.btn-favorito');
        botonesFav.forEach(boton => {
            boton.addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.dataset.id);
                handler(id);
            });
        });
    }

    bindAgregarEvento(handler) {
        const form = document.getElementById('form-evento');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const materia = document.getElementById('input-materia').value;
            const fechaInput = document.getElementById('input-fecha').value;
            
            // Lee el rol directamente de la barra de navegación
            const rol = document.getElementById('selector-rol-global').value;
            
            const fechaObj = new Date(fechaInput + 'T12:00:00');
            const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            
            // Asigna colores y textos según el rol seleccionado
            const tipo = rol === 'profesor' ? 'Parcial' : 'Personal';
            const color = rol === 'profesor' ? 'red' : 'blue';
            const detalle = rol === 'profesor' ? 'Agregado por el Profesor' : 'Agregado por el Estudiante';
            
            handler({ 
                fecha: fechaInput, materia, dia: fechaObj.getDate().toString().padStart(2, '0'), 
                mesStr: meses[fechaObj.getMonth()], tipo, color, detalle 
            });
            form.reset();
        });
    }

    bindEliminarEvento(handler) {
        document.querySelectorAll('.btn-eliminar-evento').forEach(btn => {
            btn.addEventListener('click', (e) => {
                handler(parseInt(e.currentTarget.dataset.id));
            });
        });
    }
}