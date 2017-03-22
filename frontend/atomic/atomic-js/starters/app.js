/*
	El concepto de agitar el árbol básicamente dice que si no estás usando algún código, entonces lo excluyes del paquete final, incluso cuando ese fragmento de código es exportado de un módulo. Debido a que los módulos ES6 son estadísticamente analizables.
*/
//import $ from 'jquery';
import { AppCore }  from 'yosonjs'
/*import { multiplier} from '../schemes/scheme.js'*/
let test = System.import('../schemes/scheme.js').then((val)=>{console.log(val.add(5,5),"val");})
//let mySum = test.multiplier(4,5)
console.log("From [ App ]", test);