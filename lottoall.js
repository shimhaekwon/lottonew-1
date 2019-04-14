/*
		$("#tableBaseData tbody tr").find("td:nth-child(1)").length;
		$("#tableBaseData tbody tr").find("td:eq(0)").length
		$("#tableBaseData tbody tr").find("td").eq(0).length

		$("#tableBaseData tbody tr td:nth-child(1)").length;
		$("#tableBaseData tbody tr td:eq(0)").length
		$("#tableBaseData tbody tr td").eq(0).length
*/

//////////////////////////////////////////////////////////////////////////////////////////////
// document ready
//////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(){

	funcSetColorArray();
	funcSetSelectBox();
	funcSetBaseTable();
	funcSetSideData();

	funcTest();

	$(document).on("click", "#tableBaseData tbody tr",  function(event){

		var vSeq = $(this).find("td:eq(0)").text();
		var vNo = $(this).text();

		lottoObj.selSeq = vSeq;
		lottoObj.selNo = vNo;

		$("#tableBaseData tbody tr td:nth-child(1)").removeClass();
		$(this).find("td:eq(0)").addClass("seqSelected");
	});

	$("#btnCheckReAppear").click(function(){
		funcSetReAppearTable();
	});

	$("#btn2Go").click(function(){

		var selType = $("#sel2Type").val();
		var selSkip = $("#sel2Skip").val();
		var selList = $("#sel2List").val();
		var selGame = $("#sel2Game").val();

		funcSetSideDataTable("Side2", selType,selSkip,selGame,selList);
		funcSetSideFreqTable("Side2", selType,selSkip,selGame,selList);
		funcSetSideFreqSumTable("Side2", selType,selSkip,selGame,selList);
		funcSetSideTdBgColor();
	});

	$("#chkFlagBonusBall").click(function(){

		if ($("#chkFlagBonusBall").is(":checked") )
		{
			$("#tableBaseData tbody tr th:nth-child(8)").css("display","");
			$("#tableBaseData tbody tr td:nth-child(8)").css("display","");
		}else{
			$("#tableBaseData tbody tr th:nth-child(8)").css("display","none");
			$("#tableBaseData tbody tr td:nth-child(8)").css("display","none");
		}
	});

	$("#sel1Type").change(function(){
		funcCallFuncSetBaseTableBackGroundColor();		
	});

  var $divs = $('#tableSide2Data tbody, #tableSide2Freq tbody, #tableSide2FreqSum tbody');
  var sync = function(e){
      var $other = $divs.not(this).off('scroll'), other = $other;
      var percentage = this.scrollTop / (this.scrollHeight - this.offsetHeight);
	  var otherTop = 0;
	  $other.each(function(event){
		  otherTop = percentage * (this.scrollHeight - this.offsetHeight);
		  this.scrollTop = otherTop;
	  });

	  //for (var i=0; i<other.length; i++)
	  //{
		  //other.get(i).scrollTop = percentage * (other.get(i).scrollHeight - other.get(i).offsetHeight);
	  //}	// jquery의 each 를 사용하는 방향으로 전환(잘 작동함 - 하지만 Looping은 제거하자)

      //other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);		>> other = $other.get(0) 인 경우에만 유효함
      setTimeout( function(){ $other.on('scroll', sync ); },50);
  };	
  $divs.on('scroll',sync);
  

  var $divs2 = $('#tableBaseData tbody, #tableBaseDataReAppear tbody');
  var sync2 = function(e){
      var $other = $divs2.not(this).off('scroll'), other = $other;
      var percentage = this.scrollTop / (this.scrollHeight - this.offsetHeight);
	  var otherTop = 0;
	  $other.each(function(event){
		  otherTop = percentage * (this.scrollHeight - this.offsetHeight);
		  this.scrollTop = otherTop;
	  });

	  //for (var i=0; i<other.length; i++)
	  //{
		  //other.get(i).scrollTop = percentage * (other.get(i).scrollHeight - other.get(i).offsetHeight);
	  //}	// jquery의 each 를 사용하는 방향으로 전환(잘 작동함 - 하지만 Looping은 제거하자)

      //other.scrollTop = percentage * (other.scrollHeight - other.offsetHeight);		>> other = $other.get(0) 인 경우에만 유효함
      setTimeout( function(){ $other.on('scroll', sync2 ); },50);
  };	
  $divs2.on('scroll',sync2);

});

funcCallFuncSetBaseTableBackGroundColor = function(){
		var selVal = $("#sel1Type").val();
		//funcSetBaseTableBackGroundColor( selVal);
		funcSetTableBackGroundColor($("#tableBaseData tbody tr td"), selVal)
		//hsl(0~360,90%,90%);
};

funcSetTableBackGroundColor = function(pTargetObj, pSelVal){

	console.log(pTargetObj + ", " + pSelVal);
	var pCntType = pSelVal.substring(0,2);
	var pType = pSelVal.substring(2,3);
	var arrObj = eval("lottoObj.arrColor"+pCntType);
	var pColCnt = Number(pCntType);
	if ("10G" == pSelVal)
	{
		arrObj = lottoObj.arrColor05;
	}

	$(pTargetObj).each(function(event){
		if( $(this).parent().index() > 0 && $(this).index() > 0) {

			if (45 == pColCnt)
			{
				$(this).css("background-color", arrObj[Number( $(this).text() )].color);
			} else {
				if ("G" == pType)
				{
					if ("10G"==pSelVal)
					{
						pColCnt = 4.5;
					}
					$(this).css("background-color", arrObj[ Math.ceil( Number( $(this).text() ) / Math.ceil(45/pColCnt) ) ].color);
				}else{
					$(this).css("background-color", arrObj[  ( Number( $(this).text() ) % pColCnt ) + 1 ].color);
				}
			
			}
		}
	});
};

