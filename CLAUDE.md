# Orden — app personal de tareas, hábitos y metas

Proyecto de Eva. App móvil propia y gratuita, inspirada en las funciones de Flynow (tareas, hábitos, metas, estadísticas, gamificación). Diseño y código propios: no copiar marca, iconos ni textos de Flynow.

## Principios
- UI en español. Móvil primero (Pixel, Android). Tema oscuro con acento morado por defecto.
- Local-first: sin cuentas ni servidores salvo que se pida en la etapa 3.
- Todo el código está ahora en un único `index.html` (JS y CSS inline, sin dependencias). Mantenerlo así hasta que sea incómodo; si se divide, hacerlo en módulos ES sin framework.
- Respuestas y commits en español.

## Estado actual (etapa 0, hecho)
- `index.html`: tareas (tríada del tiempo, rueda de la vida, repetición, checklist, 8 vistas), hábitos (señal/rutina/recompensa, rachas, historial), metas SMART, estadísticas, puntos/niveles/logros, cronómetro, importación .ics, copia de seguridad en JSON.
- Datos en `localStorage`, clave `orden-v2`. Estructura: `{tasks,habits,goals,lists,inst,prefs,theme,tm,fired}`. `inst` guarda el estado por día con claves `t:<id>|<fecha>`, `h:<id>|<fecha>`, `g:<id>|<fecha>`.
- Avisos: hoy solo suenan con la app abierta (intervalo de 30 s en el JS).
- Ya incluidos: `manifest.webmanifest`, `sw.js` (caché offline) e iconos.

## Hoja de ruta
### Etapa 1 — PWA instalable
1. Crear repositorio en GitHub y subir esta carpeta.
2. Activar GitHub Pages (rama main, raíz). Queda en `https://<usuario>.github.io/<repo>/`.
3. En el Pixel, abrir esa URL en Chrome y elegir "Instalar app".
4. Migrar los datos del prototipo: Ajustes > Copiar mis datos, y en la PWA instalada Ajustes > Restaurar. (El origen cambia, así que no se comparten.)
5. Comprobar: funciona sin conexión, abre a pantalla completa, el icono se ve bien.

### Etapa 2 — App Android con Capacitor
1. `npm init`, instalar `@capacitor/core @capacitor/cli @capacitor/android`, mover los archivos web a `www/`.
2. `npx cap add android`. Compilar el APK de depuración con Android Studio, o con GitHub Actions para no instalar nada.
3. Avisos fiables con `@capacitor/local-notifications`: programar los avisos de tareas y hábitos al guardar, y reprogramarlos al abrir la app. Retirar el intervalo de 30 s.
4. Permisos Android 13+: notificaciones y alarmas exactas.
5. Instalar el APK en el Pixel (instalación manual de apps desconocidas).

### Etapa 3 — Extras
- Widget de pantalla de inicio (Kotlin, AppWidget) que muestre las tareas y hábitos de hoy y permita marcarlos. Necesita un puente entre la web y el almacenamiento nativo.
- App de reloj (Wear OS), solo si se usa un reloj.
- Sincronización opcional entre dispositivos (Supabase o Firebase), manteniendo el modo local como predeterminado.
- Copia de seguridad automática y exportación a archivo.

## Pendiente de decidir con Eva
- Nombre definitivo, paleta y icono propio.
- Si quiere ampliar o renombrar las 8 áreas de la Rueda de la vida.
- Campos exactos de los formularios de tarea y hábito (comparar con capturas que ella mande).
