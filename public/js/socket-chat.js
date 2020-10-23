var socket = io();

//Recibo por parametros el nombre del usuario
const params = new URLSearchParams(window.location.search);

//Si no hay nombre lo redirijo al inicio
if (!params.has("nombre") || !params.has("sala")) {
	window.location = "index.html";
	throw new Error("El nombre y sala son necesarios");
}

//este es el usuario que voy a enviar si es que existe
const usuario = {
	nombre: params.get("nombre"),
	sala: params.get("sala"),
};

//Al conectar envío el usuario
socket.on("connect", () => {
	console.log("Conectado al servidor");

	//usuario es un objeto
	//si me logro conectar tengo que ejecutar este callback con la respuesta
	socket.emit("entrarChat", usuario, resp => {
		console.log(resp);
	});
});

// escuchar
socket.on("disconnect", () => {
	console.log("Perdimos conexión con el servidor");
});

// Enviar información
// socket.emit(
// 	"crearMensaje",
// 	{
// 		usuario: "Fernando",
// 		mensaje: "Hola Mundo",
// 	},
// 	resp => {
// 		console.log("respuesta server: ", resp);
// 	}
// );

// Escuchar información
socket.on("crearMensaje", mensaje => {
	console.log("Servidor:", mensaje);
});

//Escuchar cambios de usuarios
// cuando un usuario entra o sale del chat
socket.on("listaPersonas", usuarios => {
	console.log(usuarios);
});

//Mensajes privados
socket.on("mensajePrivado", mensaje => {
	console.log("Mensaje Privado: ", mensaje);
});
