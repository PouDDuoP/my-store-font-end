# My Store Frontend - Interfaz de Usuario para tu Tienda Online

-----

## 🚀 Descripción General

**My Store Frontend** es la parte del cliente (interfaz de usuario) de una aplicación de comercio electrónico. Este proyecto está diseñado para ser la cara visible de tu tienda online, permitiendo a los usuarios interactuar con los productos, gestionar su carrito de compras y realizar pedidos. Está construido bajo una arquitectura **Monolítica** utilizando **EJS** como motor de plantillas para renderizar vistas dinámicamente desde el servidor (backend).

-----

## ✨ Características Principales

  * **Listado y Detalle de Productos:** Visualiza productos con información detallada.
  * **Carrito de Compras:** Agrega, elimina y gestiona productos antes de la compra.
  * **Flujo de Pedido:** Proceso intuitivo para que los usuarios finalicen sus compras.
  * **Autenticación de Usuarios:** Interfaz para el registro e inicio de sesión de clientes.
  * **Diseño Responsivo:** Adaptado para una experiencia de usuario óptima en dispositivos móviles, tabletas y de escritorio.
  * **Comunicación con API Backend:** Interactúa con el [repositorio del backend](https://github.com/PouDDuoP/my-store) para obtener y enviar datos.

-----

## 🛠️ Tecnologías Utilizadas

Este proyecto frontend se basa en las siguientes tecnologías:

  * **Motor de Plantillas:**
      * **EJS (Embedded JavaScript):** Permite generar HTML dinámicamente desde el servidor, integrado en la arquitectura monolítica.
  * **Tecnologías Web Estándar:**
      * **HTML5:** Estructura semántica del contenido.
      * **CSS3:** Estilos visuales y diseño.
      * **JavaScript (Vanilla):** Lógica interactiva del lado del cliente.
  * **Framework CSS:**
      * **Bootstrap:** Utilizado para un diseño responsivo y componentes predefinidos, acelerando el desarrollo de la interfaz.
  * **Gestión de Dependencias (Frontend):**
      * **NPM** o **Yarn:** Para gestionar las librerías y utilidades del lado del cliente.
  * **Comunicación:**
      * **Fetch API / Axios (o similar):** Para realizar solicitudes HTTP al backend (si hay llamadas AJAX desde el frontend).

-----

## 🚀 Instalación y Ejecución Local

Para ejecutar el frontend de **My Store**, primero asegúrate de tener el [backend de My Store](https://github.com/PouDDuoP/my-store) funcionando, ya que este frontend depende de él para obtener los datos.

### Requisitos Previos

  * El **Backend de My Store** debe estar corriendo y accesible (normalmente en `http://localhost:3000`).
  * **Node.js** (versión 14.x o superior recomendada)
  * **npm** (viene con Node.js) o **Yarn**

### Pasos

1.  **Clona este repositorio (frontend):**

    ```bash
    git clone https://github.com/PouDDuoP/my-store-font-end.git
    cd my-store-font-end
    ```

2.  **Instala las dependencias del proyecto:**

    ```bash
    npm install
    # o
    yarn install
    ```

3.  **Configura las variables de entorno (si es necesario):**
    Aunque la mayor parte de la configuración se realiza en el backend, si este frontend necesita consumir una API en una URL diferente a la predeterminada (`http://localhost:3000`), deberías configurar una variable de entorno. Por ejemplo, crea un archivo `.env` en la raíz con:

    ```env
    BACKEND_API_URL=http://localhost:3000
    ```

    *(Nota: Si el frontend y el backend se ejecutan en el mismo servidor y se renderizan las vistas con EJS, es posible que no necesites esta variable explícitamente en el frontend, ya que las vistas se generan en el servidor. Inclúyela si planeas una separación más fuerte o llamadas AJAX explícitas.)*

4.  **Inicia la aplicación (servidor Express que sirve las vistas):**
    Si tu `my-store-font-end` es el mismo proyecto que incluye el backend y las vistas se renderizan en el servidor, el comando para iniciar sería el mismo que para el backend. **Asegúrate de que este repositorio contenga la lógica de servidor Express para servir los archivos estáticos y las vistas EJS.**

    ```bash
    npm start
    # o para desarrollo (si tienes nodemon configurado)
    npm run dev
    ```

    La interfaz de usuario debería estar accesible en `http://localhost:3000` (o el puerto configurado para tu backend/servidor Express).

-----

## 📞 Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme:

  * **GitHub:** [PouDDuoP](https://www.google.com/search?q=https://github.com/PouDDuoP)
  * **LinkedIn:** [kevin-alvarado-graterol](https://www.linkedin.com/in/kevin-alvarado-graterol/) (Opcional)

-----
