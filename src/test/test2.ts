import {Hello} from './lib'

Hello();

import {tplSelectOption} from '../template/t.html';
import * as tpl from "../template/t.html";


$(document).ready(function(){
    var html= tplSelectOption().render([{DicCode:1,DicName:'Test'},{DicCode:2,DicName:'Hello'}]);
    $('#se').append(html);
    console.log("Test2")
});


