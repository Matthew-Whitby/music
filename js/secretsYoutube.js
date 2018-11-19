var nextToken;
var vsc=10;
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
			p="https://i.ytimg.com/vi/"+c.getElementsByClassName("movie")[0].getAttribute("data-youtube")+"/maxresdefault.jpg";
			let t=data.items[0].snippet.title;
			let v=data.items[0].statistics.viewCount;
			v=WriteNumber(v);
			if(r==null)r=53;
			r=WriteNumber(r);
			c.getElementsByClassName("likes-count")[0].innerHTML=r;
			if(p!=null){
				c.getElementsByTagName("img")[0].setAttribute("data-src",p);
				c.getElementsByTagName("img")[0].setAttribute("src",p);
			}
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
			maxResults:vsc
		},function(data){
			let count=data.pageInfo.totalResults;
			varIds.push(count);
			for(i=0;i<count;i++){
				document.getElementById("vid_"+(i+1)).getElementsByClassName("movie")[0].setAttribute("data-youtube",data.items[i].snippet.resourceId.videoId);
			}
		});
	return vidIds;
}

function GetVidIdsUnlisted(callback){
	$.get("https://www.googleapis.com/youtube/v3/playlistItems",{
			part:'snippet',
			maxResults:vsc,
			pageToken:nextToken,
			playlistId:"PL1BxM-1kDL2gFu7FrbB4OBZ0qihhxaijt",
			key:'AIzaSyD6XBI5r8UWTPCtF00EwJOb5ZlxunvxYTw'
		},function(data){
			nextToken=data.nextPageToken;
			$.each(data.items,function(i,item){
				vidIdList.push(item.snippet.resourceId.videoId);
			})
			callback();
		});
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
			maxResults:vsc,
			playlistId:pid,
			pageToken:nextToken,
			key:'AIzaSyD6XBI5r8UWTPCtF00EwJOb5ZlxunvxYTw'
		},function(data){
			nextToken=data.nextPageToken;
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
	//else v=["Pbd-a5jr5Ek","zWYzCB4p39s","76_2FTKTYNo","QcGgb8fxGQQ","bkvrYMAvWEk","Ygzm_jtGCbY","3rbkk8X13L4","XLLh5A-JyGk","WEHL9Tks46U","I8CUyA8xW9I","BNe7n-FqYw8","sCEjAnCjYbw","aEehpv70ePY","VYpDfjoLEJo","Mra8s9l_tDI","ESKmA6sbLmI"];
	var c=["this song hasn't been worked on in ages","tried improving mixing on vocals, with no success","tried improving mixing on vocals, with some success","tried improving mixing on vocals, with some more success","That's right, it's being remade again","what can I say, it's my favourite song","also throwing in a lot more of my own additions to the song","why did I even try uploading it, I have barely started on it","who knows if this'll get finished. Maybe it'll... disappear","one of my previous favourite songs","possibly somewhat close to being finished, and has so for half a year","far from done","tried to do some 'pop' music","tried even harder","need to fix lower notes","just realised, the videos are going to be ordered backwards so read these upside down!","Super piano Medley, currently at 21/~63 songs, just checking sound."];
	let parent=document.getElementById("timeline");
	for(var i=vidIdList.length-1;i>-1;i--){
		let upload=document.createElement("section");
		parent.appendChild(upload);
		upload.classList.add("card");
		upload.classList.add("whitby");
		upload.classList.add("vid_upload");
		let inner=document.createElement("div");
		upload.appendChild(inner);
		inner.classList.add("inner");
		let account=document.createElement("a");
		inner.appendChild(account);
		account.classList.add("account");
		let namae=document.createElement("span");
		account.appendChild(namae);
		namae.classList.add("name");
		namae.innerText="Whitbyfish";
		let em=document.createElement("em");
		account.appendChild(em);
		em.innerHTML="Timeline";
		let movie=document.createElement("div");
		inner.appendChild(movie);
		movie.classList.add("movie");
		movie.setAttribute("data-youtube",vidIdList[i]);
		let img=document.createElement("img");
		movie.appendChild(img);
		img.setAttribute("data-src","");
		img.setAttribute("src","");
		let play=document.createElement("div");
		movie.appendChild(play);
		play.classList.add("play");
		let vidTitle=document.createElement("div");
		play.appendChild(vidTitle);
		vidTitle.classList.add("vid_title");
		let status=document.createElement("div");
		inner.appendChild(status);
		status.classList.add("status");
		let countEl=document.createElement("span");
		status.appendChild(countEl);
		countEl.classList.add("count");
		let likes=document.createElement("a");
		countEl.appendChild(likes);
		likes.href='#';
		likes.classList.add("likes");
		likes.id="likes-1745";
		likes.title="Like this";
		let likes_count=document.createElement("span");
		likes.appendChild(likes_count);
		likes_count.classList.add("likes-count");
		let likes_postfix=document.createElement("span");
		likes.appendChild(likes_postfix);
		likes_postfix.classList.add("likes-postfix");
		let views=document.createElement("span");
		status.appendChild(views);
		views.classList.add("views");
		let time=document.createElement("span");
		status.appendChild(time);
		time.classList.add("time");
		let comment=document.createElement("div");
		inner.appendChild(comment);
		comment.classList.add("comment");
		let name1=document.createElement("span");
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
   for(i=1;i<(vsc+1);i++)GetYoutubeData(vidTotal+i,()=>{vidsLoaded++;sortDates();});
}
function sortDates(){
   if(vidsLoaded==totalVids-1){
      for(j=1;j<(vsc+1);j++){
         c=document.getElementById("vid_"+(vidTotal+j));
         SortDate(c);
		}
		vidTotal+=vsc;
		if(document.getElementById("bottomScroll")==null){
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
function GetNextVids(){
   if(!loadingB){
      loadingB=true;
      GetVidIdsUnlisted(()=>{
         GenerateHtml();
         GenerateIds();
         e=GetNoVids();
         KeepOrder(e);
         loadingB=false;});
   }
}