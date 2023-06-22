import { useRecoilValue } from 'recoil';
import { listaDeParticipantesState } from './../atom';

export const useListaDeParticipantes = () => {
	const listaDeParticipantes = useRecoilValue(listaDeParticipantesState);

	return listaDeParticipantes;
};