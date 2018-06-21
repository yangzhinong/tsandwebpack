declare var g:{
    fileServerPostUrl:string;
    fileServerGetUrl:string;
};

interface Array<T> {
    OrderByDesc(propertyname:string):T[];
    Where(poperty:string,op:string,v:T):T[];
    FindFirst(poperty:string,op:string,v:T):T[];
    delItem(poperty:string,v:T):T[];
}

declare var WdatePicker:(opt:{
    startDate:string, //'%y-%M-{%d}'
    minDate?:string,  //'%y-%M-{%d}'
    dateFmt:string,  //'yyyy-MM-dd'
    readOnly?:boolean,
    isShowClear?:boolean,
    firstDayOfWeek:number, //1
    isShowToday?:boolean
})=>void;


interface FK {
    QueryString(key:string):string;
}
declare var FK:FK;

interface Date {
    format(fmt:string):string;
}
declare var isIdCardNo : (num:string)=>boolean;
declare var checkIsZero: (id:string)=>boolean;
declare var checkIsEmpty:(obj:JQuery|HTMLElement)=>boolean;
declare var CheckInterger:(obj:JQuery|HTMLElement)=>boolean;
declare var CheckNumber:(obj:JQuery|HTMLElement, mustInput?:boolean)=>boolean;
declare var checkPhone:(obj:JQuery|HTMLElement)=>boolean;
declare var checkTelOrPhone:(obj:JQuery|HTMLElement)=>boolean;
declare var checkidNumber:(obj:JQuery|HTMLElement)=>boolean;
declare var checkEmail:(obj:JQuery|HTMLElement)=>boolean;
declare var checkupdateEx:(obj:JQuery)=>boolean;


interface JQuery {
    noasLoading(opt?:{show:boolean}):void;
    noasGrid(opt:{
        data:object[]
        columns: {
            display:string,
            name:string,
            width?:number,
            align?:'center'|'left'|'right',
            render?: (item:object)=>JQuery|string
        },
        width?:string,//'100%'
        alwaysShowHeader?:boolean,
        mergeSort?:boolean
    }):void;

    noasPager(opt:{
        pageSize:number,
        pageIndex:number,
        buttonClickCallback:(pageIndex:number)=>void, //分页事件
        recordCount:number,
        showNum:number
    }):void;

}


