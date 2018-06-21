var ajaxUrl="";
$(document).ready(function(){
    
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


