const API_URL = "https://api-xe7m.onrender.com";

const TERMINAL_ID = 2;

const buscarBtn = document.getElementById("buscarBtn");
const concluirBtn = document.getElementById("concluirBtn");

const caractere1 = document.getElementById("caractere1");
const caractere2 = document.getElementById("caractere2");

const status = document.getElementById("status");


async function buscarCodigo() {

    status.textContent = "Buscando código...";

    try {

        const resposta = await fetch(
            `${API_URL}/terminal/${TERMINAL_ID}`
        );

        if (!resposta.ok) {

            const erro = await resposta.json();

            throw new Error(
                erro.mensagem || "Erro ao consultar a API"
            );
        }

        const dados = await resposta.json();

        console.log("Resposta da API:", dados);

        const codigo = dados.codigo;

        if (!codigo || codigo.length < 2) {
            throw new Error("A API não retornou 2 caracteres.");
        }

        // Mostra os dois caracteres
        caractere1.textContent = codigo[0];
        caractere2.textContent = codigo[1];

        status.textContent = "Código recebido com sucesso!";

    } catch (erro) {

        console.error(
            "Erro ao conectar com a API:",
            erro
        );

        status.textContent = `Erro: ${erro.message}`;

        caractere1.textContent = "?";
        caractere2.textContent = "?";
    }
}


async function concluirTerminal() {

    status.textContent = "Concluindo...";

    try {

        const resposta = await fetch(
            `${API_URL}/terminal/${TERMINAL_ID}/concluir`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (!resposta.ok) {

            const erro = await resposta.json();

            throw new Error(
                erro.mensagem || "Erro ao concluir o terminal"
            );
        }

        const dados = await resposta.json();

        console.log("Terminal concluído:", dados);

        status.textContent = "Terminal concluído com sucesso!";

    } catch (erro) {

        console.error(
            "Erro ao concluir o terminal:",
            erro
        );

        status.textContent = `Erro: ${erro.message}`;
    }
}


buscarBtn.addEventListener("click", buscarCodigo);
concluirBtn.addEventListener("click", concluirTerminal);