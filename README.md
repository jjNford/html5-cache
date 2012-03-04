Local Storage Cache
===================
A localStroage wrapper that creates a nice way to cache data.

How To Use
----------
Just include cache.js into your project and access the API using the Cache DOM element. Example:

    Cache.save(22, "alpha", {x: 33, y: 31});

API
---

Default Settings:

* Cache TTL: 15 minutes
* Cache Enabled: true
* Smart Caching: true
* Threshhold (cache misses when saving): 1

**NOTE**: localStorage support is required to use caching

---

> **clear()** <br/><br/>
`Return - True if cache is cleared, false if not.`

Clears the content of the cache.

---

> **isEnabled()** <br/><br/>
`Return - True if the cache is enabled, false if not.`

Determine if caching is enabled.

---

> **isSmart()** <br/><br/>
`Return - True if cache is smart, false if not.`

Determin if caching is smart.  Smart cache will returned expired cache as buffer, if smart caching is off, expired data is returned as null.

---

> **load( id, address )** <br/><br/>
`Parameter - id - The ID of the cache block to load from.`
`Parameter - address - The address in the cache block to load from.`
`Return - If cached data is found a cached data object will be returned, else null.`
`Cached Data Object = {expired: <true/false>, data: <cached_data>}`
    
Loads data from the cache.  If smart caching is enabled:

* If data is found a cached data object is returned always.
* If no data is found null is returned.

If smart caching is disabled:

* If data is found and cache has not expired the data is returned.
* If the data has expired or is not found null is returned.

If caching is disabled, null is always returned.

---

> **save( id, address, data  )** <br/><br/>
`Parameter - id - The ID of the cache black to save to.`
`Parameter - address - The address in the cache block to save to.`
`Parameter - data - The data to cache.`
`Return - True if the data is cached, false if not`

Caches data.

---

> **setEnabled( bool )** <br/><br/>
`Parameter - bool - True to enable cache, false to disable.`

Enables/Disables cache.

---

> **setSmart( bool )** <br/><br/>
`Parameter - bool - True to enable smart caching, false to disable.`

Enables/Disables smart caching.

---

License
-------
- [MIT](http://www.opensource.org/licenses/mit-license.php)