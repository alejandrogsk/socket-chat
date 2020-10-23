const { io } = require("../server");

const { Usuarios } = require("../classes/usuarios");

const { crearMensaje } = require("../utilidades/utilidades");

const usuarios = new Usuarios();

io.on("connection", client => {
	client.on("entrarChat", (data, callback) => {
		if (!data.nombre || !data.sala) {
			return callback({
				error: true,
				msg: "El nombre/sala es necesario",
			});
		}

		//unimos al cliente a una sala en particular
		client.join(data.sala);

		//client.id = id que genera socket.io automaticamente
		usuarios.agregarPersona(client.id, data.nombre, data.sala);

		client.broadcast
			.to(data.sala)
			.emit("listaPersonas", usuarios.getPersonasPorSala(data.sala));

		callback(usuarios.getPersonasPorSala(data.sala));
	});

	client.on("crearMensaje", data => {
		let persona = usuarios.getPersona(client.id);

		//data = el mensaje que quiero enviar
		let mensaje = crearMensaje(persona.nombre, data.mensaje);

		client.broadcast.to(persona.sala).emit("crearMensaje", mensaje);
	});

	client.on("disconnect", () => {
		let personaBorrada = usuarios.borrarPersona(client.id);

		client.broadcast
			.to(personaBorrada.sala)
			.emit(
				"crearMensaje",
				crearMensaje("Admin", `${personaBorrada.nombre} salió`)
			);

		client.broadcast
			.to(personaBorrada.sala)
			.emit("listaPersonas", usuarios.getPersonasPorSala(personaBorrada.sala));
	});

	//Mensajes privados
	client.on("mensajePrivado", data => {
		//es quien envía el mensaje
		let persona = usuarios.getPersona(client.id);

		//data.para = id del receptor del mensaje
		client.broadcast
			.to(data.para)
			.emit("mensajePrivado", crearMensaje(persona.nombre, data.mensaje));
	});
});
