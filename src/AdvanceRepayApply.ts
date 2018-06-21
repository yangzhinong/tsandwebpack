var ajaxUrl="/Modules/Workflows/RepayMent/Ajax/AdvanceRepayApply.ashx";
var iou=FK.QueryString("iou");
var dic:IDic[];
$(document).ready(function(){
    $('#all').noasLoading();
    $.post(ajaxUrl,{method:"Load",iou:iou},function(res){
        $('#all').noasLoading({show:false});
        dic=res.dic;
        bindTableField(res,'iou');
        bindTableField(res,'loan');
        bindTableField(res,'money');
        bindTableField(res,'other');
    });

    function bindTableField(res:any,table:string){
        $('span[bindtable=' + table +']').each(function(i,e){
            var $e=$(e);
            if ($e.attr('binddic')){
                try {
                    $e.text(dic.FindFirst("DicCode","=", res[table][e.id]).DicName)
                } catch{}
            } else {
                if ($e.hasClass("wy")){ //万元
                    var n=res[table][e.id]/10000.0;
                    $e.text(n);
                } else {
                    $e.text(res[table][e.id]);
                }
            }
        });
    }
});


function selectedDate() {

    return WdatePicker({
        startDate: '%y-%M-{%d}',
        minDate: '%y-%M-{%d}',
        dateFmt: 'yyyy-MM-dd',
        //readOnly: true,
        isShowClear: true,
        firstDayOfWeek: 1,
        isShowToday: false
    });

}
function Check() {
    //申请还款金额不能为空
    //申请提前还款金额不能大于本金余额
}
function checkinput(obj:HTMLElement) {
    var str = /^[0-9]+\.{0,1}[0-9]{0,2}$/;
    var val = $(obj).val();
    if (!str.test(val)) {
        $(obj).val('0');
    }
}


