}

const story = document.getElementById("story");
const choices = document.getElementById("choices");
const timeline = document.getElementById("timeline");
const step = document.getElementById("step");
const restart = document.getElementById("restart");

let current = "start";
let decision = 0;


/*
==================================================
                 PARADOXAL
              VIAGEM NO TEMPO

          3 FINAIS FAVORÁVEIS
          5 GAME OVER / MORTE

       Cada pergunta possui 2 escolhas.
==================================================
*/


const nodes = {

  /*
  ==================================================
  INÍCIO
  ==================================================
  */

  start: {

    location: "01:47 — Delegacia de Nova Aurora",

    text:
      "A cidade inteira está em silêncio. Há três horas, " +
      "o prefeito foi encontrado morto no Arquivo Municipal. " +
      "O estranho é que as câmeras mostram apenas 11 minutos " +
      "de gravação — exatamente o intervalo em que o crime aconteceu.",

    clue:
      "Você recebe uma mensagem anônima: " +
      "“Não procure quem matou. Descubra quem apagou os 11 minutos.”",

    question:
      "O que você faz primeiro?",

    choices: [

      {
        label: "Examinar a gravação restante.",
        next: "camera"
      },

      {
        label: "Ir imediatamente ao Arquivo Municipal.",
        next: "archive"
      }

    ]
  },


  /*
  ==================================================
  CÂMERAS
  ==================================================
  */

  camera: {

    location: "02:03 — Sala de monitoramento",

    text:
      "Ao ampliar a gravação, você percebe uma sombra " +
      "atravessando o corredor. No reflexo de uma janela " +
      "aparece um relógio marcando 02:13, embora a gravação " +
      "esteja marcada como 01:58.",

    clue:
      "O relógio está 15 minutos adiantado. " +
      "Alguém mexeu no tempo — literalmente.",

    question:
      "Você segue a pista do relógio?",

    choices: [

      {
        label: "Sim. Investigar o relógio.",
        next: "clock"
      },

      {
        label: "Não. Procurar quem apagou a gravação.",
        next: "hacker"
      }

    ]
  },


  /*
  ==================================================
  ARQUIVO
  ==================================================
  */

  archive: {

    location: "02:05 — Arquivo Municipal",

    text:
      "As portas estão abertas. Lá dentro, milhares de " +
      "documentos foram organizados em caixas. Uma delas " +
      "está vazia, exceto por um pequeno dispositivo metálico " +
      "com uma data gravada: 14/10/1998.",

    clue:
      "O dispositivo emite uma frequência baixa, " +
      "quase como um coração batendo.",

    question:
      "Você toca no dispositivo?",

    choices: [

      {
        label: "Sim. Ativar o dispositivo.",
        next: "past"
      },

      {
        label: "Não. Guardar o dispositivo e procurar pistas.",
        next: "trap"
      }

    ]
  },


  /*
  ==================================================
  RELÓGIO
  ==================================================
  */

  clock: {

    location: "02:16 — Torre do relógio",

    text:
      "Atrás do mecanismo existe uma pequena cabine. " +
      "Dentro dela, você encontra uma fotografia sua, " +
      "tirada em 1998. No verso está escrito: " +
      "“Você já esteve aqui.”",

    clue:
      "Um segundo relógio começa a contar para trás.",

    question:
      "Você entra na cabine antes que o contador chegue a zero?",

    choices: [

      {
        label: "Entrar na cabine.",
        next: "past"
      },

      {
        label: "Destruir o relógio.",
        next: "death1"
      }

    ]
  },


  /*
  ==================================================
  HACKER
  ==================================================
  */

  hacker: {

    location: "02:21 — Subsolo da delegacia",

    text:
      "O rastreamento digital leva você até um terminal antigo. " +
      "A tela exibe arquivos de uma investigação de 1998. " +
      "O último acesso foi feito pelo próprio prefeito, " +
      "28 anos antes de sua morte.",

    clue:
      "Um arquivo se chama PARADOXAL.EXE.",

    question:
      "Você abre o arquivo?",

    choices: [

      {
        label: "Abrir PARADOXAL.EXE.",
        next: "past"
      },

      {
        label: "Desconectar o terminal.",
        next: "death2"
      }

    ]
  },


  /*
  ==================================================
  PASSADO
  ==================================================
  */

  past: {

    location: "14/10/1998 — Linha temporal desconhecida",

    text:
      "Um clarão. Quando você abre os olhos, está no mesmo " +
      "Arquivo Municipal, mas tudo parece novo. Você encontra " +
      "o prefeito ainda jovem. Ele percebe quem você é e diz: " +
      "“Finalmente. Você veio me impedir de cometer o erro.”",

    clue:
      "Você entende que o assassinato de 2026 é consequência " +
      "de uma decisão tomada naquele dia.",

    question:
      "Você conta ao jovem prefeito o que acontecerá?",

    choices: [

      {
        label: "Contar toda a verdade.",
        next: "good1"
      },

      {
        label: "Esconder a verdade e investigar sozinho.",
        next: "past2"
      }

    ]
  },


  /*
  ==================================================
  ARMADILHA
  ==================================================
  */

  trap: {

    location: "02:12 — Arquivo Municipal",

    text:
      "Você procura pistas. De repente, as portas se fecham. " +
      "As luzes apagam e o dispositivo começa a aquecer.",

    clue:
      "No escuro, alguém diz: “Você não deveria ter vindo sozinho.”",

    question:
      "Você tenta forçar a porta?",

    choices: [

      {
        label: "Sim. Forçar a porta.",
        next: "death3"
      },

      {
        label: "Não. Ficar parado e observar.",
        next: "past"
      }

    ]
  },


  /*
  ==================================================
  SEGUNDO CAMINHO NO PASSADO
  ==================================================
  */

  past2: {

    location: "14/10/1998 — Sala de registros",

    text:
      "Você descobre que uma cientista chamada Helena Vale " +
      "criou o primeiro protótipo de máquina temporal. " +
      "Ela previu que alguém tentaria usar a máquina " +
      "para apagar um crime no futuro.",

    clue:
      "Helena deixou três instruções: " +
      "“Não mate ninguém. Não destrua a máquina. " +
      "E nunca revele o nome do viajante.”",

    question:
      "Você procura Helena?",

    choices: [

      {
        label: "Sim. Encontrar Helena.",
        next: "good3route"
      },

      {
        label: "Não. Destruir o protótipo.",
        next: "death4"
      }

    ]
  },


  /*
  ==================================================
  FINAL FAVORÁVEL 1
  ==================================================
  */

  good1: {

    location: "FINAL — Linha temporal 2026-B",

    ending: true,

    good: true,

    title:
      "FINAL FAVORÁVEL: O CRIME NUNCA ACONTECEU",

    text:
      "O jovem prefeito acredita em você e cancela o projeto " +
      "que causaria o apagão temporal. Em 2026, o Arquivo " +
      "Municipal continua intacto. O prefeito está vivo. " +
      "Ninguém se lembra de você — exceto por uma fotografia " +
      "antiga em que aparece ao lado dele.",

    clue:
      "Você resolveu o mistério sem destruir a linha do tempo."
  },


  /*
  ==================================================
  CAMINHO PARA FINAL 2 E 3
  ==================================================
  */

  good3route: {

    location: "14/10/1998 — Laboratório de Helena",

    text:
      "Helena abre a porta do laboratório. Ela sabe que você " +
      "veio do futuro, mas exige uma prova. Você encontra " +
      "um documento que descreve exatamente a morte do prefeito " +
      "em 2026.",

    clue:
      "No rodapé está escrito: “Se o viajante disser meu nome, " +
      "o paradoxo será irreversível.”",

    question:
      "O que você faz?",

    choices: [

      {
        label: "Manter o nome de Helena em segredo.",
        next: "good2"
      },

      {
        label: "Dizer o nome de Helena para convencê-la.",
        next: "death5"
      }

    ]
  },


  /*
  ==================================================
  FINAL FAVORÁVEL 2
  ==================================================
  */

  good2: {

    location: "FINAL — Linha temporal 2026-C",

    ending: true,

    good: true,

    title:
      "FINAL FAVORÁVEL: A GUARDIÃ DO TEMPO",

    text:
      "Helena entende o perigo e esconde a máquina em um lugar " +
      "onde ninguém poderá encontrá-la. Em 2026, os 11 minutos " +
      "desaparecidos voltam à gravação e revelam que o assassinato " +
      "nunca ocorreu.",

    clue:
      "Na última cena, Helena olha para uma fotografia sua " +
      "e sorri: ela sabia que você viria."
  },


  /*
  ==================================================
  FINAL FAVORÁVEL 3
  ==================================================
  */

  good3: {

    location: "FINAL — Linha temporal 2026-D",

    ending: true,

    good: true,

    title:
      "FINAL FAVORÁVEL: O DETETIVE IMPOSSÍVEL",

    text:
      "Helena sela a máquina temporal e deixa uma única porta " +
      "de emergência para você. Ao retornar a 2026, o crime " +
      "foi resolvido, o prefeito está vivo e a máquina nunca " +
      "foi descoberta. Apenas você sabe o que realmente aconteceu.",

    clue:
      "Você preservou o segredo e fechou o ciclo."
  },


  /*
  ==================================================
  GAME OVER 1
  ==================================================
  */

  death1: {

    location: "FINAL — PARADOXO",

    ending: true,

    good: false,

    title:
      "GAME OVER: O RELÓGIO QUEBRADO",

    text:
      "Ao destruir o mecanismo, você rompe a sincronização temporal. " +
      "A cidade entra em um ciclo de 11 minutos. Você fica preso " +
      "nele, revivendo a mesma noite sem conseguir chegar ao fim.",

    clue:
      "A investigação termina aqui."
  },


  /*
  ==================================================
  GAME OVER 2
  ==================================================
  */

  death2: {

    location: "FINAL — ARQUIVO CORROMPIDO",

    ending: true,

    good: false,

    title:
      "GAME OVER: A LINHA APAGADA",

    text:
      "Ao desligar o terminal, o sistema interpreta sua ação " +
      "como uma ameaça e ativa o protocolo de proteção. " +
      "Toda a investigação é apagada da linha temporal — " +
      "inclusive você.",

    clue:
      "Ninguém jamais encontrou o detetive desaparecido."
  },


  /*
  ==================================================
  GAME OVER 3
  ==================================================
  */

  death3: {

    location: "FINAL — ARMADILHA",

    ending: true,

    good: false,

    title:
      "GAME OVER: A PORTA",

    text:
      "Você força a porta. O dispositivo reage ao impacto " +
      "e cria uma ruptura temporal. Quando a polícia chega, " +
      "encontra o arquivo vazio e nenhuma evidência de que " +
      "você esteve ali.",

    clue:
      "A linha do tempo rejeitou sua interferência."
  },


  /*
  ==================================================
  GAME OVER 4
  ==================================================
  */

  death4: {

    location: "FINAL — PARADOXO ABSOLUTO",

    ending: true,

    good: false,

    title:
      "GAME OVER: A MÁQUINA",

    text:
      "Você destrói o protótipo. Porém, aquele protótipo era " +
      "justamente o que permitia que sua própria viagem ao " +
      "passado acontecesse. Sem ele, sua presença no passado " +
      "deixa de existir.",

    clue:
      "Você desaparece antes de conseguir voltar para 2026."
  },


  /*
  ==================================================
  GAME OVER 5
  ==================================================
  */

  death5: {

    location: "FINAL — O ÚLTIMO ERRO",

    ending: true,

    good: false,

    title:
      "GAME OVER: O VIGIA",

    text:
      "Você revela o nome de Helena. Ela entende que o viajante " +
      "é você e ativa uma proteção para impedir qualquer alteração " +
      "futura. O ciclo termina com sua morte na linha temporal errada.",

    clue:
      "Regra quebrada: nunca revele o nome do viajante."
  }

};


