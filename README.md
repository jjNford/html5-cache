HTML5 Cache
===========
A local storage wrapper that acts as a time to live cache.

How To Use
----------
1. Include the cache script in your project:

	```html
	<html>
	...
	...
	<body>
		...
		...
		
		<script src="libs/html5-cache/cache.js"></script>
		
		...
		...
	</body>
	</html>
	```

2. Use `window.cache` to access the cache:

	```javascript
	window.cache.setEnabled(true);
	window.cache.setSmart(true);
	window.cache.setTtl(10000);

	var data = requestDataFromApi();
	window.cache.setItem("api_data", data);
	...
	...
	...
	
	data = window.cache.getItem("api_data");

	if(data.data == null || data.expired == "true") {
		data = requestDataFromApi();
	}
	...	
	...
	...
	```
	
	If smart caching is enabled, expired data will be returned with `data.expired = true`. If smart caching is disabled, then null will be returned if the time to live (ttl) has expired.

3. Include attribution to library.

API
---

>**clear()**
><br><br>
>Clears the cache.

--

>**getItem(key)**
><br><br>
>Retrieves an item from the cache.
><br><br>
>```
>{
>	"data": data
>	"expired": true|false
>	"time": time-cached
>	"ttl": time-to-live
>}
>```

--

>**isEnabled()**
><br><br>
>Determines if the cache is enabled.

--

>**isSmart()**
><br><br>
>Determines if the cache is smart.

--

>**removeItem(key)**
><br><br>
>Removes the data with the given key from the cache.

--

>**setEnabled(key)**
><br><br>
>Enable or disable the cache.

--

>**setItem(key, data)**
><br><br>
>Saves the given data under the given key to the cache.

--

>**setSmart(enabled)**
><br><br>
>Enables or disables the cache.

--

>**setTtl(ttl)**
><br><br>
>Sets the time to live for items saved to the cache.
