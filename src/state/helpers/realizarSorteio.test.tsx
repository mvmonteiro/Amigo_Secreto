import { realizarSorteio } from './realizarSorteio';

describe('dado um sorteio de amigo secreto', () => {

	test('cada participante não sorteie o próprio nome', () => {
		// lista fake de participantes
		const participantes = ['Ana', 'Catarina', 'Jorel', 'Marcus', 'Vini', 'Nat'];

		const sorteio = realizarSorteio(participantes);
    
		participantes.forEach( (participante) => {
			const amigoSecreto = sorteio.get(participante);
			expect(amigoSecreto).not.toEqual(participante);
		});

	});
});