# Registro de Uso de IA - Frontend

**Herramienta:** Antigravity (Google DeepMind)  
**Modelo:** Gemini 2.0 Flash / Pro

---

### 1. Error de módulo en Interfaces
*   **Prompt:** "Tengo un problema con el modulo de objetivo, no se me reconoce el archivo objetivo.ts"
*   **Incoherencias:** El archivo `src/app/models/objetivo.ts` se encontraba vacío (0 bytes), por lo que el compilador de Angular lanzaba un error de módulo.
*   **Solución:** Se restauraron manualmente las interfaces `Objetivo` y `Fita` para habilitar el tipado y permitir que el resto de componentes pudieran importar el modelo correctamente.

---

### 2. Problema de Cobertura del Fondo
*   **Prompt:** "Hay un problema y es que el color background no llena toda la pantalla."
*   **Incoherencias:** Los contenedores principales no tenían definida una altura mínima, lo que provocaba que el color de fondo se cortara a mitad de página si la lista de objetivos era corta.
*   **Solución:** Se aplicaron manualmente las clases `min-h-screen` y `flex-col` en los contenedores raíz de los componentes de Dashboard y Detalle para asegurar la cobertura total del fondo `#002134`.

---

### 3. Revisión de Lógica en el Detalle
*   **Prompt:** "Revisame el detail.ts que he creado y dime si ves algo que falte."
*   **Incoherencias:** Se detectó que el cálculo del porcentaje de progreso (`progressPercentage`) provocaba un error en la consola al intentar acceder a los hitos antes de que el objeto `objective` fuera devuelto por el servidor.
*   **Solución:** Se implementó manualmente una guarda de seguridad (`computed getter`) con el operador de navegación segura y un retorno por defecto de 0 para evitar fallos de renderizado inicial.

---

### 4. Diseño del Detalle de Objetivos
*   **Prompt:** "Con las funciones del detail creadas en el .ts, adaptamelas al .html siguiendo el diseño de los otros dashboards y details."
*   **Incoherencias:** Ninguna relevante. Los estilos se aplicaron correctamente siguiendo el sistema de diseño basado en Tailwind.
*   **Solución:** Se maquetó el archivo `objective-detail.html` vinculando las funciones de gestión de hitos (añadir, borrar, completar) con una interfaz basada en tarjetas y efectos de desenfoque, manteniendo la coherencia visual con el resto del backoffice.

---

### 5. Problema de Carga Recesiva (F5)
*   **Prompt:** "Al entrar en el detail de un objetivo no me carga si no hago f5"
*   **Incoherencias:** El uso exclusivo de `route.snapshot` impedía que el componente detectara los cambios de ID durante la navegación por la SPA si no se forzaba un refresco total del navegador.
*   **Solución:** Se cambió la lógica manualmente para suscribirse a `paramMap` de forma reactiva y se inyectó `ChangeDetectorRef` para forzar el pintado de los datos asíncronos en cuanto llegaban del servidor.

---

### 6. Creación del Registro de IA
*   **Prompt:** "Rellena el AI_LOG.md de la raíz del backoffice con las peticiones que te he hecho sobre el backoffice siguiendo el mismo patro utilizado en el backend"
*   **Incoherencias:** La IA generó inicialmente los datos en formato tabla, lo que dificultaba su lectura en el archivo Markdown.
*   **Solución:** Se transformó el formato de tabla a una lista estructurada por secciones para mejorar la legibilidad y claridad de la documentación final.
