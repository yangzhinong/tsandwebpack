REM copy .\src\AdvanceRepayApply.js "C:\code\CY.BPMS\BPMS.WEB\04 Layouts\BPMS.WEB.Layouts\Scripts\Modules\RepayMent\" /y
REM copy .\src\AdvanceFlow.js "C:\code\CY.BPMS\BPMS.WEB\04 Layouts\BPMS.WEB.Layouts\Scripts\Modules\RepayMent\" /y

cd c:\bpmts
webpack && copy c:\bpmts\dist\*.js f:\ /y

