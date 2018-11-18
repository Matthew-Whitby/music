function GetYoutubeData(w){
		var c=document.getElementById("vid_"+w);
		var v=c.getElementsByClassName("movie")[0].getAttribute("data-youtube");
		var matches=v.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i)||v.match(/^http:\/\/youtu\.be\/([^?]+)/i);
		if(matches)v=matches[1];
		$.getJSON("https://www.googleapis.com/youtube/v3/videos",{
			key:"AIzaSyD6XBI5r8UWTPCtF00EwJOb5ZlxunvxYTw",
			part:"statistics,snippet",
			id:v
		},function(data){
			var r=data.items[0].statistics.likeCount;
			var p=data.items[0].snippet.thumbnails.maxres.url;
			var t=data.items[0].snippet.title;
			var v=data.items[0].statistics.viewCount;
			if(r==null)r=53;
			c.getElementsByClassName("likes-count")[0].innerHTML=r;
			c.getElementsByTagName("img")[0].setAttribute("data-src",p);
			var d=data.items[0].snippet.publishedAt;
			var x=d.substring(0,10);
			var s=x.split('-');
			var z=s[0]+"/"+s[1]+"/"+s[2];
			c.getElementsByClassName("time")[0].innerHTML=z;
			c.getElementsByClassName("vid_title")[0].innerHTML=t;
			c.getElementsByClassName("views")[0].innerHTML=v;
		});
}
function GetChannelStats(){
	$.getJSON("https://www.googleapis.com/youtube/v3/channels",{
		key:"AIzaSyD6XBI5r8UWTPCtF00EwJOb5ZlxunvxYTw",
		part:"statistics",
		id:"UCNGt4x8CYzKLCUGlfe-TQkg"
	},function(data){
		var r=data.items[0].statistics.subscriberCount;
		document.getElementById("subscribe_button").innerHTML+=" "+r;
		var y=data.items[0].statistics.viewCount;
		document.getElementById("total_views").innerHTML+=" Total Channel Views: "+y+"!";
	});
}
function GetVidIds(){
	var vidIds;
	alert("Getting vids");
		$.getJSON("https://www.googleapis.com/youtube/v3/playlistItems",{
			key:"AIzaSyD6XBI5r8UWTPCtF00EwJOb5ZlxunvxYTw",
			part:"snippet",
			playlistId:"PL1BxM-1kDL2jDaZWiNUWk7_gOuM_m7MZr",
			maxResults:"50"
		},function(data){
			var count=data.pageInfo.totalResults;
			varIds.push(count);
			alert("Count = "+count);
			for(i=0;i<count;i++)
			{
				var v=i+1;
				alert("Set vidid "+v+" to vid title "+data.items[i].snippet.title);
				document.getElementById("vid_"+v).getElementsByClassName("movie")[0].setAttribute("data-youtube",data.items[i].snippet.resourceId.videoId);
			}
		});

	return vidIds;
}
function GetNoVids(){
	var v=1;
	var e=false;
	var c="";
	do{
		c="vid_"+v;
		var g=document.getElementById(c);
		if(g!=null)v++;
		else e=true;
	}while(e==false);
	return v;
}
