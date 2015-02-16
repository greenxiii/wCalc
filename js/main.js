var enKey=["a","about","above","after","again","against","all","am","an","and","any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];
	
	
$(document).ready(function(){
	uploadKey();
	var keywords;
	if(keywords==undefined)keywords=updateKey();
	
	$("#mainText").focus();
	$("#mainText").keyup(function(){
		checkMain(this,keywords);
	});
		
	$(".modal .fa-times").click(function(){
		modalHide(this);
	});
	$(".fa-cog").click(function(){
		modalShow(this);
	});
	$("#lang").change(function(){
		uploadKey();
	});
	$("#upkey").click(function(){
		keywords=updateKey();
		modalHide($(".modal .fa-times"));
		checkMain($("#mainText"),keywords);
	});

});

function checkMain(obj,keywords){
		var counts=getMainCounts(obj);
		//keywords=unique(counts[1]);
		
		var kd_arr=sortObject(getKeywordDensity(counts[1], keywords));
		
		var vr1="";
		$.each(kd_arr, function(index, value) {
			if(value.key!="undefined" && value.value!=0)
			vr1+=("<div class=item>"+value.key+"<div class=val>"+value.value+" ("+Math.round((value.value*100/counts[1].length) * 10) / 10+"%)</div></div>");
		}); 
		
		$('#data').html(counts[0]);
		$('#data1').html(vr1);
}

function getKeywordDensity(all_words, key_words){
	var KD = new Object;
	var unWords=unique(all_words);
	for(var i=0;i<unWords.length;i++){
		var k=0;
		for(var j=0;j<all_words.length;j++){
			if(unWords[i]==all_words[j] && $.inArray(unWords[i], key_words)==-1) k++;
		}
		KD[unWords[i]]=k;
	};
	return KD;
}

function getMainCounts(e){
	var words,v;
	var words_c=0, sentences_c=0, all=0, avg_sentences_w=0, avg_sentences_c=0, paragraphs_c=0;	
	
	all = e.value.length;
	words = e.value.trim().split(/[\W+\s+]/);
	sentences_c = e.value.trim().split(/\w[\.|\!|\?][\s\w\.\!\?]/gi).length;
	paragraphs_c = e.value.replace(/\n$/gm, '').split(/\n/).length;
	v=[];
	for(var i=0;i<words.length;i++){
		if(words[i]!=""){
			v[i]=words[i].toLowerCase();
			words_c++;
		}
	}
	avg_sentences_w= Math.ceil(words_c/sentences_c);
	avg_sentences_c= Math.ceil(all/sentences_c);
	
	$('#info').html(all+" Characters "+words_c+" Words");
	var str="<div class=item>Characters<div class=val>"+all+"</div></div><div class=item>Words<div class=val>"+words_c+"</div></div><div class=item>Sentences<div class=val>"+sentences_c+"</div></div><div class=item>Paragraphs<div class=val>"+paragraphs_c+"</div></div>	<div class=item>Avg. Sentence (w)<div class=val>"+avg_sentences_w +"</div></div><div class=item>Avg. Sentence (c)<div class=val>"+avg_sentences_c+"</div></div>";
	var res=[str,v]
	return res;
}

function sortObject(obj) {
var arr = [];
for (var prop in obj) {
	if (obj.hasOwnProperty(prop)){
		arr.push({
			'key': prop,
			'value': obj[prop]
		});
	}
	}
	arr.sort(function(a, b) { return -(a.value - b.value); });
	return arr; // returns array
}

function unique(arr) {
	var obj = {};
	for(var i=0; i<arr.length; i++) {
		var str = arr[i].toLowerCase();
		obj[str] = true;
	}
	return Object.keys(obj);
}

function modalHide(e){
	$(e).parent().parent().hide();
	$(".layout").hide();
}

function modalShow(e){
	var m_id=$(e).data("modal");
	$("#"+m_id).show();
	$(".layout").show();
	uploadKey();
}

function updateKey(){
	var kwords=[];
	if($("#lang").is(':visible')){
		kwords=$("#keys").val().toLowerCase().split(/\,/);
	}else{
		kwords=enKey;
	}
	return kwords;
}

function uploadKey(){
	var lang;
	if($("#lang").is(':visible'))lang=$("#lang").val();
	else lang="en";
	$.get("stopwords/"+lang+"_StopWords.txt", function(data){
		$("#keys").html("");
//		var vr=data.replace(/\n/g,",");
		//$("#keys").html(vr);
		$("#keys").html(data);
	});
}