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

            var twoArray= splitArrayToTwo(rate);
            for(let i=0; i<twoArray.a.length; i++){
                var iRow=(i%2==0?1:2);
                var e1=ToRateViewModel(twoArray.a[i]);
                var e2=ToRateViewModel(twoArray.b[i]);
                var html=`
                <tr class="tabtdbg${iRow}">
                        <td width="20%" class="textR">${e1.sFeeName}
                        </td>
                        <td width="30%" class="textL">
                            <span>${e1.sFeeOrRate}</span>${e1.sFeeType}
                        </td>
                         <td width="20%" class="textR">${e2.sFeeName}</td>
                        <td width="30%" class="textL">
                            <span>${e2.sFeeOrRate}</span>${e2.sFeeType}
                        </td>
                    </tr>
                `;
                $('#LastBasicMoneyRow').after(html);
            } 
        }
        
        var $divApply=$('#applydiv');

      
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
    interface ITwoArray {
        a: any[],
        b: any[]
    }
    function splitArrayToTwo(a:any[]){
        var ret:ITwoArray = {a:[], b:[]};
        for(let i=0; i<a.length; i++){
            if (i % 2 == 0){
                ret.a.push(a[i]);
            } else {
                ret.b.push(a[i]);
            }
        }
        if (a.length % 2 !== 0){
            ret.b.push(null);
        }
        return ret;
    }

    interface IRateViewModel {
        sFeeType:string,
        sFeeName:string,
        sFeeOrRate:string
    }

    function ToRateViewModel(e:any):IRateViewModel{
        var ret:IRateViewModel={ sFeeName:'',sFeeType:'',sFeeOrRate:''};
        if (e){
            ret.sFeeType= (e.FeeType==1820001?'%':'元');
            ret.sFeeName= findDicName(e.FeeID); // dic.FindFirst("DicCode","=", e.FeeID).DicName;
            ret.sFeeOrRate=e.FeeOrRate;
        }
        return ret;
    }
    function findDicName(i:number){
        try {
          return   dic.FindFirst("DicCode","=", i).DicName;
        } catch {
            return  "";
        }
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



