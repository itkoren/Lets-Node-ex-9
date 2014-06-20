Ninth Exercise (WebSockets)
=================================================

Please complete the following steps:

1. Refactor **"sentigator"** server to use **"[sockjs](https://github.com/sockjs/sockjs-node)"**. Do it by:
 * Creating a **"realtimer.js"** file inside the **"lib"** directory
 * Initialize a **"[sockjs](https://github.com/sockjs/sockjs-node)"** server in **"realtimer.js"** and install **"[sockjs](https://github.com/sockjs/sockjs-node)"** handlers on **"/realtime"**
 * Use the **"aggregator.js"** from within the **"realtimer.js"** to query and aggregate results from the services
 * Update the client code in **"sentigatorClient.js"** to use WebSockets with **"[sockjs](https://github.com/sockjs/sockjs-client)"** instead of the current GET request (don't forget to also update the loading indicator)
 
2. Extend **"aggregator.js"** to support setting the queried services (add an argument to allow the caller to supply an array of the services which should be queried - using ["twitxy", "utube"] for example, will only query and aggregate results from twitter and utube)

3. Create a polling mechanism, which after returning the first result set, will continue polling only the **"[twitxy](https://github.com/itkoren/twitxy)"** & the **"utube"** API's, each 5 seconds, and return the results to the client (**NOTE: Do not bother filtering the already returned results for now**)

4. Update the **"aggregator.js"** to support **"asfrom"** date, for filtering previous returned results. Use this date to only return the new results to the client (**HINT: for [twitxy](https://github.com/itkoren/twitxy), check "created_at" and for utube, check "updated.$t" attributes**)

#####Use the **"sentiment"** and the **"sentigator"** modules in this repository as a starting point for the exercise