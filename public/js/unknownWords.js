$(function(){
	 
	$("#btnAgregar").on("click",function(){
		var elementos="";
		var valor=$("#verb");
		var arrayNolaconosco = [];
		var stringNolaconosco = localStorage.getItem('nolaconosco');
        
		if(stringNolaconosco==null){
			arrayNolaconosco.push({ingles:valor.val(),espanol:""});
			
		}else{
			arrayNolaconosco=JSON.parse(stringNolaconosco);
			arrayNolaconosco.push({ingles:valor.val(),espanol:""});
	        
		}
		
		dataNolaconosco = JSON.stringify(arrayNolaconosco);
        localStorage.setItem('nolaconosco', dataNolaconosco);
		
		for(var i=0;i<=arrayNolaconosco.lenght;i++){
			elementos=elementos +"<a href=\"#!\" class=\"collection-item\">"+arrayNolaconosco[i].ingles +" - "+arrayNolaconosco[i].espanol +"</a>";	
		}
		
		$("#arecodar").append(elementos);
		
		
	})
	
	
	
});