funcSetColorArray = function(){
	var i = 0;

	for (i=0; i <= 360 ; i=i+8)
	{
		if (null == lottoObj.arrColor45[i/8] || undefined == lottoObj.arrColor45[i/8])
		{
			lottoObj.arrColor45[i/8] = {seq:(i/8),color:"hsla("+i+", 90%, 50%, 0.8)"};
		}
	}

	for (i=0; i <= 360 ; i=i+24)
	{
		if (null == lottoObj.arrColor15[i/24] || undefined == lottoObj.arrColor15[i/24])
		{
			lottoObj.arrColor15[i/24] = {seq:(i/24),color:"hsla("+i+", 90%, 50%, 0.8)"};
		}
	}

	for (i=0; i <= 360 ; i=i+36)
	{
		if (null == lottoObj.arrColor10[i/36] || undefined == lottoObj.arrColor10[i/36])
		{
			lottoObj.arrColor10[i/36] = {seq:(i/36),color:"hsla("+i+", 90%, 50%, 0.8)"};
		}
	}

	for (i=0; i <= 360 ; i=i+40)
	{
		if (null == lottoObj.arrColor09[i/40] || undefined == lottoObj.arrColor09[i/40])
		{
			lottoObj.arrColor09[i/40] = {seq:(i/40),color:"hsla("+i+", 90%, 50%, 0.8)"};
		}
	}

	for (i=0; i <= 360 ; i=i+72)
	{
		if (null == lottoObj.arrColor05[i/72] || undefined == lottoObj.arrColor05[i/72])
		{
			lottoObj.arrColor05[i/72] = {seq:(i/72),color:"hsla("+i+", 90%, 50%, 0.8)"};
		}
	}

	for (i=0; i <= 360 ; i=i+120)
	{
		if (null == lottoObj.arrColor03[i/120] || undefined == lottoObj.arrColor03[i/120])
		{
			lottoObj.arrColor03[i/120] = {seq:(i/120),color:"hsla("+i+", 90%, 50%, 0.8)"};
		}
	}

};

funcTest = function(){
//	var step = 4;
//	for (var i=0; i<=360; i=i+step){
//		//$("#divTest").append("<div style='background-color:rgb("+i+","+j+","+k+");border:1px solid black; width:128px;padding-left:5px;'>rgb("+i+","+j+","+k+")</div>");
//		$("#divTest").append("<div style='background-color:hsla("+i+",100%,50%,0.9);border:1px solid black; width:196px;padding-left:5px;'>hsla("+i+",100%,50%,0.9)</div>");
//	}
};
//////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// 기본 테이블 초기화
//////////////////////////////////////////////////////////////////////////////////////////////
funcSetBaseTable = function(){

	$("#tableBaseData tbody").html("");
	var trHtml = "";

	if (null != lottodata && lottodata.length > 0)
	{
		for (var i=lottodata.length-1; i>=0; i--)
		{
			trHtml = "<tr>";
			for (var j=0; j<8 ; j++)
			{
				trHtml = trHtml + "<td>" + lottodata[i][j] + "</td>";
			}
			trHtml = trHtml + "</tr>";
			$("#tableBaseData tbody").append(trHtml);
		}
	}

	lottoObj.selSeq = $("#tableBaseData tbody td:eq(0)").text();	// 선택 회차는 최종
	$("#tableBaseData tbody td:eq(0)").addClass("seqSelected");

	funcCallFuncSetBaseTableBackGroundColor();
	//funcSetBaseTableBackGroundColor();

};

