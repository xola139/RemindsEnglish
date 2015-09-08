var pushFirst=null;

//Check if a new cache is available on page load.
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
	
	
	
	function agregaItems(){
		var localData = JSON.parse(localStorage.getItem('verbos'));
		var contadorPage=1;
		var contadorItems=0;
		
		$.each(localData.items,function (index,data){
			if(contadorItems==10){
				contadorPage=contadorPage+1;
				contadorItems=0;
				$("#contenedor").append("<div class=\"well page\" id=\"page_"+contadorPage+"\"></div>");
			}
			
			
			/*Metodo para revolver los botones*/
			var boton1="<a id=\"boton_"+data.espanol.replace(/\s/g,"")+"\" style=\" text-decoration:none;\" class=\"common push-down\" lang=\"mx\" rel=\""+data.ingles.replace(/\s/g,"")+"\">"+data.espanol+"</a>";
			var boton2="<a id=\"boton_"+data.ingles.replace(/\s/g,"")+"\" style=\" text-decoration:none;\" class=\"common push-down\" lang=\"us\" rel=\""+data.espanol.replace(/\s/g,"")+"\">"+data.ingles+"</a>";
		
			if(Math.floor(Math.random() * 50)&1)
				$("#page_"+contadorPage).append(boton1);
			else
				$("#page_"+contadorPage).prepend(boton1);
			
			if(Math.floor(Math.random() * 6)&1)
				$("#page_"+contadorPage).append(boton2);
			else
				$("#page_"+contadorPage).prepend(boton2);
			
			/*Fin Metodo para revolver los botones*/
          	contadorItems=contadorItems+1;
		})//Fin $.each
		
			
		$("a[id^=boton]").click(function() {
			//Si no tiene la clase correcto no entra al cilco
	 		if($("#"+this.id).hasClass( "correcto" )==false){
	 			//se escucha la palabra solo en ingles
	 			if(this.lang=='us'){
	 				var msg = new SpeechSynthesisUtterance(this.text);
	 				    window.speechSynthesis.speak(msg);
	 			}
	 			
	 			if($("#"+this.id).hasClass( "push-down-active" )==true){
	 				$("#"+this.id).removeClass('push-down-active');
	 				$("#"+this.id).addClass('push-down');
	 			}else{
	 				$("#"+this.id).addClass('push-down-active');
	 				$("#"+this.id).removeClass('push-down');
	 			}
			 				
	 			if(pushFirst==null){
	 				pushFirst=this.id;
	 			}else{
	 				if($("#"+pushFirst)[0].rel==this.text.replace(/\s/g,"")){
	 					//si ya es correcto le agregamos la clase correcto
	 					$("#"+this.id).addClass('correcto');
	 					$("#"+pushFirst).addClass('correcto');
	 					pushFirst=null;
			 		}else{
			 			$("#"+this.id).removeClass('push-down-active').addClass('push-down');;
			 			$("#"+pushFirst).removeClass('push-down-active').addClass('push-down');
			 			pushFirst=null;
			 		}
	 			}
			 					
	 		}			
		});//fin $("a[id^=boton]")
				
	 }
			
			
		$("#btnNext").click(function() {
			backNext(this);
		});
		
		$("#btnBack").click(function() {
			backNext(this);
		});


function backNext(obj){

	//Quitamos el class del div activo
	$("#page_"+$(obj).attr('title')).removeClass("active")
	//Y lo escondemos				
	$(".page").not(page).removeClass("active").hide();
	
	
	
	var nPActual=Number($(obj).attr('title'));
	var nPage= obj.id==='btnNext' ? nPActual+1 : nPActual-1;
	
	
	//Mostramos/Ocultamos  el boton Adelante/Atras
	if(nPage==1){
		$("#btnBack").css('display','none');
	}else{
		$("#btnBack").css('display','');
	}
	
	if(nPage==$("div[id^=page_]").length){
		$("#btnNext").css('display','none');
	}else{
		$("#btnNext").css('display','');
	}
	
	
	
	window.page = "#page_"+nPage;
    var page = $(window.page);
   // window.location.hash = window.page;
		        
    $(obj).addClass("active");
    $("#btnNext").attr('title',nPage);
    $("#btnBack").attr('title',nPage);

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



			 if(typeof(Storage) !== "undefined") {
			        //if (localStorage.verbos) {
			            var verbos ;
			            if(localStorage.getItem('verbos')==null){
							$.ajax({
				            	  type:     "GET",
				            	  url:      "http://15.156.24.35:8585/api/",
				            	  dataType: "jsonp",
				            	  success: function(data){
				            		  console.log(data);
				            		  verbos=data;
				            		  var dataToStore = JSON.stringify(verbos);
	 					              localStorage.setItem('verbos', dataToStore);
	 					              agregaItems();
							      }
				            	});
			            } else{
			            	agregaItems();
			            }
			 } else {
			        alert("Sorry, your browser does not support web storage...");
			 }

		});



// Open source code

  window.page = window.location.hash || "#page_1";

  $(window).on("resize", function() {
    $("html, body").height($(window).height());
    //$(".main, .menu").height($(window).height() - $(".header-panel").outerHeight());
   // $(".pages").height($(window).height());
    //console.log("resize");
  }).trigger("resize");

  

 


