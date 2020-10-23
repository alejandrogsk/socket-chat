class Usuarios {
	constructor() {
		this.personas = [];
	}

	//Creamos un usuario y lo agregamos al arreglo
	agregarPersona(id, nombre, sala) {
		let persona = {
			id,
			nombre,
			sala,
		};

		this.personas.push(persona);

		return this.personas;
	}

	//Obtener persona por id
	getPersona(id) {
		//la 'p' es de persona
		let persona = this.personas.filter(p => {
			return p.id === id;
		})[0]; //E [0] crea un unico registro ya que necesito una sola persona

		return persona;
	}

	//Obtener todas las personas
	getPersonas() {
		return this.personas;
	}

	getPersonasPorSala(sala) {
		let personasEnSala = this.personas.filter(persona => {
			return persona.sala === sala;
		});

		return personasEnSala;
	}

	borrarPersona(id) {
		let personaBorrada = this.getPersona(id);

		/*
		 * con esta funcion reemplazo el arreglo actual por uno
		 * que no tenga el id de la persona que quiero borrar, por eso
		 * es 'this.personas = this.personas'
		 */
		this.personas = this.personas.filter(p => p.id !== id);

		return personaBorrada;
	}
}

module.exports = { Usuarios };
