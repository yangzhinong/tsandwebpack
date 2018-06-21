export class FormalLoan{
    private static postCreateUrl:string='/Modules/Workflows/FormalLoan/Ajax/AjaxFormalLoanCreate.ashx';
    private NO = FK.QueryString("no");
    public InitCreatePage(){
        $('#all').noasLoading();
        var me=this;
        $(document).ready(function(){
            $('#pg-qz').detach().appendTo('#divpanel1');
            $('#pg-manager').detach().appendTo('#divpanel1');
            me.showtabpanel('1');
            var $defLoadCreate = $.post(FormalLoan.postCreateUrl, { "method": "load", "no": me.NO });

        });
    }

     private showtabpanel(id:string) {
        var nid = "divpanel";
        var maxTabe = 5;
        $("#ultabpanel li").each(function (i,e) {
            $(e).removeClass("act");
        });
        for (var i = 1; i < maxTabe; i++) {
            $("#divpanel" + i).hide();
        }
        $("#ultabpanel li:eq(" + (parseInt(id) - 1) + ")").addClass("act");
        $("#divpanel" + id).show();
    }
}


