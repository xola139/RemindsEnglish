var pushFirst=null;
var contadorPage=1;
//Funcio para validar cambio en el appcache
window.addEventListener('load', function(e) {

	window.applicationCache.addEventListener('updateready', function(e) {
	  window.location.reload();
	  
	  if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      if (confirm('A new version of this site is available. Load it?')) {
        window.location.reload();
      }
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);



$(document).ready(function(){
	
	//Para retirar los vervos que no se conocen de la bandeja no reconocidos
	$("#resetear").on("click",function(){
		localStorage.removeItem("desconocidosVerb");
	});
	
	//Colocamos el # de verbos que no conoces perdedor
	if(localStorage.getItem('desconocidosVerb')!=null){
		var arraylength = [] ;
		arraylength = JSON.parse(localStorage.getItem('desconocidosVeb'));
		$("#numdesco").text(arraylength.length +"..");
	}
	
	//Colocar el numero de verbos desconocidos para repasar
	$("#numdesco").on("click",function(){
		agregaItems('desconocidosVerb');
	});
	
	//botones anvegacion
	$("#btnNext").click(function() {
		backNext(this);
	});
	
	$("#btnBack").click(function() {
		backNext(this);
	});

	//Validamos si soporta localstorage si no valida estamos fritos
	if(typeof(Storage) !== "undefined") {
		var verbos ;
		if(localStorage.getItem('verbosVerb')==null){
			$.ajax({
				type:     "GET",
				url:      "http://15.156.24.35:8585/api",
				dataType: "jsonp",
				success: function(data){
					verbos=data;
					var dataToStore = JSON.stringify(verbos);
					localStorage.setItem('verbosVerb', dataToStore);
					agregaItems('verbosVerb');
				}
			});
		}else{
			agregaItems('verbosVerb');
		}
		return ;
	}else {
	   alert("Necesitamos un navegador moderno");
	}

});




function backNext(obj){
	var btnBack = $("#btnBack");
	var btnNext = $("#btnNext");

	//Quitamos el class del div activo
	$("#page_"+$(obj).attr('title')).removeClass("active")
	//	Y lo escondemos				
	$(".page").not(page).removeClass("active").hide();

	var nPActual = Number($(obj).attr('title'));
	var nPage = obj.id === 'btnNext' ? nPActual+1 : nPActual-1;

	$("#npage").text(nPage+"/"+contadorPage);

	//	Mostramos/Ocultamos  el boton Adelante/Atras
	if(nPage == 1){
		btnBack.css('display','none');
	}else{
		btnBack.css('display','');
	}

	if(nPage == $("div[id^=page_]").length){
		btnNext.css('display','none');
	}else{
		btnNext.css('display','');
	}

	window.page = "#page_"+nPage;
	var page = $(window.page);
	// window.location.hash = window.page;
	        
	$(obj).addClass("active");
	btnNext.attr('title',nPage);
	btnBack.attr('title',nPage);

	page.show();

	var totop = setInterval(function() {
		$(".pages").animate({scrollTop:0}, 0);
	}, 1);

	setTimeout(function() {
		page.addClass("active");
		setTimeout(function() {
			clearInterval(totop);
		}, 1000);
	}, 100);
}

function agregaItems(tipo){
	var theContenedor = $("#contenedor");
	var localData = JSON.parse(localStorage.getItem(tipo));
	var contadorItems = 0;
	contadorPage = 1
	//console.log(localData.items);
	var elementos= typeof localData.items === 'undefined' ? localData : localData.items;
	var auxVerbos;
	var auxExiste=false;
	
	if(tipo == 'verbosVerb' ){
		auxVerbos = JSON.parse(localStorage.getItem("desconocidosVerb"));
	}
	
	$("[id^='page_']").remove();
	theContenedor.append("<div class='flex-container well page active' style='display: flex;' id='page_1'></div>");
	
	$.each(elementos,function (index,data){
		
		auxExiste = false;
		
		//Para validar que no exista en la lista de no me la se
		if(tipo == 'verbosVerb' &&  auxVerbos != null){
			for (var x = 0;x < auxVerbos.length;x++)
			{
			  if(auxVerbos[x].ingles == data.ingles){
				  auxExiste = true;
				  return;
			  }
			}
		}
		
		if(auxExiste == true){
			return;
		}
		
		//Por cada 10 verbos colocamos una nueva pagina
		if(contadorItems == 10){
			contadorPage = contadorPage+1;
			contadorItems = 0;
			theContenedor.append("<div class='flex-container well page' id='page_"+contadorPage+"'></div>");
		}
		
		
		var dataEsp = data.espanol.replace(/\s/g,"");
		var dataIng = data.ingles.replace(/\s/g,"");
		
		
		var boton1 = $("<div class='flex-item'><img src='img/move.png' class='imgmove' /><a id='boton_"+dataEsp+"'  class='waves-effect waves-light btn' lang='mx' rel='"+dataIng+"'>"+data.espanol+"</a></div>");
		var boton2 = $("<div class='flex-item'><img src='img/move.png' class='imgmove' /><a id='boton_"+dataIng+"'  class='waves-effect waves-light btn' lang='us' rel='"+dataEsp+"'>"+data.ingles+"</a></div>");
		
		//Variable para ubicar la pagina donde se dibujaran los botones
		var contentPage = $("#page_"+ contadorPage);
	 
		/*Metodo para revolver los botones*/
		/*Agregamos al contenedor y lo volcemos drang and drop*/
		if(Math.floor(Math.random() * 50)&1){
			contentPage.append( boton1 );
			boton1.draggable({ revert: true,handle: "img" });
		}else{
			contentPage.prepend(boton1);
			boton1.draggable({ revert: true,handle: "img" });
		}
			
		if(Math.floor(Math.random() * 6)&1){
			contentPage.append(boton2);
			boton2.draggable({ revert: true,handle: "img" });
		}else{ 
			contentPage.prepend(boton2 );
			boton2.draggable({ revert: true,handle: "img" });
		}
		
		/*Fin Metodo para revolver los botones*/
      	contadorItems = contadorItems+1;
	})//Fin $.each
	
	//Atrapar los verbos no me la sabritas
	$("#droppable").droppable({
		activeClass: "ui-state-hover-pushCorrect",
	    hoverClass: "ui-state-active",
		drop: function( event, ui ) {
			
			
			var arrayDesconocido=[];
		    var dataDesconocidos;
		    var elemento = ui.draggable.children('a')[0];
		    
		    if(localStorage.getItem('desconocidosVerb') == null){
		    	arrayDesconocido.push({ingles:elemento.id.replace("boton_",""),espanol:elemento.rel.replace("boton_","")});
		    	dataDesconocidos = JSON.stringify(arrayDesconocido);
			    localStorage.setItem('desconocidosVerb', dataDesconocidos);
		    }else{
		    	arrayDesconocido = JSON.parse(localStorage.getItem('desconocidosVerb'));
		        arrayDesconocido.push({ingles:elemento.id.replace("boton_",""),espanol:elemento.rel.replace("boton_","")});
		        dataDesconocidos = JSON.stringify(arrayDesconocido);
		        localStorage.setItem('desconocidosVerb', dataDesconocidos);
		    }
		    
		    $("#numdesco").text(arrayDesconocido.length +"..");
		    
		    $("#"+elemento.id).parent().remove();
		    $("#boton_"+elemento.rel).parent().remove();
		    
		    pushFirst=null;
		    
		    $( this )
		          .addClass( "ui-state-highlight" )
		          .find( "p" );
		          
		      }
		    });
	
	
	$("#npage").text("1/"+contadorPage);
		
	$("a[id^=boton]").click(function() {
		var audio = $("#mySoundClip")[0];
		audio.play();
		
		var elementoSelec=$("#"+this.id);
		
		//Si no tiene la clase correcto no entra al cilco
 		if(elementoSelec.hasClass( "correcto" )==false){
 			//se escucha la palabra solo en ingles
 			if(this.lang=='us'){
 				
 				var msg = new SpeechSynthesisUtterance(this.text);
 					msg.lang = 'en-US';
 					msg.rate = 1.2;
 				    window.speechSynthesis.speak(msg);
 			}
 			
 			if(elementoSelec.hasClass( "push-down-active" )==true){
 				elementoSelec.removeClass('push-down-active');
 				elementoSelec.addClass('push-down');
 			}else{
 				elementoSelec.addClass('push-down-active');
 				elementoSelec.removeClass('push-down');
 			}
		 				
 			if(pushFirst==null){
 				pushFirst=this.id;
 			}else{
 				if($("#"+pushFirst)[0].rel==this.text.replace(/\s/g,"")){
 					
 					var audio = $("#soundCorrect")[0];
 					var pushF=$("#"+pushFirst);
 					audio.play();
 					$("#aciertos").text(Number($("#aciertos").text())+1);
 					//si ya es correcto le agregamos la clase correcto
 					elementoSelec.addClass('correcto');
 					pushF.addClass('correcto');
 					
 					elementoSelec.parent().find("img").remove();
 					pushF.parent().find("img").remove();
 					pushFirst=null;
		 		}else{
		 			
		 			//por si vuelve a pulsar el boton pero es incorrecto
		 			if(pushFirst!=this.id){
		 				$("#fallos").text(Number($("#fallos").text())+1);
		 				var audio = $("#soundInCorrect")[0];
	 					audio.play();
		 			}
		 			
		 			elementoSelec.removeClass('push-down-active').addClass('push-down');;
		 			$("#"+pushFirst).removeClass('push-down-active').addClass('push-down');
		 			pushFirst=null;
		 		}
 			}
		 					
 		}			
	});//fin $("a[id^=boton]")
	
	
 }





// Open source code

  window.page = window.location.hash || "#page_1";

  $(window).on("resize", function() {
    $("html, body").height($(window).height());
    //$(".main, .menu").height($(window).height() - $(".header-panel").outerHeight());
   // $(".pages").height($(window).height());
    //console.log("resize");
  }).trigger("resize");

  
  
  

 


