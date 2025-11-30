// Interactividad avanzada para index.html
function drawGrafoVisual() {
    const container = document.getElementById('grafo-visual');
    if (!container) return;
    container.innerHTML = `<svg width='300' height='180'>
        <circle cx='60' cy='90' r='22' fill='#3a7bd5'/>
        <circle cx='140' cy='40' r='22' fill='#3a7bd5'/>
        <circle cx='220' cy='90' r='22' fill='#3a7bd5'/>
        <circle cx='140' cy='140' r='22' fill='#3a7bd5'/>
        <circle cx='140' cy='90' r='22' fill='#3a7bd5'/>
        <line x1='60' y1='90' x2='140' y2='40' stroke='#222' stroke-width='2'/>
        <line x1='60' y1='90' x2='140' y2='90' stroke='#222' stroke-width='2'/>
        <line x1='140' y1='40' x2='220' y2='90' stroke='#222' stroke-width='2'/>
        <line x1='140' y1='40' x2='140' y2='90' stroke='#222' stroke-width='2'/>
        <line x1='140' y1='90' x2='220' y2='90' stroke='#222' stroke-width='2'/>
        <line x1='140' y1='90' x2='140' y2='140' stroke='#222' stroke-width='2'/>
        <line x1='60' y1='90' x2='140' y2='140' stroke='#222' stroke-width='2'/>
        <line x1='140' y1='140' x2='220' y2='90' stroke='#222' stroke-width='2'/>
        <text x='60' y='95' text-anchor='middle' fill='#fff' font-size='16'>A</text>
        <text x='140' y='45' text-anchor='middle' fill='#fff' font-size='16'>B</text>
        <text x='220' y='95' text-anchor='middle' fill='#fff' font-size='16'>C</text>
        <text x='140' y='145' text-anchor='middle' fill='#fff' font-size='16'>D</text>
        <text x='140' y='95' text-anchor='middle' fill='#fff' font-size='16'>E</text>
    </svg>`;
}

function toggleGrafoInfo() {
    const info = document.getElementById('grafo-info');
    if (info) info.style.display = info.style.display === 'none' ? 'block' : 'none';
}

const grafoEjemplo = {
    A: ['B', 'E', 'D'],
    B: ['A', 'C', 'E'],
    C: ['B', 'E', 'D'],
    D: ['A', 'C', 'E'],
    E: ['A', 'B', 'C', 'D']
};

function showAdjList() {
    const container = document.getElementById('representaciones-grafo');
    if (!container) return;
    container.innerHTML = `
        <div class='mb-3'>
            <h4>Lista de Adyacencia</h4>
            <div class='code-block'>
                {
                  A: [B, E, D],<br>
                  B: [A, C, E],<br>
                  C: [B, E, D],<br>
                  D: [A, C, E],<br>
                  E: [A, B, C, D]
                }
            </div>
        </div>
        <img src='img/grafo-5-nodos.png' alt='Ejemplo grafo no dirigido' class='img-fluid rounded shadow mt-2' />
        <button class='btn btn-outline-primary btn-sm' onclick='drawRepresentacionesGrafo();'>Ver ambas representaciones</button>
    `;
    drawGrafoVisual();
}

function showAdjMatrix() {
    const container = document.getElementById('representaciones-grafo');
    if (!container) return;
    container.innerHTML = `
        <div class='mb-3'>
            <h4>Matriz de Adyacencia</h4>
            <table class='table table-bordered table-rep'>
                <tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr>
                <tr><th>A</th><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
                <tr><th>B</th><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
                <tr><th>C</th><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
                <tr><th>D</th><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
                <tr><th>E</th><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
            </table>
            <img src='img/matriz-adyacencia.png' alt='Ejemplo matriz de adyacencia' class='img-fluid rounded shadow mt-2' />
        </div>
        <button class='btn btn-outline-primary btn-sm' onclick='drawRepresentacionesGrafo();'>Ver ambas representaciones</button>
    `;
    drawGrafoVisual();
}

function runBFS() {
    let visitados = new Set();
    let cola = ['A'];
    let recorrido = [];
    while (cola.length > 0) {
        let nodo = cola.shift();
        if (!visitados.has(nodo)) {
            visitados.add(nodo);
            recorrido.push(nodo);
            cola.push(...grafoEjemplo[nodo]);
        }
    }
    mostrarResultado('BFS', recorrido);
    drawAlgoritmosGrafo();
}

function runDFS() {
    let recorrido = [];
    function dfs(nodo, visitados = new Set()) {
        if (!visitados.has(nodo)) {
            visitados.add(nodo);
            recorrido.push(nodo);
            for (let vecino of grafoEjemplo[nodo]) {
                dfs(vecino, visitados);
            }
        }
    }
    dfs('A');
    mostrarResultado('DFS', recorrido);
    drawAlgoritmosGrafo();
}

function mostrarResultado(tipo, recorrido) {
    const resultado = document.getElementById('algoritmo-resultado');
    if (resultado) {
        resultado.style.display = 'block';
        resultado.innerHTML = `<strong>Recorrido ${tipo}:</strong> <span class='badge bg-success'>${recorrido.join(' → ')}</span>`;
        resultado.scrollIntoView({behavior: 'smooth'});
    }
}

