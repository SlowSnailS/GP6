
		var oList = document.getElementById("list");
		function getCar(){
			//从cookie之中取到购物车之中的内容;
			var carListString = getCookie("carList");
			var carListArray = JSON.parse(carListString);
			// console.log(carListArray);
			var carArray = [];
			for(var i = 0 ;i < carListArray.length ; i++){
				// console.log(carListArray[i].id)
				var itemId = carListArray[i].id;//购物车中商品的id;
				// console.log(fromIdToItem(itemId,json.subjects))
				//获取对应的数据对象
				var itmeobj = fromIdToItem(itemId,json.subjects);
				//向结构中放入商品数量;
				itmeobj.num = carListArray[i].num;
				carArray.push(itmeobj);
			}
			// console.log(carArray);
			rendering(carArray,oList);
		}

		function rendering(json,root){
			// //根据json去渲染页面;
			var dataList,//商品列表;
				item,    //每一条商品;
				frag,     //文档容器;
				//html 结构;
				li,
			frag = document.createDocumentFragment();
			for(var i = 0 ; i < json.length ; i++){
				item = json[i];
				//创建结构;
				li = cE("li");
				divMsg = cE("div");
				img = cE("img");
				h5 = cE("h5");

				divOperation = cE("div");
				btnR = cE("button");
				btnA = cE("button");
				input = cE("input");

				oA = cE("a");
				//添加样式部分;
				li.className = "item";
				divMsg.className = "msg";
				img.src = json[i].images.small;
				h5.innerHTML = json[i].title;

				divOperation.className = "operation";
				btnR.innerHTML = "-"
				btnA.innerHTML = "+"
				input.value = json[i].num;
				input.type = "number";

				oA.innerHTML = "删除";
				oA.className = "delete";

				//结构嵌套;
				divMsg.appendChild(img);
				divMsg.appendChild(h5);

				divOperation.appendChild(btnR);
				divOperation.appendChild(input);
				divOperation.appendChild(btnA);

				li.appendChild(divMsg);
				li.appendChild(divOperation);
				li.appendChild(oA)

				// console.log(li);

				li.setAttribute("data-id",json[i].id)
				frag.appendChild(li);
			}
			console.log(frag)
			root.appendChild(frag);
		}

		function cE(str){
			return document.createElement(str);
		}

		function fromIdToItem(id,json){
			// console.log(id,json);
			for(var i = 0 ; i < json.length ; i++){
				if(json[i].id == id){
					return json[i]
				}
			} //通过id在json数组中找到对应id的 对象，并返回这个对象;
		}

		getCar()

// -----------------------------------part2;

		var aInput = oList.querySelectorAll("input");

		oList.onchange = delegation(aInput,changeCar);

		function changeCar(){
			//this;
			//获取到当前的id;
			// console.log(this.parentNode.parentNode);
			var goodsId = this.parentNode.parentNode.getAttribute("data-id")
			// console.log(goodsId,this.value)

			changeNum(goodsId,this.value)
		}
		function changeNum(id,num){
			//通过num改变cookie之中对应id的num;
			if(id == "" || num == ""){
				return 0;
			}
			var carListString = getCookie("carList");
			var carListArray = JSON.parse(carListString);
			for(var i = 0 ; i < carListArray.length ; i++){
				if(carListArray[i].id == id){
					carListArray[i].num = num;
					break;
				}
			}
			carListString = JSON.stringify(carListArray);
			setCookie("carList",carListString);
		}
