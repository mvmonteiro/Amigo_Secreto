import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Rodape from './Rodape';
import { useListaDeParticipantes } from '../../state/hook/useListaDeParticipantes';

jest.mock('../../state/hook/useListaDeParticipantes', () => {
	return{
		useListaDeParticipantes: jest.fn()
	};
});


const mockNavegacao = jest.fn();
const mockSorteio = jest.fn();

// para mockar hooks precisamos retornar uma função que chama outra função
jest.mock('react-router-dom', () => {
	return {
		useNavigate: () => mockNavegacao // no caso do hook do navite precisa dessa implementação
	};
});

// para mockar hooks precisamos retornar uma função que chama outra função -> agora precisamos fazer o mock do sorteio com a função pura
jest.mock('../../state/hook/useSorteador', () => {
	return {
		useSorteador: () => mockSorteio
	};
});



describe('quando não existem participantes suficientes', () => {
	beforeEach( () => {
		(useListaDeParticipantes as jest.Mock).mockReturnValue([]);
	});

	test('o jogo não pode ser iniciado', () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>
		);

		const botao = screen.getByRole('button');

		expect(botao).toBeDisabled();
	});
});

describe('quando existem participantes suficientes', () => {
	beforeEach( () => {
		(useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'Jose']);
	});

	test('o jogo pode ser iniciado', () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>
		);

		const botao = screen.getByRole('button');

		expect(botao).not.toBeDisabled();
	});

	test('o jogo foi iniciado', () =>{
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>
		);

		const botao = screen.getByRole('button');

		fireEvent.click(botao);

		expect(mockNavegacao).toHaveBeenCalledTimes(1);

		expect(mockNavegacao).toHaveBeenCalledWith('/sorteio');

		// sempre que o jogo é iniciado esperamos que o mock do sorteio seja chamado
		expect(mockSorteio).toHaveBeenCalledTimes(1);
	});
});