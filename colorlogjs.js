'use strict';
/**
  usage:

      const {colorlogjs} = require("./colorlogjs");
      const console = colorlogjs.start(__filename);

      console.log("My message")
      >  Nov 18 23:14:077 command_ai.js:  {266.31757497787476} My message

*/

const orig_l = console.log;
const orig_i = console.info; 
const orig_d = console.debug; 
const orig_e = console.error;
const _ = require("underscore");
const moment = require("moment");
const {
  performance
} = require('perf_hooks');

function logger(method, args) {
  
  let _tag = this.log_tag;
  if(_.indexOf(this.log_tag, "/") > -1) {
    _tag = _.last(this.log_tag.split("/"));  
  }
  args.unshift(
    this.log_time_color + 
    moment().format(this.log_time_format),
    this.log_tag_color + _tag + ":",
    this.log_message_color,
    "{"+ performance.now() +"}"
    );
    args.push(this.log_color_end);
    send_to_output.call(this, method, args);
}

function send_to_output(method, args) {
  if(_.isFunction(method)) {
    return method.apply(console, args);  
  }
  // THIS should never, ever print. If it does. hrm.
  console.info("Thrown is error. SUMMON YODA!",
                "You need the force and a time machine to recover...");
  return null;
}

function start(tag, opts) {
  opts = opts || {}
  const localize = _.extend({},console);
  localize.log_tag = tag || opts.log_tag || __filename;  
  localize.log_tag_color = opts.log_tag_color || "\x1b[96m";
  localize.log_message_color = opts.log_message_color || "\x1b[0m";
  localize.log_time_color = opts.log_time_color || "\x1b[93m";
  localize.log_time_format = opts.log_time_format || "MMM DD HH:mm:SSS";
  localize.log_color_end = opts.log_color_end || "\x1b[0m";

  // TODO..
  if(opts.log_filepath) { /* writing to file / stream / other */ }
  // short hand added. override others
  localize.d = localize.debug = function() {
    logger.call(localize, orig_i, _.toArray(arguments));
  }  
  localize.w = localize.warn = function() {
    logger.call(localize, orig_w, _.toArray(arguments));
  }  
  localize.e = localize.error = function() {
    logger.call(localize, orig_e, _.toArray(arguments));
  }
  localize.i = localize.info = function() {
    logger.call(localize, orig_i, _.toArray(arguments));
  }
  localize.l = localize.log = function() {
    logger.call(localize, orig_l, _.toArray(arguments));
  }
  return localize;
}

module.exports = {
  colorlogjs:{
    start,
  },
}