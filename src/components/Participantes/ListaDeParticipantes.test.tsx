import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import ListaDeParticipantes from './ListaDeParticipantes';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';

jest.mock('../../state/hook/useListaDeParticipantes', () => {
	return {
		useListaDeParticipantes: jest.fn()
	};
});

describe('Uma lista vazia de participantes', () => {
	beforeEach( () => {
		(useListaDeParticipantes as jest.Mock).mockReturnValue([]);
	});
	test('A lista de participantes deve ser renderizada sem elementos', () => {
		render(
			<RecoilRoot>
				<ListaDeParticipantes />
			</RecoilRoot>);

		const itens = screen.queryAllByRole('listitem');

		expect(itens).toHaveLength(0);
	});
	
});

describe('Uma lista preenchida de participantes', () => {
	const participantes = ['Ana', 'Catarina'];

	beforeEach( () => {
		(useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
	});

	test('A lista de participantes deve ser renderizada com seus elementos', () => {
		render(
			<RecoilRoot>
				<ListaDeParticipantes />
			</RecoilRoot>);

		const itens = screen.queryAllByRole('listitem');

		expect(itens).toHaveLength(participantes.length);
	});
});