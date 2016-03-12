# A selection panel of Chinese administrative regions
# 中国行政区划选择面板

## Usage(3 steps):

1. Import the js file, like:
```
<script type="text/javascript" src="chinese-regions-1.0.0.js"></script>
```
2. Define a div, like:
```
<div class="regions"></div>
```
3. Register the click event with the extend fn method 'onChineseRegionsClicked':
```
<script type="text/javascript">
$(document).ready(function() {
	$('div.regions').onChineseRegionsClicked(function(regionPinyin, regionName) {
		alert(regionPinyin+":"+regionName);
	});
});
</script>
```

## the preview of the panel:

![selection panel demo image](demo.png)