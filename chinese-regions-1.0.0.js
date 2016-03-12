/*!
 * 1.0.0
 */
(function($) {
	if (!$.ima123) {
		$.ima123 = {};
	}
	if (!$.ima123.regions) {
		$.ima123.regions = {};
	}
})(jQuery);
$(document).ready(function() {
	var provinces = {
		municipality : {
			BeiJing : '北京',
			ChongQing : '重庆',
			ShangHai : '上海',
			TianJin : '天津'
		},
		province : {
			AnHui : '安徽',
			FuJian : '福建',
			GanSu : '甘肃',
			GuangDong : '广东',
			GuiZhou : '贵州',
			HaiNan : '海南',
			HeBei : '河北',
			HeNan : '河南',
			HeiLongJiang : '黑龙江',
			HuBei : '湖北',
			HuNan : '湖南',
			JiLin : '吉林',
			JiangSu : '江苏',
			JiangXi : '江西',
			LiaoNing : '辽宁',
			QingHai : '青海',
			ShaanXi : '陕西',
			ShanDong : '山东',
			ShanXi : '山西',
			SiChuan : '四川',
			YunNan : '云南',
			ZheJiang : '浙江'
		},
		autonomousRegion : {
			GuangXi : '广西',
			NeiMengGu : '内蒙古',
			NingXia : '宁夏',
			XiZang : '西藏',
			XinJiang : '新疆'
		}
	};
	$('div.regions').each(function() {
		var regions = $(this);
		for ( var province in provinces) {
			var region = $('<div class="' + province + '"></div>');
			regions.append(region);
			var letters = $('<div class="letters"></div>');
			var buttons = $('<div class="buttons"></div>');
			var lastFirstLetter;
			var lastCount = 0;
			for ( var py in provinces[province]) {
				var firstLetter = py.substr(0, 1);
				if (lastFirstLetter !== firstLetter) {
					letters.append($('<div>' + firstLetter + '</div>'));
					lastFirstLetter = firstLetter;
					lastCount = 1;
				} else {
					lastCount ++;
				}
				var provinceName = provinces[province][py];
				if (provinceName.length == 2) {
					provinceName = provinceName.substr(0, 1) + ' ' + provinceName.substr(1, 1);
				}
				buttons.append($('<div>' + provinceName + '</div>').attr('py', py));
				if (buttons.children().size() > 6) {
					var newLetters = $('<div class="letters"></div>');
					var newButtons = $('<div class="buttons"></div>');
					newLetters.append(letters.children().last());
					for ( ; lastCount > 0; lastCount--) {
						newButtons.prepend(buttons.children().last());
					}
					region.append(letters.append($('<p></p>')));
					region.append(buttons.append($('<p></p>')));
					letters = newLetters;
					buttons = newButtons;
				}
			}
			region.append(letters.append($('<p></p>')));
			region.append(buttons.append($('<p></p>')));
		}
		var root = regions.css({
			width: '410px',
			margin: '0 auto'
		});
		root.find('p').css({
			margin: 0,
			clear: 'both'
		});
		root.find('.letters').css({
			color: '#AAAAAA'
		});
		root.find('.buttons').css({
			color: '#222222'
		});
		root.find('.letters div').css({
			float: 'left',
			width: '50px',
			padding: '0px 5px 0px 5px',
			'font-size': '12px',
			'border-bottom-width': '3px',
			'border-bottom-style': 'solid',
			'margin-right': '10px'
		});
		root.find('.municipality .letters div').css({
			'border-bottom-color': '#BB3333'
		}).append('<i>直辖市</i>').find('i').eq(0).text('首都');
		root.find('.province').css({
			margin: '10px 0px'
		}).find('.letters div').css({
			'border-bottom-color': '#33BB33'
		}).append('<i>省</i>');
		root.find('.autonomousRegion .letters div').css({
			'border-bottom-color': '#3333BB'
		}).append('<i>自治区</i>');
		root.find('.letters div i').css({
			float: 'right'
		});
		root.find('.buttons div').css({
			float: 'left',
			'text-align': 'center',
			width: '58px',
			'border': '1px solid #CCCCCC',
			'font-size': '15px',
			padding: '6px 0px',
			cursor: 'pointer',
			'border-radius': '5px',
			margin: '2px 10px 6px 0px'
		}).hover(function() {
			$(this).css({
				'background-color' : '#EEEEEE'
			});
		}, function() {
			$(this).css({
				'background-color' : 'transparent'
			});
		});
		root.find('.letters, .buttons').each(function() {
			$(this).find('div').last().css({
				'margin-right': '0px'
			});
		});
		root.find('.province .letters:eq(0) div:eq(2)').css({
			width : '190px'
		});
		root.find('.province .letters:eq(1) div:eq(0)').css({
			width : '400px'
		});
		root.find('.province .letters:eq(2) div:eq(0)').css({
			width : '190px'
		});
		root.find('.province .letters:eq(3) div:eq(0)').css({
			width : '260px'
		});
		root.find('.autonomousRegion .letters:eq(0) div:eq(1)').css({
			width : '120px'
		});
		root.find('.autonomousRegion .letters:eq(0) div:eq(2)').css({
			width : '120px'
		});
		root.find('.municipality .letters div:eq(1), .municipality .buttons div:eq(1)').css({
			'margin-left' : '140px'
		})
		root.find('.province .letters div:eq(1), .province .buttons div:eq(1)'
				+ ',.province .letters:eq(0) div:eq(2), .province .buttons:eq(0) div:eq(2)'
				+ ',.province .letters:eq(2) div:eq(1), .province .buttons:eq(2) div:eq(3)'
				+ ',.province .letters:eq(2) div:eq(2), .province .buttons:eq(2) div:eq(4)'
				+ ',.autonomousRegion .letters div:eq(1), .autonomousRegion .buttons div:eq(1)'
				+ ',.autonomousRegion .letters div:eq(2), .autonomousRegion .buttons div:eq(3)').css({
			'margin-left' : '35px'
		});
		root.find('.buttons div').click(function() {
			alert($(this).attr("py"));
		});
	});
});