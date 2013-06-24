(function() {
    window.cache = {

        ttl: "900000",
        key: "cache.",
        key_ttl: "pref.cttl",
        key_smart: "pref.csmart",
        key_enabled: "pref.cenabled",

        /**
         * Clears the cache. Settings will still be saved.
         */
        clear: function() {
            for (var i = window.localStorage.length - 1; i >= 0; i--) {
                var key = window.localStorage.key(i);
                if (new RegExp(this.key).test(key)) {
                    window.localStorage.removeItem(key);
                }
            }
        },
        
        /**
         * Retrieves that data saved from cache under the given key. 
         * The data is returned in an object with the time it was saved,
         * if its cache was expired (smart caching), and what the current
         * value of the data's time to live is.
         *
         * @param key Key data is stored under to return.
         * @return Object containing data, if expired, saved time, and time to live.
         */
        getItem: function(key) {
            if (this.isEnabled() == "true") {
                var block = JSON.parse(window.localStorage.getItem(this.key + key));
                if (block === null) {
                    return null;
                } else {
                    var currentTime = new Date().getTime();
                    var currentTtl = currentTime - block.time;
                    var expired = false;

                    if (currentTtl > this.ttl) {
                        if(this.isSmart() == "false") {
                            return null;
                        }
                        currentTtl = 0;
                        expired = true;
                    }
                    return {data: block.data, expired: expired, time: block.time, ttl: currentTtl};
                }
            }
            return null;
        },

        /**
         * Determines if the cache is enabled.
         *
         * @return True if the cache is enabled, false if not.
         */
        isEnabled: function() {
            return window.localStorage.getItem(this.key_enabled);
        },
        
        /**
         * Determines if the cache is smart. Smart caching returns expired cache values.
         *
         * @return True if the cache is smart, false if not.
         */
        isSmart: function() {
            return window.localStorage.getItem(this.key_smart);
        },
        
        /**
         * Removes an item from the cache.
         *
         * @param Key data is stored under that needs removed from cache.
         */
        removeItem: function(key) {
            window.localStorage.removeItem(this.key + key);
        },

        /**
         * Switches the cache on and off. If the cache is disabled all data
         * stored in the cache will be deleted.
         *
         * @param enabled True to enable caching, false to disable it.
         */
        setEnabled: function(enabled) {
            window.localStorage.setItem(this.key_enabled, enabled);
            this.clear();
        },
        
        /**
         * Save the given data under the given key in the cache.
         *
         * @param key Key to save data under in the cache.
         * @param data Data to save to the cache.
         */
        setItem: function(key, data) {
            if (this.isEnabled() == "true") {
                window.localStorage.setItem(this.key + key, JSON.stringify({
                    "data": data,
                    "time": new Date().getTime()
                }));
            }
        },

        /**
         * Switches smart caching on and off.
         *
         * @param enabled True to enable smart caching, false to disable it.
         */
        setSmart: function(enabled) {
            window.localStorage.setItem(this.key_smart, enabled);
        },

        /**
         * Sets the time to live for each item that is put in the cache.
         *
         * @param ttl Cache items time to live.
         */
        setTtl: function(ttl) {
            this.ttl = ttl;
            window.localStorage.setItem(this.key_ttl, ttl);
        }
    };

    // Initialize the cache.
    if (window.cache.isEnabled() === null) {
        window.cache.setEnabled(false);
    }
    if (window.cache.isSmart() === null) {
        window.cache.setSmart(false);
    }
    if (window.localStorage.getItem(window.cache.key_ttl) === null) {
        window.localStorage.setItem(window.cache.key_ttl, window.cache.ttl);
    } else {
        window.cache.ttl = window.localStorage.getItem(window.cache.key_ttl);
    }
})();