/*!
 * 1.0.0
 */
(function($) {
	$.fn.extend({
		onChineseRegionsClicked : function(onChineseRegionsClickedCallback) {
			return this.each(function() {
				$(this).find('.buttons div').click(function() {
					var regionPinyin = $(this).attr('pinyin');
					var regionName = $(this).attr('name');
					onChineseRegionsClickedCallback(regionPinyin, regionName);
				});
			});
		}
	})
})(jQuery);
$(document).ready(function() {
	var provinces = [ {
		category : 'municipality',
		lineColor : '#BB3333',
		iName : '直辖市',
		regions : {
			BeiJing : '北京',
			ChongQing : '重庆',
			ShangHai : '上海',
			TianJin : '天津'
		}
	}, {
		category : 'province',
		lineColor : '#33BB33',
		iName : '省',
		regions : {
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
		}
	}, {
		category : 'autonomousRegion',
		lineColor : '#3333BB',
		iName : '自治区',
		regions : {
			GuangXi : '广西',
			NeiMengGu : '内蒙古',
			NingXia : '宁夏',
			XiZang : '西藏',
			XinJiang : '新疆'
		}
	} ];
	$('div.regions').each(function() {
		function setupLetterStyle(letters, lastCount) {
			letters.children().last().css({
				width: (50 + (lastCount - 1) * 70) + 'px'
			});
		}
		var regions = $(this).css({
			width: '410px',
			margin: '0 auto'
		});
		for ( var i = 0; i < provinces.length; i++) {
			var province = provinces[i];
			var region = $('<div class="' + province.category + '"></div>');
			regions.append(region);
			var letters = $('<div class="letters"></div>').css({
				color: '#AAAAAA'
			});
			var buttons = $('<div class="buttons"></div>').css({
				color: '#222222'
			});
			var lastFirstLetter;
			var lastCount = 0;
			for ( var py in province.regions) {
				var firstLetter = py.substr(0, 1);
				if (lastFirstLetter !== firstLetter) {
					setupLetterStyle(letters, lastCount);
					letters.append($('<div>' + firstLetter + '</div>').css({
						float: 'left',
						padding: '0px 5px 0px 5px',
						'font-size': '12px',
						'border-bottom-width': '3px',
						'border-bottom-style': 'solid',
						'margin-right': '10px'
					}));
					lastFirstLetter = firstLetter;
					lastCount = 1;
				} else {
					lastCount ++;
				}
				var provinceName = province.regions[py];
				if (provinceName.length == 2) {
					provinceName = provinceName.substr(0, 1) + ' ' + provinceName.substr(1, 1);
				}
				buttons.append($('<div>' + provinceName + '</div>').attr({
					pinyin: py,
					name: province.regions[py]
				}).css({
					float: 'left',
					'text-align': 'center',
					width: '58px',
					'border': '1px solid #CCCCCC',
					'font-size': '15px',
					padding: '6px 0px',
					cursor: 'pointer',
					'border-radius': '5px',
					margin: '2px 10px 6px 0px'
				}));
				if (buttons.children().size() > 6) {
					var newLetters = $('<div class="letters"></div>').css({
						color: '#AAAAAA'
					});
					var newButtons = $('<div class="buttons"></div>').css({
						color: '#222222'
					});
					newLetters.append(letters.children().last());
					for ( var j = lastCount; j > 0; j--) {
						newButtons.prepend(buttons.children().last());
					}
					region.append(letters.append($('<p></p>')));
					region.append(buttons.append($('<p></p>')));
					letters = newLetters;
					buttons = newButtons;
				}
			}
			setupLetterStyle(letters, lastCount);
			region.append(letters.append($('<p></p>')));
			region.append(buttons.append($('<p></p>')));
			region.find('.letters div').css({
				'border-bottom-color': province.lineColor
			}).append('<i>' + province.iName + '</i>').find('i').css({
			float: 'right'
		});
		}
		regions.find('.letters div i').eq(0).text('首都');
		regions.find('p').css({
			margin: 0,
			clear: 'both'
		});
		regions.find('.buttons div').hover(function() {
			$(this).css({
				'background-color' : '#EEEEEE'
			});
		}, function() {
			$(this).css({
				'background-color' : 'transparent'
			});
		});
		regions.find('.letters, .buttons').each(function() {
			$(this).find('div').last().css({
				'margin-right': '0px'
			});
		});
		regions.find('.municipality .letters div:eq(1), .municipality .buttons div:eq(1)').css({
			'margin-left' : '140px'
		})
		regions.find('.province   .letters:eq(0) div:eq(1), .province   .buttons:eq(0) div:eq(1),'
					+'.province   .letters:eq(0) div:eq(2), .province   .buttons:eq(0) div:eq(2),'
					+'.province   .letters:eq(2) div:eq(1), .province   .buttons:eq(2) div:eq(3),'
					+'.province   .letters:eq(2) div:eq(2), .province   .buttons:eq(2) div:eq(4),'
					+'.autonomousRegion .letters div:eq(1), .autonomousRegion .buttons div:eq(1),'
					+'.autonomousRegion .letters div:eq(2), .autonomousRegion .buttons div:eq(3)').css({
			'margin-left' : '35px'
		});
	});
});