'use strict';

const colorlogjs = require("../colorlogjs");

function party_tapes(_log_lvl) {
  const _fake = colorlogjs.start(__filename, {
    is_silent:false,
    log_level:_log_lvl
  });  
  _fake.log("called from CLI", colorlogjs)
  _fake.log("This is colorlogjs console.log()");
  _fake.error("This is colorlogjs console.error()");
  _fake.warn("This is colorlogjs console.warn()");
  _fake.info("This is colorlogjs console.info()");
  _fake.debug("This is colorlogjs console.debug()");  
}

if(require.main === module) {
  party_tapes(6);
  party_tapes(5);
  party_tapes(1);
}