funcSetReAppearTable = function(){

	$("#tableBaseDataReAppear tbody").html("");
	var trHtml = "";
	var seq1 = $("#selReSeq1").val();
	var seq2 = $("#selReSeq2").val();
	var reAppCnt = 0;

	if (null != lottodata && lottodata.length > 0)
	{
		for (var i=lottodata.length-1; i>=0; i--)
		{
			reAppCnt = 0;

			if (undefined == lottoObj.arrReAppear[i] || null == lottoObj.arrReAppear[i])		{
				lottoObj.arrReAppear[i] = {seq:0,arr:[0,0,0,0,0,0]};
			} else {
				lottoObj.arrReAppear[i] = {seq:0,arr:[0,0,0,0,0,0]};
			}

			lottoObj.arrReAppear[i].seq = lottodata[i][0];

			if (i-seq2 >= 0 && i-seq1 >= 0)
			{
				for (var k = i - seq1; k >= i - seq2; k--)
				{
					for (var m = 0; m < 6 ; m++)
					{
						if( lottodata[i][1] == lottodata[k][m+1]){
							lottoObj.arrReAppear[i].arr[0] = lottoObj.arrReAppear[i].arr[0] + 1;
						}
						if( lottodata[i][2] == lottodata[k][m+1]){
							lottoObj.arrReAppear[i].arr[1] = lottoObj.arrReAppear[i].arr[1] + 1;
						}
						if( lottodata[i][3] == lottodata[k][m+1]){
							lottoObj.arrReAppear[i].arr[2] = lottoObj.arrReAppear[i].arr[2] + 1;
						}
						if( lottodata[i][4] == lottodata[k][m+1]){
							lottoObj.arrReAppear[i].arr[3] = lottoObj.arrReAppear[i].arr[3] + 1;
						}
						if( lottodata[i][5] == lottodata[k][m+1]){
							lottoObj.arrReAppear[i].arr[4] = lottoObj.arrReAppear[i].arr[4] + 1;
						}
						if( lottodata[i][6] == lottodata[k][m+1]){
							lottoObj.arrReAppear[i].arr[5] = lottoObj.arrReAppear[i].arr[5] + 1;
						}
					}
				}
			}

			trHtml = "<tr>";
			trHtml = trHtml + "<td>" + lottoObj.arrReAppear[i].seq + "</td>";
			for (var j=0; j < 6 ; j++)
			{
				trHtml = trHtml + "<td>" + lottoObj.arrReAppear[i].arr[j] + "</td>";
				if (lottoObj.arrReAppear[i].arr[j] > 0)
				{
					reAppCnt = reAppCnt + 1;
				}
			}
			trHtml = trHtml + "<td>" + reAppCnt + "</td>";
			trHtml = trHtml + "</tr>";
			$("#tableBaseDataReAppear tbody").append(trHtml);
		}
	}

	$("#tableBaseDataReAppear tbody tr td").each(function(){
	
		if( $(this).parent().index() > 0 && $(this).index() > 0) {
			$(this).css("background-color", lottoObj.arrColor15[  Number( $(this).text() ) ].color);
		}
	});

};
//////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// select box 초기화
//////////////////////////////////////////////////////////////////////////////////////////////
funcSetSelectBox = function(){
	funcSetSelectBoxType();
	funcSetSelectBoxTerm();
};

funcSetSelectBoxType = function(){
	var arrType = [
		  ["45숫자의 빈도","45G"]
		, ["15그룹별 빈도","15G"]
		, ["15나누기 빈도","15D"]
		, ["10구간별 빈도","10G"]
		, ["10나누기 빈도","10D"]
		, ["09그룹별 빈도","09G"]
		, ["09나누기 빈도","09D"]
		, ["05그룹별 빈도","05G"]
		, ["05나누기 빈도","05D"]
		, ["03그룹별 빈도","03G"]
		, ["03나누기 빈도","03D"]
	];

	var opt = "";

	$("#sel1Type").find("option").remove();
	$("#sel2Type").find("option").remove();
	$("#sel3Type").find("option").remove();

	for ( var i=0; i<arrType.length ; i++ )
	{
		opt = "";
		opt = opt + "<option value='"+arrType[i][1]+"'>"+arrType[i][0]+"</option>";
		$("#sel1Type").append(opt);
		$("#sel2Type").append(opt);
	}
};

