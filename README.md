



# Color Log JS (colorlogjs)

Colors the color output, adds a few more crude items. This will probably break in your project. Send a fix. 



## Installation

	yarn add https://github.com/gtzilla/colorlogjs

	# when added to npm.
	yarn add colorlogjs

### Usage

      const {colorlogjs} = require("colorlogjs");
      const console = colorlogjs.start(__filename);

      console.log("My message")
      >  Nov 10 22:38:802 listen_pipe.js: My message



### Usage, Extended

      const {colorlogjs} = require("colorlogjs");
      const console = colorlogjs.start(null, {
      	log_tag:__filename,

      	log_time_format:"LL HH:MM:SSS", // moment JS friendly

      	log_tag_color:"\x1b[93m", // uses 
      });

      console.log("My message")
      >  Nov 10 22:38:802 listen_pipe.js: My message
