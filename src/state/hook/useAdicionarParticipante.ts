import { useRecoilValue, useSetRecoilState } from 'recoil';
import { erroState, listaDeParticipantesState } from '../atom';

export const useAdicionarParticipante = () => {
	// chamada do hook do recoil com o átomo onde queremos adicionar um novo estado
	const setLista = useSetRecoilState(listaDeParticipantesState);
	// pega a lista completa dos estados (todos os nomes)
	const lista = useRecoilValue(listaDeParticipantesState);
	// pega o setter de erro
	const setErro = useSetRecoilState(erroState);

	return (nomeDoParticipante: string) => {
		// validação se o nome já existe ou não
		if (lista.includes(nomeDoParticipante)) {
			// seta a mensagem de erro no átomo
			setErro('Nomes duplicados não são permitidos!');
			// faz um timer de 3s, depois disso seta vazio na mensagem de erro
			setTimeout(() => {
				setErro('');
			}, 3000);
			// sai do laço
			return;
		}

		// pega a lista com todos participantes antigos e adiciona o novo
		return setLista( (listaAtual) => [...listaAtual, nomeDoParticipante]);
	};
};