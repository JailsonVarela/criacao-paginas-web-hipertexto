$(document).ready(function () {
    //Código jQuery

    $("#saudacaoTurma").fadeOut(3000);
    $("#saudacaoTurma").fadeIn(3000);
    $("#saudacaoTurma").fadeOut(1500);
    
    $("#titulo").fadeIn(6000);

    $("#animar").mouseover(function(){
        //alert("Mouse over")
    });

    $("#titulo").animate({ left: "-=200px" }, 1000);
    $("#titulo").delay(2000);
    $("#titulo").animate({ left: "+=200px" }, 1000);

    $("#animar").click(function () {
        $("#titulo").animate({ left: "-=200px" }, 1000);
        $("#titulo").delay(2000); // corresponde aos 200px da margem esqueda
        $("#titulo").animate({ left: "+=200px" }, 1000);
    });

    const nome = localStorage.getItem("nome");

    if (nome) {
        $("#mensagemBoasVindas").html(
        "Olá <strong>" + nome + "</strong>, bem-vindo ao meu site!"
        );
    } else {
        $("#mensagemBoasVindas").html("<strong> Olá visitante! </strong>");
    }

      
    $("#btnSaudacao").click(function () {
        const nome = prompt("Qual é o seu nome?");
        if (nome) {
        $("#mensagemBoasVindas").text("Olá " + nome + ", bem-vindo ao meu site!");
        } else {
        $("#mensagemBoasVindas").html("<strong> Olá visitante! </strong>");
        }
    });

    $("#formContacto").on("submit", function (e) {
        e.preventDefault(); // evita recarregar a página

        const nome2 = $("#nome").val().trim();
        const email = $("#email").val().trim();
        const genero = $("#genero").val();
        const password = $("#password").val();
        const mensagem = $("#mensagemForm");
        
        if (nome2 === "" || email === "" || password === "") {
        
            mensagem
                .removeClass("alert-success")
                .addClass("alert-danger")
                .html(
                    "<strong> Erro!</strong> Por favor, preencha todos os campos obrigatórios."
                )
                .fadeIn(400)
                .delay(2500)
                .fadeOut(400);
                
        }else{
            mensagem
                .removeClass("alert-danger")
                .addClass("alert-success")
                .html(
                "<strong>Sucesso!</strong> O formulário foi enviado corretamente."
                )
                .fadeIn(400)
                .delay(2500)
                .fadeOut(400);
                //this.submit();

                localStorage.setItem("nome", nome2);
                localStorage.setItem("email", email);
                localStorage.setItem("genero", genero);  
                $("#nomeLocal").text(nome2);
                $("#emailLocal").text(email);
                $("#generoLocal").text(genero);

                $("#mensagemBoasVindas").text(
                "Olá " + localStorage.getItem("nome") + ", bem-vindo ao meu site"
        );
        }
    });
    
    $(Window).scroll(function(){
        if($(this).scrollTop() > 300){
            $("#btnTopo").fadeIn(1000);
        }else{
            $("#btnTopo").fadeOut(1000);
        }
    });

    $("#btnTopo").click(function () {
        //O scroll pode estar associado ao html ou body consoante o navegador
        $("html, body").animate({ scrollTop: 0 }, 1000);
    });

    function atualizarHora() {
        const agora = new Date().toLocaleTimeString();
        $("#horaAtual").text("Hora atual: " + agora);
    }
    setInterval(atualizarHora, 1000);

    async function atualizarTemperatura(lat, lon) {
        try{
            const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=auto`;
            const resposta = await fetch(url);

            if(!resposta.ok){
                throw new Error("Erro ao buscar dados do clima");
            }

            const dados = await resposta.json();
            const temp = Math.round(dados.current_weather.temperature);
            const vento = dados.current_weather.windspeed;

            $("#temperaturaAtual").text(`Temperatura: ${temp}°C | Vento: ${vento}km/h`);

        }catch(erro){
            $("#temperaturaAtual").text("Não foi possível carregar a temperatura.");

        }     
    }

    function obterLocalizacao() {
        if("geolocation" in navigator){
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const lat= pos.coords.latitude; 
                    const lon = pos.coords.longitude;
                    atualizarTemperatura(lat, lon);
                },
                (erro) => {
                    console.alert("Erro ao obter localização.");
                    $("#temperaturaAtual").text("Permita acesso à localização para ver a temperatura.");
                }
            );
        }else {
            $("#temperaturaAtual").text("Geolocalização não suportada pelo navegador.");
        }
    }

    obterLocalizacao();

    $("#btnTema").click(function(){
        let estilo = "rgb(120 216 185 / 58%)"
        document.body.style.background = estilo
    })
});