import { render } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import Configuracao from './Configuracao';

// para mockar hooks precisamos retornar uma função que chama outra função
const mockNavegacao = jest.fn();
jest.mock('react-router-dom', () => {
	return {
		useNavigate: () => mockNavegacao // no caso do hook do navite precisa dessa implementação
	};
});

describe('pagina de configurações', () => {

	test('deve ser renderizada corretamente', () => {
		const { container } = render(
			<RecoilRoot>
				<Configuracao />
			</RecoilRoot>
		);

		expect(container).toMatchInlineSnapshot(`
<div>
  <header
    class="container"
  >
    <div
      class="cabecalho"
    >
      <div
        aria-label="Logo do Sorteador"
        class="image-logo"
        role="img"
      />
      <svg
        class="participante"
      >
        participante.svg
      </svg>
    </div>
    <div
      class="card"
    >
      <section>
        <h2>
          Vamos começar!
        </h2>
        <form>
          <div
            class="grupo-input-btn"
          >
            <input
              placeholder="Insira os nomes..."
              type="text"
              value=""
            />
            <button
              disabled=""
            >
              Adicionar
            </button>
             
          </div>
          
           
        </form>
        <ul />
        <footer
          class="rodape-configuracoes"
        >
          <button
            class="botao"
            disabled=""
          >
            Iniciar Brincadeira
          </button>
          <svg>
            sacolas.svg
          </svg>
        </footer>
      </section>
    </div>
  </header>
</div>
`);
	});
});