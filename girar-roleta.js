document.addEventListener("DOMContentLoaded", () => {
  const tela1 = document.querySelector(".tela1");
  const tela2 = document.querySelector(".tela2");
  const tela3 = document.querySelector(".tela3");
  const spinButton = document.getElementById("spinButton");
  const wheel = document.getElementById("wheel");
  const wheelImg = wheel.querySelector("img");
  const codigoSorteado = document.querySelector(".codigo-sorteado");
  const seletor = document.querySelector(".seletor");
  const prizeMessage = document.getElementById("prizeMessage"); // nova div da mensagem

  // --- Prêmios com ângulos ---
  const prizes = [
    { nome: "Desconto 1%", cupom: "DESCONTO1", angle: 45 },
    { nome: "Desconto 2%", cupom: "DESCONTO2", angle: 135 },
    { nome: "Desconto 3%", cupom: "DESCONTO3", angle: 225 },
    { nome: "Seladora", cupom: "SELADORA", angle: 315 },
  ];

  let spinning = false;
  let totalRotation = 0;

  const spinDuration = 7000;
  const spinTiming = "cubic-bezier(0.33, 1, 0.68, 1)";

  // Inicializa telas
  tela1.style.display = "flex";
  tela2.style.display = "none";
  tela3.style.display = "none";

  // --- Evento de girar a roleta ---
  spinButton.addEventListener("click", () => {
    if (spinning) return;
    spinning = true;

    // 🔒 Desativa o botão (visualmente cinza)
    spinButton.disabled = true;
    spinButton.style.backgroundColor = "#ccc";
    spinButton.style.color = "#666";
    spinButton.style.cursor = "not-allowed";

    tela1.style.display = "none";
    tela2.style.display = "flex";
    tela3.style.display = "none";

    wheel.classList.add("girando");
    seletor.classList.add("vibrando");

    const prizeIndex = Math.floor(Math.random() * prizes.length);
    const prize = prizes[prizeIndex];

    const extraSpins = 5;
    const prizeAngle = prize.angle % 360;
    const targetAngleRelative = (360 - prizeAngle) % 360;
    const normalizedCurrent = totalRotation % 360;

    let delta = extraSpins * 360 + targetAngleRelative - normalizedCurrent;
    delta = ((delta % 360) + 360) % 360 + extraSpins * 360;

    totalRotation += delta;

    wheelImg.style.transition = `transform ${spinDuration}ms ${spinTiming}`;
    wheelImg.style.transform = `rotate(${totalRotation}deg)`;

    // Quando o giro terminar
    setTimeout(() => {
      spinning = false;
      wheel.classList.remove("girando");
      seletor.classList.remove("vibrando");

      // Mostra mensagem animada de prêmio 🎉
      prizeMessage.innerHTML = `<p>Parabéns, você ganhou o cupom de ${prize.nome}!</p>`;
      prizeMessage.classList.add("show");

      // Depois de 4 segundos, vai para a tela 3
      setTimeout(() => {
        tela2.style.display = "none";
        tela3.style.display = "flex";
        codigoSorteado.textContent = prize.cupom;
        prizeMessage.classList.remove("show");
      }, 4000);

      const normalizedFinal = totalRotation % 360;
      wheelImg.style.transition = "none";
      wheelImg.style.transform = `rotate(${normalizedFinal}deg)`;
      totalRotation = normalizedFinal;
    }, spinDuration + 100);
  });

  // --- BOTÃO WHATSAPP COM CUPOM NA MENSAGEM ---
  const linkWhatsapp = document.getElementById("whatsapp");
  if (linkWhatsapp && codigoSorteado) {
    linkWhatsapp.addEventListener("click", (event) => {
      event.preventDefault(); // evita redirecionar antes de preparar a mensagem

      const cupom = codigoSorteado.textContent.trim();
      if (!cupom) return;

      // Copia o cupom silenciosamente
      navigator.clipboard.writeText(cupom).catch((err) => {
        console.error("Erro ao copiar o cupom:", err);
      });

      // Cria a mensagem personalizada
      const numero = "5541999710062";
      const mensagem = `Olá! Ganhei o cupom *${cupom}* na roleta e quero garantir o meu prêmio!`;
      const urlWhatsApp = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

      // Abre o WhatsApp
      window.open(urlWhatsApp, "_blank");
    });
  }
});
