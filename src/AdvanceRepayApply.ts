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
        //LastBasicMoneyRow
        var rate:any[]=res.rate;
        if (rate && rate.length>0) {
            $.each(res.rate,function(i:number,e){
                var sFeeType=(e.FeeType==1820001?'%':'元');
                var sFeeName= findDicName(e.FeeID); // dic.FindFirst("DicCode","=", e.FeeID).DicName;
                var sFeeOrRate=e.FeeOrRate;
                var iRow=(i%2==0?1:2);
                var html=`
                <tr class="tabtdbg${iRow}">
                        <td width="20%" class="textR">${sFeeName}
                        </td>
                        <td width="30%" class="textL">
                            <span>${sFeeOrRate}</span>%
                        </td>
                         <td width="20%" class="textR"></td>
                        <td width="30%" class="textL"></td>
                    </tr>
                `;
                $('#LastBasicMoneyRow').after(html);
            });
        }
        
        var $divApply=$('#applydiv');

        function findDicName(i:number){
            try {
              return   dic.FindFirst("DicCode","=", i).DicName;
            } catch {
                return  "";
            }
        }
        $('#btn-submit').click(function(){
            if (checkupdateEx($divApply)){
                var postData= {
                    method:'SaveApply',
                    IouNo:iou,
                    ApplyDate:$('input[name=ApplyDate]',$divApply).val(),
                    ApplyMoney: $('#ApplyMoney',$divApply).val(),
                    ApplyText:$('textarea[name=ApplyText]',$divApply).val()
                };
                if (postData.ApplyDate==""){
                    alert("申请提前还款日期 未填写!");
                    return;
                }
                $('#all').noasLoading();
                $.post(ajaxUrl,postData,function(res:IRet){
                    $('#all').noasLoading({show:false});
                    if (res.code==200){
                        alert("申请成功!");
                    } else {
                        alert(res.errorMessage);
                    }
                });
            }
        });
    });

    
    ///根据html标签属性 绑定数据显示
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
                console.log(ex);
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



