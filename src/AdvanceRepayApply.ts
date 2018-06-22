//提前还款申请
var ajaxUrl="/Modules/Workflows/RepayMent/Ajax/AdvanceRepayApply.ashx";
var iou=FK.QueryString("iou");
var dic:IDic[];
$(document).ready(function(){
    $('#all').noasLoading();
    var flowParam=GetFlowParamFromUrl();
    var postData= $.extend({method:"Load",iou:iou}, flowParam);
    $.post(ajaxUrl,postData,function(res){
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
            var twoArray= rate.splitArrayToTwo();
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

        $('#gridGrant').noasGrid({
            data: res.grant,
            columns: [
                {display:'发放日期',name:'GrantDate',align:'center'},
                {display:'金额',name:'GrantMoney',align:'center'}
            ],
            alwaysShowHeader:true,
            mergeSort:false,
            width:'100%'
        });

        $('input[name=ApplyDate]').val(res.advance.ApplyDate);
        $('#ApplyMoney').val(res.advance.ApplyMoney);
        $('#ApplyText').val(res.advance.ApplyText);
 
        var $divApply=$('#applydiv');
        $('#btn-submit').click(function(){
            if (checkupdateEx($divApply)){
                var postData= {
                    method:'SaveApply',
                    AdvanceCount:FK.QueryString("AdvanceCount"),
                    IouNo:iou,
                    ApplyDate:$('input[name=ApplyDate]',$divApply).val(),
                    ApplyMoney: $('#ApplyMoney',$divApply).val(),
                    ApplyText:$('textarea[name=ApplyText]',$divApply).val()
                };
                if (postData.ApplyDate==""){
                    alert("申请提前还款日期 未填写!");
                    return;
                }
                var flowParam=GetFlowParamFromUrl();
                postData= $.extend(postData, flowParam);
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
    function ToRateViewModel(e:any):BPMSView.IRepayMent_RateViewModel{
        var ret:BPMSView.IRepayMent_RateViewModel={ sFeeName:'',sFeeType:'',sFeeOrRate:''};
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

    //从url中获取流程信息
    function GetFlowParamFromUrl(){
        return {
            insId: FK.QueryString("i"),
            nodeId: FK.QueryString("n"),
            taskId: FK.QueryString("t")
        };
    }
});





