# Kevgod

Bot de Discord desarrollado en **Node.js** con [discord.js](https://discord.js.org/) (v14), pensado para el servidor de la comunidad del YouTuber **Kevsadilla**.

Ofrece comandos slash (`/`) de entretenimiento, utilidad, moderación y automatización, además de utilidades para mensajes de bienvenida.

<p align="center">
  <img src="image-1.png" alt="Kevgod — vista del bot" width="320">
</p>

---

## Características

- Comandos slash registrados automáticamente al iniciar el bot
- Panel de moderación (`ban`, `kick`, `timeout`)
- Configuración de AutoMod de Discord
- Encuestas nativas, roles temporales y publicación de reglas
- Comandos divertidos (8ball, ship, snake, anime, etc.)
- Generación de imágenes (perfil, Spotify, ship) mediante librerías de canvas
- Utilidad de bienvenida personalizable (`util/welcome.js`)

---

## Requisitos

Antes de ejecutar el bot necesitas:

| Requisito | Detalle |
|-----------|---------|
| **Node.js** | Versión **16.11.0** o superior (recomendado: 18 LTS o 20+) |
| **npm** | Incluido con Node.js |
| **Cuenta de Discord** | Con permisos para crear una aplicación en el [Discord Developer Portal](https://discord.com/developers/applications) |
| **Servidor de Discord** | Donde se invitará y usará el bot |
| **Conexión a Internet** | Para la API de Discord y APIs externas (waifu, anime, etc.) |

### Dependencias del proyecto

Declarada en `package.json`:

- `discord.js` `^14.15.3`

Algunos comandos también usan paquetes que **no están listados aún** en `package.json`. Instálalos si quieres usar todas las funciones:

```bash
npm install canvafy canvas discord-arts google-it node-fetch
```

| Paquete | Se usa en |
|---------|-----------|
| `canvafy` | `/ship`, `/spotify` |
| `canvas` | Bienvenida (`util/welcome.js`) |
| `discord-arts` | `/profile` |
| `google-it` | `/web-google` |
| `node-fetch` | `/getwaifu` |

> En Windows, `canvas` puede requerir herramientas de compilación nativa ([node-gyp](https://github.com/nodejs/node-gyp)).

---

## Configuración del bot en Discord

1. Entra a [Discord Developer Portal](https://discord.com/developers/applications) y crea una **New Application**.
2. En la pestaña **Bot**, crea el bot y copia el **Token**.
3. Activa los **Privileged Gateway Intents** necesarios:
   - Presence Intent
   - Server Members Intent
   - Message Content Intent  
   *(el cliente se inicia con intents amplios)*
4. Copia el **Application ID** (Client ID) desde la pestaña **General Information**.
5. Activa el **modo desarrollador** en Discord (Ajustes → Avanzado) y copia el **ID del servidor** (clic derecho en el servidor → Copiar ID del servidor).
6. Invita el bot al servidor con los scopes `bot` y `applications.commands`, y permisos suficientes (Administrador o, como mínimo: gestionar mensajes, roles, miembros, AutoMod, etc.).

Ejemplo de URL de invitación (sustituye `CLIENT_ID`):

```text
https://discord.com/oauth2/authorize?client_id=CLIENT_ID&permissions=8&scope=bot%20applications.commands
```

---

## Instalación

```bash
# 1. Clonar o descargar el repositorio
git clone <url-del-repositorio>
cd kevgod

# 2. Instalar dependencias
npm install

# 3. (Opcional) Dependencias extra para todos los comandos
npm install canvafy canvas discord-arts google-it node-fetch

# 4. Configurar config.json (ver siguiente sección)

# 5. Iniciar el bot
node index.js
```

Si todo está correcto, en la consola verás un mensaje similar a `conectado como kevgod` y los comandos slash se registrarán en el servidor indicado.

---

## Configuración (`config.json`)

Edita `config.json` con los datos reales de tu aplicación y servidor:

```json
{
  "CLIENTE_TOKEN": "TOKEN_DEL_BOT",
  "clienteId": "APPLICATION_ID",
  "guildId": "ID_DEL_SERVIDOR",
  "welcome_channel": "ID_CANAL_BIENVENIDA",
  "rules_channel": "ID_CANAL_REGLAS",
  "general_channel": "ID_CANAL_GENERAL",
  "roles_channel": "ID_CANAL_ROLES",
  "welcome_image_url": "URL_OPCIONAL",
  "welcome_messages": [
    "¡Bienvenido/a a bordo, viajero/a!",
    "¡Un nuevo héroe se une a nuestra causa!"
  ],
  "staff_roles": [
    "ID_ROL_STAFF_1",
    "ID_ROL_STAFF_2"
  ],
  "featured_event": "¡Gran torneo de videojuegos este fin de semana!",
  "private_welcome_message": "¡Gracias por unirte! Revisa el canal de anuncios."
}
```

| Campo | Obligatorio | Descripción |
|-------|:-----------:|-------------|
| `CLIENTE_TOKEN` | Sí | Token del bot |
| `clienteId` | Sí | Application / Client ID |
| `guildId` | Sí | ID del servidor donde se registran los slash commands |
| `welcome_channel` | No* | Canal de bienvenida |
| `rules_channel` | No* | Canal de reglas |
| `general_channel` | No* | Canal general |
| `roles_channel` | No* | Canal de roles |
| `welcome_image_url` | No | Imagen de fondo para la tarjeta de bienvenida |
| `welcome_messages` | No | Mensajes aleatorios de bienvenida |
| `staff_roles` | No | IDs de roles del staff a mencionar |
| `featured_event` | No | Evento destacado en el mensaje de bienvenida |
| `private_welcome_message` | No | Mensaje privado al nuevo miembro |

\*Usados por `util/welcome.js`. Ese módulo existe en el proyecto; para activarlo hay que cargarlo como evento de `GuildMemberAdd` desde el punto de entrada.

> **Importante:** no subas tu token real a un repositorio público. Sustituye siempre los valores de ejemplo y mantén `config.json` fuera del control de versiones si contiene secretos.

---

## Uso

En el servidor, escribe `/` en un canal de texto. Discord mostrará el menú de comandos de **Kevgod**.

<p align="center">
  <img src="image-2.png" alt="Menú de comandos slash" width="80%">
  <br>
  <img src="image-3.png" alt="Ejemplo de uso de un comando" width="80%">
</p>

### Comandos disponibles

#### Entretenimiento

| Comando | Descripción |
|---------|-------------|
| `/8ball` | Responde preguntas al azar |
| `/gey` | Porcentaje aleatorio (broma) |
| `/nivel-furro` | “Nivel de furrosidad” aleatorio |
| `/ship` | Nivel de compatibilidad entre dos usuarios |
| `/snake` | Minijuego de la serpiente |
| `/getwaifu` | Imagen de waifu por categoría ([waifu.im](https://waifu.im/)) |
| `/anime` | Interacciones e imágenes de anime |

#### Utilidad

| Comando | Descripción |
|---------|-------------|
| `/emote` | Obtiene un emote por ID (PNG / JPG / GIF) |
| `/web-google` | Búsqueda en Google |
| `/encuesta` | Crea una encuesta |
| `/profile` | Tarjeta de perfil de un usuario |
| `/spotify` | Genera un “cartel” estilo Spotify |

#### Moderación / Administración

| Comando | Permisos | Descripción |
|---------|----------|-------------|
| `/modpanel` | Moderar miembros | Panel con ban, kick y timeouts |
| `/automod` | Administrador | Configura reglas de AutoMod |
| `/reglas` | Administrador | Publica las reglas del servidor |
| `/roltemporal` | Gestionar roles | Asigna un rol por un tiempo limitado |

---

## Estructura del proyecto

```text
kevgod/
├── index.js              # Punto de entrada: cliente, registro de comandos e interacciones
├── config.json           # Token, IDs y opciones de bienvenida
├── package.json
├── slash_commands/       # Un archivo por comando slash
│   ├── 8ball.js
│   ├── automod.js
│   ├── modpanel.js
│   └── ...
├── util/
│   └── welcome.js        # Evento de bienvenida (tarjeta + embed)
├── events/               # Carpeta reservada para eventos
└── README.md
```

Al arrancar, `index.js`:

1. Carga todos los archivos de `slash_commands/`.
2. Registra los comandos en el guild (`guildId`) mediante la API REST de Discord.
3. Escucha interacciones de tipo slash y ejecuta el comando correspondiente.
4. Inicia sesión con `CLIENTE_TOKEN`.

---

## Solución de problemas

| Problema | Posible causa |
|----------|----------------|
| El bot no se conecta | Token incorrecto o intents no activados en el Developer Portal |
| No aparecen los comandos `/` | `clienteId` o `guildId` incorrectos; espera unos segundos o reinicia el bot |
| Error al cargar un comando | Falta una dependencia (`canvafy`, `canvas`, etc.) |
| AutoMod / moderación fallan | El bot no tiene permisos suficientes o su rol está por debajo de los roles a moderar |

---

## Licencia

ISC (según `package.json`).
