//提前还款审批
var ajaxUrl="/Modules/Workflows/RepayMent/Ajax/AdvanceRepayApply.ashx";
var dic:IDic[];
$(document).ready(function(){
    var flowParam=GetFlowParamFromUrl();
    $('#all').noasLoading();
    var postData= $.extend({method:"FlowLoad"}, flowParam);
    $.post(ajaxUrl,postData,function(res){
        $('#all').noasLoading({show:false});
        dic=res.dic;
        bindTableField(res,'iou');
        bindTableField(res,'loan');
        bindTableField(res,'money');
        bindTableField(res,'withhold');
        bindTableField(res,'other');
        bindTableField(res,'advance');
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
        //审核按钮
        $('#btnNoPass, #btnPass').click(function(){
            $('#all').noasLoading();
            var v=$(this).attr("v");
            var txt=$('#txtAuditText').val();
            if (v=="0"){ //不通过
                if (txt == ''){
                    alert("必须填写不通过的原因!");
                    $('#all').noasLoading({show:false});
                    return ;
                }
            }
            var postData={
                method:'FlowSaved',
                passed:v,
                txt:txt
            };
            postData=$.extend(postData, GetFlowParamFromUrl());
            $.post(ajaxUrl,postData,function(res:IRet){
                if (res.code==200){
                    alert("审核成功!");
                } else {
                    alert(res.errorMessage);
                }
                $('#all').noasLoading({show:false});
            })

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
   
    //从url中获取流程信息
    function GetFlowParamFromUrl(){
        return {
            insId: FK.QueryString("i"),
            nodeId: FK.QueryString("n"),
            taskId: FK.QueryString("t")
        };
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
});





