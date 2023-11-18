//service worker

if('serviceWorker' in Navigator){
    console.log('puedes usar los serviceWorker del navegador');

    navigator.serviceWorker.register('./sw.js')
                            .then(res=>console.log('serviceWorker cargado correctamente',res))
                            .then(err=>console.log('ServiceWorker no se ha podido registrar', err))
}else{
    console.log('No puedes usar los serviceWorker del navegador');
}

//scroll suavizado
$(document).ready(function(){
    $("#menu a").click(function(e){
        e.preventDefault();

        $("html,body").animate({
            scrollTop:$($(this).attr('href')).offset().top
        });
        return false;
    });
});