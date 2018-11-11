

# Timberjs

Thin logging for NodeJS

This is not an identical copy of Timber for Java ported to JavaScript. It is a thin log formatter that borrows some naming conventions from the Java Timber package. It strives to be simple. It welcomes your edit. Open a pull request.



## Installation

	yarn add timberjs

### Usage

      const {timberjs} = require("timberjs");
      const console = timberjs.plant(__filename);

      console.log("My message")
      >  Nov 10 22:38:802 listen_pipe.js: My message



### Usage, Extended

      const {timberjs} = require("timberjs");
      const console = timberjs.plant(null, {
      	log_tag:__filename,

      	log_time_format:"LL HH:MM:SSS", // moment JS friendly

      	log_tag_color:"\x1b[93m", // uses 
      });

      console.log("My message")
      >  Nov 10 22:38:802 listen_pipe.js: My message