/*
==================================================
             FUNÇÃO PRINCIPAL
==================================================
*/

function renderNode(id) {

  current = id;

  const node = nodes[id];


  /*
  -----------------------------------------------
  SE FOR FINAL
  -----------------------------------------------
  */

  if (node.ending) {

    timeline.textContent =
      node.good
        ? "LINHA TEMPORAL: ESTÁVEL"
        : "LINHA TEMPORAL: COLAPSADA";


    step.textContent = "FIM DA INVESTIGAÇÃO";


    story.innerHTML = `

      <div class="${node.good ? "ending-good" : "ending-bad"}">

        <div class="location">
          ${node.location}
        </div>

        <h2>
          ${node.title}
        </h2>

      </div>

      <p>
        ${node.text}
      </p>

      <div class="clue">
        ${node.clue}
      </div>

    `;


    choices.innerHTML = "";

    restart.hidden = false;

    return;
  }


  /*
  -----------------------------------------------
  DECISÃO NORMAL
  -----------------------------------------------
  */

  decision++;


  timeline.textContent =
    `LINHA TEMPORAL: ${getTimeline(decision)}`;


  step.textContent =
    `DECISÃO ${decision}`;


  story.innerHTML = `

    <div class="location">
      ${node.location}
    </div>

    <p>
      ${node.text}
    </p>

    <div class="clue">
      ${node.clue}
    </div>

    <div class="question">
      ${node.question}
    </div>

  `;


  choices.innerHTML = "";


  /*
  -----------------------------------------------
  CRIA OS DOIS BOTÕES
  -----------------------------------------------
  */

  node.choices.forEach((choice, index) => {

    const button = document.createElement("button");

    button.className = "choice";


    button.innerHTML = `

      <span>
        OPÇÃO ${index + 1}
      </span>

      ${choice.label}

    `;


    button.addEventListener(
      "click",
      () => renderNode(choice.next)
    );


    choices.appendChild(button);

  });

}


/*
==================================================
             LINHAS TEMPORAIS
==================================================
*/

function getTimeline(n) {

  if (n <= 1) {

    return "2026-A";

  }

  if (n <= 2) {

    return "2026-A // INSTÁVEL";

  }

  if (n <= 3) {

    return "1998 // DESLOCAMENTO";

  }

  return "PARADOXAL";

}


/*
==================================================
              REINICIAR JOGO
==================================================
*/

restart.addEventListener(
  "click",
  () => {

    decision = 0;

    restart.hidden = true;

    renderNode("start");

  }
);


/*
==================================================
               INICIAR JOGO
==================================================
*/

renderNode("start");
