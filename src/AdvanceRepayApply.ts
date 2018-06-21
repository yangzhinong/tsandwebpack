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
        bindTableField(res,'withhold');
        bindTableField(res,'other');
        var $divApply=$('#applydiv');
        $('#btn-submit').click(function(){
            if (checkupdateEx($divApply)){
                $('#all').noasLoading();
                $.post(ajaxUrl, {
                    method:'SaveApply',
                    ApplyDate:$('input[name=ApplyDate]',$divApply).val(),
                    ApplyMoney:$('input[name=ApplyMoney]',$divApply).val(),
                    ApplyText:$('textarea[name=ApplyText]',$divApply).val()
                },function(res:IRet){
                    $('#all').noasLoading({show:false});
                    if (res.code==200){
                        alert("申请成功!");
                    } else {
                        alert(res.bizResponse);
                    }
                });
            }
        });
    });

    

    function bindTableField(res:any,table:string){
        $('span[bindtable=' + table +']').each(function(i,e){
            var $e=$(e);
            try {
                if ($e.attr('binddic')){
                    $e.text(dic.FindFirst("DicCode","=", res[table][e.id]).DicName)
                } else {
                    if ($e.hasClass("wy")){ //万元
                        var n=res[table][e.id]/10000.0;
                        $e.text(n);
                    } else {
                        $e.text(res[table][e.id]);
                    }
                }
            } catch(ex){
                console.error(ex);
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



