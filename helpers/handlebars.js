module.exports={

    seleccionarSkills:(seleccionadas=[], opciones)=>{

        //console.log(seleccionadas); 

        const skills=['Torta Fria', 'Torta de Chocolate', 'Galletas', 'Emparedados', 'Cupcakes', 
        'Tres leches','Media Lunas', 'Alfajores', 'Browinies', 'Mantecadas', 'Frapuchino',
        'Matte Helado', 'Americano', 'Café Frio', 'Te Helado', 'Mochachino', 'Latte',
        'Mocha', 'Mocha Blanco', 'Cappuccino'
    ];

        let html='';

        skills.forEach(skill=>{
            html+=`<li ${seleccionadas.includes(skill) ? 'class="activo"':''}>${skill}</li>`;
        });

        return opciones.fn().html = html;
    },
    seleccionSkills:(seleccionadas=[], opciones)=>{

        //console.log(seleccionadas); 

        const skillss=['Cucas','Galletas', 'Croasaint', 'Emparedados', 'Tortas', 'Brownies', 
        'Tres Leches','Pan Hawaiano', 'Media Lunas', 'Mantecadas', 'Americano', 'Expresso',
        'Cappuccino', 'Te helado', 'Moca', 'Te verde', 'Latte', 'Frapuchino',
        'Espresso Doble', 'Mochachino'
    ];

        let html='';

        skillss.forEach(skilll=>{
            html+=`<li ${seleccionadas.includes(skilll) ? 'class="activo"':''}>${skilll}</li>`;
        });

        return opciones.fn().html = html;
    },
    tipoContrato:(seleccionado, opciones)=>{
        //console.log(seleccionado);
        //console.log(opciones.fn());
        return opciones.fn(this).replace(
            new RegExp(`value="${seleccionado}"`),
            '$& selected="selected"'
        )
    },
    mostrarAlertas :(errores={}, alertas)=>{
       // console.log(errores);
       //console.log(alertas.fn());
       const categoria = Object.keys(errores);
       //console.log(categoria);
       let html='';
       if(categoria.length){
           errores[categoria].forEach(error=>{
               html+=`<div class="${categoria} alerta">
               ${error}
               </div>`;
           })
       }
       return alertas.fn().html=html;
    }
}