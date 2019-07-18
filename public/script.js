document.querySelectorAll(".gallery-image").forEach((gl)=>{
	gl.addEventListener('mouseover', function(){
		document.querySelectorAll('.gallery-title').forEach((pl)=>{
			pl.style="opacity: 0"	
		})
    })
    gl.addEventListener('mouseout', function(){
		document.querySelectorAll('.gallery-title').forEach((pl)=>{
			pl.style="opacity: 1"	
		})
	})
})
