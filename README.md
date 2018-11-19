



# Color Log JS (colorlogjs)

Colors the output of `console.*` (log, error, info, debug, warn). IT also adds a few more items. This will probably break in your project. Send a fix. 


## Installation

	yarn add https://github.com/gtzilla/colorlogjs

	# when added to npm.
	yarn add colorlogjs

### Usage

      const {colorlogjs} = require("colorlogjs");
      const console = colorlogjs.start(__filename);

      console.log("My message")
      >  Nov 18 23:14:077 command_ai.js:  {266.31757497787476} My message



### Usage, Extended

      const {colorlogjs} = require("colorlogjs");
      const console = colorlogjs.start(null, {
      	log_tag:__filename,

      	log_time_format:"LL HH:MM:SSS", // moment JS friendly

      	log_tag_color:"\x1b[93m", // uses 
      });

      console.log("My message")
      >  Nov 18 23:14:077 command_ai.js:  {266.31757497787476} My message
