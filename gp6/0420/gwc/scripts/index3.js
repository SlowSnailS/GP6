	// [{id:id,num:1}]
		// {id:id,num:1}

var oWrap = document.getElementById("wrap");
var aButton = oWrap.querySelectorAll("button[data-id]");
oWrap.onclick = delegation(aButton,addCar);
function addCar(){
	//this指向点击的button;
	var goodsId = this.getAttribute("data-id");

	//向购物车之中添加 符合数组规则的字符串;

	// 取出 : 字符串转换成数组,方便数据的增删改查;
	// JSON.parse();
	// 放入 : 数组转换成字符串,方便存入cookie中;
	// JSON.stringify();

	// 第一次; => 建立对应的json结构;
	if(!getCookie("carList")){
		//第一次;
		var goodsObj = [
			{
				"id":goodsId,
				"num":1
			}
		]
		var goodsString = JSON.stringify(goodsObj);

		setCookie("carList",goodsString)
		// console.log(goodsString)
	}else{
		//对数据进行辨别操作;

		var goodsString = getCookie("carList");
		// console.log(goodsString)
		var goodsArray = JSON.parse(goodsString);
		//判定当前id是否存在;

		var hasId = false;

		for(var i = 0 ; i < goodsArray.length ; i++){
			if(goodsArray[i].id == goodsId){
				goodsArray[i].num ++;
				//商品数量递增;
				hasId = true;
				break;
			}
		}

		//如果id不存在;
		if(!hasId){
			goodsArray.push({
				"id":goodsId,
				"num":1
			})
		}
		//把操作好的数据放入cookie之中;
		goodsString = JSON.stringify(goodsArray);
		setCookie("carList",goodsString);
	}

	carNum(car);
}
