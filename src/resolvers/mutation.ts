import { IResolvers } from 'graphql-tools'
import { database } from '../data/data.store';
import _ from 'lodash';

const mutation : IResolvers ={
    Mutation : {
        crearCurso (__:void,{curso}):any{
            const item ={
                id: String(database.cursos.length+1),
                title:curso.title,
                description: curso.description,
                clases: curso.clases,
                time: curso.time,
                level: curso.level,
                logo: curso.logo,
                path: curso.path,
                teacher: curso.teacher,
                reviews: []
            }
            if (database.cursos.filter(itemCurso => itemCurso.title === item.title).length===0){
                database.cursos.push(item);
                return item;
            }
            
            return {
                id: "-1",
                title:`el curso con nombre  ya existe`,
                description: ' ',
                clases: -1,
                time: 0.0,
                level: "TODOS",
                logo: ' ',
                path: ' ',
                teacher: ' ',
                reviews: []
            };
        },
        modificarCurso (__:void,{curso}):any{
            const elemento = _.findIndex(database.cursos, function(o){
                return o.id === curso.id
            });
            if(elemento > -1){
                const valoraciones = database.cursos[elemento].reviews;
                curso.reviews = valoraciones;
                database.cursos[elemento]= curso;
                return curso;
            };
            return {
                id: "-1",
                title:`el curso no existe en la base de datos`,
                description: ' ',
                clases: -1,
                time: 0.0,
                level: "TODOS",
                logo: ' ',
                path: ' ',
                teacher: ' ',
                reviews: []
            };
        },
        eliminarCurso(__:void,{id}):any{
            const borrarItem = _.remove(database.cursos,function(curso){
                return curso.id === id;
            });
            if (borrarItem[0]=== undefined){
                return {
                    id: "-1",
                    title:`el curso no existe en la base de datos`,
                    description: ' ',
                    clases: -1,
                    time: 0.0,
                    level: "TODOS",
                    logo: ' ',
                    path: ' ',
                    teacher: ' ',
                    reviews: []
                };
            }
            return borrarItem[0]
        }

    }

}
export default mutation;