funcSetSelectBoxTerm = function(){
	
	$("#sel2Skip").find("option").remove();
	$("#sel2Game").find("option").remove();

	var opt = "";

	for ( var j=0; j<99 ; j++)
	{
		opt = "";
		opt = opt + "<option value='"+j+"'>"+j+"</option>";
		$("#sel2Skip").append(opt);
	}

	for ( var i=1; i <= 59 ; i++)
	{
		opt = "";
		opt = opt + "<option value='"+i+"'>"+i+"</option>";
		$("#sel2Game").append(opt);
		$("#sel2List").append(opt);
		$("#selReSeq1").append(opt);
		$("#selReSeq2").append(opt);
	}

	for ( i = 60; i <= 720; i=i+30)
	{
		opt = "";
		opt = opt + "<option value='"+i+"'>"+i+"</option>";
		$("#sel2Game").append(opt);
	}

	for ( i = 60; i <= 260; i=i+5)
	{
		opt = "";
		opt = opt + "<option value='"+i+"'>"+i+"</option>";
		$("#sel2List").append(opt);
	}

	$("#sel2Game").val(15);
	$("#sel2List").val(lottoObj.viewLimitCount);
};
//////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// 기본 자료들 초기화
//////////////////////////////////////////////////////////////////////////////////////////////
funcSetSideData = function(){
	
	for (var i=0; i < lottodata.length ; i++ )
	{
		

		if (undefined == lottoObj.arrFreq[i] || null == lottoObj.arrFreq[i])		{
			lottoObj.arrFreq[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arrFreqSum[i] || null == lottoObj.arrFreqSum[i])		{
			lottoObj.arrFreqSum[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr45GFreq[i] || null == lottoObj.arr45GFreq[i])		{
			lottoObj.arr45GFreq[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr45G[i] || null == lottoObj.arr45G[i])		{
			lottoObj.arr45G[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr15G[i] || null == lottoObj.arr15G[i])		{
			lottoObj.arr15G[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr09G[i] || null == lottoObj.arr09G[i])		{
			lottoObj.arr09G[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr05G[i] || null == lottoObj.arr05G[i])		{
			lottoObj.arr05G[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr03G[i] || null == lottoObj.arr03G[i])		{
			lottoObj.arr03G[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr15D[i] || null == lottoObj.arr15D[i])		{
			lottoObj.arr15D[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr09D[i] || null == lottoObj.arr09D[i])		{
			lottoObj.arr09D[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr05D[i] || null == lottoObj.arr05D[i])		{
			lottoObj.arr05D[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr03D[i] || null == lottoObj.arr03D[i])		{
			lottoObj.arr03D[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr10G[i] || null == lottoObj.arr10G[i])		{
			lottoObj.arr10G[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		if (undefined == lottoObj.arr10D[i] || null == lottoObj.arr10D[i])		{
			lottoObj.arr10D[i] = {seq:0,arr:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};
		}
		lottoObj.arrFreqSum[i].seq = lottodata[i][0];
		lottoObj.arrFreq[i].seq = lottodata[i][0];
		lottoObj.arr45GFreq[i].seq = lottodata[i][0];
		lottoObj.arr45G[i].seq = lottodata[i][0];
		lottoObj.arr15G[i].seq = lottodata[i][0];
		lottoObj.arr09G[i].seq = lottodata[i][0];
		lottoObj.arr05G[i].seq = lottodata[i][0];
		lottoObj.arr03G[i].seq = lottodata[i][0];
		lottoObj.arr15D[i].seq = lottodata[i][0];
		lottoObj.arr09D[i].seq = lottodata[i][0];
		lottoObj.arr05D[i].seq = lottodata[i][0];
		lottoObj.arr03D[i].seq = lottodata[i][0];
		lottoObj.arr10G[i].seq = lottodata[i][0];
		lottoObj.arr10D[i].seq = lottodata[i][0];


		for (var j=1; j<7 ; j++ )
		{
			lottoObj.arrFreq[i].arr[ Math.ceil( (lottodata[i][j]) /1 ) - 1 ] ++ ;
			lottoObj.arrFreqSum[i].arr[ Math.ceil( (lottodata[i][j]) /1 ) - 1 ] ++ ;
			lottoObj.arr45GFreq[i].arr[ Math.ceil( (lottodata[i][j]) /1 ) - 1 ] ++ ;
			lottoObj.arr45G[i].arr[ Math.ceil( (lottodata[i][j]) /1 ) - 1 ] ++ ;
			lottoObj.arr15G[i].arr[ Math.ceil( (lottodata[i][j]) /3 ) - 1 ] ++ ;
			lottoObj.arr09G[i].arr[ Math.ceil( (lottodata[i][j]) /5 ) - 1 ] ++;
			lottoObj.arr05G[i].arr[ Math.ceil( (lottodata[i][j]) /9 ) - 1 ] ++;
			lottoObj.arr10G[i].arr[ Math.ceil( (lottodata[i][j]) /10 ) - 1 ] ++;
			lottoObj.arr03G[i].arr[ Math.ceil( (lottodata[i][j]) /15) - 1 ] ++;

			lottoObj.arr15D[i].arr[  (lottodata[i][j] % 15 ) ] ++;
			lottoObj.arr10D[i].arr[  (lottodata[i][j] % 10  ) ] ++;
			lottoObj.arr09D[i].arr[  (lottodata[i][j] % 9  ) ] ++;
			lottoObj.arr05D[i].arr[  (lottodata[i][j] % 5  ) ] ++;
			lottoObj.arr03D[i].arr[  (lottodata[i][j] % 3  ) ] ++;
		}
	}
};
//////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////
// 분석용 자료 노출 (노출 데이타 + 노출 누적 빈도)
//////////////////////////////////////////////////////////////////////////////////////////////
funcSetSideDataTable = function(pTarget, pType, pSkip, pGame, pList){
	var $tHead = $("#table"+pTarget+"Data thead");
	var $tBody = $("#table"+pTarget+"Data tbody");

	var colLimit = 0;
	var tHeadColText = "G";

	var tHeadHtml = "";
	var tBodyHtml = "";

	var objArr = eval("lottoObj.arr"+pType);
	var viewLimit = lottoObj.viewLimitCount;

	var baseSeq = lottoObj.selSeq;

	$tHead.html("");
	$tBody.html("");
	colLimit = Number(pType.substring(0,2));
	
	switch ( pType.substring(2,3) )
	{
		case "G" : {tHeadColText = "G"; break;}
		case "D" : {tHeadColText = "D"; break;}
		default : {break;}	
	}

	if ("10G" == pType)
	{
		colLimit = 4.5;
	}

	if ("45G" == pType)
	{
		var objArr2 = funcSet45GFreqArray(pType, objArr, baseSeq, pSkip, pGame, pList);
	}

	var thtrWidth = 21 * (Math.ceil(colLimit)+1);
	$tBody.parent().css("width",thtrWidth+30);
	$tHead.css("width",thtrWidth+10);
	$tBody.css("width",thtrWidth+30);

	tHeadHtml = "<tr><th>SEQ</th>";
	for (var c=0; c<Math.ceil(colLimit); c++)
	{
		tHeadHtml = tHeadHtml + "<th>";
		if (tHeadColText=="G")
		{
			tHeadHtml = tHeadHtml + "" + ( Math.ceil(45/colLimit)*c + 1) + "</th>";
		} else {
			tHeadHtml = tHeadHtml + "" + (c) + "</th>";
		}
	}
	tHeadHtml = tHeadHtml + "</tr>";
	$tHead.append(tHeadHtml);

	if (null != objArr && objArr.length > 0)
	{
		for (var i = objArr.length -2 -(objArr.length - baseSeq) ; 
				 i > objArr.length -2 -(objArr.length - baseSeq)  -pList; 
				 i--)
		{
			tBodyHtml = "<tr>";
			tBodyHtml = tBodyHtml + "<td>" + objArr[i].seq + "</td>";
			for (var j=0; j < Math.ceil(colLimit) ; j++)
			{
				tBodyHtml = tBodyHtml + "<td>" + objArr[i].arr[j] + "</td>";
			}
			tBodyHtml = tBodyHtml + "</tr>";
			$tBody.append(tBodyHtml);
		}
	}

	var tdNum = 0;
	var bgColor = "";

	//funcSetSideDataTableBackgroundColor($tBody.find("tr td"));
	//funcCallFuncSetSideTableBackGroundColor(pTarget);
	funcSetSideDataTableFontBold();

};

funcCallFuncSetSideTableBackGroundColor = function(pTarget){
	
	var targetTd = $("#table"+pTarget+"Data tr td");
	var selType = $("#sel2Type");
	var selVal = $(selType).val();

	funcSetTableBackGroundColor($(targetTd), selVal );
	//hsl(0~360,90%,90%);
};


funcSetSideDataTableFontBold = function(){
	
}

//////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////
// 분석용 빈도 자료 노출
//////////////////////////////////////////////////////////////////////////////////////////////
funcSetSideFreqTable = function(pTarget, pType, pSkip, pGame, pList){
	var $tHead = $("#table"+pTarget+"Freq thead");
	var $tBody = $("#table"+pTarget+"Freq tbody");

	var colLimit = 0;
	var tHeadColText = "G";

	var tHeadHtml = "";
	var tBodyHtml = "";

	var objArr = eval("lottoObj.arr"+pType);
	var viewLimit = lottoObj.viewLimitCount;

	var baseSeq = lottoObj.selSeq;

	$tHead.html("");
	$tBody.html("");
	colLimit = Number(pType.substring(0,2));

	switch ( pType.substring(2,3) )
	{
		case "G" : {tHeadColText = "G"; break;}
		case "D" : {tHeadColText = "D"; break;}
		default : {break;}	
	}

	if ("10G" == pType)
	{
		colLimit = 4.5;
	}

	if ("45G" == pType)
	{
		//colLimit = 15;
		//objArr = eval("lottoObj.arr"+pType+"Freq");
	}

	var arrFreq = funcSetFreqArray(pType, objArr, baseSeq, pSkip, pGame, pList);

	var thtrWidth = 21 * (Math.ceil(colLimit)+1);
	$tBody.parent().css("width",thtrWidth+30);
	$tHead.css("width",thtrWidth+10);
	$tBody.css("width",thtrWidth+30);
	
	tHeadHtml = "<tr><th>SEQ</th>";
	for (var c=0; c<Math.ceil(colLimit); c++)
	{
		tHeadHtml = tHeadHtml + "<th>";
		if (tHeadColText=="G")
		{
			if ("45G" == pType)
			{
				tHeadHtml = tHeadHtml + "" + ( c + 1 ) + "</th>";
			}else{
				tHeadHtml = tHeadHtml + "" + ( Math.ceil(45/colLimit)*c + 1) + "</th>";
			}
		} else {
			tHeadHtml = tHeadHtml + "" + (c) + "</th>";
		}
	}
	tHeadHtml = tHeadHtml + "</tr>";
	$tHead.append(tHeadHtml);

	if (null != arrFreq && arrFreq.length > 0)
	{
		for (var i = arrFreq.length -2 -(arrFreq.length - baseSeq) ; 
				 i > arrFreq.length -2 -(arrFreq.length - baseSeq)  -pList; 
				 i--)
		{
			tBodyHtml = "<tr>";
			tBodyHtml = tBodyHtml + "<td>" + arrFreq[i].seq + "</td>";
			for (var j=0; j < Math.ceil(colLimit) ; j++)
			{
				tBodyHtml = tBodyHtml + "<td>" + arrFreq[i].arr[j] + "</td>";
			}
			tBodyHtml = tBodyHtml + "</tr>";
			$tBody.append(tBodyHtml);
		}
	}

	var tdNum = 0;
	var bgColor = "";

	//funcSetSideDataTableBackgroundColor($tBody.find("tr td"));
	//funcCallFuncSetSideTableBackGroundColor(pTarget);
	funcSetSideDataTableFontBold();

};

funcSetFreqArray = function(pType, pArr, pBaseSeq, pSkip, pGame, pList){
	// 45G 인 경우 누적할 회차수 별 SUM을 노출하도록 하자.
	// pType : 03G, 03D ~ 10G, 10D, 15G, 15D, 45G
	// pArr  : arr45G 등등
	// pBaseSeq : 777등 선택 회차	-- 배열과 무관
	// pSkip : 선택최차 이전 Skip 회차수
	// pGame : 빈도 누적할 회차수
	// pList : 노출할 목록 수 -- 배열과 무관
	// 03G 로 가정하고 진행.

	var colLimit = 0;
	colLimit = Number(pType.substring(0,2));
	if ("10G" == pType)
	{
		colLimit = 4.5;
	}

	if(null == pArr || undefined == pArr){
		return null;
	}

	for (var i = pArr.length - 1 ; i > 0   ; i-- )
	{
		if (i - pSkip - pGame < 0)
		{
			break;
		}

		for (var k = 0; k < lottoObj.arrFreq[i].arr.length ; k++ )
		{
			lottoObj.arrFreq[i].arr[ k] = NaN;
		}

		for (var k = 0; k < colLimit ; k++ )
		{
			lottoObj.arrFreq[i].arr[ k] = 0;
		}

		for (var j = i - pSkip; j > i - pSkip - pGame ; j--)
		{
			for (var k = 0; k < 45 ; k++ )
			{
				lottoObj.arrFreq[i].arr[k] = lottoObj.arrFreq[i].arr[k] + pArr[j].arr[k] ;
			}
		}
	}
	return lottoObj.arrFreq;
}

funcSet45GFreqArray = function(pType, pArr, pBaseSeq, pSkip, pGame, pList){
	// 45G 인 경우 누적할 회차수 별 SUM을 노출하도록 하자.
	// pType : 03G, 03D ~ 10G, 10D, 15G, 15D, 45G
	// pArr  : arr45G 등등
	// pBaseSeq : 777등 선택 회차	-- 배열과 무관
	// pSkip : 선택최차 이전 Skip 회차수
	// pGame : 빈도 누적할 회차수
	// pList : 노출할 목록 수 -- 배열과 무관
	// 03G 로 가정하고 진행.

	if(null == pArr || undefined == pArr){
		return null;
	}

	for (var i = pArr.length - 1 ; i > 0   ; i-- )
	{
		if (i - pSkip - pGame < 0)
		{
			break;
		}

		for (var k = 0; k < lottoObj.arr45GFreq[i].arr.length ; k++ )
		{
			lottoObj.arr45GFreq[i].arr[ k] = 0;
		}

		for (var j = i - pSkip; j > i - pSkip - pGame ; j--)
		{
			for (var k = 0; k < 45 ; k++ )
			{
				lottoObj.arr45GFreq[i].arr[k] = lottoObj.arr45GFreq[i].arr[k] + pArr[j].arr[k] ;
			}
		}
	}
	return lottoObj.arr45GFreq;
}

//////////////////////////////////////////////////////////////////////////////////////////////
// 분석용 빈도 누적 자료 노출
//////////////////////////////////////////////////////////////////////////////////////////////
funcSetSideFreqSumTable = function(pTarget, pType, pSkip, pGame, pList){
	var $tHead = $("#table"+pTarget+"FreqSum thead");
	var $tBody = $("#table"+pTarget+"FreqSum tbody");

	var colLimit = 0;
	var tHeadColText = "G";

	var tHeadHtml = "";
	var tBodyHtml = "";

	var objArr = lottoObj.arrFreq;	//eval("lottoObj.arr"+pType);
	var viewLimit = lottoObj.viewLimitCount;

	var baseSeq = lottoObj.selSeq;

	$tHead.html("");
	$tBody.html("");
	colLimit = 45;	//Number(pType.substring(0,2));
	//colLimit = 15;	//Number(pType.substring(0,2));

	switch ( pType.substring(2,3) )
	{
		case "G" : {tHeadColText = "G"; break;}
		case "D" : {tHeadColText = "D"; break;}
		default : {break;}	
	}

	if ("10G" == pType)
	{
		//colLimit = 4.5;
	}

	if ("45G" == pType)
	{
		//colLimit = 15;
		//objArr = eval("lottoObj.arr"+pType+"Freq");
	}

	var arrFreqSum = funcSetFreqSumArray(pType, objArr, baseSeq, pSkip, pGame, pList);

	var thtrWidth = 21 * (Math.ceil(colLimit)+1);
	$tBody.parent().css("width",thtrWidth+30);
	$tHead.css("width",thtrWidth+10);
	$tBody.css("width",thtrWidth+30);
	
	tHeadHtml = "<tr><th>SEQ</th>";
	for (var c=0; c<Math.ceil(colLimit); c++)
	{
		tHeadHtml = tHeadHtml + "<th>" + "" + (c) + "</th>";
	}
	tHeadHtml = tHeadHtml + "</tr>";
	$tHead.append(tHeadHtml);

	if (null != arrFreqSum && arrFreqSum.length > 0)
	{
		for (var i = arrFreqSum.length -2 -(arrFreqSum.length - baseSeq) ; 
				 i > arrFreqSum.length -2 -(arrFreqSum.length - baseSeq)  -pList; 
				 i--)
		{
			tBodyHtml = "<tr>";
			tBodyHtml = tBodyHtml + "<td>" + arrFreqSum[i].seq + "</td>";
			for (var j=0; j < Math.ceil(colLimit) ; j++)
			{
				tBodyHtml = tBodyHtml + "<td>" + arrFreqSum[i].arr[j] + "</td>";
			}
			tBodyHtml = tBodyHtml + "</tr>";
			$tBody.append(tBodyHtml);
		}
	}

	var tdNum = 0;
	var bgColor = "";	
};

funcSetFreqSumArray = function(pType, pArr, pBaseSeq, pSkip, pGame, pList){
	// pType : 03G, 03D ~ 10G, 10D, 15G, 15D, 45G
	// pArr  : arr45G 등등
	// pBaseSeq : 777등 선택 회차	-- 배열과 무관
	// pSkip : 선택최차 이전 Skip 회차수
	// pGame : 빈도 누적할 회차수
	// pList : 노출할 목록 수 -- 배열과 무관
	// 03G 로 가정하고 진행.

	var vMax = 99;
	var vMin = 0;
	var colLimit = 0;

	colLimit = Number(pType.substring(0,2));
	if ("10G" == pType)
	{
		colLimit = 4.5;
	}

//	if ("45G" == pType)
//	{
//		colLimit = 15;
//	}

	if(null == pArr || undefined == pArr){
		return null;
	}

	var arrTemp = [
		{seq:0,
					arr:[0,0,0,0,0,0,0,0,0,0
						,0,0,0,0,0,0,0,0,0,0
						,0,0,0,0,0,0,0,0,0,0
						,0,0,0,0,0,0,0,0,0,0
						,0,0,0,0,0,0,0,0,0,0
					]
		}
	];	
	
	for (var i = pArr.length-1 ; i > 0   ; i-- )
	{
		if ( null == arrTemp[i] || undefined == arrTemp[i] )
		{
			arrTemp[i] = {seq:i,					
						 arr:[  0,0,0,0,0,0,0,0,0,0
								,0,0,0,0,0,0,0,0,0,0
								,0,0,0,0,0,0,0,0,0,0
								,0,0,0,0,0,0,0,0,0,0
								,0,0,0,0,0,0,0,0,0,0
						]
			};
			arrTemp[i].seq = pArr[i].seq;
		}

		for ( var j=0; j < 45 ; j++ )	
		{
			if (vMax < pArr[i].arr[j])
			{
				arrTemp[k].arr[pArr[k].arr[l]] ++;
			}
		}
	}

	for ( var k=0; k < pArr.length ; k++ )
	{
		for ( var l=0; l < 45 ; l++ )
		{
			arrTemp[k].arr[pArr[k].arr[l]] ++;
		}
	}

	return arrTemp;
}
//////////////////////////////////////////////////////////////////////////////////////////////


funcSetSideTdBgColor = function(){

	$("#tableSide2Data tbody tr td").removeClass();
	$("#tableSide2Freq tbody tr td").removeClass();
	$("#tableSide2FreqSum tbody tr td").removeClass();

	var i=0;
	var j=0;
	for (i=0; i<100; i++)
	{
		j=i;
		if (j>16)
		{
			j=15;
		}
		$("#tableSide2Data tbody tr td").filter(function(){
			return $(this).text() == i+"";
		}).addClass("tdClass"+j);
		$("#tableSide2Freq tbody tr td").filter(function(){
			return $(this).text() == i+"";
		}).addClass("tdClass"+j);
		$("#tableSide2FreqSum tbody tr td").filter(function(){
			return $(this).text() == i+"";
		}).addClass("tdClass"+j);
	}

	var selType = $("#sel2Type").val();
	var $bTr = null;
	var $tTr1 = null;
	var $tTr2 = null;
	var $tTr3 = null;

	var colLimit = Number(selType.substring(0,2));
	var colLimit2 = Number(selType.substring(0,2));
	if ("10G" == selType)	{
		colLimit2 = 4.5;
	}
	var noSelType = selType.substring(2,3); // Group, Divided
	var selTdVal = 0;

	if ("45G" === selType){

		for (var s=lottoObj.selSeq - 1; s > lottoObj.selSeq -1 -$("#sel2List").val() ; s--)
		{
			$bTr = $("#tableBaseData tbody tr").filter(function(){
				return $(this).find("td").eq(0).text() == s+"";
			});

			$tTr1 = $("#tableSide2Data tbody tr").filter(function(){
				return $(this).find("td").eq(0).text() == s+"";
			});	

			$tTr2 = $("#tableSide2Freq tbody tr").filter(function(){
				return $(this).find("td").eq(0).text() == s+"";
			});	

			$tTr3 = $("#tableSide2FreqSum tbody tr").filter(function(){
				return $(this).find("td").eq(0).text() == s+"";
			});	

			$tTr1.find("td").eq($bTr.children().eq(1).text()).addClass("tdWon");
			$tTr1.find("td").eq($bTr.children().eq(2).text()).addClass("tdWon");
			$tTr1.find("td").eq($bTr.children().eq(3).text()).addClass("tdWon");
			$tTr1.find("td").eq($bTr.children().eq(4).text()).addClass("tdWon");
			$tTr1.find("td").eq($bTr.children().eq(5).text()).addClass("tdWon");
			$tTr1.find("td").eq($bTr.children().eq(6).text()).addClass("tdWon");

			$tTr2.find("td").eq($bTr.children().eq(1).text()).addClass("tdWon");
			$tTr2.find("td").eq($bTr.children().eq(2).text()).addClass("tdWon");
			$tTr2.find("td").eq($bTr.children().eq(3).text()).addClass("tdWon");
			$tTr2.find("td").eq($bTr.children().eq(4).text()).addClass("tdWon");
			$tTr2.find("td").eq($bTr.children().eq(5).text()).addClass("tdWon");
			$tTr2.find("td").eq($bTr.children().eq(6).text()).addClass("tdWon");

			$tTr3.find("td").eq( Number( $tTr2.children("td.tdWon").eq(0).text() ) +1	).addClass("tdWon");
			$tTr3.find("td").eq( Number( $tTr2.children("td.tdWon").eq(1).text() ) +1	).addClass("tdWon");
			$tTr3.find("td").eq( Number( $tTr2.children("td.tdWon").eq(2).text() ) +1	).addClass("tdWon");
			$tTr3.find("td").eq( Number( $tTr2.children("td.tdWon").eq(3).text() ) +1	).addClass("tdWon");
			$tTr3.find("td").eq( Number( $tTr2.children("td.tdWon").eq(4).text() ) +1	).addClass("tdWon");
			$tTr3.find("td").eq( Number( $tTr2.children("td.tdWon").eq(5).text() ) +1	).addClass("tdWon");
		}
	}else{

		for (var s=lottoObj.selSeq - 1; s > lottoObj.selSeq -1 -$("#sel2List").val() ; s--)
		{
			$bTr = $("#tableBaseData tbody tr").filter(function(){
				return $(this).find("td").eq(0).text() == s+"";
			});

			$tTr1 = $("#tableSide2Data tbody tr").filter(function(){
				return $(this).find("td").eq(0).text() == s+"";
			});	

			$tTr2 = $("#tableSide2Freq tbody tr").filter(function(){
				return $(this).find("td").eq(0).text() == s+"";
			});	

			$tTr3 = $("#tableSide2FreqSum tbody tr").filter(function(){
				return $(this).find("td").eq(0).text() == s+"";
			});	

			if ("G" === noSelType)			{
				$tTr1.find("td").eq(	Math.ceil( Number( $bTr.children().eq(1).text() )/ (45 / colLimit2 ))).addClass("tdWon");
				$tTr1.find("td").eq(	Math.ceil( Number( $bTr.children().eq(2).text() )/ (45 / colLimit2 ))).addClass("tdWon");
				$tTr1.find("td").eq(	Math.ceil( Number( $bTr.children().eq(3).text() )/ (45 / colLimit2 ))).addClass("tdWon");
				$tTr1.find("td").eq(	Math.ceil( Number( $bTr.children().eq(4).text() )/ (45 / colLimit2 ))).addClass("tdWon");
				$tTr1.find("td").eq(	Math.ceil( Number( $bTr.children().eq(5).text() )/ (45 / colLimit2 ))).addClass("tdWon");
				$tTr1.find("td").eq(	Math.ceil( Number( $bTr.children().eq(6).text() )/ (45 / colLimit2 ))).addClass("tdWon");
										           															 
				$tTr2.find("td").eq(	Math.ceil( Number( $bTr.children().eq(1).text() )/ (45 / colLimit2 ))).addClass("tdWon");
				$tTr2.find("td").eq(	Math.ceil( Number( $bTr.children().eq(2).text() )/ (45 / colLimit2 ))).addClass("tdWon");
				$tTr2.find("td").eq(	Math.ceil( Number( $bTr.children().eq(3).text() )/ (45 / colLimit2 ))).addClass("tdWon");
				$tTr2.find("td").eq(	Math.ceil( Number( $bTr.children().eq(4).text() )/ (45 / colLimit2 ))).addClass("tdWon");
				$tTr2.find("td").eq(	Math.ceil( Number( $bTr.children().eq(5).text() )/ (45 / colLimit2 ))).addClass("tdWon");
				$tTr2.find("td").eq(	Math.ceil( Number( $bTr.children().eq(6).text() )/ (45 / colLimit2 ))).addClass("tdWon");

			} else {
				$tTr1.find("td").eq(	( Number( $bTr.children().eq(1).text() ) % colLimit  ) + 1 ).addClass("tdWon");
				$tTr1.find("td").eq(	( Number( $bTr.children().eq(2).text() ) % colLimit  ) + 1 ).addClass("tdWon");
				$tTr1.find("td").eq(	( Number( $bTr.children().eq(3).text() ) % colLimit  ) + 1 ).addClass("tdWon");
				$tTr1.find("td").eq(	( Number( $bTr.children().eq(4).text() ) % colLimit  ) + 1 ).addClass("tdWon");
				$tTr1.find("td").eq(	( Number( $bTr.children().eq(5).text() ) % colLimit  ) + 1 ).addClass("tdWon");
				$tTr1.find("td").eq(	( Number( $bTr.children().eq(6).text() ) % colLimit  ) + 1 ).addClass("tdWon");

				$tTr2.find("td").eq(	( Number( $bTr.children().eq(1).text() ) % colLimit  ) + 1 ).addClass("tdWon");
				$tTr2.find("td").eq(	( Number( $bTr.children().eq(2).text() ) % colLimit  ) + 1 ).addClass("tdWon");
				$tTr2.find("td").eq(	( Number( $bTr.children().eq(3).text() ) % colLimit  ) + 1 ).addClass("tdWon");
				$tTr2.find("td").eq(	( Number( $bTr.children().eq(4).text() ) % colLimit  ) + 1 ).addClass("tdWon");
				$tTr2.find("td").eq(	( Number( $bTr.children().eq(5).text() ) % colLimit  ) + 1 ).addClass("tdWon");
				$tTr2.find("td").eq(	( Number( $bTr.children().eq(6).text() ) % colLimit  ) + 1 ).addClass("tdWon");
			}

			$tTr2.children("td.tdWon").each(function(event){
				selTdVal = $(this).text();
				$tTr3.find("td").eq( Number(selTdVal) + 1).addClass("tdWon");
			});

		}
	}

}


/*

*/