// Ocultar resultado si se hace clic fuera de los botones
window.addEventListener('click', function(e) {
    const resultado = document.getElementById('algoritmo-resultado');
    if (!e.target.classList.contains('btn-success')) {
        if (resultado) resultado.style.display = 'none';
    }
});

function drawRepresentacionesGrafo() {
    const container = document.getElementById('representaciones-grafo');
    if (!container) return;
    container.innerHTML = `
        <div class='mb-3'>
            <h4>Lista de Adyacencia</h4>
            <div class='code-block'>
                {
                  A: [B, E, D],<br>
                  B: [A, C, E],<br>
                  C: [B, E, D],<br>
                  D: [A, C, E],<br>
                  E: [A, B, C, D]
                }
            </div>
        </div>
        <div class='mb-3'>
            <h4>Matriz de Adyacencia</h4>
            <table class='table table-bordered table-rep'>
                <tr><th></th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr>
                <tr><th>A</th><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
                <tr><th>B</th><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
                <tr><th>C</th><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td></tr>
                <tr><th>D</th><td>1</td><td>0</td><td>1</td><td>0</td><td>1</td></tr>
                <tr><th>E</th><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td></tr>
            </table>
            <img src='img/matriz-adyacencia.png' alt='Ejemplo matriz de adyacencia' class='img-fluid rounded shadow mt-2' />
        </div>
    `;
}

function drawAlgoritmosGrafo() {
    const container = document.getElementById('algoritmos-grafo');
    if (!container) return;
    container.innerHTML = `
        <div class='mb-3'>
            <h4>Búsqueda en Amplitud (BFS)</h4>
            <div class='code-block'>
                function bfs(grafo, inicio) {
                  let visitados = new Set();
                  let cola = [inicio];
                  while (cola.length > 0) {
                    let nodo = cola.shift();
                    if (!visitados.has(nodo)) {
                      visitados.add(nodo);
                      cola.push(...grafo[nodo]);
                    }
                  }
                  return Array.from(visitados);
                }
            </div>
            <img src='img/bfs-ejemplo.png' alt='Ejemplo BFS' class='img-fluid rounded shadow mt-2' />
            <h4>Búsqueda en Profundidad (DFS)</h4>
            <div class='code-block'>
                function dfs(grafo, inicio, visitados = new Set()) {
                  if (!visitados.has(inicio)) {
                    visitados.add(inicio);
                    for (let vecino of grafo[inicio]) {
                      dfs(grafo, vecino, visitados);
                    }
                  }
                  return Array.from(visitados);
                }
            </div>
        </div>
    `;
}

function toggleTheme() {
    const body = document.body;
    if (body.classList.contains('bg-dark')) {
        body.classList.remove('bg-dark');
        body.classList.remove('text-white');
        document.querySelector('footer').classList.remove('bg-dark','text-white');
    } else {
        body.classList.add('bg-dark');
        body.classList.add('text-white');
        document.querySelector('footer').classList.add('bg-dark','text-white');
    }
}

function changeMainColor(color) {
    document.documentElement.style.setProperty('--main-color', color);
    document.querySelector('header').style.background = `linear-gradient(90deg, ${color} 0%, #2d3e50 100%)`;
    document.querySelectorAll('.btn-primary, .btn-success, .btn-info, .btn-secondary').forEach(btn => {
        btn.style.background = color;
        btn.style.borderColor = color;
    });
    document.querySelectorAll('svg circle').forEach(c => c.setAttribute('fill', color));
    document.querySelectorAll('.img-fluid.rounded.shadow').forEach(img => {
        img.style.boxShadow = `0 2px 8px ${color}`;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    drawGrafoVisual();
    drawRepresentacionesGrafo();
    drawAlgoritmosGrafo();
    const resultado = document.getElementById('algoritmo-resultado');
    if (resultado) resultado.style.display = 'none';

    // Animación de botones al hacer clic
    document.querySelectorAll('.btn, .button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            btn.classList.add('clicked');
            setTimeout(() => btn.classList.remove('clicked'), 350);
        });
    });

    // Mensaje emergente creativo al cambiar color
    const colorTheme = document.getElementById('colorTheme');
    if (colorTheme) {
        colorTheme.addEventListener('change', function() {
            showToast('¡Color principal actualizado!');
        });
    }
});

// Función para mostrar mensajes emergentes creativos
function showToast(msg) {
    let toast = document.createElement('div');
    toast.textContent = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '32px';
    toast.style.right = '32px';
    toast.style.background = 'var(--main-color, #3a7bd5)';
    toast.style.color = '#fff';
    toast.style.padding = '1em 2em';
    toast.style.borderRadius = '16px';
    toast.style.boxShadow = '0 2px 16px #3a7bd5';
    toast.style.fontSize = '1.1em';
    toast.style.zIndex = '9999';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s, transform 0.4s';
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'scale(1.08)';
    }, 100);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'scale(0.95)';
        setTimeout(() => toast.remove(), 400);
    }, 1800);
}
