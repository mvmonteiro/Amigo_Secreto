- Testes
  - npm run test
  - vamos trabalhar em cima do arquivo de testes

- TDD = test driven development
  - teste unitário
    - teste com front
    - menos custoso e mais rápido
  - teste de serviço
    - testa diversas "porções" em conjunto
    - um pouco mais lento e mais custoso que o unitário
  - Foco no teste de componentes
    - react testint library
    - testamos como se fosse um usuário -> interação com elementos
    - um pouco mais abrangente do que unitário
    - acessibilidade -> o formato do teste remete a escrita de um html mais acessível
  - padrão de organização do teste é conhecido como AAA (Arrange, Act and Assert em inglês).

  - Gerenciamento de estados e rotas
    - demos uma limpada nos arquivos
    - vamos ter uma lista compartilhada com mais de um componente -> precisa controlar o estado a aplicação
      - uma página para participação e outra para sorteio -> as duas checam a lista de participantes
      - páginas diferentes -> devemos rotear isso -> controlar as rotas
        - npm i recoil react-router-dom -> são as duas bibliotecas
        - recoil -> gerir o estado global da aplicação
        - router -> controla as páginas a serem exibidas
      - BrowserRouter -> para utilização do router precisa envolver com esse componente
      - RecoilRoot -> qualquer componente dentro dele tem acesso aos estados criados

  - Encapsulamento -> hook customizado
    - Estado global -> representa a lista de participantes
      - pasta state/atom.ts
        - atom = pequena porção do estado
        - uma lista de nomes -> então é uma lista de string
        - precisa sempre de uma chave única
        - precisa de um estado padrão -> no caso começamos com uma lista vazia
        - com isso pronto deixamos DISPONÍVEL para a aplicação a lista
      - dentro da pasta state -> hooks/useAdicionarParticipante.ts
        - vamos criar um método que adiciona os participantes na lista do atom
        - vamos utilizar o método do recoil que faz o adiciona novos itens naquele estado -> com o hook useSetRecoilState
        - dentro do método colocamos qual recoil state queremos inserir
        - assim criamos um hook que encapsula a utilização do recoil -> não fica aparente em nenhum component
      - LEMBRANDO: o react testing library não verifica a implementação e sim o comportamento
      - Qualquer componente que precisar adicionar um participante à lista, basta chamar esse hook customizado -> encapsulamento

  - Testes
    - vamos testar se a funcionalidade de adicionar um participante na lista está correndo certo
    - a parte do teste está toda comentada -> cada funcionalidade
  
  - Implementação da rotina
    - vamos linkar o input com o estado local
    - o código do formuário está bem comentado
    - adição do RecoilRoot no arquivo do teste

  - Tratamento da duplicidade
    - caso um mesmo participante seja adicionado mais de uma vez
    - fizemos o tratamento desse "erro" dentro do arquivo de testes do formulário
    - podemos trata-lo dentro do átomo já criado:
      - vamos ter um estado para definir o erro -> sempre que ocorre, vai estar ali
      - definimos dentro do atom e devemos criar o hook que direciona para aquele àtomo
        - vamos encapsular o recoil através do hook customizado novamente...
        - o useMensagemDeErro é quem recupera a mensagem que foi definida para o átomo de erro e retorna essa mensagem quando chamada
        - dentro do useAdicionarParticipante é onde ocorre a comparação dos nomes para ver se já existe o nome adicionado
          - caso exista, é utilizado um seter do átomo de erro com a mensagem que queremos.
      - dentro do formulário fazemos um <p> com essa mensagem de erro -> caso precise

  - Testes assíncronos
    - vamos fazer com que a mensagem de nome duplicado desapareça depois de alguns segundos -> podemos avaliar isso com um teste
    - um teste deve falhar somente por um motivo, por isso vamos fazer um novo teste

  - Desenvolver um componente que vai exibir a lista de Participantes
    - primeiro vamos criar o teste
      - fizemos dois testes o primeiro é pra ver a lista vazia e depois um pra quando tiver instes lista de participantes
      - para o componente que imprime a lista
        - primeiro fizemos um hook useListaDeParticipantes que pega o valor do átomo onde estão os participantes e retorna essa lista
        - o componente react pega essa lista e imprime os nomes em formato de <ul> e <li>

  - Implementação do footer
    - o botão de iniciar só deve ser habilidade quando tiver pelo menos 3 nomes
    - 

  - Agrupamento dos componentes
    - iniciamos pelo teste -> sempre antes de implementar o componente
    - vamos fazer o teste de uma página que é completamente visual
    - teste de SNAPSHOT
      - queremos que a página seja renderizada sempre do mesmo jeito -> é como se a gente tirasse uma foto dele pra comparar depois

  - Criando a função que vai sortear o participante
    - vamos fazer um hook que faz o sorteio
    - esse hook precisa retornar uma função que manipula o sorteio
    - para fazer o embaralhamento vamos utilizar uma extensão que faz isso: npm i just-shuffle
      - então fazemos um shuffle na lista de participantes
    - depois de fazer a lógica para ver quem tirou quem -> precisamos guardar essa informação
      - gerenciamento de estados -> utilização do Recoil -> criar um novo átomo
    - precisamos fazer o teste de toda essa lógica -> é necessário transformar em uma função PURA para conseguir realizar o teste
      - criamos uma pasta helpers dentro de state para fazer o test
      - tiramos a lógica de sorteio do hook e implementamos um função pura -> está nos podemos testar, diferente de hooks
    - precisamos garantir que esse hook com a função pura está realmente sendo chamado
      - introduzimos a chamada dele dentro do rodape -> garantimos que está sendo chamado sempre que o jogo é inicializado
      - o teste funcina
      - podemos exibir o resultado e fazer o teste

  - exibição do resultado do sorteio e fazendo o teste
    - no componente de sorteio precisamos fazer com que o select seja controlado -> fazemos um onChange junto com um value
    - fizemos um novo hook que pega o resultado do sorteio do átomo
      - criamos um átomo com o resultado do sorteio
      - o useSorteador chamada a função pura realizarSorteio.ts que por sua vez retorna o sorteio em cima do átomo de participantes
        - depois disso o realizarSorteio pega o resultado do sorteio e guarda no átomo resultadoDoAmigoSecreto em formato Map
      - quanto ao novo hook, ele utiliza o useRecoilValue em cima do resultadoDoAmigoSecreto para ter acesso a lista de Map do resultado
        - retornando o resultado quando quando chamado
      - ASSIM ENCAPSULAMOS UM HOOK QUE FAZ O SORTEIO E UM QUE RETORNA O RESULTADO
    - LEMBRAR: o new MAP faz um par com duas strings (no nosso caso) e quando a variável que ele faz referência é chamada, ele retorna o seu par:
      const map1 = new Map();

      map1.set('a', 1);
      map1.set('b', 2);
      map1.set('c', 3);

      console.log(map1.get('a'));
      // Expected output: 1

      map1.set('a', 97);
    - 