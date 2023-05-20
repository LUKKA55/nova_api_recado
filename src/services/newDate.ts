function newDate() {
	const data = new Date();

	const dia = String(data.getDate()).padStart(2, '0');

	const mes = String(data.getMonth() + 1).padStart(2, '0');

	const ano = String(data.getFullYear());

	const hora = String(data.getHours()).padStart(2, '0');

	const minuto = String(data.getMinutes()).padStart(2, '0');

	const segundo = String(data.getSeconds()).padStart(2, '0');

	return `${hora}:${minuto}:${segundo} - ${dia}/${mes}/${ano}`;
}

export default newDate;
