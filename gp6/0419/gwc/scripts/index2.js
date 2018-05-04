// console.log(json);
		function rendering(json,root){
			//根据json去渲染页面;
			var dataList,//商品列表;
				item,    //每一条商品;
				frag,     //文档容器;
				//html结构;
				button,
				h6,
				h5,
				img,
				li

			dataList = json.subjects;
			// console.log(dataList)
			frag = document.createDocumentFragment();
			for(var i = 0 ; i < dataList.length ; i++){
				item = dataList[i];

				//创建结构;
				li = cE("li");
				img = cE("img");
				h5 = cE("h5");
				h6 = cE("h6");
				button = cE("button");

				li.appendChild(img);
				li.appendChild(h5);
				li.appendChild(h6);
				li.appendChild(button);

				// 改变结构内容;
				li.className = "goods";
				img.src = item.images.small;
				h5.innerHTML = item.title;
				h6.innerHTML = item.genres;
				button.innerHTML = "加入购物车";
				
				button.setAttribute("data-id",item.id);
				// console.log(li);
				frag.appendChild(li);
			}
			// console.log(frag)
			root.appendChild(frag);
		}

		function cE(tag){ //创建元素的方法;
			return document.createElement(tag);
		}
		var oWrap = document.getElementById("wrap")
		rendering(json,oWrap)
