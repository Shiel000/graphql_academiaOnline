import { IResolvers } from 'graphql-tools'
import { database } from '../data/data.store';
import _ from 'lodash';

const type : IResolvers ={
    Estudiante :{
        courses : parent => {
            const cursosLista : Array<any> = [];
        parent.courses.map((curso:string)=>{
            cursosLista.push(_.filter(database.cursos,['id',curso])[0])
        });
        return cursosLista;
        }
    },
    Curso :{
        students : parent => {
            const estudianteLista : Array<any> = [];
            const cursoId = parent.id;
            database.estudiantes.map((estudiante:any)=>{
                if (estudiante.courses.filter((id:any)=> id === cursoId)>0){
                    estudianteLista.push(estudiante)
                }
            });
            return estudianteLista;
        },
        path : parent => `http://www.udemy.com${parent.path}`
    }
}
export default type;