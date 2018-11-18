var nextToken;
function GetYoutubeData(w,callback){
	let c=document.getElementById("vid_"+w);
	let v=c.getElementsByClassName("movie")[0].getAttribute("data-youtube");
	let matches=v.match(/^http:\/\/www\.youtube\.com\/.*[?&]v=([^&]+)/i)||v.match(/^http:\/\/youtu\.be\/([^?]+)/i);
		if(matches)v=matches[1];
		$.getJSON("https://www.googleapis.com/youtube/v3/videos",{
			key:"AIzaSyD6XBI5r8UWTPCtF00EwJOb5ZlxunvxYTw",
			part:"statistics,snippet",
			id:v
		},function(data){
			let r=data.items[0].statistics.likeCount;
			let p=data.items[0].snippet.thumbnails.maxres.url;
			let t=data.items[0].snippet.title;
			let v=data.items[0].statistics.viewCount;
			v=WriteNumber(v);
			if(r==null)r=53;
			r=WriteNumber(r);
			c.getElementsByClassName("likes-count")[0].innerHTML=r;
			c.getElementsByTagName("img")[0].setAttribute("data-src",p);
			c.getElementsByTagName("img")[0].setAttribute("src",p);
			let d=data.items[0].snippet.publishedAt;
			let x=d.substring(0,10);
			let s=x.split('-');
			let z=s[0]+"/"+s[1]+"/"+s[2];
			c.getElementsByClassName("time")[0].innerHTML=z;
			c.getElementsByClassName("vid_title")[0].innerHTML=t;
			c.getElementsByClassName("views")[0].innerHTML=v;
			callback();
		});
}
function GetChannelStats(){
	$.getJSON("https://www.googleapis.com/youtube/v3/channels",{
		key:"AIzaSyD6XBI5r8UWTPCtF00EwJOb5ZlxunvxYTw",
		part:"statistics",
		id:"UCNGt4x8CYzKLCUGlfe-TQkg"
	},function(data){
		let r=data.items[0].statistics.subscriberCount;
		r=WriteNumber(r);
		document.getElementById("subscribe_button").innerHTML+=" "+r;
		let y=data.items[0].statistics.viewCount;
		y=WriteNumber(y);
		document.getElementById("total_views").innerHTML+=" Total Channel Views: "+y+"!";
	});
}
function WriteNumber(y){
   if(y<1000)return y;
   let looper=Math.floor(y.length/3);
   let mod=y.length%3;
   if(mod)v=y.substring(0,mod)+",";
   else v="";
   for(x=0;x<looper;x++){
      v+=y.substring((x*3)+mod,(x*3)+mod+3);
      if(x!=looper-1)v+=",";
   }return v;
}
function GetVidIds(){
	let vidIds;
	alert("Getting vids");
		$.getJSON("https://www.googleapis.com/youtube/v3/playlistItems",{
			key:"AIzaSyD6XBI5r8UWTPCtF00EwJOb5ZlxunvxYTw",
			part:"snippet",
			playlistId:"PL1BxM-1kDL2jDaZWiNUWk7_gOuM_m7MZr",
			maxResults:"50"
		},function(data){
			let count=data.pageInfo.totalResults;
			varIds.push(count);
			alert("Count = "+count);
			for(i=0;i<count;i++)
			{
				document.getElementById("vid_"+(i+1)).getElementsByClassName("movie")[0].setAttribute("data-youtube",data.items[i].snippet.resourceId.videoId);
			}
		});
	return vidIds;
}
function GetVidIdsUploads(callback){
	$.get("https://www.googleapis.com/youtube/v3/channels",{
			part: 'contentDetails',
			id: "UCNGt4x8CYzKLCUGlfe-TQkg",
			key:'AIzaSyD6XBI5r8UWTPCtF00EwJOb5ZlxunvxYTw'
		},function(data){
			pid=data.items[0].contentDetails.relatedPlaylists.uploads;
      	getPlaylistVids(pid,()=>callback());
		}
	);
}
function getPlaylistVids(pid,callback){
	$.get("https://www.googleapis.com/youtube/v3/playlistItems",{
			part:'snippet',
			maxResults:50,
			playlistId:pid,
			key:'AIzaSyD6XBI5r8UWTPCtF00EwJOb5ZlxunvxYTw'
		},function(data){
			$.each(data.items,function(i,item){
				vidIdList.push(item.snippet.resourceId.videoId);
			})
			callback();
		}
	);
}
function GenerateIds(){
	let n=document.getElementsByClassName("vid_upload");
	for(i=0;i<n.length;i++)n[i].id="vid_"+(i+1);
}
function GetNoVids(){
	let v=1;
	do{let g=document.getElementById("vid_"+v);
		if(g!=null)v++;
		else return v;
	}while(true);
}
function GenerateHtml(){
	//var v=["FnAmgwiHZtg","KRybbNpSHwU","POFLrlcnAdk","qDhF9L5zFnI","8JlW8kyoBgY","p-x5uukSQUo","MR2FZi92BMY","_mn4Jh3j_zk","eCwiCq71lCk","GV8tRmnfNRo","aRP9l_sGdbo","0RLMAoanOVE","5DD3CrZBLm4","SzL3_moFeWw","nX_lsrqgrpU","D68FyZixZ3M","zVtLwaVmVfI","PWSdtbl4DsM","Cyh0q0GfyCg","EW3ESox9A6M","SkyL8KUQNZ4","LYrHuZ3yzdw","5ZG5WcihXNg","Zn7rbfNBYwA","3Lu1bs2APDU"];
	var c=["First Cover！Recorded with ancient technology.","First Sakura Gakuin cover, pretty easy stuff! Been aaaaaaages since the last cover.","A little acoustic cover, pretty bad timing though♪","A cheeky little piano cover of a pretty good, but underrated japanese band.","First Full instrumental cover!!","2 covers in one day, What's going on?!","My favourite cover to date♪","A bit more Walküre","Second piano cover, yay!","My favourite song from Mrs GREEN APPLE!","A cheeky little anime intro!","Piano cover of Momoiro Clover Z's latest song!","Even more Momoiro Clover Z","Vocaloid Singing hashire","Rolling Girl","Kinyoubi no Ohayou instrmental","Kinyoubi no Ohayou trumpet","Kinyoubi no Ohayou Gumi (meant to be sung by a male)","Kinyoubi no Ohayou Gumi Another Story","why did this get 2k views?","acoustic cover thing","probably the best mixed thing I have made thus far","thought the vocaloid sounded slightly like the original singer so made this","don't really know why I covered this song","fully instrumental fast song"];
	c.reverse();
	var parent=document.getElementById("timeline");
	for(i=0;i<vidIdList.length;i++){
		var upload=document.createElement("section");
		parent.appendChild(upload);
		upload.classList.add("card");
		upload.classList.add("whitby");
		upload.classList.add("vid_upload");
		var inner=document.createElement("div");
		upload.appendChild(inner);
		inner.classList.add("inner");
		var account=document.createElement("a");
		inner.appendChild(account);
		account.classList.add("account");
		var namae=document.createElement("span");
		account.appendChild(namae);
		namae.classList.add("name");
		namae.innerText="Whitbyfish";
		var em=document.createElement("em");
		account.appendChild(em);
		em.innerHTML="Timeline";
		var movie=document.createElement("div");
		inner.appendChild(movie);
		movie.classList.add("movie");
		movie.setAttribute("data-youtube",vidIdList[i]);
		var img=document.createElement("img");
		movie.appendChild(img);
		img.setAttribute("data-source","");
		img.setAttribute("src","");
		var play=document.createElement("div");
		movie.appendChild(play);
		play.classList.add("play");
		var vidTitle=document.createElement("div");
		play.appendChild(vidTitle);
		vidTitle.classList.add("vid_title");
		var status=document.createElement("div");
		inner.appendChild(status);
		status.classList.add("status");
		var countEl=document.createElement("span");
		status.appendChild(countEl);
		countEl.classList.add("count");
		var likes=document.createElement("a");
		countEl.appendChild(likes);
		likes.href='#';
		likes.classList.add("likes");
		likes.id="likes-1745";
		likes.title="Like this";
		var likes_count=document.createElement("span");
		likes.appendChild(likes_count);
		likes_count.classList.add("likes-count");
		var likes_postfix=document.createElement("span");
		likes.appendChild(likes_postfix);
		likes_postfix.classList.add("likes-postfix");
		var views=document.createElement("span");
		status.appendChild(views);
		views.classList.add("views");
		var time=document.createElement("span");
		status.appendChild(time);
		time.classList.add("time");
		var comment=document.createElement("div");
		inner.appendChild(comment);
		comment.classList.add("comment");
		var name1=document.createElement("span");
		comment.appendChild(name1);
		name1.classList.add("name");
		name1.innerHTML="Whitbyfish";
		comment.innerHTML+=c[i];
	}
}
var vidsLoaded=0;
var totalVids;
function KeepOrder(e){
   totalVids=e;
   for(i=1;i<e;i++)GetYoutubeData(i,()=>{vidsLoaded++;sortDates();});
}
function sortDates(){
   if(vidsLoaded==totalVids-1){
      for(j=1;j<totalVids;j++){
         c=document.getElementById("vid_"+j);
         SortDate(c);
		}
		document.getElementById("topScroll").addEventListener("click",DateClicked);
		l=document.createElement("li");
		l.classList.add("scrollBtn");
		l.id="bottomScroll";
		a=document.createElement("a");
      l.appendChild(a);
      p=document.createElement("span");
      a.appendChild(p);
      p.innerHTML="Bottom";
		document.getElementById("sidenavList").appendChild(l);
		l.addEventListener("click",DateClicked);
   }
}
function SortDate(c){
   y=c.getElementsByClassName("time")[0].innerHTML.split('/')[0];
   s=document.getElementsByClassName("scrollBtn");
	b=false;
   for(i=0;i<s.length;i++)if(s[i].id.substring(0,4)==y){b=true;break;}
   if(!b){
      l=document.createElement("li");
      l.classList.add("scrollBtn");
      l.id=y+"Scroll";
      a=document.createElement("a");
      l.appendChild(a);
      p=document.createElement("span");
      a.appendChild(p);
      p.innerHTML=y;
      document.getElementById("sidenavList").appendChild(l);
      d=document.createElement("div");
      document.getElementById("timeline").appendChild(d);
      d.id="y"+y;
      d.appendChild(c);
		l.addEventListener("click",DateClicked);
   }else document.getElementById("y"+y).appendChild(c);
}