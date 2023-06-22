import shuffle from 'just-shuffle';

export function realizarSorteio (participantes: string[]) {
	// variável com o total de participantes (é utilizada várias vezes)
	const totalDeParticipantes = participantes.length;
	// extensão que embaralha a lista de participantes
	const embaralhado = shuffle(participantes);
	// função de mapeamento de grupos
	const resultado = new Map<string, string>();
	// função que descreve quem tirou quem -> o primeiro tira o segundo, o segundo tira o terceiro ... o último tira o primeiro (da lista de emba)
	for(let index = 0; index < totalDeParticipantes; index++) {
		// se index = 1, indiceDoAmigo = 2; caso index = totalDeParticipantes -1 (ou seja, é o últimi participantes), indiceDoAmigo = 0
		const indiceDoAmigo = index === (totalDeParticipantes - 1) ? 0 : index + 1;
		// setta o par de cada participante (primeiro o participante que vai sortear e segundo quem essa pessoa tirou)
		resultado.set(embaralhado[index], embaralhado[indiceDoAmigo]);
	}

	return resultado;
}