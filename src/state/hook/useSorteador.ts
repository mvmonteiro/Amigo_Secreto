import { useListaDeParticipantes } from './useListaDeParticipantes';
import { useSetRecoilState } from 'recoil';
import { resultadoDoAmigoSecreto } from '../atom';
import { realizarSorteio } from '../helpers/realizarSorteio';

export const useSorteador = () => {
	// chamada da lista de participantes
	const participantes = useListaDeParticipantes();

	// chamada do hook que vai ser utilizado para settar o estado do resultado do sorteio no átomo
	const setResultado = useSetRecoilState(resultadoDoAmigoSecreto);

	// precisa devolver uma forma de sortear por conta disso é necessário uma função
	return () => {
		// chamada da função que faz o sorteio de participantes
		const resultado = realizarSorteio(participantes);
		// setta no átomo o map com o resultado
		setResultado(resultado);
	};  
};