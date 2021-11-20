document.addEventListener('DOMContentLoaded', ()=>{
    const skills = document.querySelector('.lista-conocimientos');

    if(skills){
        skills.addEventListener('click', agregarSkills);
    }
})

const skills = new Set();
const agregarSkills = e =>{
   // console.log(e.target);
   if(e.target.tagName==='LI'){
       //console.log('si')
       if(e.target.classList.contains('activo')){
            skills.delete(e.target.textContent);
            e.target.classList.remove('activo');
       }else{
            //console.log('no');
       skills.add(e.target.textContent);
       e.target.classList.add('activo');
       }  
   }
   //console.log(skills);
   const skillsArray = [...skills];
   document.querySelector("#skills").value = skillsArray;
}